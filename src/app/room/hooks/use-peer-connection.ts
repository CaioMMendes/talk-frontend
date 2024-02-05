"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import useRemoteStream from "@/providers/remote-stream";
import userProvider from "@/providers/user-provider";
import useVideoMediaStream from "@/providers/video-media-stream";
import { MutableRefObject } from "react";

interface usePeerConnectionProps {
  peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>;
}

export const usePeerConnection = ({
  peerConnections,
}: usePeerConnectionProps) => {
  const { socket } = useSocketContext();
  const user = userProvider((state) => state.user);
  const { remoteStream, setRemoteStream, addRemoteStream } = useRemoteStream(
    (state) => state,
  );
  const videoMediaStream = useVideoMediaStream(
    (state) => state.videoMediaStream,
  );

  interface IDataStream {
    id: string;
    stream: MediaStream;
    username: string;
  }

  type CreatePeerConectionProps = {
    socketId: string;
    createOffer: boolean;
    videoMediaStream: MediaStream | null;
    initCamera: (type: "remote") => Promise<MediaStream | undefined>;
  };

  const createPeerConnection = async ({
    socketId,
    createOffer,
    initCamera,
  }: CreatePeerConectionProps) => {
    const config = {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };

    const peer = new RTCPeerConnection(config);
    peerConnections.current[socketId] = peer;
    const peerConnection = peerConnections.current[socketId];

    if (videoMediaStream) {
      videoMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream);
      });
    } else {
      const video = await initCamera("remote");
      video
        ?.getTracks()
        .forEach((track) => peerConnection.addTrack(track, video));
    }

    if (createOffer) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket?.emit("sdp", {
        to: socketId,
        sender: socket?.id,
        username: user.username,
        description: peerConnection.localDescription,
      });
    }

    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      // // console.log(MediaStream:{...remoteStream.MediaStream,id:'asdasda'});

      addRemoteStream({ remoteStream, id: socketId });
    };

    peer.onicecandidate = (event) => {
      if (event?.candidate) {
        socket?.emit("iceCandidates", {
          to: socketId,
          sender: socket.id,
          candidate: event.candidate,
          username: user.username,
        });
      }
    };

    peerConnection.onsignalingstatechange = (event) => {
      switch (peerConnection.signalingState) {
        case "closed":
          setRemoteStream({ id: socketId });
          break;
      }
    };

    peerConnection.onconnectionstatechange = (event) => {
      switch (peerConnection.connectionState) {
        case "disconnected":
          setRemoteStream({ id: socketId });
        case "failed":
          setRemoteStream({ id: socketId });
        case "closed":
          setRemoteStream({ id: socketId });

          break;
      }
    };
  };

  return { createPeerConnection, peerConnections };
};

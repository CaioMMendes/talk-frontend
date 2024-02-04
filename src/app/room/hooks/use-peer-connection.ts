"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import useRemoteStream from "@/providers/remote-stream";
import userProvider from "@/providers/user-provider";
import useVideoMediaStream from "@/providers/video-media-stream";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const usePeerConnection = () => {
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const { socket } = useSocketContext();
  const user = userProvider((state) => state.user);
  const { remoteStream, setRemoteStream, addRemoteStream } = useRemoteStream(
    (state) => state,
  );
  const videoMediaStream = useVideoMediaStream(
    (state) => state.videoMediaStream,
  );
  // const [remoteStream, setRemoteStream] = useState<MediaStream[]>([]);

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

    console.log("videoMediaStream", videoMediaStream);
    if (videoMediaStream) {
      console.log("tem media stream", videoMediaStream);
      videoMediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, videoMediaStream);
      });
    } else {
      console.log("não tem media stream", videoMediaStream);
      const video = await initCamera("remote");
      video
        ?.getTracks()
        .forEach((track) => peerConnection.addTrack(track, video));
    }

    if (createOffer) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log("criando uma oferta");

      socket?.emit("sdp", {
        to: socketId,
        sender: socket?.id,
        username: user.username,
        description: peerConnection.localDescription,
      });
    }

    peerConnection.ontrack = (event) => {
      console.log("entrou on track", event.streams);
      const remoteStream = event.streams[0];
      console.log(remoteStream);
      console.log({ ...remoteStream, id: "asdasdad" });
      // console.log(MediaStream:{...remoteStream.MediaStream,id:'asdasda'});

      addRemoteStream(remoteStream);
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
  };

  return { createPeerConnection, peerConnections };
};

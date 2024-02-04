"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import userProvider from "@/providers/user-provider";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { usePeerConnection } from "./use-peer-connection";
import {
  DataIceCandidatesType,
  DataOfferAnswerTypes,
  DataSenderTypes,
  DataSocketTypes,
} from "../[id]/types/socket-types";
import { CameraType, setVideoMediaStreamType } from "../[id]/page";
import { toastSuccess } from "@/app/components/Toastify";
import useVideoMediaStream from "@/providers/video-media-stream";

interface IUseSocket {
  paramId: string;
  initCamera: (
    type: CameraType,
    setVideoMediaStream?: setVideoMediaStreamType,
  ) => Promise<MediaStream | undefined>;
  peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>;
  dataIdRef: MutableRefObject<string | null>;
}

export const useSocket = ({
  paramId,
  initCamera,
  peerConnections,
  dataIdRef,
}: IUseSocket) => {
  const { socket } = useSocketContext();
  const { createPeerConnection } = usePeerConnection({ peerConnections });

  const { setVideoMediaStream, videoMediaStream } = useVideoMediaStream(
    (state) => state,
  );

  const user = userProvider((state) => state.user);
  useEffect(() => {
    // console.log(videoMediaStream);
  }, [videoMediaStream]);
  // Função para inscrever-se nos eventos
  const handleConnect = async () => {
    // console.log("conectado");
    socket?.emit("subscribe", {
      roomId: paramId,
      socketId: socket.id,
    });
    await initCamera("local", setVideoMediaStream);
    // console.log(videoMediaStream);
  };

  //Função para pegar novo usuario
  const handleNewUser = (data: DataSocketTypes) => {
    toastSuccess("Alguém entrou na sala");
    // console.log("Novo usuário");
    createPeerConnection({
      socketId: data.socketId,
      createOffer: false,
      videoMediaStream,
      initCamera,
    });
    socket?.emit("newUserStart", {
      to: data.socketId,
      sender: socket.id,
    });
    dataIdRef.current = data.socketId;
  };

  //Função para pegar novo usuario conectado
  const handleNewUserStart = (data: DataSenderTypes) => {
    createPeerConnection({
      socketId: data.sender,
      createOffer: true,
      videoMediaStream,
      initCamera,
    });
    // console.log("usuario conectado na sala", data);
  };

  //função que recebe a oferta de coneção
  const handleOfferAnswer = async (data: DataOfferAnswerTypes) => {
    const peerConnection = peerConnections.current[data.sender];
    // console.log(data.description?.type);
    try {
      if (data?.description?.type === "offer") {
        await peerConnection.setRemoteDescription(data.description);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        // console.log("local", peerConnection);
        // console.log("criando uma resposta");
        socket?.emit("sdp", {
          to: data.sender,
          sender: socket.id,
          username: user.username,
          description: peerConnection.localDescription,
        });
      } else if (data?.description?.type === "answer") {
        // console.log("ouvindo a oferta");
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.description),
        );
        // console.log("remote", peerConnection);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  //ouvir iceCandidates
  const handleIceCandidates = async (data: DataIceCandidatesType) => {
    const peerConnection = peerConnections.current[data.sender];
    if (data?.candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  return {
    handleConnect,
    handleNewUser,
    handleNewUserStart,
    handleOfferAnswer,
    handleIceCandidates,
  };
};

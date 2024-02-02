"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import userProvider from "@/providers/user-provider";
import { useRef } from "react";
import { usePeerConnection } from "./use-peer-connection";
import {
  DataOfferAnswerTypes,
  DataSenderTypes,
  DataSocketTypes,
} from "../[id]/types/socket-types";

interface IUseSocket {
  paramId: string;
  initCamera: () => Promise<void>;
}

export const useSocket = ({ paramId, initCamera }: IUseSocket) => {
  const { socket } = useSocketContext();
  const { peerConnections, createPeerConnection } = usePeerConnection();
  const user = userProvider((state) => state.user);

  // Função para inscrever-se nos eventos
  const handleConnect = async () => {
    console.log("conectado");
    socket?.emit("subscribe", {
      roomId: paramId,
      socketId: socket.id,
    });
    await initCamera();
  };

  //Função para pegar novo usuario
  const handleNewUser = (data: DataSocketTypes) => {
    console.log("Novo usuário");
    createPeerConnection(data.socketId, false);
    socket?.emit("newUserStart", {
      to: data.socketId,
      sender: socket.id,
    });
  };

  //Função para pegar novo usuario conectado
  const handleNewUserStart = (data: DataSenderTypes) => {
    createPeerConnection(data.sender, true);
    console.log(peerConnections);
    console.log("usuario conectado na sala", data);
  };

  //função que recebe a oferta de coneção
  const handleOfferAnswer = async (data: DataOfferAnswerTypes) => {
    const peerConnection = peerConnections.current[data.sender];
    console.log(data.description?.type);
    if (data?.description?.type === "offer") {
      await peerConnection.setRemoteDescription(data.description);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      console.log("criando uma resposta");
      socket?.emit("sdp", {
        to: data.sender,
        sender: socket.id,
        username: user.username,
        description: peerConnection.localDescription,
      });
    } else if (data?.description?.type === "answer") {
      console.log("ouvindo a oferta");
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(data.description),
      );
    }
  };

  return {
    handleConnect,
    handleNewUser,
    handleNewUserStart,
    handleOfferAnswer,
  };
};

"use client";

import {
  MicIcon,
  MicOffIcon,
  MonitorIcon,
  MonitorOffIcon,
  PhoneIcon,
  SendHorizonalIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import Button from "../../../components/ui/button";
import { useContext, useEffect, useState } from "react";
import ChatMessage from "./components/chat-message";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Input from "@/components/ui/input";
import ControlButton from "./components/control-button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { SocketContext, useSocketContext } from "@/app/contexts/socket-context";
import Chat from "./components/chat";

type RoomPageProps = {
  params: {
    id: string;
  };
};

const RoomPage = ({ params }: RoomPageProps) => {
  const [isMutedOn, setIsMutedOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("conectado");
      socket.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });
    });
  }, [socket, params.id]);

  const handleClickMuted = () => {
    setIsMutedOn((isMutedOn) => !isMutedOn);
  };
  const handleClickCamera = () => {
    setIsCameraOn((isCameraOn) => !isCameraOn);
  };
  const handleClickSharingScreen = () => {
    setIsSharingScreen((isSsetIsSharingScreen) => !isSsetIsSharingScreen);
  };

  return (
    <main className="flex w-full items-center justify-center gap-5 p-3 md:p-5">
      {/* Esquerda */}
      <div className="flex h-full w-full flex-col gap-5 rounded-lg">
        {/* cameras */}
        <div className="flex w-full flex-1 flex-wrap gap-3 ">
          <div className="flex h-56 w-56 rounded-lg bg-primary-2-dark"></div>
          <div className="flex h-56 w-56 rounded-lg bg-primary-2-dark"></div>
          <div className="flex h-56 w-56 rounded-lg bg-primary-2-dark"></div>
        </div>

        {/* Botões */}
        <div className="flex w-full items-center">
          {/* <p>9:00</p> */}

          <div className="flex flex-1 items-center justify-center gap-2">
            <ControlButton
              state={isMutedOn}
              IconOn={MicIcon}
              IconOff={MicOffIcon}
              onClick={handleClickMuted}
              titleOn={"Mutar"}
              titleOff={"Desmutar"}
            />

            <ControlButton
              state={isCameraOn}
              IconOn={VideoIcon}
              IconOff={VideoOffIcon}
              onClick={handleClickCamera}
              titleOn={"Desligar câmera"}
              titleOff={"Ligar câmera"}
            />
            <ControlButton
              state={isSharingScreen}
              IconOn={MonitorIcon}
              IconOff={MonitorOffIcon}
              onClick={handleClickSharingScreen}
              titleOn={"Compartilhar tela"}
              titleOff={"Parar de transmitir"}
            />

            <Button variant="button" title="Sair da reunião">
              <PhoneIcon width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Direita */}
      <Chat />
    </main>
  );
};

export default RoomPage;

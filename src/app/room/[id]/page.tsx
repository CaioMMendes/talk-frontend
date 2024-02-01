"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import {
  MicIcon,
  MicOffIcon,
  MonitorIcon,
  MonitorOffIcon,
  PhoneIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "../../../components/ui/button";
import Chat from "./components/chat";
import ControlButton from "./components/control-button";

type RoomPageProps = {
  params: {
    id: string;
  };
};

const RoomPage = ({ params }: RoomPageProps) => {
  const [isMutedOn, setIsMutedOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const localStream = useRef<HTMLVideoElement>(null);
  const { socket } = useSocketContext();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    // Função para inscrever-se nos eventos
    const handleConnect = async () => {
      console.log("conectado");
      socket.emit("subscribe", {
        roomId: params.id,
        socketId: socket.id,
      });
      await initCamera();
    };

    // Inscreva-se no evento de conexão
    socket.on("connect", handleConnect);

    // Retorne uma função para desinscrever-se quando o componente for desmontado
    // return () => {
    //   console.log("desconectado");
    //   socket.off("connect", handleConnect);
    //   // Outras ações de cleanup, se necessário
    // };

    //eslint-disable-next-line
  }, [socket, params.id]);

  const initCamera = async () => {
    const video = await navigator.mediaDevices.getUserMedia({
      video: isCameraOn,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });
    if (localStream.current) {
      localStream.current.srcObject = video;
    }
  };

  const handleClickMuted = () => {
    setIsMutedOn((isMutedOn) => !isMutedOn);
  };
  const handleClickCamera = () => {
    setIsCameraOn((isCameraOn) => !isCameraOn);
  };
  const handleClickSharingScreen = () => {
    setIsSharingScreen((isSsetIsSharingScreen) => !isSsetIsSharingScreen);
  };
  const handleLeaveMeet = () => {
    router.push("/");
  };

  const handleCopyIdClick = () => {
    navigator.clipboard.writeText(params.id);
  };

  return (
    <main className="flex w-full items-center justify-center gap-5 p-3 md:p-5">
      {/* Esquerda */}
      <div className="flex h-full w-full flex-col gap-5 rounded-lg">
        <div className="flex flex-1 flex-col gap-1 ">
          {/* cameras */}
          <div className="flex w-full flex-1 flex-wrap gap-3 ">
            <div className="relative flex h-60 rounded-lg bg-primary-2-dark">
              <video
                className="h-full w-full rounded-lg"
                ref={localStream}
                // src="/video.mp4"
                autoPlay
                playsInline
                // muted
                // loop
              ></video>
              <span className="absolute bottom-2 left-2">caio</span>
            </div>
          </div>
          {/* id da sala */}
          <div className="flex">
            <button type="button" title="Copiar id" onClick={handleCopyIdClick}>
              <p className="text-sm" id="copy-id">
                Id da sala: {params.id}
              </p>
            </button>
          </div>
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

            <Button
              variant="button"
              title="Sair da reunião"
              onClick={handleLeaveMeet}
            >
              <PhoneIcon width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Direita */}
      <Chat roomId={params.id} />
    </main>
  );
};

export default RoomPage;

"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import useChatMessageNumber from "@/providers/chat-message-provider";
import {
  MicIcon,
  MicOffIcon,
  MonitorIcon,
  MonitorOffIcon,
  PanelRightOpenIcon,
  PhoneIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "../../../components/ui/button";
import { usePeerConnection } from "../hooks/use-peer-connection";
import { useSocket } from "../hooks/use-socket";
import Chat from "./components/chat";
import ControlButton from "./components/control-button";
import { RoomPageProps } from "./types/socket-types";
import { v4 as uuidv4 } from "uuid";

export type setVideoMediaStreamType = Dispatch<
  SetStateAction<MediaStream | null>
>;
export type CameraType = "local" | "remote";
export type InitCameraTypes =
  | {
      type: "local";
      setVideoMediaStream: (mediaStream: MediaStream) => MediaStream;
    }
  | {
      type: "remote";
      setVideoMediaStream?: (mediaStream: MediaStream) => undefined;
    };

const RoomPage = ({ params }: RoomPageProps) => {
  const [isMutedOn, setIsMutedOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [remoteStream, setRemoteStream] = useState<MediaStream[]>([]);
  const chatmessageNumber = useChatMessageNumber(
    (state) => state.chatMessageNumber,
  );
  const removeMessageNumber = useChatMessageNumber(
    (state) => state.removeMessageNumber,
  );
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const localStream = useRef<HTMLVideoElement>(null);
  const [videoMediaStream, setVideoMediaStream] = useState<MediaStream | null>(
    null,
  );

  const { socket } = useSocketContext();
  const router = useRouter();
  const {
    handleConnect,
    handleNewUser,
    handleNewUserStart,
    handleOfferAnswer,
    handleIceCandidates,
  } = useSocket({
    initCamera,
    paramId: params.id,
    videoMediaStream,
    setRemoteStream,
    setVideoMediaStream,
  });

  useEffect(() => {
    if (!socket) return;

    // Inscreva-se no evento de conexão
    socket.on("connect", handleConnect);
    //dono da sala
    socket.on("newUser", (data) => handleNewUser(data));
    //pessoa que entra depois
    socket.on("newUserStart", (data) => handleNewUserStart(data));
    socket.on("sdp", (data) => handleOfferAnswer(data));
    socket.on("iceCandidates", (data) => handleIceCandidates(data));

    // Retorne uma função para desinscrever-se quando o componente for desmontado
    // return () => {
    //   console.log("desconectado");
    //   socket.off("connect", handleConnect);
    //   // Outras ações de cleanup, se necessário
    // };
    //eslint-disable-next-line
  }, [
    socket,
    // params.id,
    // handleConnect,
    // handleNewUser,
    // handleNewUserStart,
    // handleOfferAnswer,
    // handleIceCandidates,
  ]);
  useEffect(() => {
    console.log(videoMediaStream);
  }, [videoMediaStream]);

  async function initCamera(
    type: CameraType,
    setVideoMediaStream?: setVideoMediaStreamType,
  ): Promise<undefined | MediaStream> {
    const video = await navigator.mediaDevices.getUserMedia({
      video: isCameraOn,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
      },
    });
    if (type === "local" && typeof setVideoMediaStream === "function") {
      console.log("entrou local");
      setVideoMediaStream(video);
      if (localStream.current) {
        localStream.current.srcObject = video;
      }
    }
    if (type === "remote") {
      return video;
    }
  }

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

  const handleIsChatOpenClick = () => {
    setIsChatOpen((isChatOpen) => !isChatOpen);
    removeMessageNumber();
  };

  const handleCopyIdClick = () => {
    navigator.clipboard.writeText(params.id);
  };

  return (
    <main className=" relative flex w-full items-center  justify-center p-3 md:p-5 ">
      {/* Esquerda */}
      <div className=" flex h-full w-full flex-col gap-5 rounded-lg ">
        <div className="flex flex-1 flex-col gap-1 ">
          {/* cameras */}
          <div className="flex w-full flex-1 flex-wrap gap-3 ">
            <div className="relative flex h-60 w-full max-w-80 rounded-lg bg-primary-2-dark">
              <video
                className="h-full w-full -scale-x-100 rounded-lg  object-cover "
                ref={localStream}
                // src="/video.mp4"
                autoPlay
                playsInline
                // muted
                // loop
              ></video>
              <span className="absolute bottom-2 left-2">caio</span>
            </div>
            {remoteStream.map((stream) => {
              {
                console.log(stream);
              }
              return (
                <div
                  key={uuidv4()}
                  className="relative flex h-60 w-full max-w-80 rounded-lg bg-primary-2-dark"
                >
                  <video
                    className="h-full w-full -scale-x-100 rounded-lg  object-cover "
                    ref={(video) => {
                      console.log(video?.srcObject);
                      if (video && video.srcObject !== stream)
                        video.srcObject = stream;
                    }}
                    // src="/video.mp4"
                    autoPlay
                    playsInline
                    // muted
                    // loop
                  ></video>
                  <span className="absolute bottom-2 left-2">caio</span>
                </div>
              );
            })}
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
      <div className="absolute right-0 ml-5 flex h-full items-start justify-end  p-3 md:relative md:w-fit  md:p-0">
        <div
          className={` flex h-full   ${isChatOpen ? "w-80" : "!h-0 !w-0 p-0"} transform  duration-300 `}
          // className={`flex h-full w-80  ${!isChatOpen ? "origin-center scale-100" : " origin-top-right scale-0"} transform  duration-300 `}
        >
          <Chat
            roomId={params.id}
            handleIsChatOpenClick={handleIsChatOpenClick}
            isChatOpen={isChatOpen}
          />
        </div>

        <div
          className={`flex h-full w-full items-start ${!isChatOpen ? " relative  flex-1" : "absolute right-full !h-0 !w-0  p-0"} transform   duration-300`}
          // className={`flex h-full items-start ${isChatOpen ? "origin-center scale-100" : " origin-top-right scale-0"} transform  duration-300`}
        >
          {!isChatOpen && chatmessageNumber > 0 && (
            <span
              className={`absolute left-0 top-0 z-50 flex size-6 -translate-x-[40%] -translate-y-[30%] items-center justify-center rounded-full bg-primary-4 p-1.5 text-xs leading-none`}
            >
              {chatmessageNumber}
            </span>
          )}
          <Button
            variant="button"
            title="Abrir chat"
            onClick={handleIsChatOpenClick}
            className={`${isChatOpen && "!h-0 !w-0  transform p-0   duration-300"}`}
          >
            <PanelRightOpenIcon
              size={24}
              className={`${isChatOpen && "!size-0"} transform duration-300`}
            />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RoomPage;

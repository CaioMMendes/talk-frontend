"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import useChatMessageNumber from "@/providers/chat-message-provider";
import useRemoteStream from "@/providers/remote-stream";
import useVideoMediaStream from "@/providers/video-media-stream";
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
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../components/ui/button";
import { useSocket } from "../hooks/use-socket";
import Chat from "./components/chat";
import ControlButton from "./components/control-button";
import { RoomPageProps } from "./types/socket-types";
import MeetButtons from "./components/meet-buttons";
import { usePeerConnection } from "../hooks/use-peer-connection";

export type setVideoMediaStreamType = (videoMediaStream: MediaStream) => void;

export type CameraType = "local" | "remote";

const RoomPage = ({ params }: RoomPageProps) => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const dataIdRef = useRef<string | null>(null);
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const { remoteStream, setRemoteStream } = useRemoteStream((state) => state);
  const chatmessageNumber = useChatMessageNumber(
    (state) => state.chatMessageNumber,
  );
  const removeMessageNumber = useChatMessageNumber(
    (state) => state.removeMessageNumber,
  );
  const [isCameraOn, setIsCameraOn] = useState(true);
  const localStream = useRef<HTMLVideoElement | null>(null);

  const { socket } = useSocketContext();
  const {
    handleConnect,
    handleNewUser,
    handleNewUserStart,
    handleOfferAnswer,
    handleIceCandidates,
  } = useSocket({
    initCamera,
    paramId: params.id,
    peerConnections,
    dataIdRef,
  });

  useEffect(() => {
    if (!socket) return;

    // Inscreva-se no evento de conexão
    socket.on("connect", handleConnect);
    //dono da sala
    socket.on("newUser", (data) => handleNewUser(data));
    //pessoa que entra depois
    socket.on("newUserStart", (data) => handleNewUserStart(data));
    socket.on("sdp", async (data) => {
      handleOfferAnswer(data);
    });
    socket.on("iceCandidates", (data) => handleIceCandidates(data));

    //eslint-disable-next-line
  }, [socket]);

  //todo colocar pra quando a camera começar como false ou se a pessoa não aceitar
  //todo chamar isso de novo e pegar a camera
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
      setVideoMediaStream(video);
      if (localStream.current) {
        localStream.current.srcObject = video;
      }
    }
    if (type === "remote") {
      return video;
    }
  }

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
              return (
                <div
                  key={uuidv4()}
                  className="relative flex h-60 w-full max-w-80 rounded-lg bg-primary-2-dark"
                >
                  <video
                    className="h-full w-full -scale-x-100 rounded-lg  object-cover "
                    ref={(video) => {
                      if (video && video.srcObject !== stream.remoteStream)
                        video.srcObject = stream.remoteStream;
                    }}
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
          <MeetButtons
            isCameraOn={isCameraOn}
            setIsCameraOn={setIsCameraOn}
            peerConnections={peerConnections}
            dataId={dataIdRef}
            localStream={localStream}
          />
        </div>
      </div>

      {/* Direita */}
      <div className="absolute right-0 ml-5 flex h-full items-start justify-end  p-3 md:relative md:w-fit  md:p-0">
        <div
          className={` flex h-full   ${isChatOpen ? "w-80" : "!h-0 !w-0 p-0"} transform  duration-300 `}
        >
          <Chat
            roomId={params.id}
            handleIsChatOpenClick={handleIsChatOpenClick}
            isChatOpen={isChatOpen}
          />
        </div>

        <div
          className={`flex h-full w-full items-start ${!isChatOpen ? " relative  flex-1" : "absolute right-full !h-0 !w-0  p-0"} transform   duration-300`}
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

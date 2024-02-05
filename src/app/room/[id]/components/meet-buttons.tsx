"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import Button from "@/components/ui/button";
import useVideoMediaStream from "@/providers/video-media-stream";
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
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ControlButton from "./control-button";

type MeetButtonsProps = {
  isCameraOn: boolean;
  setIsCameraOn: Dispatch<SetStateAction<boolean>>;
  dataId: MutableRefObject<string | null>;
  peerConnections: MutableRefObject<Record<string, RTCPeerConnection>>;
  localStream: MutableRefObject<HTMLVideoElement | null>;
};

export default function MeetButtons({
  isCameraOn,
  setIsCameraOn,
  dataId,
  peerConnections,
  localStream,
}: MeetButtonsProps) {
  const [isMutedOn, setIsMutedOn] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const { videoMediaStream } = useVideoMediaStream((state) => state);
  const router = useRouter();
  const { socket } = useSocketContext();

  const handleClickMuted = () => {
    videoMediaStream?.getAudioTracks().forEach((track) => {
      track.enabled = !isMutedOn;
    });
    setIsMutedOn((isMutedOn) => !isMutedOn);
    if (peerConnections) {
      Object.values(peerConnections.current).forEach((peerConnection) => {
        peerConnection.getSenders().forEach((sender) => {
          if (sender.track?.kind === "audio" && videoMediaStream) {
            if (videoMediaStream?.getAudioTracks().length > 0) {
              sender.replaceTrack(
                videoMediaStream
                  ?.getAudioTracks()
                  .find((track) => track.kind === "audio") || null,
              );
            }
          }
        });
      });
    }
  };

  const handleClickCamera = () => {
    videoMediaStream?.getVideoTracks().forEach((track) => {
      track.enabled = !isCameraOn;
    });
    setIsCameraOn((isCameraOn) => !isCameraOn);
    if (peerConnections) {
      Object.values(peerConnections.current).forEach((peerConnection) => {
        peerConnection.getSenders().forEach((sender) => {
          if (sender.track) {
            if (sender.track?.kind === "video") {
              sender.replaceTrack(
                videoMediaStream
                  ?.getVideoTracks()
                  .find((track) => track.kind === "video") || null,
              );
            }
          }
        });
      });
    }
  };

  const handleClickSharingScreen = async () => {
    if (isSharingScreen) {
      Object.values(peerConnections.current).forEach((peerConnections) => {
        peerConnections.getSenders().forEach((sender) => {
          if (sender.track?.kind === "video") {
            sender.replaceTrack(videoMediaStream?.getVideoTracks()[0] || null);
          }
        });
      });

      if (localStream.current) {
        localStream.current.srcObject = videoMediaStream;
      }
    } else {
      const videoScreen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (localStream.current) {
        localStream.current.srcObject = videoScreen;
      }

      Object.values(peerConnections.current).forEach((peerConnections) => {
        peerConnections.getSenders().forEach((sender) => {
          if (sender.track?.kind === "video") {
            sender.replaceTrack(videoScreen.getVideoTracks()[0]);
          }
        });
      });
    }
    setIsSharingScreen((isSsetIsSharingScreen) => !isSsetIsSharingScreen);
  };

  const handleLeaveMeet = () => {
    videoMediaStream?.getTracks().forEach((track) => {
      track.stop();
    });
    Object.values(peerConnections.current).forEach((peerConnection) => {
      peerConnection.close();
    });
    socket?.disconnect();
    router.push("/");
  };
  useEffect(() => {
    handleClickMuted();
    //eslint-disable-next-line
  }, []);

  return (
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
        titleOn={"Parar de transmitir"}
        titleOff={"Compartilhar tela"}
      />

      <Button
        variant="button"
        title="Sair da reunião"
        onClick={handleLeaveMeet}
      >
        <PhoneIcon width={24} height={24} />
      </Button>
    </div>
  );
}

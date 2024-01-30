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
import Button from "../../components/ui/button";
import { useState } from "react";
import ChatMessage from "./components/chat-message";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Input from "@/components/ui/input";
import ControlButton from "./components/control-button";
import { Textarea } from "@/components/ui/textarea";

const RoomPage = () => {
  const [isMutedOn, setIsMutedOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);

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
      <div className="flex h-full w-52  flex-col rounded-lg bg-primary-2-dark">
        <ScrollArea className="flex max-h-96 flex-1 gap-1 p-2">
          <div className="flex w-full   flex-col gap-1 ">
            <ChatMessage
              author="Caio asdsad asd asdasdasd asda"
              message="Lorem a"
            />
            <ChatMessage
              author="Caio asdsad asd asdasdasd asda"
              message="Lorem asdasdadsa sd asda sasd asd asd asda dsa ads ad asd a sd a sda dsad adsadas da sdasda dsas dasda dsada sdasdadasd a"
            />
            <ChatMessage
              author="Caio"
              message="Lorem asdasdadsa sd asda sasd asd asd asda dsa ads ad asd a sd a sdadsad adsadasda sdasdadsas dasdadsada sdasdadasd a"
            />
            <ChatMessage
              author="Caio"
              message="Lorem asdasdadsa sd asda sasd asd asd asda dsa ads ad asd a sd a sdadsad adsadasda sdasdadsas dasdadsada sdasdadasd a"
            />
            <ChatMessage
              author="Caio"
              message="Lorem asdasdadsa sd asda sasd asd asd asda dsa ads ad asd a sd a sdads ad adsad asda sdasda dsas dasda dsada sdasdadasd a"
            />
          </div>
          <div>
            <ScrollBar orientation="vertical" />
          </div>
        </ScrollArea>

        <div className="px-2">
          <Input
            className="w-full rounded-lg bg-primary-2 py-1 !pr-8"
            placeholder="Mensagem"
            type="message"
          />
          <Textarea className="resize-none">
            <SendHorizonalIcon width={20} height={20} />
          </Textarea>
        </div>
      </div>
    </main>
  );
};

export default RoomPage;

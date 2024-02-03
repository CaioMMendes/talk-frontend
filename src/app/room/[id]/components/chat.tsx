"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import Input from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatFormSchema } from "../types/chat-types";
import { useSocketContext } from "@/app/contexts/socket-context";
import { useEffect, useRef, useState } from "react";
import getTime from "@/app/utils/get-time";
import { v4 as uuidv4 } from "uuid";
import { PanelRightCloseIcon } from "lucide-react";
import Button from "@/components/ui/button";
import useChatMessageNumber from "@/providers/chat-message-provider";

type ChatFormData = z.infer<typeof chatFormSchema>;
type ChatTypes = {
  message: string;
  username: string;
  roomId: string;
  time: string;
};
type ChatProps = {
  roomId: string;
  isChatOpen: boolean;
  handleIsChatOpenClick: () => void;
};

const Chat = ({ roomId, handleIsChatOpenClick, isChatOpen }: ChatProps) => {
  const [chat, setChat] = useState<ChatTypes[] | []>([]);
  const addMessageNumber = useChatMessageNumber(
    (state) => state.addMessageNumber,
  );
  const [color, setColor] = useState("zinc");
  const { socket } = useSocketContext();
  const scrollAreaRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
  });

  useEffect(() => {
    socket?.on("chat", (data) => {
      setChat((chat) => [...chat, data]);
      !isChatOpen && addMessageNumber();
    });
    setColor(sessionStorage.getItem("chatColor") || "zinc");
    //eslint-disable-next-line
  }, [socket]);

  const onSubmit = (data: ChatFormData) => {
    reset();
    if (data.message === "") return;
    const { time } = getTime();
    const sendMessageToServer = {
      message: data.message,
      username: "Caio",
      roomId,
      time: time,
    };

    // scrollAreaRef.current && scrollAreaRef.current

    socket?.emit("chat", sendMessageToServer);
    setChat((chat) => [...chat, sendMessageToServer]);
  };

  return (
    <div
      className={`flex h-full w-80 flex-1 flex-col    rounded-lg bg-primary-2-dark `}
    >
      <div
        className={`relative flex w-full items-center justify-center  border-b border-primary-2 p-2 ${!isChatOpen && "border-none p-0"}`}
      >
        <Button
          title="Fechar chat"
          onClick={handleIsChatOpenClick}
          className={`${!isChatOpen && "!size-0 p-0"} absolute left-2 transform duration-300`}
        >
          <PanelRightCloseIcon
            size={24}
            className={`${!isChatOpen && "!size-0"} transform duration-300`}
          />
        </Button>
        <p
          className={`${!isChatOpen && "hidden !size-0"} transform duration-300`}
        >
          Chat
        </p>
      </div>
      <div className="flex h-full max-h-[calc(100vh-12.55rem)] w-full flex-col  gap-1 px-2 pt-2 md:max-h-[calc(100vh-13.75rem)]">
        <ScrollArea className=" flex flex-1 gap-1 " ref={scrollAreaRef}>
          {chat.map((chatMessage) => {
            return (
              <ChatMessage
                key={uuidv4()}
                username={chatMessage.username}
                time={chatMessage.time}
                message={chatMessage.message}
                color={color}
              />
            );
          })}
          <div>
            <ScrollBar orientation="vertical" />
          </div>
        </ScrollArea>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex  w-full items-center  p-2 "
      >
        <Input
          className={`w-full rounded-lg bg-primary-2 py-1 !pr-8 ${!isChatOpen && "hidden"}`}
          placeholder="Mensagem"
          type="message"
          {...register("message")}
          error={!!errors.message}
          errorMessage={errors.message?.message}
          autoComplete="off"
          isChatOpen={isChatOpen}
        />
        {/* <Textarea className="resize-none">
            <SendHorizonalIcon width={20} height={20} />
        </Textarea> */}
      </form>
    </div>
  );
};

export default Chat;

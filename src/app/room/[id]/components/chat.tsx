"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import Input from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatFormSchema } from "../types/chat-types";
import { useSocketContext } from "@/app/contexts/socket-context";
import { useEffect, useState } from "react";
import getTime from "@/app/utils/get-time";
import { v4 as uuidv4 } from "uuid";

type ChatFormData = z.infer<typeof chatFormSchema>;
type ChatTypes = {
  message: string;
  username: string;
  roomId: string;
  time: string;
};

const Chat = ({ roomId }: { roomId: string }) => {
  const [chat, setChat] = useState<ChatTypes[] | []>([]);
  const [color, setColor] = useState("zinc");
  const { socket } = useSocketContext();
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
    });
    setColor(sessionStorage.getItem("chatColor") || "zinc");
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

    socket?.emit("chat", sendMessageToServer);
    setChat((chat) => [...chat, sendMessageToServer]);
  };

  return (
    <div className="flex h-full w-80  flex-col gap-2 rounded-lg bg-primary-2-dark p-2">
      <ScrollArea className="flex max-h-full flex-1 gap-1 ">
        <div className="flex  w-full  flex-col gap-1 ">
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
        </div>
        <div>
          <ScrollBar orientation="vertical" />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex  w-full items-center   "
      >
        <Input
          className="w-full rounded-lg bg-primary-2 py-1 !pr-8"
          placeholder="Mensagem"
          type="message"
          {...register("message")}
          error={!!errors.message}
          errorMessage={errors.message?.message}
          autoComplete="off"
        />
        {/* <Textarea className="resize-none">
            <SendHorizonalIcon width={20} height={20} />
        </Textarea> */}
      </form>
    </div>
  );
};

export default Chat;

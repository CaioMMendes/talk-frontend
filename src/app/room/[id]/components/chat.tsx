import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import Input from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatFormSchema } from "../types/chat-types";

const Chat = () => {
  type ChatFormData = z.infer<typeof chatFormSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatFormData>({
    resolver: zodResolver(chatFormSchema),
  });

  const onSubmit = (data: ChatFormData) => {
    reset();
    if (data.message === "") return;
    return console.log(data);
  };

  return (
    <div className="flex h-full w-52  flex-col rounded-lg bg-primary-2-dark">
      <ScrollArea className="flex max-h-full flex-1 gap-1 p-2">
        <div className="flex  w-full  flex-col gap-1 ">
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex  w-full items-center px-2  "
      >
        <Input
          className="w-full rounded-lg bg-primary-2 py-1 !pr-8"
          placeholder="Mensagem"
          type="message"
          {...register("message")}
          error={!!errors.message}
          errorMessage={errors.message?.message}
        />
        {/* <Textarea className="resize-none">
            <SendHorizonalIcon width={20} height={20} />
        </Textarea> */}
      </form>
    </div>
  );
};

export default Chat;

import getTime from "@/app/utils/get-time";
import TextExpander from "@/components/text-expander";

interface IChatMessage {
  author: string;
  message: string;
}

const ChatMessage = ({ author, message }: IChatMessage) => {
  const { time } = getTime();
  return (
    <div className="flex w-full flex-col rounded-lg bg-primary-2 p-2">
      <div className="flex w-full flex-nowrap items-center justify-between gap-2  ">
        <p className="w-32 truncate text-sm">{author}</p>
        <p className="text-xs">{time}</p>
      </div>
      {/* <p className="text-justify text-sm">{message}</p> */}
      <TextExpander>{message}</TextExpander>
    </div>
  );
};

export default ChatMessage;

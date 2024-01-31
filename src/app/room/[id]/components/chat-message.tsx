import getTime from "@/app/utils/get-time";
import TextExpander from "@/components/text-expander";

interface IChatMessage {
  username: string;
  message: string;
  time: string;
  color: string;
}

const ChatMessage = ({ username, message, time, color }: IChatMessage) => {
  const colorVariants = {
    red: "text-red-600",
    green: "text-green-600",
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    pink: "text-pink-600",
    cyan: "text-cyan-600",
    orange: "text-orange-600",
    primary: "text-primary-3",
    violet: "text-violet-600",
    zinc: "text-zinc-600",
  };

  return (
    <div className="flex w-full flex-col  gap-2 rounded-lg bg-primary-2 p-2">
      <div className="flex w-full flex-nowrap items-center justify-between gap-2  ">
        <p
          className={`w-32 truncate text-sm ${colorVariants[color as keyof typeof colorVariants]}`}
        >
          {username}
        </p>
        <p
          className={`text-xs ${colorVariants[color as keyof typeof colorVariants]}`}
        >
          {time}
        </p>
      </div>
      {/* <p className="text-justify text-sm">{message}</p> */}
      <TextExpander>{message}</TextExpander>
    </div>
  );
};

export default ChatMessage;

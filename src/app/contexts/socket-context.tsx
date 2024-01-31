"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

type SocketContextTypes = {
  socket: Socket | null;
};

export const SocketContext = createContext({} as SocketContextTypes);
export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}/streams`, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

//exportando assim da pra pegar const {socket}=useSocketContext()
//se não teria que fazer const {socket}=useContext(SocketContext)
export const useSocketContext = (): SocketContextTypes => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a FetchProvider");
  }
  return context;
};

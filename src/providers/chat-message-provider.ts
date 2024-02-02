"use client";
import { create } from "zustand";

interface IChatMessage {
  chatMessageNumber: number;
  addMessageNumber: () => void;
  removeMessageNumber: () => void;
}

const useChatMessageNumber = create<IChatMessage>()((set, get) => ({
  chatMessageNumber: 0,

  addMessageNumber: () => {
    set((state) => ({ chatMessageNumber: state.chatMessageNumber + 1 }));
  },
  removeMessageNumber: () => {
    set((state) => ({ chatMessageNumber: 0 }));
  },
}));
export default useChatMessageNumber;

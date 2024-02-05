"use client";
import { create } from "zustand";

interface RemoteStream {
  remoteStream: MediaStream;
  id: string;
}

interface IRemoteStream {
  remoteStream: RemoteStream[];
  setRemoteStream: ({ id }: { id: string }) => void;
  addRemoteStream: ({ remoteStream, id }: RemoteStream) => void;
}

const useRemoteStream = create<IRemoteStream>()((set, get) => ({
  remoteStream: [],

  setRemoteStream: (id) => {
    const stream = get().remoteStream;
    const sameStream = stream.filter((stream) => {
      return stream.id !== id.id;
    });

    set((state) => ({
      remoteStream: [...sameStream],
    }));
  },

  addRemoteStream: (remoteStreams) => {
    const stream = get().remoteStream;
    const sameStream = stream.filter(
      (stream) => stream.remoteStream.id === remoteStreams.remoteStream.id,
    );

    if (sameStream.length === 0) {
      set((state) => ({
        remoteStream: [...stream, remoteStreams],
      }));
    }
  },
}));
export default useRemoteStream;

"use client";
import { create } from "zustand";

interface IRemoteStream {
  remoteStream: MediaStream[];
  setRemoteStream: (remoteStream: MediaStream[]) => void;
  addRemoteStream: (remoteStream: MediaStream) => void;
}

const useRemoteStream = create<IRemoteStream>()((set, get) => ({
  remoteStream: [],

  setRemoteStream: (remoteStreams) => {
    set((state) => ({ remoteStream: [...remoteStreams] }));
  },
  addRemoteStream: (remoteStreams) => {
    const stream = get().remoteStream;
    const sameStream = stream.filter(
      (stream) => stream.id === remoteStreams.id,
    );

    if (sameStream.length === 0) {
      set((state) => ({
        remoteStream: [...stream, remoteStreams],
      }));
    }
  },
}));
export default useRemoteStream;

//    if (!prevRemoteStream.some((stream) => stream.id === socketId)) {
//           prevRemoteStream.map((stream) => console.log(stream, socketId));
//           return [...prevRemoteStream, remoteStream];
//         }

//         return prevRemoteStream;
//       }

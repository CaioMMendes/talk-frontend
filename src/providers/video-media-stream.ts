"use client";
import { create } from "zustand";

type IVideoStream = MediaStream | null;

interface IVideoMediaStream {
  videoMediaStream: IVideoStream;
  setVideoMediaStream: (videoMediaStream: MediaStream) => void;
}

const useVideoMediaStream = create<IVideoMediaStream>()((set, get) => ({
  videoMediaStream: null,

  setVideoMediaStream: (videoMediaStream) => {
    set((state) => ({ videoMediaStream }));
  },
}));
export default useVideoMediaStream;

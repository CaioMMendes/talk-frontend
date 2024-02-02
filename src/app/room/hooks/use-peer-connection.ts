"use client";

import { useSocketContext } from "@/app/contexts/socket-context";
import userProvider from "@/providers/user-provider";
import { useRef } from "react";

export const usePeerConnection = () => {
  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const { socket } = useSocketContext();
  const user = userProvider((state) => state.user);

  const createPeerConnection = (socketId: string, createOffer: boolean) => {
    const config = {
      iceServers: [
        {
          urls: "stun:stn.l.google.com:19302",
        },
      ],
    };
    const peer = new RTCPeerConnection(config);
    peerConnections.current[socketId] = peer;

    if (createOffer) {
      createOfferFunction();
    }

    async function createOfferFunction() {
      const peerConnection = peerConnections.current[socketId];
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket?.emit("sdp", {
        to: socketId,
        sender: socket?.id,
        username: user.username,
        description: peerConnection.localDescription,
      });
    }
  };

  return { createPeerConnection, peerConnections };
};

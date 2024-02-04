import { create } from "zustand";

interface IPeerconnection {
  peerConnection: RTCPeerConnection | null;
  setPeerConnection: (socketId: string, connection: RTCPeerConnection) => void;
}

// const usePeerConnectionStore = create<IPeerconnection>((set) => ({
//   peerConnection: null,
//   setPeerConnection: (socketId:string, connection:RTCPeerConnection) => set((state) => ({
//     peerConnection: {
//       ...state.peerConnection,
//       [socketId]: connection,
//     },
//   })),
// }));

// export default usePeerConnectionStore;

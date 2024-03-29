export type RoomPageProps = {
  params: {
    id: string;
  };
};

export type DataSocketTypes = {
  socketId: string;
};

export type DataSenderTypes = {
  sender: string;
};

export type DataOfferAnswerTypes = {
  username: string;
  sender: string;
  description: RTCSessionDescriptionInit;
};

export type DataIceCandidatesType = {
  username: string;
  sender: string;
  candidate: RTCIceCandidate;
};

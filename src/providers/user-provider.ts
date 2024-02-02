"use client";
import { create } from "zustand";

interface IUser {
  username: string;
}

interface IUserProvider {
  user: IUser;
  setUser: (user: IUser) => void;
}

const userProvider = create<IUserProvider>()((set, get) => ({
  user: { username: "" },

  setUser: (user) => {
    set((state) => ({
      user: { ...user },
    }));
  },
}));
export default userProvider;

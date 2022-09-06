import create from "zustand";
import { Room, RoomImage } from "@prisma/client";
import { trpc } from "../utils/trpc";

export interface AllRoomsState {
  rooms: Room[] & { images?: RoomImage[] };
  setRooms: (roomsData: Room[] & { images?: RoomImage[] }) => void;
  reset: () => void;
}

const initialState = {
  rooms: [],
};

export const useBearStore = create<AllRoomsState>()((set) => ({
  rooms: [],
  setRooms: async () => {},
  reset: () => set(initialState),
}));

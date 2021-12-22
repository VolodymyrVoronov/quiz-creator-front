import create from "zustand";

import avatarsData from "../data/avatarsData";

interface IAvatars {
  id: number;
  avatar: string;
  imageAlt: string;
}

interface IAppStore {
  avatars: IAvatars[];
}

export const appStore = create<IAppStore>((set, get) => ({
  avatars: [
    {
      id: 1,
      avatar: avatarsData.bear,
      imageAlt: "Bear",
    },
    {
      id: 2,
      avatar: avatarsData.bee,
      imageAlt: "Bee",
    },
    {
      id: 3,
      avatar: avatarsData.giraffe,
      imageAlt: "Giraffe",
    },
    {
      id: 4,
      avatar: avatarsData.goat,
      imageAlt: "Goat",
    },
    {
      id: 5,
      avatar: avatarsData.octopus,
      imageAlt: "Octopus",
    },
    {
      id: 6,
      avatar: avatarsData.parrot,
      imageAlt: "Parrot",
    },
    {
      id: 7,
      avatar: avatarsData.penguin,
      imageAlt: "Penguin",
    },
    {
      id: 8,
      avatar: avatarsData.rabbit,
      imageAlt: "Rabbit",
    },
    {
      id: 9,
      avatar: avatarsData.wildBoar,
      imageAlt: "Wild Boar",
    },
    {
      id: 10,
      avatar: avatarsData.fox,
      imageAlt: "Fox",
    },
  ],
}));

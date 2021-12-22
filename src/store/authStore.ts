import create from "zustand";
import axios from "axios";

import { signup, signin } from "api/api";

interface ISignUp {
  avatar?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

interface IAuthStore {
  isAuthorizing: boolean;
  isSignInForm: boolean | undefined;
  errorMessage: string;

  setTypeOfAuthForm: (flag: boolean) => void;
  signUp: (data: ISignUp) => Promise<void>;
  signIn: () => Promise<void>;
}

export const authStore = create<IAuthStore>((set, get) => ({
  isAuthorizing: false,
  isSignInForm: undefined,
  errorMessage: "",

  setTypeOfAuthForm: (flag: boolean) => {
    set({ isSignInForm: flag });
  },

  signUp: async (data: ISignUp) => {
    try {
      set({ isAuthorizing: true });
      const response = await signup(data);
      console.log(response);

      set({ isAuthorizing: false });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e?.response?.data.message);
        set({ errorMessage: e?.response?.data.message });

        set({ isAuthorizing: false });
      }
    }
  },
  signIn: async () => {},
}));

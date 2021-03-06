import create from "zustand";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

import { signup, signin } from "api/api";

import Paths from "const/path";

interface ISignUp {
  avatar?: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

interface ISignIn {
  email: string;
  password: string;
}

export interface IUserData {
  avatar?: string;
  email?: string;
  token?: string;
  id?: string;
}

interface IAuthStore {
  isAuthorizing: boolean;
  isSignInForm: boolean | undefined;
  errorMessage: string;
  userData: IUserData;

  setTypeOfAuthForm: (flag: boolean) => void;
  setErrorMassageToDefault: () => void;
  setUserData: (userData: IUserData) => void;

  signUp: (data: ISignUp, navigation: NavigateFunction) => Promise<void>;
  signIn: (data: ISignIn, navigation: NavigateFunction) => Promise<void>;
  logOut: () => void;
}

export const authStore = create<IAuthStore>((set, get) => ({
  isAuthorizing: false,
  isSignInForm: undefined,
  errorMessage: "",
  userData: {},

  setTypeOfAuthForm: (flag: boolean) => {
    set({ isSignInForm: flag });
  },

  setErrorMassageToDefault: () => {
    set({ errorMessage: "" });
  },

  setUserData: (data: IUserData) => {
    set({ userData: data });
  },

  signUp: async (data: ISignUp, navigation) => {
    try {
      get().setErrorMassageToDefault();

      set({ isAuthorizing: true });

      const response = await signup(data);

      if (response.status === 200) {
        set({ userData: response.data.result });

        localStorage.setItem(
          "userData",
          JSON.stringify(await { ...response.data.result })
        );

        navigation(Paths.QuizCreator);
      }

      set({ isAuthorizing: false });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e?.response?.data.message);

        set({ errorMessage: e?.response?.data.message });

        if (e?.response?.data.message === undefined) {
          set({ errorMessage: "Something went wrong. Try again a bit later." });
        }

        set({ isAuthorizing: false });
      }
    }
  },

  signIn: async (data: ISignIn, navigation) => {
    try {
      get().setErrorMassageToDefault();

      set({ isAuthorizing: true });

      const response = await signin(data);

      if (response.status === 200) {
        set({ userData: response.data.result });

        localStorage.setItem(
          "userData",
          JSON.stringify(await { ...response.data.result })
        );

        navigation(Paths.QuizCreator);
      }

      set({ isAuthorizing: false });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e?.response?.data.message);

        set({ errorMessage: e?.response?.data.message });

        if (e?.response?.data.message === undefined) {
          set({ errorMessage: "Something went wrong. Try again a bit later." });
        }

        set({ isAuthorizing: false });
      }
    }
  },

  logOut: () => {
    localStorage.removeItem("userData");
    set({ userData: {} });
  },
}));

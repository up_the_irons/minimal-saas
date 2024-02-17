import { AuthBindings } from "@refinedev/core";
import { AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "./constants";

export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL + "/api");

export const authProvider: AuthBindings = {
  login: async ({ email, password, remember, providerName }) => {
    if (providerName === "github") {
      window.location.href =
        API_URL + '/api/connect/github';
      return {
        success: true,
      };
    }

    let errorMessage = null;

    try {
      const { data, status } = await strapiAuthHelper.login(email, password);
      
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);

        // set header axios instance
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.jwt}`;

        return {
          success: true,
          redirectTo: "/",
        };
      }
    } catch (error: any) {
      errorMessage = error.response?.data?.error?.message
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: errorMessage || "Invalid email or password",
      },
    };
  },
  register: async ({ email, password }) => {
    const url = API_URL + '/api/auth/local/register';

    let errorMessage = null;

    try {
      const { data, status } = await axios.post(url, {
        username: email,
        email: email,
        password: password,
      });

      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);

        // set header axios instance
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.jwt}`;

        return {
          success: true,
          redirectTo: "/",
        };

      }
    } catch (error: any) {
      errorMessage = error.response?.data?.error?.message
    }

    return {
      success: false,
      error: {
        message: "Registration failed",
        name: errorMessage || "There was an error creating your account",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const { data, status } = await strapiAuthHelper.me(token);
    if (status === 200) {
      const { id, username, email } = data;
      return {
        id,
        name: username,
        email,
      };
    }

    return null;
  },
};

'use server'

import axios from "axios";

import { getSession } from "@/actions/authActions";
import config from "@/config/config";

export const deleteIndications = async (indicationId: string) => {
  try {
      const session = await getSession();
      const response = await axios.delete(`${config.apiUrl}indications/${indicationId}`, {
          headers: {
              Authorization: `Bearer ${session.token}`,
          },
      });

      return {
          status: response.status,
          data: response.data,
      };
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.log("error message: ", error.response?.data.message);
          return {
              status: error.response?.status,
              message: error.response?.data.message,
          };
      }

      console.log("error: ", error);

      return {
          status: 500,
          message: "Internal Server Error",
      };
  }
}

export const deleteAssingments = async (assingmentId: number) => {
  try {
      const session = await getSession();
      const response = await axios.delete(`${config.apiUrl}assignments/${assingmentId}`, {
          headers: {
              Authorization: `Bearer ${session.token}`,
          },
      });

      return {
          status: response.status,
          data: response.data,
      };
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.log("error message: ", error.response?.data.message);
          return {
              status: error.response?.status,
              message: error.response?.data.message,
          };
      }

      console.log("error: ", error);

      return {
          status: 500,
          message: "Internal Server Error",
      };
  }
}

export const deleteQuestions = async (questionId: string) => {
  try {
      const session = await getSession();
      const response = await axios.delete(`${config.apiUrl}questions/${questionId}`, {
          headers: {
              Authorization: `Bearer ${session.token}`,
          },
      });

      return {
          status: response.status,
          data: response.data,
      };
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.log("error message: ", error.response?.data.message);
          return {
              status: error.response?.status,
              message: error.response?.data.message,
          };
      }

      console.log("error: ", error);

      return {
          status: 500,
          message: "Internal Server Error",
      };
  }
}

export const deleteUsers = async (userId: string,role: string) => {
  try {
      const session = await getSession();
      const response = await axios.delete(`${config.apiUrl}users/${userId}`, {
          headers: {
              Authorization: `Bearer ${session.token}`,
          },
          params: {
              role: role
          }
      });

      return {
          status: response.status,
          data: response.data,
      };
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.log("error message: ", error.response?.data.message);
          return {
              status: error.response?.status,
              message: error.response?.data.message,
          };
      }

      console.log("error: ", error);

      return {
          status: 500,
          message: "Internal Server Error",
      };
  }
}

export const unLinkUsers = async (pacientId: string, especialistId: string) => {
  try {
    console.log(pacientId);
    console.log(especialistId);
      const session = await getSession();
      const response = await axios.delete(`${config.apiUrl}linker/delete`, {
          headers: {
              Authorization: `Bearer ${session.token}`,
          },
          data: {
              pacientId: pacientId,
              specialistId: especialistId
          }
      });

      return {
          status: response.status,
          data: response.data,
      };
  } catch (error) {
      if (axios.isAxiosError(error)) {
          console.log("error message: ", error.response?.data.message);
          return {
              status: error.response?.status,
              message: error.response?.data.message,
          };
      }

      console.log("error: ", error);

      return {
          status: 500,
          message: "Internal Server Error",
      };
  }
}
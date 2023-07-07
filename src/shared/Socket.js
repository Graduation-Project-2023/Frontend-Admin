import { io } from "socket.io-client";

const URL = "https://project-io.engineer";

let ioInstance = null;

export const getIo = () => {
  if (!ioInstance) {
    console.log("Creating new socket instance");
    ioInstance = io(URL, { withCredentials: true });
  }
  return ioInstance;
};

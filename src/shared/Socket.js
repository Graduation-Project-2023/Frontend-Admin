import { io } from "socket.io-client";

const URL = "https://project-io.engineer/api/message";

let ioInstance = null;

export const getIo = () => {
  if (!ioInstance) {
    console.log("creating new socket instance");
    ioInstance = io(URL, { withCredentials: true });
  }
  return ioInstance;
};

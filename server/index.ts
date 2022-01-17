// import express, { Express, Request, Response } from "express";
// import * as http from "http";
import * as uWebSockets from "uWebSockets.js";
import expressify from "uwebsockets-express";
import next, { NextApiHandler } from "next";
import * as socketio from "socket.io";
import SocketManager from "./SocketManager";
// import Cors from "cors";

import allowCors from "../pages/api/cors";
import dotenv from "dotenv";

dotenv.config();
const port: number = parseInt(process.env.SERVER_PORT || "5000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";
export const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  // const app: AppOptions = express();
  const app: uWebSockets.TemplatedApp = uWebSockets.App();
  const myapp = expressify(app);
  // const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  // io.attach(server);
  io.attachApp(app);

  myapp.get("/", async (_, res) => {
    res.send("Running");
  });

  myapp.use("../pages/api/cors", allowCors);
  // app.use(Cors());
  io.on("connection", SocketManager);

  myapp.all("*", (req: any, res: any) => nextHandler(req, res));

  myapp.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  });
});

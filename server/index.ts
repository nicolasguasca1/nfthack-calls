import dotenv from "dotenv";
import * as uWebSockets from "uWebSockets.js";
// import { StringDecoder } from "string_decoder";
dotenv.config();

// const decoder = new StringDecoder("utf8");

// const ACTIONS_ENUM = {
//   REFRESH_USERS_TO_CLIENTS: "REFRESH_USERS_TO_CLIENTS",
//   ADD_USER: "ADD_USER",
//   LEAVE_USER: "LEAVE_USER",
//   ADD_MESSAGE: "ADD_MESSAGE",
//   REFRESH_MESSAGES_TO_CLIENTS: "REFRESH_MESSAGES_TO_CLIENTS"
// };

// const ROOMS_OF_CHAT = {
//   GENERAL: "/CHAT/GENERAL"
// };

// let users: { uuid: any }[] = [];
// let messages: ArrayBuffer[] = [];

// const CHAT = {
//   addUser: (ws: uWebSockets.WebSocket, user: { uuid: any }) => {
//     //definiendo el uuid en la conexión websocket
//     ws.uuid = user.uuid;
//     //agrego el usuario al array de objectos
//     users = [...users, user];
//     //notificar a todos los clientes conectados que hay un usuario nuevo!
//     ws.publish(
//       ROOMS_OF_CHAT.GENERAL,
//       JSON.stringify({
//         action: ACTIONS_ENUM.REFRESH_USERS_TO_CLIENTS,
//         data: {
//           users: users
//         }
//       })
//     );

//     ws.publish(
//       ROOMS_OF_CHAT.GENERAL,
//       JSON.stringify({
//         action: ACTIONS_ENUM.REFRESH_MESSAGES_TO_CLIENTS,
//         data: {
//           messages: messages
//         }
//       })
//     );
//   },
//   addMessage: (ws: uWebSockets.WebSocket, message: ArrayBuffer) => {
//     if (message) {
//       //agrego el usuario al array de objectos
//       messages = [...messages, message];
//       //notificar a todos los clientes conectados que hay un mensaje nuevo!
//       ws.publish(
//         ROOMS_OF_CHAT.GENERAL,
//         JSON.stringify({
//           action: ACTIONS_ENUM.REFRESH_MESSAGES_TO_CLIENTS,
//           data: {
//             messages: messages
//           }
//         })
//       );
//     }
//   },
//   closeUser: (app: uWebSockets.TemplatedApp, ws: uWebSockets.WebSocket) => {
//     if (ws.uuid) {
//       users = users.filter((u) => u.uuid !== ws.uuid);
//       //notifico a los clientes que hay un nuevo mensaje
//       app.publish(
//         ROOMS_OF_CHAT.GENERAL,
//         JSON.stringify({
//           action: ACTIONS_ENUM.REFRESH_USERS_TO_CLIENTS,
//           data: {
//             users: users
//           }
//         })
//       );
//     }
//   }
// };

const port: number = parseInt(process.env.SERVER_PORT || "5000", 10);
const dev: boolean = process.env.NODE_ENV !== "production";

const app = uWebSockets
  .App()
  .ws("http://localhost", {
    idleTimeout: 120,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    compression: uWebSockets.DEDICATED_COMPRESSOR_3KB,
    open: (ws) => {
      let ip = ws.getRemoteAddressAsText();
      console.log("Connection opened and started from" + ip);
    },
    close: (_ws, code, reason): void => {
      console.log("Connection forcefully closed: " + code + " " + reason);
    },
    message: (ws, message, isBinary) => {
      console.log("Message: " + message), ws.send(message, isBinary, true);
    }
  })
  .get("/", (res, _req) => {
    res
      .writeStatus("200 OK")
      .writeHeader("Access-Control-Allow-Origin", "*")
      .end("Running awesome!");
  })
  .any("/*", (res, _req) => {
    res.end("Nothing to see here!");
  });

app.listen(port, (listenSocket) => {
  if (listenSocket) {
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? "development" : process.env.NODE_ENV
      }`
    );
  }
});

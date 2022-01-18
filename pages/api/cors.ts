// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { Request, Response } from "express";

// Initializing the cors middleware
const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"]
  })
);

export default async function allowCors(req: Request, res: Response) {
  // Run cors
  await cors(req, res);

  // Rest of the API logic
  res.json({ message: "Cors responding here!" });
}

// previous express code
// const allowCors = (fn) => async (req, res) => {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // another common pattern
//   // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }
//   return await fn(req, res);
// };

// const handler = (req, res) => {
//   const d = new Date();
//   res.end(d.toString());
// };

// module.exports = allowCors(handler);

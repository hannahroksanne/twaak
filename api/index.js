import express from "express";
import { getTweetVideoUrls } from "./getTwitterUrl.cjs";

const app = express();

app.get("/api/getTwitterHtml/:userName/:tweetId", async (req, res) => {
  const { userName, tweetId } = req.params;
  const urls = await getTweetVideoUrls(req.params);
  res.json(urls);
});

export const handler = app;

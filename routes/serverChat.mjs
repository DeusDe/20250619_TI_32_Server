import express from "express";
import path from "path";

export function serverChatPage() {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'serverChat.html'));
  });

  return router;
}

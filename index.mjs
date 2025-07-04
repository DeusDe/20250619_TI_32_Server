import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dot from "dotenv";
import { chatgpt } from "./routes/chatgpt.mjs";
import { images } from "./routes/images.mjs";
import { chat } from "./routes/chat.mjs";
import { programs } from "./routes/programs.mjs";
import { googleApi } from "./routes/googleApi.mjs";
import { serverChatPage } from "./routes/serverChat.mjs";
dot.config();

async function main() {
  const port = +(process.env.PORT ?? 8080);
  if (!port || !Number.isInteger(port)) {
    console.error("bad port");
    process.exit(1);
  }

  const app = express();
  app.use(morgan("dev"));
  app.use(cors("*"));
  app.use(
    bodyParser.raw({
      type: "image/jpg",
      limit: "10mb",
    })
  );
  app.use((req, res, next) => {
    console.log(req.headers.authorization);
    next();
  });

  // Programs
  app.use("/programs", programs());

  // OpenAI API
  app.use("/gpt", await chatgpt());

  // Google API
  //app.use("/google", await googleApi());

  // Chat
  app.use("/chats", await chat());

  // Server chat web page
  app.use("/server_chat", serverChatPage());

  // Images
  app.use("/image", images());

  app.listen(port, '0.0.0.0', () => {
    console.log(`listening on ${port}`);
  });
}

main();

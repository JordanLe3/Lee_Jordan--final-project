import express from "express";
import router from "./src/router.js";
import errorHandler from "./src/middleware/errorHandler.js";
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()

const app = express();

// allows us to parse json 
app.use(express.json());

// idk what this does but the example has it. It works so I'm not complaining
app.use(cors())

//using the router.js file
app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`API server ready on http://localhost:${process.env.PORT}`)
);

import express from "express";
import { engine } from 'express-handlebars'
import dotenv from "dotenv";
import pgPromise from "pg-promise";
import session from 'express-session';


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

dotenv.config();


const connection = {
    connectionString: process.env.Spaza_Suggest_URL,
    ssl: { rejectUnauthorized: false },
  };
  
  app.use(session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  
  const pgp = pgPromise();
  
  const db = pgp(connection);
import express from "express";
import { engine } from 'express-handlebars'
import dotenv from "dotenv";
import pgPromise from "pg-promise";
import session from 'express-session';

import expenses_router from "./routes/expenses_route.js"

import expenseService from './services/expenseService.js';


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

dotenv.config();


const connection = {
    connectionString: process.env.expense_tracker_URL,
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
  
  app.use('/', expenses_router)
  app.use('/add-expense', expenses_router)

  const PORT = process.env.PORT || 3014;

app.listen(PORT, function () {
  console.log("App has started", PORT);
});

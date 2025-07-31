const express = require('express');
const app = express()
const port = 3000
const router = require('./routes/index');

const session = require('express-session');

app.use(session({
  secret: 'secret-login',     // bebas, tapi jangan kosong
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }    // true kalau udah pakai HTTPS
}));

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.use("/", router)

app.listen(port, () => {
  console.log(`I Love u ${port}`);
})
const express = require("express");

const app = express();
const port = 3000;

app.use("/", express.static(__dirname + "/dist"));
app.use("/login", express.static(__dirname + "/dist"));
app.use("/registration", express.static(__dirname + "/dist"));
app.use("/chats", express.static(__dirname + "/dist"));
app.use("/profile", express.static(__dirname + "/dist"));
app.use("/not-found", express.static(__dirname + "/dist"));
app.use("/server-error", express.static(__dirname + "/dist"));

app.listen(port, () => {
    console.log('Server started')
});

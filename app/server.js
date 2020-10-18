
const express = require("express");
const app = express();

const questions = [
];

app.use(express.static("public"));
app.use(express.static('views'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/questions", (request, response) => {
  response.json(questions);
});


app.get("/video", (request, response) => {
  response.sendFile(__dirname + "/video.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

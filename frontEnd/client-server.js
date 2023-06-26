const http = require("http");
const fs = require("fs");
const port = process.env.PORT || 5500;
const webServer = require("./client")

let htmlFile = fs.readFileSync("./index.html");
let cssFile = fs.readFileSync("./style.css");
let jsFile = fs.readFileSync("./client.js");
let image = fs.readFileSync("./chat-2-icon.png")
let audio = fs.readFileSync("./notification_sound.mp3")

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == "/" || req.url == "/index.html") {
    res.setHeader = ("Content-Type", "text/html");
    res.statusCode = 200;
    res.end(htmlFile.toString());
  } else if (req.url == "/style.css") {
    res.setHeader = ("Content-Type", "stylesheet/css");
    res.statusCode = 200;
    res.end(cssFile.toString());

  }
  // else if (req.url == "/client.js") {
  //   res.setHeader = ("Content-Type", "script/js");
  //   res.statusCode = 200;
  //   res.end(jsFile.toString());
  // }
  else if (req.url == "/chat-2-icon.png") {
    res.setHeader = ("Content-Type", "image/png");
    res.statusCode = 200;
    res.end(image);
  }else if (req.url == "/notification_sound.mp3") {
    res.setHeader = ("Content-Type", "audio/mp3");
    res.statusCode = 200;
    res.end(audio);
  }
  else{
    res.statusCode = 404;
    res.end("Sorry! Not available")
  }
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

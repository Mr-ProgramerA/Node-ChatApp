// const io = require("socket.io-client")
import { io } from "socket.io-client";
//const socket = io("http://127.0.0.1:3000");
const socket = io("https://node-chatapp-backend.onrender.com:3000");
// const socket = io("http://localhost:3000");

const form = document.getElementById("send_form");
const messageInp = document.getElementById("messageInp");
const messageContainer = document.querySelector(".continer");
var audio = new Audio("notification_sound.mp3");
// message append function
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInp.value;
  if (messageInp.value != "") {
    append(`You: ${message}`, "right");
    socket.emit("send", message);
  }

  messageInp.value = "";
});

const Name = prompt("Enter your name to join");
socket.emit("new-user-joined", Name);

socket.on("user-joined", (User_name) => {
  console.log("New User: ", User_name);
  append(`${User_name} joined the chat`, "server_message");
});

socket.on("receive", (data) => {
  append(`${data.name} : ${data.message}`, "left");
});

socket.on("left", (user_name) => {
  append(`${user_name} left the chat`, "server_message");
});

socket.on(
  "welcome",
  append("You are welcomed to webChat application", "server_message")
);
console.log("You are", Name);
console.log(socket.id);

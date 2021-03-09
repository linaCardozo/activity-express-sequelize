const ws = new WebSocket("ws://localhost:3000");

// const Message = require("../routes/messages");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
  console.log(msg.data);
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();

  const msg = document.getElementById("message");
  const aut = document.getElementById("author");
  const var_ts = Date.now();
  ws.send(msg.value);
  ws.send(aut.value);
  ws.send(var_ts);

  // Message.create({
  //   message: msg.value,
  //   author: aut.value,
  //   ts: var_ts.value,
  // }).then((response) => {
  //   console.log(response);
  // });

  msg.value = "";
  aut.value = "";
  var_ts.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

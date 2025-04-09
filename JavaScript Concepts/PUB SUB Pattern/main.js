class EventBus {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callbk) => {
        callbk(data);
      });
    }
  }

  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }
}

const eventBus = new EventBus();
let activeChannel = "general";
const messages = {
  general: [],
  sports: [],
  technology: [],
};

function displayMessages(channel) {
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML = "";
  messages[channel].forEach((message) => {
    const messageElem = document.createElement("div");
    messageElem.textContent = `[${channel}] ${message}`;
    chatMessages.appendChild(messageElem);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

["general", "sports", "technology"].forEach((channel) => {
  eventBus.subscribe(channel, (message) => {
    if (channel === activeChannel) {
      displayMessages(channel);
    }
  });
});

document.querySelectorAll(".channel").forEach((channelElem) => {
  channelElem.addEventListener("click", () => {
    document.querySelectorAll(".channel").forEach((el) => el.classList.remove("active"));
    channelElem.classList.add("active");
    activeChannel = channelElem.dataset.channel;
    displayMessages(activeChannel);
  });
});

document.getElementById("send-button").addEventListener("click", () => {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();
  if (message) {
    messages[activeChannel].push(message);
    eventBus.publish(activeChannel, message);
    messageInput.value = "";
  }
});

document.getElementById("message-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("send-button").click();
  }
});

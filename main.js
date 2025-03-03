import Chatbot from './chatbot.js';

const chatbot = new Chatbot();

document.addEventListener("DOMContentLoaded", async () => {
    await chatbot.loadResponses();

    const chatInput = document.getElementById("chat-input");
    const chatOutput = document.getElementById("chat-output");
    const sendButton = document.getElementById("send-btn");

    function addMessage(user, message) {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    sendButton.addEventListener("click", () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage("You", userMessage);
            const botResponse = chatbot.getResponse(userMessage);
            setTimeout(() => addMessage("Bot", botResponse), 500);
            chatInput.value = "";
        }
    });

    chatInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});

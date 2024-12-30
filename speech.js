document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
      if (e.code === "Enter" && inputField.value.trim()) {
        let input = inputField.value;
        inputField.value = "";
        output(input);
      }
    });
  });
  
  // Process Output
  function output(input) {
    let sanitizedText = input
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/[\d]/gi, "")
      .trim();
  
    sanitizedText = sanitizedText
      .replace(/ a /g, " ")
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    // Default Output
    const reply = `You said: "${sanitizedText}"`;
  
    // Update DOM and Speak
    addChat(input, reply);
  }
  
  // Add Chat to Messages Section
  function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");
  
    const userDiv = document.createElement("div");
    userDiv.className = "user response";
    userDiv.innerHTML = `<span>${input}</span>`;
  
    const botDiv = document.createElement("div");
    botDiv.className = "bot response";
    botDiv.innerHTML = `<span>${product}</span>`;
  
    messagesContainer.appendChild(userDiv);
    messagesContainer.appendChild(botDiv);
  
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
    textToSpeech(product);
  }
  
  // Text-to-Speech Function
  const synth = window.speechSynthesis;
  const textToSpeech = (string) => {
    const utterance = new SpeechSynthesisUtterance(string);
    utterance.lang = "en-US";
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  };
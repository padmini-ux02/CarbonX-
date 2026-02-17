document.addEventListener("DOMContentLoaded", function(){

  const toggle = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const body = document.getElementById("chatBody");
  const input = document.getElementById("chatInput");
  const sendBtn = document.getElementById("chatSend");

  toggle.addEventListener("click", () => {
    panel.style.display =
      panel.style.display === "flex" ? "none" : "flex";
  });

  sendBtn.addEventListener("click", sendMessage);

  async function sendMessage(){
    const message = input.value.trim();
    if(!message) return;

    addMessage(message,"user");
    input.value="";

    try{
      const response = await fetch("https://padhu02.app.n8n.cloud/webhook/chatbot",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ message: message })
      });

      const data = await response.json();

      addMessage(data.output_text || "No reply","bot");

    }catch(error){
      addMessage("Error connecting to server","bot");
      console.error(error);
    }
  }

  function addMessage(text,type){
    const msgDiv=document.createElement("div");
    msgDiv.classList.add("chat-msg",type);

    const bubble=document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent=text;

    msgDiv.appendChild(bubble);
    body.appendChild(msgDiv);
    body.scrollTop=body.scrollHeight;
  }

});
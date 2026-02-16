function initChatWidget(){
  const toggle = document.getElementById('chatToggle');
  const panel = document.getElementById('chatPanel');
  const body = document.getElementById('chatBody');
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSend');

  if(!toggle || !panel || !body || !input || !sendBtn){
    console.error("Chat elements missing in HTML");
    return;
  }

  function openPanel(){
    panel.style.display = 'flex';
    input.focus();
  }

  function closePanel(){
    panel.style.display = 'none';
  }

  toggle.addEventListener('click', ()=>{
    if(panel.style.display === 'flex') closePanel();
    else openPanel();
  });

  sendBtn.addEventListener('click', sendMessage);

  function sendMessage(){
    console.log("Send clicked");
  }
}
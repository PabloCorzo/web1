const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(input.value){
        socket.emit('chat', input.value);
        input.value = '';
    }
});

function showMessage({ user, msg }) {
    const item = document.createElement("li");
    const name = document.createElement("strong");
    name.textContent = user + ":";
    item.append(name, " " + msg);
    messages.appendChild(item);
}

socket.on('history', (history) => {
    messages.innerHTML = '';
    history.forEach(showMessage);
});

socket.on('chatRespuesta', (message) => {
    console.log("Mensaje recibido");
    showMessage(message);
});
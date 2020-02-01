//dom queries
const chatList = document.querySelector('.chat-list');
const newChatRoom = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const updateName = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
//class instances
newChatRoom.addEventListener('submit',e=>{
    e.preventDefault();
    const message = newChatRoom.message.value.trim();
    chatroom.addChat(message)
    .then(()=>newChatRoom.reset())
    .catch(err=>console.log(err));
});

newName.addEventListener('submit',e=>{
    e.preventDefault();
    //update name
    const name = newName.name.value.trim();
    chatroom.updateUsername(name);
    //reset form
    newName.reset();
    //display name update
    updateName.innerHTML = `Your name was updated to <span class="update-name">${name}!</span>`;
    setTimeout(()=>updateName.innerText='',3000);

});
//update the chat room
rooms.addEventListener('click',e=>{
    if(e.toElement.tagName==="BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.id);
        chatroom.getChats(chat=>chatUI.render(chat));
    }
})

//get name from localStorage
const username = localStorage.username? localStorage.username:"anon";
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom(username,"general");

//get chats and render
chatroom.getChats((data)=>{
    chatUI.render(data);
});
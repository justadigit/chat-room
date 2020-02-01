//adding new chat docuemnts
//setting up a real-time linstener to get new chat
//updating the username
//updating the room


//adding new chat documents
class Chatroom{
    constructor(username,room){
        this.username = username;
        this.room = room;
        this.chat = db.collection('chats-room');
        this.unsub;
    }
    async addChat(message){
        //format the chat object
        const date = new Date();
        let  chat= {
            message,
            username :this.username,
            room :this.room,
            created_at:firebase.firestore.Timestamp.fromDate(date)
        }
        const response = await this.chat.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chat
        .where("room",'==',this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type==="added"){
                    callback(change.doc.data());
                }
            });
        });
    }
    updateUsername(username){
        this.username = username;
        localStorage.setItem('username',username);
    }
    updateRoom(room){
        this.room = room;
        console.log("Room is Updated");
        if(this.unsub){
            this.unsub();
        }
    }
}

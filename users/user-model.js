const db=require('../data/dbconfig');


module.exports = {
    find,
    findById,
    findReceivedMessages,
    findSentMessages,
    messageConnection,
};

function find() {
    return db('user');
}

function findById(id) {
    return db('user')
      .where({ id: Number(id) })
      .first();
}
function findSentMessages(id){
    return db('message')
     .join("user", "user.id","message.sender_id")
     .select("user.id","message.receiver_id","user.name","message.message", "message.date")
     .where("message.sender_id",id)
}
  

function findReceivedMessages(id){
    return db('message')
    .join("user", "user.id","message.receiver_id")
    .select("user.id","message.sender_id","user.name","message.message", "message.date")
    .where("message.receiver_id",id)
}


function messageConnection(senderId,receiverId){
    return db('message')
    .join("user", "user.id","message.sender_id")
    .select("message.sender_id","message.receiver_id","user.name","message.message", "message.dateDiggits","message.dateString")
    .where("message.sender_id",senderId)
    .andWhere("message.receiver_id",receiverId)
    .orWhere("message.sender_id", receiverId)
    .andWhere("message.receiver_id",senderId)
    .orderBy("dateDiggits")
}
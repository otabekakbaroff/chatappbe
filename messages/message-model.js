const db=require('../data/dbconfig');

module.exports = {
   findMessage,
   sendMessage
};


function findMessage(id) {
    return db('message')
    .where({ id: Number(id) })
    .first();
}

function sendMessage(msg) {
    return db('message')
      .insert(msg)
      .then(id => id);
}


const db=require('../data/dbconfig');


module.exports = {
    findUser,
    addUser
  };


  function findUser(filter) {
    return db('user').where(filter);
  }
  
  function addUser(user) {
    return db('user')
      .insert(user)
      .then(id => id);
  }
  
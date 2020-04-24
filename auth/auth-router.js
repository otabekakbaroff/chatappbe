const router = require('express').Router();
const User=require('./auth-model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');



function generateToken(user){
    
    const payload={
        username:user.username,
    }

    const secret='is it secret, is it safe?'

    const options = {
        expiresIn:'5h'
    }

    return jwt.sign(payload, secret, options);
}

/////////////////////User////////////////////
router.post('/user/register', (req, res) => {
    const usersInfo = req.body;
    const hash=bcrypt.hashSync(usersInfo.password, 8);
    usersInfo.password=hash;
    User.addUser(usersInfo).then(user=>{
        const token=generateToken(user);
        res.status(201).json({
            user,
            token
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:'Failed to register'})
    })
});

  
  
  
router.post("/user/login", (req, res) => {
    let { username, password } = req.body;
    User.findUser({ username })
      .first()
      .then(user => {
          const token=generateToken(user);
          res.status(200).json({
              user,
              token
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({errorMessage:'Failed to login'});
      });
});


module.exports = router;
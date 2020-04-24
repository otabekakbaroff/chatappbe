const express = require('express');
const router = express.Router();
const User=require("./user-model");





//GET ALL Users
router.get('/', (req, res) => {
    User.find().then(user=>{
        res.status(200).json(user);
    }).catch(err=>{
        console.log(err);
        console.log(process.env.DATABASE_URL)
        res.status(500).json({errorMessage:'Can\'t get Users Because there\'s something wrong with DATABASE'})
    })
});


//GET USER BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id).then(user=>{
        res.status(200).json(user);
    }).catch(err=>{
        res.status(500).json({errorMessage:'Something Went Wrong'})
    })
});

router.get('/messages/:senderId/:receiverId', (req, res) => {
    const { senderId } = req.params;
    const { receiverId } =req.params;
    User.messageConnection(senderId,receiverId).then(user=>{
        let senderOrReceiver='';
        for(let i=0; i<user.length; i++){
            if(JSON.stringify(user[i].sender_id)===senderId){
                senderOrReceiver='sender';
            }else{
                senderOrReceiver='receiver';
            }
            user[i].senderOrReceiver=user.senderOrReceiver=senderOrReceiver;
        }
        res.status(200).json(user);
    }).catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage:'!spo'})
    })
});


module.exports = router;
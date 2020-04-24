const express = require('express');
const router = express.Router();
const Message=require('./message-model');
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Message.findMessage(id).then(msg=>{
        res.status(200).json(msg);
    }).catch(err=>{
        console.log(err);
        console.log(id);
        res.status(500).json({errorMessage:'Failed to find the message!'})
    })
});




router.post('/send', (req, res) => {
    const messageInfo = req.body;
    Message.sendMessage(messageInfo).then(user=>{
        res.status(201).json({
            user
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:'Post Failed'})
    })
});

  
module.exports = router;
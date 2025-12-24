const messageModel = require('../models/message.model');


async function getMessage(req,res){
    const {chatId} = req.params;

    const messages = await messageModel.find({
        chat:chatId
    });

     res.status(200).json({
    message: "messages fetched successfully",
    messages,
  });
}


module.exports = {
  getMessage,
};
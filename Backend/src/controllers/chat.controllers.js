const chatModel = require('../models/chat.model');
const messageModel = require('../models/message.model');

async function createChat(req, res) {
    const { title } = req.body;

    const user = req.user;

    const chat = await chatModel.create({
        user: user._id,
        title: title
    });

    res.status(201).json({
        message: "chat created successfully!",
        chat: {
            id: chat._id,
            title: chat.title,
            user: chat.user,
            lastActivity: chat.lastActivity,
        }
    });
}
async function getChat(req, res) {
    const user = req.user;

    const chats = await chatModel.find({
        user: user._id
    });

    res.status(200).json({
        message: "chat retrieved successfully!",
        chats
    });
}
async function deleteChat(req, res) {
    const chatId = req.params.id;
    // console.log(chatId);

    await messageModel.deleteMany({ chat: chatId });

    const chat = await chatModel.findByIdAndDelete(chatId);
    if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({
        message: "chat deleted successfully!"
    });
}

module.exports = {
    createChat, getChat, deleteChat
}
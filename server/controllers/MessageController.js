const { getPrismaInstance } = require("../utils/PrismaClient");
const {renameSync} = require("fs")
const addMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);
    if (message && from && to) {
      const newMessage = await prisma.Message.create({
        data: {
          message,
          sender: { connect: { id: to } },
          receiver: { connect: { id: from } },
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: { sender: true, receiver: true },
      });
      return res.status(201).send({ message: newMessage });
    }
    return res.status(400).send("message is required");
  } catch (error) {
    next(error);
  }
};

const getMessage = async (req, res, next) => {
    try {
      const prisma = getPrismaInstance();
      const { from, to } = req.params;
      const messages = await prisma.Message.findMany({
        where: {
          OR: [
            {
              senderId: from,
              receiverId: to,
            },
            {
              senderId: to,
              receiverId: from,
            },
          ],
        },
        orderBy: {
          id: "asc",
        },
      });

      const unReadMessages = [];

      messages.forEach((message) => {
        if (message.messageStatus !== "read" && message.senderId === to) {
          message.messageStatus = "read";
          unReadMessages.push(message.id);
        }
      });

      const updateMessages = await prisma.Message.updateMany({
        where: {
          id: { in: unReadMessages },
        },
        data: { messageStatus: "read" },
      });
      return res.status(200).json({ messages, updateMessages });
    } catch (error) {
      next(error);
    }
  };

  const addImageMessage = async( req, res, next) =>{
    try {
      if(req.file){
        const date = Date.now();
        let fileName = "uploads/images/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const prisma = getPrismaInstance();
        const {from, to} = req.query;
        if(from && to){
          const message = await prisma.Message.create({
            data: {
              message: fileName,
              type: "image",
              sender: { connect: { id: to } },
              receiver: { connect: { id: from } },
            },
          });
          return res.status(201).json({message})
        }
        return res.status(400).send("from and to required")
      }
      return res.status(400).send("image is required");
    } catch (error) {
      next(error);
    }
  }
  const addAudioMessage = async( req, res, next) =>{
    try {
      if(req.file){
        const date = Date.now();
        let fileName = "uploads/recordings/" + date + req.file.originalname;
        renameSync(req.file.path, fileName);
        const prisma = getPrismaInstance();
        const {from, to} = req.query;
        if(from && to){
          const message = await prisma.Message.create({
            data: {
              message: fileName,
              type: "audio",
              sender: { connect: { id: to } },
              receiver: { connect: { id: from } },
            },
          });
          return res.status(201).json({message})
        }
        return res.status(400).send("from and to required")
      }
      return res.status(400).send("Audio is required");
    } catch (error) {
      next(error);
    }
  }

  const getInitialContactsWithMessages = async(req, res,next) =>{
    try {
      const userId = req.params.from;
      const prisma = getPrismaInstance();
      const user = await prisma.User.findUnique({
        where: { id: userId },
        include: {
          sentMessages: {
            include: {
              sender: true,
              receiver: true,
            },
            orderBy: {
              createAt: "desc",
            },
          },
          receivedMessages: {
            include: {
              sender: true,
              receiver: true,
            },
            orderBy: {
              createAt: "desc",
            },
          },
        },
      });

      const messages = [...user.sentMessages, ...user.receivedMessages];

      messages.sort((a,b)=> b.createAt.getTime() - a.createAt.getTime());

      const users = new Map();
      const messagesStatusChange = [];

      messages.forEach((msg)=>{
        const isSender = msg.senderId === userId ;
        const calculatedId = isSender ? msg.receiverId : msg.senderId;

        if (msg.messageStatus === "sent") {
          messagesStatusChange.push(msg.id);
        }

        const {
          id,
          type,
          message,
          messageStatus,
          createAt,
          senderId,
          receiverId,
        } = msg;

        if(!users.get(calculatedId)){

          let user = {
            messageId: id,
            type,
            message,
            messageStatus,
            createAt,
            senderId,
            receiverId,
          };
          if(isSender){
            user = { ...user, ...msg.receiver, totalUnreadMessages:0,};
          }else{
            user = { ...user, ...msg.sender, totalUnreadMessages: messageStatus !== "read" ? 1 : 0};
          }
          users.set(calculatedId, {...user})

        }else if( messageStatus !== "read" && !isSender ){
          const user = users.get(calculatedId);
          users.set(calculatedId, {
            ...user, totalUnreadMessages: user.totalUnreadMessages+1,
          });
        }
      });
      if(messagesStatusChange.length){
        await prisma.Message.updateMany({
          where: {
            id: { in: messagesStatusChange },
          },
          data: { messageStatus: "delivered" },
        });
      }

      res.status(200).json({
        users: Array.from(users.values()),
        onlineUsers: Array.from(onlineUsers.keys()),
      })

    } catch (error) {
      next(error)
    }
  }


module.exports = { addMessage, getMessage, addImageMessage, addAudioMessage, getInitialContactsWithMessages};

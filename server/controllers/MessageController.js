const { getPrismaInstance } = require("../utils/PrismaClient");

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
  
module.exports = { addMessage, getMessage };

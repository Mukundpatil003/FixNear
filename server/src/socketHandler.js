const socketHandler = (io) => {

    io.on("connection", (socket) => {

        console.log("✅ Socket Connected:", socket.id);

        // Join Personal Room
        socket.on("join", (userId) => {

            socket.join(userId);

            console.log(`User ${userId} joined room`);

        });

        socket.on("disconnect", () => {

            console.log("❌ Socket Disconnected:", socket.id);

        });

    });

};

module.exports = socketHandler;
const socketHandler = (io) => {

  io.on("connection", (socket) => {

    console.log("✅ Socket Connected:", socket.id);

    // User Join
    socket.on("join", (userId) => {

      socket.join(userId);

      console.log(`User Joined: ${userId}`);

    });

    // ==========================
    // Provider Live Location
    // ==========================
    socket.on("providerLocation", (data) => {

      console.log("📍 Provider Location:", data);

      io.emit("providerLocation", data);

    });

    // Disconnect
    socket.on("disconnect", () => {

      console.log("❌ Socket Disconnected");

    });

  });

};

module.exports = socketHandler;
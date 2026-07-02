const imagekit = require("../config/imagekit");

const uploadFile = async (file) => {
  try {
    const response = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/ServiceConnect",
    });

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = uploadFile;
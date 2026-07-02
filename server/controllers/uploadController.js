const uploadFile = require("../services/uploadService");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const result = await uploadFile(req.file);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      image: result.url,
      fileId: result.fileId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};
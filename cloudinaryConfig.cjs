const { v2: cloudinary } = require("cloudinary");

const cloudStorage = (() => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_STORAGE_NAME,
    api_key: process.env.CLOUD_STORAGE_KEY,
    api_secret: process.env.CLOUD_STORAGE_SECRET,
  });

  const upload = async (file, filename) => {
    return new Promise((resolve, reject) =>
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: filename,
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.secure_url);
            }
          },
        )
        .end(file),
    );
  };

  return { upload };
})();

module.exports = cloudStorage;

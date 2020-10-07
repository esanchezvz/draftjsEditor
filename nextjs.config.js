const { CLOUDINARY_CLOUD, CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_PRESET } = process.env;

module.exports = {
  // Expose env variables to frontend
  /**THIS IS NOT SECURE, JUST FOR DEV PURPOSES**/
  env: {
    CLOUDINARY_CLOUD,
    CLOUDINARY_KEY,
    CLOUDINARY_SECRET,
    CLOUDINARY_PRESET,
  },
};

module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URI: process.env.REDIS_URI || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECERT: process.env.SESSION_SECERT,
};

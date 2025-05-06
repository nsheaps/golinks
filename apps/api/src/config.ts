import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  storage: {
    type: process.env.STORAGE_TYPE || "postgres",
    postgres: {
      url: process.env.DATABASE_URL,
    },
    sqlite: {
      path: process.env.SQLITE_PATH || "./data/golinks.db",
    },
  },
  auth: {
    type: process.env.AUTH_TYPE || "none",
    basic: {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD,
    },
    oauth: {
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      redirectUri: process.env.OAUTH_REDIRECT_URI,
    },
  },
};

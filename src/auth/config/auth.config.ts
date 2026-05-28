import { registerAs } from "@nestjs/config"

export default registerAs('auth', () => ({
  secret: process.env.JWT_TOKEN_SECRET,
  expiresIn: process.env.JWT_TOKEN_EXPIRESIN
}));

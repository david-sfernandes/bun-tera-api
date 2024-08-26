import jwt from "@elysiajs/jwt";

const jwtConfig = jwt({
  name: "teraApiJWT",
  secret: Bun.env.JWT_SECRET || "secret-api-key",
})

export default jwtConfig;
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import prisma from "../lib/prisma";
import jwtConfig from "./jwtConfig";

const AuthController = new Elysia({ name: "authController" })
  .use(jwtConfig)
  .macro(({ onBeforeHandle }) => ({
    role(type: Role) {
      onBeforeHandle({ insert: "before" }, async ({ cookie: { session } }) => {
        teraApiJWT.verify(session.cookie.token);
        const user = await prisma.user.findUnique({
          where: { id: session.cookie.userId },
        });
        if (user?.role === type!) {
          return true;
        }
      });
    },
  }))
  .get("/auth", async ({ teraApiJWT, headers }) => {
    const auth = headers.authorization?.split(" ")[1] || "";
    const [email, password] = Buffer.from(auth, "base64").toString().split(":");

    const user = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      return "Unauthorized";
    }

    const token = await teraApiJWT.sign({
      email: email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      scope: "read:users",
    });

    return token;
  }, {
    role: Role.ADMIN,
    
  })
  .get("/login", async ({ teraApiJWT, set, headers }) => {
    const token = headers.authorization?.split(" ")[1] || "";
    const profile = await teraApiJWT.verify(token);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    return `Hello ${profile.email}`;
  });

export default AuthController;

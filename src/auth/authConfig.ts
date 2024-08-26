import Elysia from "elysia";
import prisma from "../lib/prisma";

const authConfig = new Elysia({ name: "authConfig" }).macro(
  ({ onBeforeHandle }) => {
    return {
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
    };
  }
);

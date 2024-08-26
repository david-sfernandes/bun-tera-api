import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";
import prisma from "./lib/prisma";
import MilvusService from "./milvus/MilvusService";
import AuthController from "./auth/AuthController";

const terabyteKey = Bun.env.TERABYTE_API_KEY || "";

const milvusService = new MilvusService(terabyteKey);

function getUsers() {
  return prisma.user.findMany();
}

function getClients() {
  return milvusService.getClients();
}

const app = new Elysia({ prefix: "/api/v1" })
  .use(AuthController)
  .get("/", () => getUsers())
  .get("/clients", () => getClients())
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

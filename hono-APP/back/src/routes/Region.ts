//负责所有有关地区的路由
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();


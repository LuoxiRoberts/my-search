//home页面中负责data查询的路由

import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { parseXlsxFile } from "../utils/xlsxParser";

const app = new Hono();
const prisma = new PrismaClient();


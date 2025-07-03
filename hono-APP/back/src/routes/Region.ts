//负责省市县的查询路由

import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();

//定义了省份的路由
app.get("/provinces", async (c) => {
    try {
        const provinces = await prisma.province.findMany({
            select : { id: true, name: true },
            orderBy: { id: "asc" }
        });
        return c.json(provinces);
    } catch (error) {
        console.error("获取省份失败:", error);
        return c.json({ error: "获取省份失败" }, 500);
    }
});

//定义了市的路由
app.get("/cities", async(c) => {
    try{
        const provinceId = Number(c.req.query("provinceId"));
        if (!provinceId || isNaN(provinceId)) {
            return c.json({ error: "provinceId 不能为空" }, 400);
            }
        const cities = await prisma.city.findMany({
            where : { provinceId },
            select : { id : true , name : true },
            orderBy : { id : "asc" }
        })
        return c.json(cities);
    }catch (error) {
        console.error("获取城市失败:", error);
        return c.json({ error: "获取城市失败" }, 500);
    }
});

//定义了县区的路由
app.get("/counties" , async (c) => {
    try{
        const cityId = Number(c.req.query("cityId"));
        if (!cityId || isNaN(cityId)) {
            return c.json({ error: "cityId 不能为空" }, 400);
        }
        const counties = await prisma.county.findMany({
            where : { cityId },
            select : { id : true , name : true },
            orderBy : { id : "asc"}
        })
        return c.json(counties);
    }catch (error) {
        console.error("获取县区失败:", error);
        return c.json({ error: "获取县区失败" }, 500);
    }
});

export default app;
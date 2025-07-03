//home页面中负责data查询的路由

import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();

interface QueryConditions{
    projectName?: {contains: string ,mode: "insensitive"};
    provinceId?: number;
    cityId?: number;
    countyId?: number;
}

app.get("/", async (c) => {
    const page = Number(c.req.query("page")) || 1; 
    const pageSize = Number(c.req.query("pageSize")) || 10;
    const searchQuery = c.req.query("searchQuery") || "";
    const provinceId = Number(c.req.query("provinceId"));
    const cityId = Number(c.req.query("cityId"));
    const countyId = Number(c.req.query("countyId"));
    try{
        const query: QueryConditions = {};
        if (searchQuery) { query.projectName = { contains: searchQuery, mode: "insensitive" };}
        if (provinceId && !isNaN(provinceId)) { query.provinceId = provinceId; }
        if (cityId && !isNaN(cityId)) { query.cityId = cityId; }
        if (countyId && !isNaN(countyId)) { query.countyId = countyId; }



        const data = await prisma.data.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { id: "asc" },
            where: Object.keys(query).length ? query : undefined,
            include: {
                province: { select: { name: true } },
                city: { select: { name: true } },
                county: { select: { name: true } },
            },
        });

        const totalItems = await prisma.data.count({ 
            where: Object.keys(query).length ? query : undefined 
        });

        return c.json({ data, totalItems });

    }catch (error) {
        console.error("出错了:", error);
        return c.json({ error: "获取数据失败" }, 500);
        }
});

export default app;

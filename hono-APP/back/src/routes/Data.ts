//home页面中负责data查询的路由

import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { parseXlsxFile } from "../utils/xlsxParser";

const app = new Hono();
const prisma = new PrismaClient();

interface QueryConditions{
    projectName?: {contains: string ,mode: "insensitive"};
    provinceId?: number;
    cityId?: number;
    countyId?: number;
}

app.get("/data", async (c) => {
    const page = Number(c.req.query("page")) ?? 1; 
    const pageSize = Number(c.req.query("pageSize")) ?? 10;
    const search = c.req.query("search") ?? "";
    const provinceId = Number(c.req.query("provinceId"));
    const cityId = Number(c.req.query("cityId"));
    const countyId = Number(c.req.query("countyId"));
    try{
        const query: QueryConditions = {};
        if (search) { query.projectName = { contains: search, mode: "insensitive" };}
        if (provinceId && !isNaN(provinceId)) { query.provinceId = Number(provinceId); }
        if (cityId && !isNaN(cityId)) { query.cityId = Number(cityId); }
        if (countyId && !isNaN(countyId)) { query.countyId = Number(countyId); }

        const data = await prisma.data.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { id: "asc" },
            where: Object.keys(query).length > 0 ? query : undefined,
            include: {
                province: true,
                city: true,
                county: true
            }
        });

        const totalItems = await prisma.data.count({ 
            where: Object.keys(query).length > 0? query : undefined 
        });
    }catch (error) {
        console.error("出错了:", error);
        return c.json({ error: "获取数据失败" }, 500);
    }

});

export default app;

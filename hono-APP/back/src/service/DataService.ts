//从 Excel 文件导入数据到数据库
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { parseXlsxFile } from "../utils/xlsxParser";
import * as XLSX from "xlsx"; // 引入xlsx库

const app = new Hono();
const prisma = new PrismaClient();


const importDataFromExcel = async (filePath: string) => {
    const workbook = await XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // 获取第一个工作表
    const worksheet = workbook.Sheets[sheetName];
    const rows: { [key: string]: string }[] = XLSX.utils.sheet_to_json(worksheet);

    const data = [];
    for(const row of rows){
        const projectName = (row['项目名称'] || row['projectName'] || '').toString().trim(); 
        const provinceName = (row['省'] || row['province'] || '').toString().trim(); 
        const cityName = (row['市'] || row['city'] || '').toString().trim(); 
        const countyName = (row['县'] || row['区'] || row['county'] || row['district'] || '').toString().trim(); 

        let provinceId: number | undefined;
        let cityId: number | undefined;
        let countyId: number | undefined;

        if (provinceName) {
            const province = await prisma.province.findUnique({ where: { name: provinceName } });
            provinceId = province?.id;
        }

        if (cityName) {
            const city = await prisma.city.findUnique({ where: { name: cityName } });
            cityId = city?.id;
        }

        if (countyName) {
            const county = await prisma.county.findUnique({ where: { name: countyName } });
            countyId = county?.id;
        }

        data.push({
            projectName,
            provinceId,
            cityId,
            countyId
        });
    }

    if(data.length === 0){
        throw new Error("找不到有效数据");
    }
    const BASE_SIZE = 1000;
    for(let i = 0; i < data.length; i += BASE_SIZE){
        const batch = data.slice(i, i + BASE_SIZE);
        await prisma.project.createMany({
            data: batch,
            skipDuplicates: true // 跳过重复数据
        });
    }
}
 export default importDataFromExcel;

//定义了导入地区到数据库中的服务
import { PrismaClient } from '@prisma/client';
import { parseXlsxFile } from '../utils/xlsxParser';
import * as XLSX from 'xlsx'; // 引入xlsx库

const prisma = new PrismaClient();

export const importRegionFromExcel = async ( filePath: string ) => {
    const workbook = await XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // 获取第一个工作表
    const worksheet = workbook.Sheets[sheetName];
    const rows: { [key: string]: string }[] = XLSX.utils.sheet_to_json(worksheet);

    let currentProvince: { id : number ,name: string } | null = null;
    let currentCity: { id : number ,name: string, provinceId: number } | null = null;

    for (const row of rows) {
        const code = (row['行政区划代码'] || '').toString().trim();
        const nameKey = Object.keys(row).find(key => key.includes('单位名称')) || '';
        const name = (row[nameKey] || '').toString().trim();
        if (!code || !name) {
            continue; // 跳过无效行
        }
        //省份
        if(/^\d{6}$/.test(code) && code.endsWith('0000')){
            currentProvince = await prisma.province.upsert({
                where: { name },
                update: {},
                create : { name }
            });
            console.log(`已导入省份: ${name}`);
            currentCity = null;
        }
        //市区
        else if (/^\d{6}$/.test(code) && code.endsWith('00') && !code.endsWith('0000')) {
            if(currentProvince){
                currentCity = await prisma.city.upsert({
                    where: { name_provinceId: { name, provinceId: currentProvince?.id } },
                    update: {},
                    create: { name, provinceId: currentProvince?.id }
                });
                console.log(`已导入市区: ${name}`);
            }else{
                console.error(`省份未导入，无法导入市区: ${name}`);
            }
            
        }
        //县区
        else if (/^\d{6}$/.test(code) && !code.endsWith('00')) {
            if(currentCity){
                await prisma.county.upsert({
                    where: { name_cityId: { name, cityId: currentCity.id } },
                    update: {},
                    create: { name, cityId: currentCity?.id }
                });
            console.log(`已导入县区: ${name}`);
            }else{
                console.error(`市区未导入，无法导入县区: ${name}`);
            }
        }
    }
    console.log('所有地区导入完成');
}


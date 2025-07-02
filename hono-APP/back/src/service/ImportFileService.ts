//此文件集中控制所有文件导入的功能，包括从Excel文件导入数据到数据库的逻辑。
// 该文件使用Prisma ORM与数据库交互，并使用xlsx库解析Excel文件
import { PrismaClient } from '@prisma/client';
import { parseXlsxFile } from '../utils/xlsxParser'; 
import { Hono } from 'hono'; 
import importDataFromExcel from './DataService'; // 引入DataService中的导入函数

const app = new Hono();
const prisma = new PrismaClient();


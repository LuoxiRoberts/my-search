//定义了redis缓存服务
import { Redis } from 'ioredis';
import { Prisma, PrismaClient } from "@prisma/client";

const redis = new Redis()
const prisma = new PrismaClient();

const getCachedService = async ( key : string) => {
    const cachedData = await redis.get(key);
   if (cachedData) {
       return JSON.parse(cachedData);
   }
   return null;
};

const setCacheData = async ( key : string , data : undefined , ttl : number) => {
    await redis.set( key , JSON.stringify(data), 'EX', ttl);
};

const findDataWithCache = async ( projectName : string) => {
    const cacheKey = 'project:' + projectName;
    const cachedData = await getCachedService(cacheKey);
    if(cachedData){
        return cachedData;
    }

    const data = await prisma.project.findUnique({
        where: { projectName }
    });
    if(data){
        setCacheData(cacheKey, data, 60);
    }
    return data;
};

export default findDataWithCache;


//定义了上传文件的路由
import { Hono } from 'hono';
import  importDataFromExcel  from '../service/DataService';
import fs from 'fs';


const app = new Hono();

app.post('/', async (c) => {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!file || typeof file === 'string' || file.size === 0) {
        return c.json({else: '请选择上传的文件'} , 400);
    }

    try{
        const filePath = `uploads/${file.name}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        await importDataFromExcel(filePath);

        fs.unlinkSync(filePath);

        return c.json({ success: '上传并导入数据成功' });
    }catch(error){
        console.error('上传并导入数据失败:', error);
        return c.json({ error: '上传并导入数据失败' }, 500);
    }
});


export default app;
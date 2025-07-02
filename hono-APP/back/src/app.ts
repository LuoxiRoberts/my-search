import { Hono } from "hono";
import { serve} from "@hono/node-server";
import dataRoutes from './routes/Data';
import regionRoutes from './routes/Region';
import importFileRoutes from './routes/ImportFile';

const app = new Hono();

app.route('/api/data', dataRoutes);
app.route('/api/region', regionRoutes);
app.route('/api/import-file', importFileRoutes);

serve({
    fetch : app.fetch,
    port : 3001
});

console.log('后端服务运行在： http://localhost:3001');

export default app;
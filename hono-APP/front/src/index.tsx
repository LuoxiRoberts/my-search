// React入口文件渲染APP组件到index.html的root元素中
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 引入应用根组件
import './styles/App.module.css'; // 引入全局样式


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

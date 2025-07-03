// React入口文件渲染APP组件到index.html的root元素中
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.module.css'; 



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

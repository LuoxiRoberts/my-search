//应用根组件，设置路由、全局状态管理
import React from 'react';
import Home from './pages/Home';
import '../styles/App.module.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <Home /> { /* 渲染HOME组件 */} 
        </div>
    );
}
 export default App; 
//应用根组件，设置路由、全局状态管理
import React from 'react';
import Home from './pages/Home';
import styles from './styles/App.module.css'; 

const App: React.FC = () => {
    return (
        <div className={styles.APP}>
            <Home /> { /* 渲染HOME组件 */} 
        </div>
    );
}
 export default App; 
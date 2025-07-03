//这个文件定义了前端页面的搜索框的组件
import React, { useState } from 'react';
import styles from '../styles/App.module.css'; 

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // 定义搜索框的状态
  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索..."
      />
      <button onClick={handleSearch} className={styles['search-button']}>搜索</button>
    </div>
  );
};

export default SearchBar;

import React from "react";
import '../styles/App.module.css'; 

interface PageChangeProps {
    // 定义页码变化组件的属性
  currentPage: number;
  itemsPerPage: number; // 可选属性，表示每页显示的条目数
  totalItems: number;
  onPageChange: (page: number) => void;
}

const PageChange: React.FC<PageChangeProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    //第一页按钮的处理函数
    const handleFirstPage = () => {
        if(currentPage !== 1) {
            onPageChange(1);
        }
  };
    //最后一页按钮的处理函数
    const handleLastPage = () => {
        if(currentPage !== totalPages) {
            onPageChange(totalPages);
        }
    }
    //上一页按钮的处理函数
    const handlePrevPage = () => {
        if(currentPage > 1 && currentPage <= totalPages) {
            onPageChange(currentPage - 1);
        }
    }
    //下一页按钮的处理函数
    const handleNextPage = () => {
        if(currentPage < totalPages && currentPage >= 1) {
            onPageChange(currentPage + 1);
        }
    }
  return (
    <div className="page-change">
        <button onClick={() => handleFirstPage()} disabled={currentPage === 1}> 第一页 </button>
      <button onClick={() => handlePrevPage()} disabled={currentPage === 1}> 上一页 </button>
      <span>第 {currentPage} 页 / {totalPages} 页</span>
      <button onClick={() => handleNextPage()} disabled={currentPage === totalPages}> 下一页 </button>
      <button onClick={() => handleLastPage()} disabled={currentPage === totalPages}> 最后一页 </button>
    </div>
  );
};

export default PageChange;

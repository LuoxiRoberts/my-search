import React from "react";
import '../styles/App.module.css'; 

interface PageChangeProps {
    // 定义页码变化组件的属性
  currentPage: number;
  itemsPerPage: number; 
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
    const handleToPage = () => {
        const inputElement = document.getElementById('page-input') as HTMLInputElement;
        const page = Number(inputElement.value);
        if(page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    }
  return (
    <div className='pageChange'>
        <button onClick={() => handleFirstPage()} disabled={currentPage === 1}> 第一页 </button>
      <button onClick={() => handlePrevPage()} disabled={currentPage === 1}> 上一页 </button>
      <span>第 {currentPage} 页 / {totalPages} 页</span>
      <button onClick={() => handleNextPage()} disabled={currentPage === totalPages}> 下一页 </button>
      <button onClick={() => handleLastPage()} disabled={currentPage === totalPages}> 最后一页 </button>
      <label htmlFor="page-input">跳转到页码:</label>
      <input id="page-input" type="number" min="1" max={totalPages} value={currentPage} onChange={(e) => onPageChange(Number(e.target.value))} />
      <button onClick={() => handleToPage()}>跳转</button>
    </div>
  );
};

export default PageChange;

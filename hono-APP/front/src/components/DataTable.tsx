//定义了一个DataTable组件，用于展示数据表格

import React from 'react';
import { Data } from '../../../AllTypes';
import '../styles/App.module.css'; 

interface DataTableProps {
  data: Data[];
}

// 格式化 Date 对象或字符串为本地日期字符串
export const formatDate = (date: Date | string): string => { 
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString();
}

const DataTable: React.FC<DataTableProps> = ({ data }) => { 
  return (
    <table>
      <thead>
        <tr>
          <th>项目ID</th>
          <th>项目名称</th>
          <th>创建时间</th>
          <th>更新时间</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && <tr><td colSpan={4} className='no-data'>暂无数据</td></tr>}
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.ProjectName}</td>
            <td>{formatDate(item.CreateAt)}</td>
            <td>{formatDate(item.UpdateAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

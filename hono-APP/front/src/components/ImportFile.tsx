//这个文件定义了前端页面的上传文件的组件
import React, { useState } from 'react';
import '../styles/App.module.css';

interface UploadFileProps {
    onUpload: (file: File) => void; // 定义上传文件的回调函数
}


const UploadFile: React.FC<UploadFileProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>(''); // 定义上传状态的消息
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 监听文件上传的事件
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            setMessage('请先选择一个文件');
            return;
        }
        setMessage('');
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setMessage('文件上传成功');
        } catch (error) {
            setMessage('文件上传失败');
        } 
    };
    return (
        <div className='upload-file'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file-upload">选择文件:</label>
                <input id="file-upload" type="file" onChange={handleChange} />
                <button type="submit" onClick={() => {}}>上传</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadFile;

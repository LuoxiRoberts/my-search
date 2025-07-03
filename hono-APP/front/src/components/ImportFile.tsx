//这个文件定义了前端页面的上传文件的组件
import React, { useState } from 'react';
import '../styles/App.module.css';
import axios from 'axios';

interface UploadFileProps {
    onUpload : (file : File) => Promise<void>;
}

const UploadFile: React.FC<UploadFileProps> = (onUpload) => {
    // 定义上传状态的消息和上传文件的状态
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>(''); 

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
            const formData = new FormData();
            formData.append('file', file);
            await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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
                <button type="submit">上传</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadFile;

//此页为前端页面显示的总页

import React , { useState , useEffect }from 'react';
import styles from '../styles/App.module.css'; 
import SearchBar from '../components/SearchBar';
import UploadFile from '../components/ImportFile';
import DataTable from '../components/DataTable';
import PageChange from '../components/PageChange';
import LocationSelector from '../components/LocationSelector';
import axios from 'axios'; 
import { Data } from '../../../AllTypes';

const handleFileUpload = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        // 发送文件到后端
        await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert('文件上传成功');
    } catch (error) {
        console.error('文件上传失败:', error);
        alert('文件上传失败');
    }
}

const Home: React.FC = () => {
    // 定义数据的状态
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState<Data[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [provinceId, setProvinceId] = useState<number | ''>('');
    const [cityId, setCityId] = useState<number | ''>('');
    const [countyId, setCountyId] = useState<number | ''>('');
    
    //统一处理再省市变化时的页面刷新
    useEffect(() => {
        setCurrentPage(1);
    },[provinceId, cityId, countyId]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get('/api/data' , {
                    params: {
                    searchQuery,
                    provinceId: provinceId || undefined,
                    cityId: cityId || undefined,
                    countyId: countyId || undefined,
                    page: currentPage,
                    itemsPerPage
                    },
                });
                setData( response.data.data );
                setTotalItems( response.data.totalItems );
            } catch (error) {
                console.error('获取数据失败:', error);
                setData([]);
                setTotalItems(0);
            }
        };
        loadData();
    }, [searchQuery, currentPage, itemsPerPage, provinceId, cityId, countyId]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }

    return(
    <div className='home'>
        <h1>项目查询系统</h1>
        <div className={styles['filter-container']}>
            <LocationSelector 
                onProvinceChange={(id) => setProvinceId(id)}
                onCityChange={(id) => setCityId(id)}
                onCountyChange={(id) => setCountyId(id)}
            />
            <SearchBar onSearch={handleSearch} />
            <UploadFile onUpload={handleFileUpload} />
            <>
            <DataTable data={data} />
            <PageChange
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
            </>
        </div>
    </div>
        
    )
}

export default Home;
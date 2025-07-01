//此页为前端页面显示的总页

import React , { useState , useEffect }from 'react';
import '../styles/App.module.css';
import SearchBar from '../components/SearchBar';
import UploadFile from '../components/ImportFile';
import DataTable from '../components/DataTable';
import PageChange from '../components/PageChange';
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

    //省市县的状态
    const [provinces, setProvinces] = useState<{ id: number; name: string }[]>([]);
    const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
    const [counties, setCounties] = useState<{ id: number; name: string }[]>([]);
    const [provinceId, setProvinceId] = useState<number | ''>('');
    const [cityId, setCityId] = useState<number | ''>('');
    const [countyId, setCountyId] = useState<number | ''>('');

    //加载省份
    useEffect(() => {
        axios.get('/api/data/provinces').then(response => {
                setProvinces(response.data);
            })
            .catch(error => {
                console.error('获取省数据失败:', error);
                setProvinces([]);
            });
    }, []);
    // 加载市
    useEffect(() => {
        if (provinceId) {
            axios.get(`/api/data/cities/`, { params: { provinceId } }).then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('获取市数据失败:', error);
                setCities([]);
            });
        } else {
            setCities([]);
            setCityId('');
            setCounties([]);
            setCountyId('');
        }
    }, [provinceId]);

    // 加载县
    useEffect(() => {
        if (cityId) {
            axios.get(`/api/data/counties/`, { params: { cityId } }).then(response => {
                setCounties(response.data);
            })
            .catch(error => {
                console.error('获取县数据失败:', error);
                setCounties([]);
            });
        } else {
            setCounties([]);
            setCountyId('');
        }
    }, [cityId]);

    //统一处理再省市变化时的页面刷新
    useEffect(() => {
        setCurrentPage(1);
    },[provinceId, cityId, countyId]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get('/api/data', {
                    params: {
                        searchQuery,
                        provinceId : provinceId || undefined,
                        cityId : cityId || undefined,
                        countyId : countyId || undefined,
                        page: currentPage,
                        itemsPerPage
                    }
                });
                setData(response.data.items);
                setTotalItems(response.data.totalItems);
            } catch (error) {
                console.error('获取数据失败:', error);
                setData([]);
                setTotalItems(0);
            }
        };
        loadData();
    }, [searchQuery, currentPage, itemsPerPage, provinceId, cityId, countyId]);
    return(
    <div className='home-page'>
        <h1>项目查询系统</h1>
        <div className='filter-container'>
            <label htmlFor="province-select" style={{display : 'none'}}>选择省份:</label>
            <select id="province-select" value={provinceId} onChange={(e) => setProvinceId(e.target.value ? Number(e.target.value) : '')} title = "选择省份">
                <option value="">全部省份</option>
                {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                        {province.name}
                    </option>
                ))}
            </select>
            <label htmlFor="city-select" style={{display : 'none'}}>选择市:</label>
            <select id="city-select" value={cityId} onChange={(e) => setCityId(e.target.value ? Number(e.target.value) : '')} title = "选择市">
                <option value="">全部市</option>
                {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>
            <label htmlFor="county-select" style={{display : 'none'}}>选择县:</label>
            <select id="county-select" value={countyId} onChange={(e) => setCountyId(e.target.value ? Number(e.target.value) : '')} title = "选择县">
                <option value="">全部县</option>
                {counties.map((county) => (
                    <option key={county.id} value={county.id}>
                        {county.name}
                    </option>
                ))}
            </select>
            <SearchBar onSearch={setSearchQuery} />
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
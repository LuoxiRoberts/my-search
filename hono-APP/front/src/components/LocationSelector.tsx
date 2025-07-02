import React , { useState , useEffect }from 'react';
import '../styles/App.module.css';
import axios from 'axios';

interface LocationSelectorProps {
    onProvinceChange: (province: number | '') => void;
    onCityChange: (city: number | '') => void;
    onCountyChange: (county: number | '') => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onProvinceChange, onCityChange, onCountyChange }) => {
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

return (
    <div>   
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
    </div>

)

}

export default LocationSelector;
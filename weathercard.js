const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-A671B28B-B2F1-4F4F-93F4-7237D4B721DF`
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.records.location)
        .catch(error => {
            console.error('獲取天氣資料時有誤:', error);
            return [];
        });
}
function render(cityList) {
    const weatherCard = document.querySelector('.wearther-card');
    weatherCard.innerHTML = ''; // 清空先前的卡片
    cityList.forEach(city => {
        const cityName = city.locationName;
        const wx = city.weatherElement.find(item => item.elementName === 'Wx');
        const pop = city.weatherElement.find(item => item.elementName === 'PoP');
        const minT = city.weatherElement.find(item => item.elementName === 'MinT');
        const ci = city.weatherElement.find(item => item.elementName === 'CI');
        const maxT = city.weatherElement.find(item => item.elementName === 'MaxT');

        const cityCard = `
                    <div class="card">
                        <div class="city" data-location="${cityName}">${cityName}</div>
                        <hr>
                        <div class="weather-phenomenon">${wx.time[0].parameter.parameterName}</div>
                        <div class="max-temperature">最高溫：${maxT.time[0].parameter.parameterName}°C</div>
                        <div class="min-temperature">最低溫：${minT.time[0].parameter.parameterName}°C</div>
                        <div class="rain">降雨機率：${pop.time[0].parameter.parameterName}％</div>
                        <div class="comfortable">${ci.time[0].parameter.parameterName}</div>
                    </div>`;

        weatherCard.innerHTML += cityCard;
    });
}
// 初始化
document.addEventListener('DOMContentLoaded', function () {
    fetchData(url)
        .then(function (data) {
            const allCities = data.filter(function (city) {
                // allCity[0].city = ['一大堆縣市...的值e.g.基隆市']
                return allCity[0].city.includes(city.locationName);
            });
            render(allCities);
        })
        .catch(function (error) {
            console.error('錯了哀:', error);
        });
})
// filter()過濾資料
// 將原陣列的資料透過filter篩選，符合資格條件的資料放入新陣列，原陣列值不會被改變
document.querySelector('#all').addEventListener('click', function () {
    fetchData(url)
        .then(function (data) {
            const allCities = data.filter(function (city) {
                // allCity[0].city = ['一大堆縣市...的值e.g.基隆市']
                return allCity[0].city.includes(city.locationName);
            });
            render(allCities);
        })
        .catch(function (error) {
            console.error('錯了哀:', error);
        });
    // document.querySelector('.img').style.display = 'none';
});
document.querySelector('#northern').addEventListener('click', function () {
    fetchData(url)
        .then(function (data) {
            const northernCities = data.filter(function (city) {
                // api[]中的city.locationName存在於allCity[1].city中，就會回傳true並保留，其餘false就會被忽略跳過
                return allCity[1].city.includes(city.locationName);
            });
            render(northernCities); //把新的值傳入render
        })
        .catch(function (error) {
            console.error('錯了哀:', error);
        });
    // document.querySelector('.img').style.display = 'none';
});
document.querySelector('#central').addEventListener('click', function () {
    fetchData(url)
        .then(function (data) {
            const centralCities = data.filter(function (city) {
                return allCity[2].city.includes(city.locationName);
            });
            render(centralCities);
        })
        .catch(function (error) {
            console.error('錯了哀:', error);
        });
    // document.querySelector('.img').style.display = 'none';
});
document.querySelector('#southern').addEventListener('click', function () {
    fetchData(url)
        .then(function (data) {
            const southernCities = data.filter(function (city) {
                return allCity[3].city.includes(city.locationName);
            });
            render(southernCities);
        })
        .catch(function (error) {
            console.error('錯了哀:', error);
        });
    // document.querySelector('.img').style.display = 'none';
});
document.querySelector('#eastern').addEventListener('click', function () {
    fetchData(url)
        .then(function (data) {
            const easternCities = data.filter(function (city) {
                return allCity[4].city.includes(city.locationName);
            });
            render(easternCities);
        })
        .catch(function (error) {
            console.error('錯了哀:', error);
        });
    document.querySelector('.img').style.display = 'none';
});
document.querySelector('#othlying').addEventListener('click', function () {
    fetchData(url)
        .then(function (data) {
            const othlyingCities = data.filter(function (city) {
                return allCity[5].city.includes(city.locationName);
            });
            render(othlyingCities);
        })
        .catch(function (error) {
            console.error('錯了哀:', error);
        });
    // document.querySelector('.img').style.display = 'none';
});
const allCity = [
    {
        area: '全',
        city: ['基隆市', '臺北市', '新北市', '桃園市', '新竹縣', '新竹市', '苗栗縣',
            '臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義縣', '嘉義市',
            '臺南市', '高雄市', '屏東縣',
            '宜蘭縣', '花蓮縣', '臺東縣',
            '澎湖縣', '金門縣', '連江縣'
        ]
    },
    {
        area: '北',
        city: ['基隆市', '臺北市', '新北市', '桃園市', '新竹縣', '新竹市', '苗栗縣']
    },
    {
        area: '中',
        city: ['臺中市', '南投縣', '彰化縣', '雲林縣', '嘉義縣', '嘉義市']
    },
    {
        area: '南',
        city: ['臺南市', '高雄市', '屏東縣']
    },
    {
        area: '東',
        city: ['宜蘭縣', '花蓮縣', '臺東縣']
    },
    {
        area: '離',
        city: ['澎湖縣', '金門縣', '連江縣']
    }
]
// 時鐘
const date = document.querySelector('.date');
const clock = document.querySelector('.clock');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const padMonth = `${month}`.padStart(2, '0');
const day = today.getDate();
//日期
date.textContent = `${year}-${padMonth}-${day}`;
//時間
setInterval(() => {
    const now = new Date();   //要重新抓一個時間，因為上面的date不會一直更新
    const hours = now.getHours();
    const padHours = `${hours}`.padStart(2, '0');
    const minutes = now.getMinutes();
    const padMinutes = `${minutes}`.padStart(2, '0');
    const seconds = now.getSeconds();
    const padSeconds = `${seconds}`.padStart(2, '0');
    clock.textContent = `${padHours}:${padMinutes}:${padSeconds}`;
}, 1000);
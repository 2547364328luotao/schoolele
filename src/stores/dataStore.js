// src/stores/dataStore.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRoomStore } from '@/stores/roomStore'; // 引入已有的roomStore

export const useDataStore = defineStore('dataStore', () => {
  // 引入roomStore以获取roomId
  const roomStore = useRoomStore();

  // 响应式状态变量
  const roomData = ref({}); // 存储Balance API的数据
  const rpt72Json = ref({}); // 存储Rpt72 API的数据

  const balance = ref(null); // 宿舍余额
  const balanceHealth = ref(null); // 余额健康度

  const firstSlice = ref([]); // Rpt72前一部分数据
  const secondSlice = ref([]); // Rpt72后一部分数据
  //存放天气信息
  const weatherData = ref({});

  // 计算当前房间ID
  const roomId = computed(() => roomStore.roomId);

  // 获取今天的日期 yyyy-mm-dd
  const today = new Date();
  const formattedToday = computed(() => {
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });

  // 定义方法：合并数据，每两项合并为一项，并保留小数点后两位
  const mergeData = (data) => {
    const mergedData = [];
    for (let i = 0; i < data.length; i += 2) {
      const sum = data[i] + (data[i + 1] || 0); // 如果数据项数为奇数，最后一项单独处理
      mergedData.push(parseFloat(sum.toFixed(2))); // 保留两位小数
    }
    return mergedData;
  };

  // 定义计算URL的方法
  const getBalanceURL = computed(() => {
    return `http://113.45.174.255:49152/https://schoolelectrapi.20050508.xyz/api/data&${roomId.value}`;
  });

  const getRpt72URL = computed(() => {
    return `http://113.45.174.255:49152/https://schoolelectrapi.20050508.xyz/api/rpt72&${formattedToday.value}&${roomId.value}`;
  });
  //天气API获取
  const getWeatherURL = computed(() => {
    return `https://devapi.qweather.com/v7/weather/now?location=101200101&key=e0158e106d554e0183de43f9cc3bf40f`;
  });

  // 定义异步方法：获取天气数据
  const fetchWeather = async () => {
    try {
      const response = await fetch(getWeatherURL.value); // 发起网络请求获取数据
      const data = await response.json(); // 将响应体解析为JSON格式
      weatherData.value = data; // 将解析后的数据赋值给weatherData
      console.log('获取到的天气数据:', weatherData.value);
    } catch (error) {
      console.error('获取天气数据时出错:', error);
    }
  };

  // 异步方法：获取Balance数据
  const fetchBalance = async () => {
    try {
      const response = await fetch(getBalanceURL.value); // 发起网络请求获取数据
      const data = await response.json(); // 将响应体解析为JSON格式
      roomData.value = data; // 将解析后的数据赋值给roomData
      console.log('获取到的Balance数据:', roomData.value);

      // 获取宿舍余额并处理
      balance.value = parseFloat(roomData.value.总余额.replace('元', ''));
      console.log('宿舍余额:', balance.value);

      // 计算余额健康度
      balanceHealth.value = Math.round((balance.value / 50) * 100);
      console.log('余额健康度:', balanceHealth.value);
    } catch (error) {
      console.error('获取Balance数据时出错:', error);
    }
  };
  //打印roomData
  console.log("roomData:JSON.stringify(roomData.value):", roomData);

  // 异步方法：获取Rpt72数据
  const fetchRpt72 = async () => {
    try {
      const response = await fetch(getRpt72URL.value); // 发起网络请求获取数据
      const data = await response.json(); // 将响应体解析为JSON格式
      rpt72Json.value = data['72小时已用电量']; // 将解析后的数据赋值给rpt72Json
      console.log('获取到的Rpt72数据:', rpt72Json.value);

      // 合并数据
      firstSlice.value = mergeData(rpt72Json.value.slice(22, 46)).map(item => -Math.abs(item));
      secondSlice.value = mergeData(rpt72Json.value.slice(47, 71));

      console.log('第22到46个元素:', firstSlice.value);
      console.log('第47到71个元素:', secondSlice.value);
    } catch (error) {
      console.error('获取Rpt72数据时出错:', error);
    }
  };

  // 初始化时自动调用API获取数据
  const initialize = async () => {
    await fetchBalance();
    await fetchRpt72();
    await fetchWeather();
  };

  // 监视roomId和formattedToday的变化，以便重新获取数据
  watch([roomId, formattedToday], () => {
    initialize();
  }, { immediate: true });

  // 重新刷新数据的方法
  const refreshData = async () => {
    await fetchBalance();
    await fetchRpt72();
    await fetchWeather();
  };

  return {
    roomData,
    rpt72Json,
    balance,
    balanceHealth,
    firstSlice,
    secondSlice,
    weatherData,
    refreshData,
  };
});

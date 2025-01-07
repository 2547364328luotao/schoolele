<!--
 * @Author: 2547364328luotao 2547364328@qq.com
 * @Date: 2025-01-04 02:06:46
 * @LastEditors: 2547364328luotao 2547364328@qq.com
 * @LastEditTime: 2025-01-06 16:19:21
 * @FilePath: \javascript-version\src\views\dashboard\AnalyticsTotalRevenue.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { useDisplay, useTheme } from "vuetify";
import { hexToRgb } from "@core/utils/colorConverter";
import { ref, defineProps, watch, onMounted, computed } from "vue";
import { getCurrentInstance } from "vue";
import { nextTick } from "vue";
import { useRoomStore } from "@/stores/roomStore";
import { useDataStore } from "@/stores/dataStore";

//访问房间id
const roomStore = useRoomStore();
// 获取当前房间 ID
const roomId = computed(() => roomStore.roomId);

//使用Pinia调用API数据
const dataStore = useDataStore();

// 获取 dataStore 中的数据
const balance = computed(() => dataStore.balance);
const balanceHealth = computed(() => dataStore.balanceHealth);
const firstSlice = computed(() => dataStore.firstSlice);
const secondSlice = computed(() => dataStore.secondSlice);

// 获取今天日期yyyy-mm-dd
const today = new Date();
const formattedToday = `${today.getFullYear()}-${String(
  today.getMonth() + 1
).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
console.log("今天日期:", formattedToday);

// 获取前两天的日期 yyyy-mm-dd
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(today.getDate() - 2);
const formattedTwoDaysAgo = `${twoDaysAgo.getFullYear()}-${String(
  twoDaysAgo.getMonth() + 1
).padStart(2, "0")}-${String(twoDaysAgo.getDate()).padStart(2, "0")}`;
console.log("前两天日期:", formattedTwoDaysAgo);

//定义方法：合并数据，每两项合并为一项
// 合并数据并保留小数点后两位
const mergeData = (data) => {
  const mergedData = [];
  for (let i = 0; i < data.length; i += 2) {
    const sum = data[i] + data[i + 1] || data[i]; // 如果数据项数为奇数，最后一项单独处理
    mergedData.push(parseFloat(sum.toFixed(2))); // 保留两位小数
  }
  return mergedData;
};

const arr_copy = JSON.parse(sessionStorage.getItem("arr_public"));
const room_data = ref(null);
// const balance = ref(null);
const dynamicSeries = ref([]);
const balance_i = ref(null);
//余额健康度
const balance_health = ref(null);
//定义余额健康度区间：☠️紧急☠️、😯一般😯、😁良好😁、🥳充裕🥳
const balance_health_range = computed(() => {
  if (balance_health.value >= 90) return "🥳充裕🥳";
  else if (balance_health.value >= 70) return "😁良好😁";
  else if (balance_health.value >= 20) return "😯一般😯";
  else return "☠️紧急☠️";
});

// 定义动态 series

const URL_Balance = computed(
  () =>
    `http://113.45.174.255:49152/https://schoolelectrapi.20050508.xyz/api/data&${roomId.value}`
);
const URL_Rpt72 = computed(
  () =>
    `http://113.45.174.255:49152/https://schoolelectrapi.20050508.xyz/api/rpt72&${formattedToday}&${roomId.value}`
);
//定义小时json变量
const rpt72_json = ref({});
// const firstSlice = ref([]);
// const secondSlice = ref([]);

watch(balance_health, (newVal) => {
  console.log(newVal);
  dynamicSeries.value = [newVal];
});

watch(balance, (newVal) => {
  console.log(newVal);
  balance_i.value = "¥" + newVal;
});
//定义方法：打印roomId
const printRoomId = () => {
  console.log("当前房间IDBBBB:", roomId.value);
};

//调用API
onMounted(async () => {
  try {
    const response = await fetch(URL_Balance.value); // 发起网络请求获取数据
    const data = await response.json(); // 将响应体解析为JSON格式
    room_data.value = data; // 将解析后的数据赋值给响应式变量arr_public
    console.log(room_data.value.基本账户); // 直接从arr_public.value中获取并打印基本账户的值
    //获取宿舍余额
    balance.value = parseFloat(room_data.value.总余额.replace("元", ""));
    //余额健康度
    balance_health.value = (balance.value / 50) * 100;
    //取整
    balance_health.value = Math.round(balance_health.value);
    console.log(balance_health.value);
  } catch (error) {
    console.error("获取数据时出错:", error); // 捕获异常并打印错误信息
  }
});
//调用API
// onMounted(async () => {
//   try {
//     const response = await fetch(URL_Rpt72.value); // 发起网络请求获取数据
//     const data = await response.json(); // 将响应体解析为JSON格式
//     rpt72_json.value = data["72小时已用电量"]; // 将解析后的数据赋值给响应式变量rpt72_json
//     // 在获取数据后，合并每两项
//     firstSlice.value = mergeData(rpt72_json.value.slice(22, 46)).map(
//       (item) => -Math.abs(item)
//     );
//     secondSlice.value = mergeData(rpt72_json.value.slice(47, 71));

//     // 数据获取完成后更新 series
//     series.value = [
//       {
//         name: firstSlice.value.reduce(
//           (accumulator, currentValue) => accumulator + currentValue,
//           0
//         ),
//         data: firstSlice.value,
//       },
//       {
//         name: secondSlice.value.reduce(
//           (accumulator, currentValue) => accumulator + currentValue,
//           0
//         ),
//         data: secondSlice.value,
//       },
//     ];

//     await nextTick();
//     console.log("第22到46个元素:", firstSlice.value);
//     console.log("第47到71个元素:", secondSlice.value);
//   } catch (error) {
//     console.error("获取数据时出错:", error);
//   }
// });

const refreshData = async () => {
  try {
    // ==== API-1: Balance ====
    console.log("重新调用API - Balance");
    const response = await fetch(URL_Balance.value);
    const data = await response.json();
    room_data.value = data;
    console.log("重新获取的数据:", room_data.value);

    // 获取宿舍余额
    balance.value = parseFloat(room_data.value.总余额.replace("元", ""));
    console.log("更新后的余额:", balance.value);

    // 重新计算余额健康度
    balance_health.value = Math.round((balance.value / 50) * 100);
    console.log("更新后的余额健康度:", balance_health.value);

    // ==== API-2: Rpt72 ====
    console.log("重新调用API - Rpt72");
    const response2 = await fetch(URL_Rpt72.value);
    const data2 = await response2.json();
    rpt72_json.value = data2["72小时已用电量"];

    // 修改到负数
    // 在获取数据后，合并每两项
    firstSlice.value = mergeData(rpt72_json.value.slice(22, 46)).map(
      (item) => -Math.abs(item)
    );
    secondSlice.value = mergeData(rpt72_json.value.slice(47, 71));

    // 更新 bar 图的 series
    series.value = [
      {
        name: "昨日用电：" +
      -1 *
        firstSlice.value.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ) .toFixed(2)+
      "度",
        data: firstSlice.value,
      },
      {
        name: "今日用电：" +
      secondSlice.value.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) .toFixed(2)+
      "度",
        data: secondSlice.value,
      },
    ];

    await nextTick();
    console.log("第22到46个元素:", firstSlice.value);
    console.log("第47到71个元素:", secondSlice.value);
  } catch (error) {
    console.error("刷新数据时出错:", error);
  }
};

const vuetifyTheme = useTheme();
const display = useDisplay();

const series = ref([
  {
    name:
      "昨日用电：" +
      -1 *
        firstSlice.value.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ) .toFixed(2)+
      "度",
    data: firstSlice.value,
  },
  {
    name:
      "今日用电：" +
      secondSlice.value.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) .toFixed(2)+
      "度",
    data: secondSlice.value,
  },
]);

watch([firstSlice, secondSlice], () => {
  // 当 firstSlice 和 secondSlice 更新后，更新 series
  series.value = [
    {
      name:
        "昨日用电：" +
        -1 *
          firstSlice.value.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          ) .toFixed(2)+
        "度",
      data: firstSlice.value,
    },
    {
      name:
        "今日用电：" +
        secondSlice.value.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ).toFixed(2) +
        "度",
      data: secondSlice.value,
    },
  ];
});

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;
  const disabledTextColor = `rgba(${hexToRgb(
    String(currentTheme["on-surface"])
  )},${variableTheme["disabled-opacity"]})`;
  const primaryTextColor = `rgba(${hexToRgb(
    String(currentTheme["on-surface"])
  )},${variableTheme["high-emphasis-opacity"]})`;
  const secondaryTextColor = `rgba(${hexToRgb(
    String(currentTheme["on-surface"])
  )},${variableTheme["medium-emphasis-opacity"]})`;
  const borderColor = `rgba(${hexToRgb(
    String(variableTheme["border-color"])
  )},${variableTheme["border-opacity"]})`;

  return {
    bar: {
      chart: {
        stacked: true,
        parentHeightOffset: 6,
        offsetX: -12,
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        width: 6,
        lineCap: "round",
        colors: [currentTheme.surface],
      },
      colors: [
        `rgba(${hexToRgb(String(currentTheme.primary))}, 1)`,
        `rgba(${hexToRgb(String(currentTheme.info))}, 1)`,
      ],
      legend: {
        offsetX: -22,
        offsetY: -1,
        position: "top",
        fontSize: "13px",
        horizontalAlign: "left",
        fontFamily: "Public Sans",
        labels: { colors: currentTheme.secondary },
        itemMargin: {
          vertical: 4,
          horizontal: 10,
        },
        markers: {
          width: 11,
          height: 11,
          radius: 10,
          offsetX: -2,
        },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      grid: {
        strokeDashArray: 6,
        borderColor,
        padding: { bottom: 5 },
      },
      plotOptions: {
        bar: {
          borderRadius: 9,
          columnWidth: "40%",
          borderRadiusApplication: "around",
          borderRadiusWhenStacked: "all",
        },
      },
      xaxis: {
        axisTicks: { show: false },
        crosshairs: { opacity: 0 },
        axisBorder: { show: false },
        categories: [
          "〇",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六",
          "七",
          "八",
          "九",
          "十",
          "十一",
        ],
        labels: {
          style: {
            fontSize: "13px",
            colors: disabledTextColor,
            fontFamily: "Public Sans",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "13px",
            colors: disabledTextColor,
            fontFamily: "Public Sans",
          },
        },
      },
      responsive: [
        {
          breakpoint: 1980,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "60%",
                borderRadius: 8,
              },
            },
          },
        },
        {
          breakpoint: display.thresholds.value.xl,
          options: {
            plotOptions: {
              bar: {
                // 笔记本宽度
                columnWidth: "80%",
                borderRadius: 8,
              },
            },
          },
        },
        {
          breakpoint: display.thresholds.value.lg,
          options: {
            plotOptions: {
              bar: {
                //笔记本屏幕一半
                columnWidth: "60%",
                borderRadius: 0,
              },
            },
          },
        },
        {
          breakpoint: display.thresholds.value.md,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "48%",
                borderRadius: 8,
              },
            },
          },
        },
        {
          breakpoint: display.thresholds.value.sm,
          options: {
            plotOptions: {
              bar: {
                columnWidth: "44%",
                borderRadius: 6,
              },
            },
          },
        },
        {
          breakpoint: 599,
          options: {
            plotOptions: {
              bar: {
                //iPhone14 PRO MAX
                columnWidth: "70%",
                borderRadius: 8,
              },
            },
          },
        },
        {
          breakpoint: 420,
          options: {
            plotOptions: {
              bar: {
                //小米13
                columnWidth: "98%",
                borderRadius: 6,
              },
            },
          },
        },
      ],
    },
    radial: {
      chart: { sparkline: { enabled: true } },
      labels: ["Growth"],
      stroke: { dashArray: 5 },
      colors: [`rgba(${hexToRgb(String(currentTheme.primary))}, 1)`],
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          opacityTo: 0.6,
          opacityFrom: 1,
          shadeIntensity: 0.5,
          stops: [30, 70, 100],
          inverseColors: false,
          gradientToColors: [currentTheme.primary],
        },
      },
      plotOptions: {
        radialBar: {
          endAngle: 150,
          startAngle: -140,
          hollow: { size: "55%" },
          track: { background: "transparent" },
          dataLabels: {
            name: {
              offsetY: 25,
              fontWeight: 500,
              fontSize: "15px",
              color: secondaryTextColor,
              fontFamily: "Public Sans",
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: "24px",
              color: primaryTextColor,
              fontFamily: "Public Sans",
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 900,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 735,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 660,
          options: { chart: { height: 200 } },
        },
        {
          breakpoint: 600,
          options: { chart: { height: 200 } },
        },
      ],
    },
  };
});

const balanceData = [
  {
    icon: "bx-wallet",
    amount: balance_i,
    year: "今天余额",
    color: "primary",
  },
  {
    icon: "bx-leaf",
    amount: balance_health_range,
    year: "余额健康度",
    color: "info",
  },
];

const moreList = [
  {
    title: "Share",
    value: "Share",
  },
  {
    title: "Refresh",
    value: "Refresh",
  },
  {
    title: "Update",
    value: "Update",
  },
];
</script>

<template>
  <VCard>
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="7"
        xl="8"
        :class="$vuetify.display.smAndUp ? 'border-e' : 'border-b'"
      >
        <VCardItem class="pb-0">
          <VCardTitle class="larger-font" @click="printRoomId"
            >时度表总览</VCardTitle
          >

          <!-- 表右上角的折叠菜单 -->
          <template #append>
            <MoreBtn :menu-list="moreList" />
          </template>
        </VCardItem>

        <!-- bar chart -->
        <VCardText class="pb-0">
          <VueApexCharts
            v-if="firstSlice.length && secondSlice.length"
            type="bar"
            :height="335"
            :options="chartOptions.bar"
            :series="series"
          />
          <p v-else>加载中...</p>
        </VCardText>
      </VCol>

      <VCol cols="12" sm="5" xl="4">
        <VCardText class="text-center pt-10">
          <v-btn @click="refreshData">刷新</v-btn>
          <!-- <p>第22到46个元素: {{ firstSlice }}</p>
          <p>第47到71个元素: {{ secondSlice }}</p> -->

          <!-- radial chart -->
          <VueApexCharts
            type="radialBar"
            :height="200"
            :options="chartOptions.radial"
            :series="dynamicSeries"
          />

          <p
            class="font-weight-bold text-medium-emphasis mb-8 mt-1"
            @click="printTipRoom"
          >
            当前房间ID: {{ roomId }}
          </p>

          <div
            class="d-flex align-center justify-center flex-wrap gap-x-6 gap-y-3"
          >
            <div
              v-for="data in balanceData"
              :key="data.year"
              class="d-flex align-center gap-2"
            >
              <VAvatar
                :icon="data.icon"
                :color="data.color"
                size="38"
                rounded
                variant="tonal"
              />

              <div class="text-start">
                <span class="text-sm"> {{ data.year }}</span>
                <h6 class="text-h6">
                  {{ data.amount }}
                </h6>
              </div>
            </div>
          </div>
        </VCardText>
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";

.larger-font {
  font-size: 26px; /* 您可以根据需要调整字体大小 */
}
</style>

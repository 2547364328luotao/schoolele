<script setup>
import { useDisplay, useTheme } from "vuetify";
import { hexToRgb } from "@core/utils/colorConverter";
import { useDataStore } from "@/stores/dataStore";

//使用Pinia调用API数据
const dataStore = useDataStore();
//获取72小时数据
const rpt72Data = computed(() => dataStore.rpt72Json);
//获取昨日电量
const firstSlice = computed(() => dataStore.firstSlice);
//获取今日电量
const secondSlice = computed(() => dataStore.secondSlice);
//计算今日用电量
const todayUsage = computed(() =>
  secondSlice.value.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )
);
//计算昨日用电量
const yesterdayUsage = computed(
  () =>
    -1 *
    firstSlice.value.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )
);
//今日相比昨日用电量的上涨率
const todayUsageRate = computed(() => {
  if (yesterdayUsage.value === 0) {
    return 0; // 或者你可以选择返回一个特定的值，比如 null 或 undefined，取决于你的业务逻辑
  }
  return (todayUsage.value / yesterdayUsage.value - 1) * 100;
});

//定义方法：打印rpt72数据
const printRpt72Data = () => {
  console.log("rpt72Data:", rpt72Data.value);
  console.log("hour72data:", hour72data.value);
  console.log("firstSlice:", firstSlice.value);
  console.log("secondSlice:", secondSlice.value);
  console.log("todayUsage:", todayUsage.value);
  console.log("yesterdayUsage:", yesterdayUsage.value);
  console.log("todayUsageRate:", todayUsageRate.value);
};
//处理数组：合并数据
const mergeData = (data) => {
  const mergedData = [];
  for (let i = 0; i < data.length; i += 8) {
    let sum = 0;
    for (let j = 0; j < 8 && i + j < data.length; j++) {
      sum += data[i + j];
    }
    mergedData.push(parseFloat(sum.toFixed(2))); // 保留两位小数
  }
  return mergedData;
};
// 定义响应式的 hour72data
const hour72data = computed(() => mergeData(rpt72Data.value)); //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

const vuetifyTheme = useTheme();
const display = useDisplay();

const series = computed(() => [
  {
    data: hour72data.value,
  },
]);

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 12,
        blur: 4,
        left: 0,
        enabled: true,
        opacity: 0.12,
        color: currentTheme.warning,
      },
    },
    tooltip: { enabled: false },
    colors: [`rgba(${hexToRgb(String(currentTheme.warning))}, 1)`],
    stroke: {
      width: 4,
      curve: "smooth",
      lineCap: "round",
    },
    grid: {
      show: false,
      padding: {
        top: -21,
        left: -5,
        bottom: -8,
      },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
    responsive: [
      {
        breakpoint: display.thresholds.value.lg,
        options: {
          chart: {
            height: 151,
            width: "100%",
          },
        },
      },
      {
        breakpoint: display.thresholds.value.md,
        options: {
          chart: {
            height: 131,
            width: "100%",
          },
        },
      },
    ],
  };
});
</script>

<template>
  <VCard>
    <VCardText class="d-flex justify-space-between h-100">
      <div class="d-flex flex-column justify-space-between gap-y-4">
        <div>
          <h5 class="text-h5 mb-1"><strong>72时折线图</strong></h5>
          <VChip color="warning" size="small"> Huor 72 </VChip>
        </div>

        <div>
          <div class="d-flex gap-1 align-center text-success" style="margin-left: -7px;">
            <VIcon
              icon="bx-down-arrow-alt"
              size="28"
              v-if="todayUsageRate <= 0"
            />
            <VIcon icon="bx-up-arrow-alt" size="28" color="error" v-else />

            <span class="text-base d-inline-block" style="margin-left: -5px;" v-if="todayUsageRate <= 0"
              >{{ todayUsageRate.toFixed(2) }}%<v-tooltip
                activator="parent"
                location="end"
                >相比昨日</v-tooltip
              ></span
            >
                        <span class="text-base d-inline-block"  style="color: red; margin-left: -5px;" v-else
              >{{ todayUsageRate.toFixed(2) }}%<v-tooltip
                activator="parent"
                location="end"
                >相比昨日</v-tooltip
              ></span
            >
          </div>

          <h4 class="text-h4" @click="printRpt72Data()">
            ¥{{ 0.5 * todayUsage.toFixed(2) }}<v-tooltip
                activator="parent"
                location="end"
                >今日电费</v-tooltip
              >
          </h4>
        </div>
      </div>

      <div class="h-100 d-flex align-center">
        <VueApexCharts
          type="line"
          :height="131"
          width="80%"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </VCardText>
  </VCard>
</template>

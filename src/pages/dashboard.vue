<script setup>
import AnalyticsCongratulations from "@/views/dashboard/AnalyticsCongratulations.vue";
import AnalyticsFinanceTabs from "@/views/dashboard/AnalyticsFinanceTab.vue";
import AnalyticsOrderStatistics from "@/views/dashboard/AnalyticsOrderStatistics.vue";
import AnalyticsProfitReport from "@/views/dashboard/AnalyticsProfitReport.vue";
import AnalyticsTotalRevenue from "@/views/dashboard/AnalyticsTotalRevenue.vue";
import AnalyticsTransactions from "@/views/dashboard/AnalyticsTransactions.vue";

// 👉 Images
import chart from "@images/cards/chart-success.png";
import card from "@images/cards/credit-card-primary.png";
import paypal from "@images/cards/paypal-error.png";
import wallet from "@images/cards/wallet-info.png";
import { useDataStore } from "@/stores/dataStore";
import {onMounted,watch} from "vue";

//获取宿舍电表基本信息
const dataStore = useDataStore();
//数据
const roomData = computed(() => dataStore.roomData);
//获取武汉天气信息
const weatherData = computed(() => dataStore.weatherData);
const temp = ref(null);
//天气text= weatherData.now.text
const text = ref(null);
//监听数据变化weatherData.now.temp  
watch(weatherData, (newValue) => {
  if (newValue.now) {
    temp.value = newValue.now.temp;
  }
});
watch(weatherData, (newValue) => {
  if (newValue.now) {
    text.value = newValue.now.text;
  }
});




//组件渲染之后
</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol cols="12" md="8">
      <AnalyticsCongratulations />
    </VCol>

    <VCol cols="12" sm="4">
      <VRow>
        <!-- 👉 Profit -->
        <VCol cols="12" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: '抄表时间',
              image: chart,
              stats: roomData.抄表时间,
              change: 999,
            }"
          />
        </VCol>

        <!-- 👉 Sales -->
        <VCol cols="12" md="6">
          <CardStatisticsVertical
            v-bind="{
              title: '电表读数',
              image: paypal,
              stats: roomData.电表读数,
              change: 999,
            }"
          />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Total Revenue -->
    <VCol cols="12" md="8" order="2" order-md="1">
      <AnalyticsTotalRevenue />
    </VCol>

    <VCol cols="12" sm="8" md="4" order="1" order-md="2">
      <VRow>
        <!-- 👉 Payments -->
        <VCol cols="12" sm="6">
          <CardStatisticsVertical
            v-bind="{
              title: '照明通道',
              image: wallet,
              stats: '$2,468',
              change: 999,
            }"
          />
        </VCol>

        <!-- 👉 Revenue -->
        <VCol cols="12" sm="6">
          <v-card class="mx-auto" max-width="475" style="height: 190px;">
            <v-card-title class="justify-center">
              <span class="text-h5"
                ><strong>武汉天气</strong
                ><v-icon class="ml-2" color="#00BFFF">bx-wind</v-icon></span
              >
            </v-card-title>
            <v-card-text>
              <v-row style="padding-top: 10px;">
                <v-col cols="20" align="end"  style="font-size: 50px;">{{temp}}
                  <span class="temp-unit">℃{{text}}</span>
                </v-col>
              </v-row>
              <v-row style="margin-top: -25px;">
                <v-col cols="2" v-if="text==='晴'">
                  <v-icon class="text-unit" style="color:  #FFD700;">bx-sun</v-icon>
                </v-col>
                <v-col cols="2" v-else-if="text==='阴'">
                  <v-icon class="text-unit" style="color: #808080;">bx-cloud</v-icon>
                </v-col>
                <v-col cols="2" v-else-if="text==='多云'">
                  <v-icon class="text-unit" style="color: #808080;">google-cloud</v-icon>
                </v-col>
                <v-col cols="2" v-else-if="text==='雨'">
                  <v-icon class="text-unit" style="color: #4682B4;">bx-cloud-light-rain</v-icon>
                </v-col>
                <v-col cols="2" v-else>
                  其他天气还没想到，嘻嘻嘻
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </VCol>
      </VRow>

      <VRow>
        <!-- 👉 Profit Report -->
        <VCol cols="12" sm="12">
          <AnalyticsProfitReport />
        </VCol>
      </VRow>
    </VCol>

    <!-- 👉 Order Statistics -->
    <VCol cols="12" md="4" sm="6" order="3">
      <AnalyticsOrderStatistics />
    </VCol>

    <!-- 👉 Tabs chart -->
    <VCol cols="12" md="4" sm="6" order="3">
      <AnalyticsFinanceTabs />
    </VCol>

    <!-- 👉 Transactions -->
    <VCol cols="12" md="4" sm="6" order="3">
      <AnalyticsTransactions />
    </VCol>
  </VRow>
</template>
<style>
.temp-unit {
  font-size: 20px;
  margin-left: -15px;
}
.text-unit{
  font-size: 130px;
  margin-left: -26px;
}
</style>


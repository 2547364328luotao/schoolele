<script setup>
import chartInfo from "@images/cards/chart-info.png";
import creditCardSuccess from "@images/cards/credit-card-success.png";
import creditCardWarning from "@images/cards/credit-card-warning.png";
import paypalError from "@images/cards/paypal-error.png";
import walletPrimary from "@images/cards/wallet-primary.png";
import walletPrimary2 from "@images/cards/fluent-emoji-high-contrast--1st-place-medal.png";
import walletPrimary3 from "@images/cards/fluent-emoji-high-contrast--2nd-place-medal.png";
import walletPrimary4 from "@images/cards/fluent-emoji-high-contrast--3rd-place-medal.png";
import walletPrimary5 from "@images/cards/mingcute--medal-fill.png";
import walletPrimary6 from "@images/cards/mingcute--medal-fill (1).png";
import walletPrimary7 from "@images/cards/mingcute--medal-fill (2).png";
import { useDataStore } from "@/stores/dataStore";
import { ref, watch, computed } from "vue";

//获取API排名信息
const dataStore = useDataStore();
const rankData = computed(() => dataStore.rankData);

//电费第一名
// const firstElectricity = ref({
//   name: '',
//   ele: 0,
// });
const firstElectricityValue = 0;

// 监听 rankData 的变化
watch(
  () => rankData.value,
  (newRankData) => {
    if (newRankData.length > 0) {
      firstElectricity.value = newRankData[0].today_ele;
      console.log("第一名:", firstElectricity.value);
    }
  }
);
//第一名
const firstElectricity = {
  name: computed(() => {
    return rankData.value.length > 0 ? rankData.value[0].room_id : "";
  }),
  ele: computed(() => {
    const data = rankData.value[0];
    return data ? Number(data.today_ele) : 0;
  }),
};
// 电费第二名
const secondElectricity = {
  name: computed(() => {
    return rankData.value.length > 0 ? rankData.value[1].room_id : "";
  }),
  ele: computed(() => {
    const data = rankData.value[1];
    return data ? Number(data.today_ele) : 0;
  }),
};
// 电费第三名
const thirdElectricity = {
  name: computed(() => {
    return rankData.value.length > 0 ? rankData.value[2].room_id : "";
  }),
  ele: computed(() => {
    const data = rankData.value[2];
    return data ? Number(data.today_ele) : 0;
  }),
};
// 电费第四名
const fourthElectricity = {
  name: computed(() => {
    return rankData.value.length > 0 ? rankData.value[3].room_id : "";
  }),
  ele: computed(() => {
    const data = rankData.value[3];
    return data ? Number(data.today_ele) : 0;
  }),
};
// 电费第五名
const fifthElectricity = {
  name: computed(() => {
    return rankData.value.length > 0 ? rankData.value[4].room_id : "";
  }),
  ele: computed(() => {
    const data = rankData.value[4];
    return data ? Number(data.today_ele) : 0;
  }),
};
// 电费第六名
const sixthElectricity = {
  name: computed(() => {
    return rankData.value.length > 0 ? rankData.value[5].room_id : "";
  }),
  ele: computed(() => {
    const data = rankData.value[5];
    return data ? Number(data.today_ele) : 0;
  }),
};

const transactions = [
  {
    amount: firstElectricity.ele,
    paymentMethod: "NO.1",
    description: firstElectricity.name, // 使用计算属性
    icon: walletPrimary2,
    color: "error",
  },
  {
    paymentMethod: "NO.2",
    amount: secondElectricity.ele,
    description: secondElectricity.name,
    icon: walletPrimary3,
    color: "primary",
  },
  {
    amount: thirdElectricity.ele,
    paymentMethod: "NO.3",
    description: thirdElectricity.name,
    icon: walletPrimary4,
    color: "info",
  },
  {
    paymentMethod: "NO.4",
    amount: fourthElectricity.ele,
    description: fourthElectricity.name,
    icon: walletPrimary5,
    color: "success",
  },
  {
    paymentMethod: "NO.5",
    amount: fifthElectricity.ele,
    description: fifthElectricity.name,
    icon: walletPrimary6,
    color: "primary",
  },
  {
    paymentMethod: "NO.6",
    amount: sixthElectricity.ele,
    description: sixthElectricity.name,
    icon: walletPrimary7,
    color: "warning",
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
  <VCard title="日度排名">
    <template #append>
      <MoreBtn :menu-list="moreList" />
    </template>

    <VCardText>
      <VList class="card-list">
        <VListItem v-for="item in transactions" :key="item.paymentMethod">
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="item.color"
              :image="item.icon"
              size="40"
            />
          </template>

          <VListItemSubtitle>
            {{ item.paymentMethod }}
          </VListItemSubtitle>
          <VListItemTitle>
            {{ item.description }}
          </VListItemTitle>

          <template #append>
            <VListItemAction>
              <span class="me-2">{{ item.amount }}</span>
              <span class="text-disabled">度</span>
            </VListItemAction>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>

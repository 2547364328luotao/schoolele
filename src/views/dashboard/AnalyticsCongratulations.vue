<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useTheme } from "vuetify";
import { useRoomStore } from "@/stores/roomStore";

// 导入图片
import illustrationJohnDark from "@images/cards/illustration-john-dark.png";
import illustrationJohnLight from "@images/cards/illustration-john-light.png";

const BUILDINGS = [
  "北1",
  "北2A",
  "北2B",
  "北3",
  "北4",
  "北5",
  "北6",
  "北7",
  "北8",
  "北9",
  "北10",
  "南1",
  "南2",
  "南3",
  "南4",
  "南5",
];
const FLOORS = ["1", "2", "3", "4", "5", "6", "7"];
const ROOMS = Array.from({ length: 95 }, (_, i) =>
  String(i + 1).padStart(2, "0")
);

const roomStore = useRoomStore();
roomStore.initializeRoomId();

const { global: theme } = useTheme();
const illustrationJohn = computed(() =>
  theme.name.value === "dark" ? illustrationJohnDark : illustrationJohnLight
);

// 本地临时状态，用于存储用户的选择
const tempBuilding = ref(roomStore.building);
const tempFloor = ref(roomStore.floor);
const tempRoom = ref(roomStore.room);

// 控制确认按钮的禁用状态
const isConfirmDisabled = computed(() => {
  return !(tempBuilding.value && tempFloor.value && tempRoom.value);
});

// 响应式当前小时
const currentHour = ref(new Date().getHours());

// 每日一言状态
const say = ref(null);

watch(
  () => roomStore.say,
  (newVal) => {
    say.value = newVal;
  }
);

onMounted(async () => {
  const URL_Yan =
    "https://api.t1qq.com/api/tool/daytry?key=rNntyzciFjj4neqUChLvGKmerI&time=random";
  try {
    const response = await fetch(URL_Yan);
    if (!response.ok) throw new Error(`HTTP 错误！状态码: ${response.status}`);
    const data = await response.json();
    if (data?.data?.note) {
      roomStore.say = data.data.note;
      console.log("每日一言:", roomStore.say);
    } else {
      console.warn("响应中未找到一言数据:", data);
    }
  } catch (error) {
    console.error("获取每日一言时出错:", error);
  }
});

// 确认按钮的点击事件
const confirmSelection = () => {
  roomStore.updateRoom(tempBuilding.value, tempFloor.value, tempRoom.value);
};

//定义方法：打印当前房间号
const printRoomId = () => {
  console.log("当前房间号:", roomStore.roomId);
};
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <!-- 主要内容列 -->
      <VCol cols="12" sm="8" order="2" order-sm="1">
        <VCardItem class="pb-3">
          <VCardTitle class="text-primary">
            <template v-if="currentHour >= 0 && currentHour < 8">
              同学早上好😘，很高兴遇见你！🎉
            </template>
            <template v-else-if="currentHour >= 8 && currentHour < 11">
              同学上午好😘，很高兴遇见你！🎉
            </template>
            <template v-else-if="currentHour >= 11 && currentHour < 13">
              同学中午好😘，很高兴遇见你！🎉
            </template>
            <template v-else-if="currentHour >= 13 && currentHour < 18">
              同学下午好😘，很高兴遇见你！🎉
            </template>
            <template v-else> 同学晚上好😘，很高兴遇见你！🎉 </template>
          </VCardTitle>
        </VCardItem>

        <VCardText @click="printRoomId">
          你现在的房间号为 <strong>{{ roomStore.roomId }}</strong
          >。
          <br />
          一起喝鸡汤🐔：<span class="quote">{{ say }}</span>
          <br />
          <v-container>
            <v-row>
              <!-- 调整后的楼栋号选择框 -->
              <v-col cols="4">
                <v-combobox
                  label="楼栋号"
                  v-model="tempBuilding"
                  :items="BUILDINGS"
                  clearable
                ></v-combobox>
              </v-col>

              <!-- 调整后的楼层号选择框 -->
              <v-col cols="3">
                <v-combobox
                  label="楼层号"
                  v-model="tempFloor"
                  :items="FLOORS"
                  clearable
                ></v-combobox>
              </v-col>

              <!-- 调整后的房间号选择框 -->
              <v-col cols="3">
                <v-combobox
                  label="房间号"
                  v-model="tempRoom"
                  :items="ROOMS"
                  clearable
                ></v-combobox>
              </v-col>

              <!-- 调整后的确认按钮 -->
              <v-col cols="2" class="d-flex align-center">
                <v-btn
                  color="primary"
                  :disabled="isConfirmDisabled"
                  @click="confirmSelection"
                  class="w-100"
                >
                  确认<v-tooltip
                activator="parent"
                location="top"
                >记得点刷新呦😘</v-tooltip
              >
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </VCardText>
      </VCol>

      <!-- 插图列 -->
      <VCol cols="12" sm="4" order="1" order-sm="2" class="text-center">
        <img
          :src="illustrationJohn"
          :height="$vuetify.display.xs ? '150' : '182'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
          class="john-illustration flip-in-rtl"
          alt="John Illustration"
        />
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.125rem;
  inset-inline-end: 3.5rem;
}

.quote {
  color: #696cff;
  font-size: 18px;
}
</style>

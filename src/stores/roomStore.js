import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useRoomStore = defineStore('room', () => {
  const building = ref('');
  const floor = ref('');
  const room = ref('');
  const say = ref(null);

const roomId = computed(() => {
  if (building.value && floor.value && room.value) {
    return `${building.value}-${floor.value}${room.value}`;
  }
  return '南1-548'; // 设置默认值
});


  watch(roomId, (newRoomId) => {
    console.log('房间ID 更新为:', newRoomId);
    localStorage.setItem('ROOM_ID', newRoomId);
  });

  const initializeRoomId = () => {
    const storedRoomId = localStorage.getItem('ROOM_ID');
    if (storedRoomId) {
      const [storedBuilding, storedFloorRoom] = storedRoomId.split('-');
      const storedFloor = storedFloorRoom.slice(0, -2);
      const storedRoom = storedFloorRoom.slice(-2);
      building.value = storedBuilding;
      floor.value = storedFloor;
      room.value = storedRoom;
    }
  };

  const updateRoom = (newBuilding, newFloor, newRoom) => {
    building.value = newBuilding;
    floor.value = newFloor;
    room.value = newRoom;
  };

  return {
    building,
    floor,
    room,
    roomId,
    say,
    initializeRoomId,
    updateRoom,
  };
});
/**Pinia Store (roomStore):

定义了 building、floor 和 room 作为响应式状态。
使用 computed 属性 roomId 来组合房间ID。
添加了 say 状态来存储每日一言。
使用 watch 监听 roomId 的变化，可以在这里执行额外的逻辑，如存储到本地存储。
添加了 initializeRoomId 方法来从本地存储中加载初始的房间ID（可选，根据需求）。
在组件中使用 roomStore:

使用 useRoomStore 导入并初始化 roomStore。
移除了原先使用全局属性 (globals.ROOMID) 的部分，转而使用 roomStore.roomId。
使用 v-model 直接绑定到 roomStore 中的 building、floor 和 room。
在 onMounted 生命周期钩子中，获取每日一言并存储到 roomStore.say。
模板部分的修改:

将 tipRoom 替换为 roomStore.roomId。
将输入控件的 v-model 绑定到 roomStore 的对应属性。 */

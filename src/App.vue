<!--
 * @Author: 2547364328luotao 2547364328@qq.com
 * @Date: 2025-01-01 04:37:54
 * @LastEditors: 2547364328luotao 2547364328@qq.com
 * @LastEditTime: 2025-01-04 16:30:09
 * @FilePath: \javascript-version\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import UpgradeToPro from "@/components/UpgradeToPro.vue";
</script>

<template>
  <VApp>
    <RouterView />
    <UpgradeToPro />
  </VApp>
</template>

<style>
/* 引入字体文件*/
@font-face {
  font-family: "MiSans";
  src: url("./assets/fonts/MiSans VF.ttf");
  font-weight: bold;
  font-style: normal;
}

body {
  font-family: "MiSans", "黑体";
}
</style>

<!--
 * @Author: 2547364328luotao 18727430326@163.com
 * @Date: 2025-01-04 02:06:46
 * @LastEditors: 2547364328luotao 18727430326@163.com
 * @LastEditTime: 2025-01-07 14:14:08
 * @FilePath: \javascript-version\src\layouts\components\Footer.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="h-100 d-flex align-center justify-md-space-between justify-center"
  >
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made With
      <VIcon icon="bx-heart" color="error" size="1.25rem" class="mx-1" />
      By
      <a
        href="https://jw.wic.edu.cn"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
        >LUOTAO2005</a
      >
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a href="https://jw.wic.edu.cn/" target="noopener noreferrer">License</a>
      <a href="https://jw.wic.edu.cn/" target="noopener noreferrer"
        >More Information</a
      >
      <a href="https://jw.wic.edu.cn" target="noopener noreferrer"
        >Documentation</a
      >
      <a href="https://themeselection.com/" target="noopener noreferrer"
        >ThemeSelection</a
      >
      <!-- 备案号 -->
      <a href="https://beian.miit.gov.cn/" target="noopener noreferrer"
        >京ICP备19041239号-1</a
      >
    </span>
  </div>
</template>

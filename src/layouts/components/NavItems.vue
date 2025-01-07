<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <!-- <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      badgeContent: '5',
      badgeClass: 'bg-error',
      icon: 'bx-home-smile',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Analytics',
        to: '/dashboard',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'CRM',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/dashboards/crm',
        target: '_blank',
        badgeContent: 'Pro',
        badgeClass: 'bg-light-primary text-primary',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'ECommerce',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/dashboards/ecommerce',
        target: '_blank',
        badgeContent: 'Pro',
        badgeClass: 'bg-light-primary text-primary',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Academy',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/dashboards/academy',
        target: '_blank',
        badgeContent: 'Pro',
        badgeClass: 'bg-light-primary text-primary',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Logistics',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/dashboards/logistics',
        target: '_blank',
        badgeContent: 'Pro',
        badgeClass: 'bg-light-primary text-primary',
      }"
    />
  </VerticalNavGroup> -->

  <!-- 👉 Front Pages -->
  <!-- <VerticalNavGroup
    :item="{
      title: 'Front Pages',
      icon: 'bx-file',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Landing',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/front-pages/landing-page',
        target: '_blank',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Pricing',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/front-pages/pricing',
        target: '_blank',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Payment',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/front-pages/payment',
        target: '_blank',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Checkout',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/front-pages/checkout',
        target: '_blank',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Help Center',
        href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/front-pages/help-center',
        target: '_blank',
      }"
    />
  </VerticalNavGroup> -->

  <!-- 👉 Apps & Pages -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Apps & Pages',
    }"
  />
  <!-- <VerticalNavLink
    :item="{
      title: 'Email',
      icon: 'bx-envelope',
      href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/email',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  /> -->
  <VerticalNavLink
    :item="{
      title: '聊天室',
      icon: 'bx-chat',
      //href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/chat',
      target: '_blank',
      badgeContent: '正在施工中...',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
    <VerticalNavLink
    :item="{
      title: '留言墙',
      icon: 'bx-chalkboard',
      //href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/chat',
      target: '_blank',
      badgeContent: '正在施工中...',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <!-- <VerticalNavLink
    :item="{
      title: 'Calendar',
      icon: 'bx-calendar',
      href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/calendar',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  /> -->
  <!-- <VerticalNavLink
    :item="{
      title: 'Kanban',
      icon: 'bx-grid',
      href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/kanban',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  /> -->

  <VerticalNavLink
    :item="{
      title: '账户设置',
      icon: 'bx-user',
      //to: '/account-settings',
      target: '_blank',
      badgeContent: '正在施工中...',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />

  <VerticalNavLink
    :item="{
      title: '登录',
      icon: 'bx-log-in',
      //to: '/login',
      target: '_blank',
      badgeContent: '正在施工中...',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: '注册',
      icon: 'bx-user-plus',
      //to: '/register',
      target: '_blank',
      badgeContent: '正在施工中...',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Error',
      icon: 'bx-info-circle',
      to: '/no-existence',
    }"
  />

  <!-- 👉 User Interface -->
  <!-- <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Typography',
      icon: 'bx-text',
      to: '/typography',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Icons',
      icon: 'bx-package',
      to: '/icons',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: 'bx-credit-card',
      to: '/cards',
    }"
  /> -->

  <!-- 👉 Forms & Tables -->
  <!-- <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Layouts',
      icon: 'bx-layout',
      to: '/form-layouts',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Validation',
      icon: 'bx-check-circle',
      href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/forms/form-validation',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Wizard',
      icon: 'bx-align-middle',
      href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/forms/form-wizard-numbered',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: 'bx-table',
      to: '/tables',
    }"
  /> -->

  <!-- 👉 Others -->
  <!-- <VerticalNavSectionTitle
    :item="{
      heading: 'Others',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Access Control',
      icon: 'bx-command',
      href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/access-control',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Documentation',
      icon: 'bx-file',
      href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/documentation/',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Raise Support',
      href: 'https://github.com/2547364328luotao',
      icon: 'bx-phone',
      target: '_blank',
    }"
  /> -->
</template>

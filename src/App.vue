<script setup lang="ts"></script>

<template>
  <div class="app-container content-wrapper">
    <router-view />
  </div>
</template>

<style lang="scss">
  .app-container {
    padding-top: var(--space-6);
    padding-bottom: var(--space-6);
    min-height: 100vh;
  }
</style>

<template>
  <main flex="~" h="full" class="text-center text-gray-700 dark:text-gray-200">
    <TheLeftMenu class="h-full" />

    <el-container h="full" flex justify="center">
      <!-- <el-header>Header</el-header> -->
      <RouterView />
      <!-- <el-footer>
        <BaseFooter />
      </el-footer> -->
    </el-container>
  </main>
</template>

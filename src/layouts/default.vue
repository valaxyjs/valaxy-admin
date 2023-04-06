<template>
  <main flex="~" h="full" class="text-center text-gray-700 dark:text-gray-200">
    <el-aside width="250px" border="r-1px r-gray-200">
      <VASidebar />
    </el-aside>
    <el-container h="full">
      <!-- <el-header>Header</el-header> -->
      <el-main>
        <RouterView />
      </el-main>
      <!-- <el-footer>
        <BaseFooter />
      </el-footer> -->
    </el-container>
  </main>
</template>

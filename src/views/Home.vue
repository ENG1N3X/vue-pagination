<template>
  <section class="container">
    <AppList/>
  </section>
</template>

<script>
import AppList from "@/components/List.vue"

export default {
  name: 'Home',
  components: {
    AppList
  }
}
</script>

<template>
    <div>
        <navbar></navbar>
        <div class="app">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar";    // для того, чтобы добавить в этот шаблон др. компоненты

export default {
  components: {                                 // сюда экспортируем компонент и по-умолчанию, этот компонент будет явл. объектом
    Navbar                                      // в данном случае - это навигационная панель (наш Navbar)
  },
    mounted() {
        window.t=this
        window.r=this.$router
    }
}
</script>

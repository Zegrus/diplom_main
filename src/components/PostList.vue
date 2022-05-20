<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
            <transition-group name="post-list">
                <post-item v-for="post in posts" v-bind:post="post" v-bind:key="post.id" v-on:remove="onRemove"></post-item>
            </transition-group>
    </div>
        <h2 v-else>Список постов пуст</h2>
</template>
                                                                                                                                    // здесь воспользуемся директивой "v-else"
<script>
import PostItem from "@/components/PostItem";                                                                                       // импортируем компоненты "PostItem"

export default {
  components: {PostItem},                                                                                                           // текущий компонент ожидает аргумент
  props: {                                                                                                                          // аргументы, называемые "props'ами"
    posts: {                                                                                                                        // для них есть соов. поле
      type: Array,                                                                                                                  // указываем тип - массив
      required: true                                                                                                                // указываем, чем инициализируются эти посты по-умолчанию и также можем сделать их обязательными
    }
  },
  methods: {
    onRemove(post_id) {
      console.log(post_id);
      this.$emit('remove', post_id)
    }
  }
}
</script>

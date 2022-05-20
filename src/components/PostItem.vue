<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button style="margin-right: 5px;" v-on:click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
            <my-button v-on:click="onRemove">Удалить</my-button>
        </div>
    </div>
</template>

<script>
export default {
  props: {                                                                                          // компонент "props" должен принимать сам пост
    post: {
      type: Object,                                                                                 // тип этого "props'a" - объект
      required: true,                                                                               // этот пропс обязателен
    }
  },
  methods: {
    onRemove() {
      this.$emit('remove', this.post.id)
    }
  }
}
</script>

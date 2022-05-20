<template>
    <form v-on:submit.prevent>
        <h4>Создание поста</h4>
            <my-input v-model="post.title" type="text" placeholder="Название"></my-input>
            <my-input v-model="post.body" type="text" placeholder="Описание"></my-input>
            <my-button class="my-button" v-on:click="createPost">Создать</my-button>
    </form>
</template>

<script>
export default {
  data() {                                  // создаём ф-цию "data"
    return {                                // возвращаем из неё объект
      post: {                               // объявляем модель "post" со следующими полями:
        title: '',                          // "title", изначально пустой
        body: ''                            // "body", также изначально пустая строка
      }
    }
  },
  methods: {                                // добавляем в поле "methods" в наш компонент
    createPost() {                          // добавляем в поле "methods" функцию "createPost" и объявляем её
      this.post.id = Date.now();            // "объект" в "модели", единственное, что нужно сделать - это присвоить нов. id, - его получаем из текущей даты
      this.$emit('create', this.post)       // для того, чтобы сгенерировать событие, на которое родительский компонент сможет подписаться есть спец.функция ($emit). 1-ым параметром она принимает событие, которое мы генерируем, 2-ым и последующими параметром(ами) мы передаём аргументы, кот. будут попадать в соотв. ф-цию, после того, как на неё подпишется род. компонент
      this.post = {                         // в данном случае нов. созд. пост
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
/* form {
  display: flex;
  flex-direction: column;
} */
</style>

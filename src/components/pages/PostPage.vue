<template>
    <div>
        <h1>Страница с постами</h1>
            <my-input v-model="searchQuery" placeholder="Поиск...."></my-input>
                <div class="app__btns">
                    <my-button v-on:click="showDialog">Создать пост</my-button>
                    <my-select v-bind:options="sortOptions" v-model="selectedSort"></my-select>
                </div>
            <my-dialog v-model:show="dialogVisible">
                <post-form v-on:create="createPost"></post-form>
            </my-dialog>
            <post-list v-on:remove="removePost" v-bind:posts="sortedAndSearchedPosts" v-if="!isPostsLoading"></post-list>
        <div v-else>Идет загрузка...</div>
        <div ref="observer" class="observer"></div>
               <!-- <div class="page__wrapper">
                 <div v-for="pageNumber in totalPages" v-bind:key="pageNumber" class="page" v-bind:class="{'current-page': page === pageNumber}" v-on:click="changePage(pageNumber)">{{ pageNumber }}</div>
               </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";       // импортируем компоненты "PostForm"
import PostList from "@/components/PostList";       // импортируем компоненты "PostList"
import MyButton from "@/components/UI/MyButton";    // импортируем компоненты "MyButton"
import axios from 'axios';                          // импортируем "axios"
import MySelect from "@/components/UI/MySelect";    // импортируем компоненты "MySelect"
import MyInput from "@/components/UI/MyInput";      // импортируем компоненты "MyInput"

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostList, PostForm
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,                                              // модель, хранящая № стр. (по умолчанию это с 1-ой стр.).
      limit: 100,                                            // модель, хранящая кол-во постов на стр.
      totalPages: 0,
      sortOptions: [                                        // созд. массив, который по-умолчанию будет содержать
        {value: 'title', name: 'По названию'},              // в себе эл-ты списка, это будут объекты, у котрых будет поле "value", сортировка по названию
        {value: 'body', name: 'По содержимому'},            // сортировка по содержанию
        // {value: 'id', name: 'По уникальному номеру'}     // сортировка по "id"
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post_id) {
      console.log(post_id)
      this.$store.commit('post/removePost', post_id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //     this.page = pageNumber
    //     this.fetchPosts()                         // всё пропадает когда это раскомментируется
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {        // ф-ция, с пом. которой мы делаем запрос на сервер
          params: {                                                                             // это объект
            _page: this.page,                                                                   // как ключи объекта "params" мы указываем сами параметры и указываем знач. этого параметра
            _limit: this.limit                                                                  // указывем лимит
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)             // считаем общее кол-во стр. (общ. кол-во постов / кол-во постов на стр.)
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    // this.fetchPosts();
    this.$store.dispatch('post/fetchPosts');
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {                                                                                                                // вычисляемые свойства
    sortedPosts() {                                                                                                          // реклизуем ф-цию сортировки массива постов
      //return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))       // мы можем сортировать массив постов, поэтому его и сортируем. Через "this" к нему обращаемся, вызывем ф-цию "sort", ф-ция "sort" параметром принимает "callback", с помощью которого мы можем задать условия, по которым будет идти сортировка, этот "callback" принимает 2 арг. "localeCompare" - предназначена для сравнения строк
      return this.$store.getters['post/sortedPosts']
   },
    sortedAndSearchedPosts() {                                                                                                // реализуем ф-цию сортировки и поиска постов
      //return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))               // функция возвращает
      return this.$store.getters['post/sortedAndSearchedPosts']
    }
  },
  watch: {                                                                                                                   // наблюдаемые свойства, это не ф-ция, а объект! - В данном случае наблюдаемый объект
//     page() {
//       this.fetchPosts()
//     }
  }
}
</script>

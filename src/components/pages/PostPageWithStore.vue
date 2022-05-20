<template>
    <div>
        <h1>Страница с постами</h1>
            <my-input v-bind:model-value="searchQuery" v-on:update:model-value="setSearchQuery" placeholder="Поиск...."></my-input>
                <div class="app__btns">
                    <my-button v-on:click="showDialog">Создать пост</my-button>
                    <my-select v-bind:unselectable="true" v-on:update:model-value="setSelectedSort" v-bind:options="sortOptions" v-bind:model-value="selectedSort"></my-select>
                </div>
            <my-dialog v-model:show="dialogVisible">
                <post-form v-on:create="createPost"></post-form>
            </my-dialog>
            <post-list v-on:remove="removePost" v-bind:posts="sortedAndSearchedPosts" v-if="!isPostsLoading"></post-list>
        <div v-else>Идет загрузка...</div>
        <div class="observer"></div>
        <!-- <div class="page__wrapper">
            <div class="page" v-for="pageNumber in totalPages" v-bind:key="pageNumber" v-bind:class="{'current-page': page === pageNumber}" v-on:click="changePage(pageNumber)">{{ pageNumber }}</div>
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    PostList, PostForm
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setPosts: 'post/setPosts',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
    //   this.posts.push(post);
     this.setPosts([
        post,
        ...this.posts
      ])
      this.dialogVisible = false;
    },
    removePost(post_id) {
      console.log(post_id)
      this.$store.commit('post/removePost', post_id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style>

</style>

<template>
    <div>
        <h1>Страница с постами</h1>
            <my-input v-model="searchQuery" placeholder="Поиск...."></my-input>
                <div class="app__btns">
                    <my-button>Создать пост</my-button>
                    <my-select v-model="selectedSort" v-bind:options="sortOptions"></my-select>
                </div>
                <my-dialog v-model:show="dialogVisible">
                    <post-form></post-form>
                </my-dialog>
                    <post-list v-bind:posts="sortedAndSearchedPosts" v-if="!isPostsLoading"></post-list>
            <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {ref} from 'vue';                                                        // импортируем из "Vue" ф-цию "ref"
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

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
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },
  setup(props) {                                                                                // есть некоторая ф-ция "setup", кот. параметром принимает "props"
    const {posts, totalPages, isPostsLoading} = usePosts(100);
    const {sortedPosts, selectedSort} = useSortedPosts(posts);
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    }
  }
}
</script>

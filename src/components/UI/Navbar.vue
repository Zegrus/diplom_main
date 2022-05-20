<template>
    <div class="navbar">
        <div class="enter" title="Перейти на страницу приветствия" v-on:click="$router.push('/')">Приложение "MUSIC POSTS" (кликни на меня для хорошего настроения!)</div>
        <div class="enter" title="Перейти на страницу приветствия" v-on:click="$router.push('/')">
            <img style="margin-left: 5px;" src="img/logo.jpg" alt="Здесь могла быть Ваша реклама!">
        </div>
        <div class="navbar__btns">
            <my-button class="store" v-on:click="$router.push('/store')">Хранилище постов</my-button>
            <my-button v-on:click="$router.push('/posts')">Посты</my-button>
            <my-button class="comp" v-on:click="$router.push('/composition')">Composition</my-button>
            <my-button class="about" v-on:click="$router.push('/about')">О сайте</my-button>
        </div>
    </div>
</template>

<script>
// export default {
//     methods: {
//         test(value) {
//             console.log('call', value)
//         }
//     }
// }
</script>

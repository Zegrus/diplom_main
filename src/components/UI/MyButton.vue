<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'my-button' // перейдём к компоненту "my-button" и зададим для него свойство "name"
}
</script>

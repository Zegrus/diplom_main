<template>
    <input class="input" type="text" v-on:input="updateInput" v-bind:value="modelValue">
</template>

<script>
export default {
    name: 'my-input',
        props: {                                                                               // делаем по аналогии с кнопкой,реализуя двустороннее связывание
            modelValue: [String, Number]                                                       // "props'ом" приним. "modelValue", приним. либо строку, либо число
  },
    methods: {
        updateInput(event) {                                                                  // создаём "method" для обработки события, который параметром он принимает "event"
        this.$emit('update:modelValue', event.target.value)                                   // и внутри этого события мы "эмитим" по особому шаблону новое событие - "update:modelValue" и как 2-ым парм-ром мы передаём знач., которое должно обновиться, его мы достаём из знач. "event.target.value", т.е. из знач. самого "Input'a"
    }
  }
}
</script>

<template>
    <div class="dialog" v-if="show" v-on:click.stop="hideDialog">
        <div v-on:click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";                  // импортируем "миксины" (примеси)

export default {
  name: 'my-dialog',                                            // созд. название для компонента
  mixins: [toggleMixin],                                        // подкл. "миксины" и они перечисляются в массиве
  mounted() {                                                   // выполняем ф-цию монтирования
    console.log('dialog mounted')                               // выводим в консоль
  }
}
</script>

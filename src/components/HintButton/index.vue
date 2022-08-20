<template>
  <a :title="title" style="margin:10px">
    <el-button v-bind="$attrs" v-on="$listeners">{{info}}</el-button>
  </a>
</template>

<script>
export default {
  name:'HintButton',
  props: ['title','info']
}
</script>

<style>

</style>
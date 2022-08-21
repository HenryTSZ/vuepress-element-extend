<template>
  <div class="container">
    <Category3 title="游戏">
      <template scope="atguigu">
        <ul>
          <li v-for="(g, index) in atguigu.games" :key="index">{{ g }}</li>
        </ul>
      </template>
    </Category3>

    <Category3 title="游戏">
      <template scope="{games}">
        <ol>
          <li style="color:red" v-for="(g, index) in games" :key="index">{{ g }}</li>
        </ol>
      </template>
    </Category3>

    <Category3 title="游戏">
      <template slot-scope="{ games }">
        <h4 v-for="(g, index) in games" :key="index">{{ g }}</h4>
      </template>
    </Category3>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.container,
.foot {
  display: flex;
  justify-content: space-around;
}
h4 {
  text-align: center;
}
</style>

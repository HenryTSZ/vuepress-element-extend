<template>
  <div>
    <!-- 绑定 class 样式 -- 字符串写法，适用于：样式的类名不确定，需要动态指定 -->
    <div class="demo-basic" :class="mood" @click="changeMood">{{ name }}</div>
    <br /><br />

    <!-- 绑定 class 样式 -- 数组写法，适用于：要绑定的样式个数不确定、名字也不确定 -->
    <div class="demo-basic" :class="classArr">{{ name }}</div>
    <br /><br />

    <!-- 绑定 class 样式 -- 对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
    <div class="demo-basic" :class="classObj">{{ name }}</div>
    <br /><br />

    <!-- 绑定 style 样式 -- 对象写法 -->
    <div class="demo-basic" :style="styleObj">{{ name }}</div>
    <br /><br />

    <!-- 绑定 style 样式 -- 数组写法 -->
    <div class="demo-basic" :style="styleArr">{{ name }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '尚硅谷',
      mood: 'demo-normal',
      classArr: ['atguigu1', 'atguigu2', 'atguigu3'],
      classObj: {
        atguigu1: false,
        atguigu2: false
      },
      styleObj: {
        fontSize: '40px',
        color: 'red'
      },
      styleObj2: {
        backgroundColor: 'orange'
      },
      styleArr: [
        {
          fontSize: '40px',
          color: 'blue'
        },
        {
          backgroundColor: 'gray'
        }
      ]
    }
  },
  methods: {
    changeMood() {
      const arr = ['demo-happy', 'demo-sad', 'demo-normal']
      const index = Math.floor(Math.random() * 3)
      this.mood = arr[index]
    }
  }
}
</script>

<style>
.demo-basic {
  width: 400px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid black;
}

.demo-happy {
  border: 4px solid red;
  background-color: rgba(255, 255, 0, 0.644);
  background: linear-gradient(30deg, yellow, pink, orange, yellow);
}

.demo-sad {
  border: 4px dashed rgb(2, 197, 2);
  background-color: gray;
}

.demo-normal {
  background-color: skyblue;
}

.atguigu1 {
  background-color: yellowgreen;
}

.atguigu2 {
  font-size: 30px;
  text-shadow: 2px 2px 10px red;
}

.atguigu3 {
  border-radius: 20px;
}
</style>

<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="keyWord" />&nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      keyWord: ''
    }
  },
  methods: {
    searchUsers() {
      //请求前更新 List 的数据
      this.pubsub.publish('updateListData', {
        isLoading: true,
        errMsg: '',
        users: [],
        isFirst: false
      })
      fetch(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        res => {
          if (res.ok) {
            res.json().then(data => {
              console.log(data)
              console.log('请求成功了')
              //请求成功后更新 List 的数据
              this.pubsub.publish('updateListData', {
                isLoading: false,
                errMsg: '',
                users: data.items
              })
            })
          } else {
            console.log("Looks like the response wasn't perfect, got status", res.status)
            this.pubsub.publish('updateListData', {
              isLoading: false,
              errMsg: error.message,
              users: []
            })
          }
        },
        error => {
          //请求后更新 List 的数据
          this.pubsub.publish('updateListData', {
            isLoading: false,
            errMsg: error.message,
            users: []
          })
        }
      )
    }
  }
}
</script>

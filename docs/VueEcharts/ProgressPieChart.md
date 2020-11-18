# ProgressPieChart

::: demo 通过 `options` 传入基础配置即可

```html
<progress-pie-chart
  class="chart"
  v-for="item in pies"
  :key="item.id"
  :options="item.pie"
></progress-pie-chart>

<script>
  export default {
    data() {
      return {
        pies: [
          {
            id: 1,
            pie: {
              text: '45%\t\n完成率',
              titleTop: '37%',
              textColor: '#2e8a00',
              textSize: 30,
              data: 45,
              status: '正常',
              hideName: true
            }
          }
        ]
      }
    }
  }
</script>
```

:::

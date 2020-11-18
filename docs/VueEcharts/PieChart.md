# PieChart

:::demo 通过 `options` 传入基础配置即可

```html
<pie-chart class="chart" v-for="item in pies" :key="item.id" :options="item.pie"></pie-chart>

<script>
  export default {
    data() {
      return {
        pies: [
          {
            id: 1,
            pie: {
              text: '基础 - 圆环',
              seriesData: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ]
            }
          },
          {
            id: 2,
            pie: {
              inradius: [0, '60%'],
              showLegend: true,
              legendTop: 'bottom',
              legend: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
              text: '基础 - 圆饼',
              seriesData: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ]
            }
          },
          {
            id: 3,
            pie: {
              inradius: [0, '30%'],
              outradius: ['55%', '75%'],
              text: '外环内饼',
              seriesData: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ]
            }
          },
          {
            id: 4,
            pie: {
              inradius: [20, 110],
              roseType: 'radius',
              text: '南丁格尔图',
              seriesData: [
                { value: 10, name: 'rose1' },
                { value: 5, name: 'rose2' },
                { value: 15, name: 'rose3' },
                { value: 25, name: 'rose4' },
                { value: 20, name: 'rose5' },
                { value: 35, name: 'rose6' },
                { value: 30, name: 'rose7' },
                { value: 40, name: 'rose8' }
              ]
            }
          }
        ]
      }
    }
  }
</script>
```

:::

# BarChart

:::demo 通过 `options` 传入基础配置即可

```html
<bar-chart class="chart" v-for="item in bars" :key="item.id" :options="item.bar"></bar-chart>

<script>
  export default {
    data() {
      return {
        bars: [
          {
            id: 1,
            bar: {
              text: '基础',
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          },
          {
            id: 2,
            bar: {
              isGradient: true,
              color: ['#d075eb', '#bc15fa'],
              text: '渐变',
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
              minRange(value) {
                return value.min - 100
              }
            }
          },
          {
            id: 3,
            bar: {
              isGradient: true,
              reverse: true,
              text: '反转',
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          },
          {
            id: 4,
            bar: {
              isGradient: true,
              color: ['#49fed4', '#04c792'],
              text: '缩放',
              xAxis: [
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
                'Sun'
              ],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
              minRange(value) {
                return value.min - 100
              }
            }
          },
          {
            id: 5,
            bar: {
              text: '多例',
              legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [
                [120, 132, 101, 134, 90, 230, 210],
                [220, 182, 191, 234, 290, 330, 310],
                [150, 232, 201, 154, 190, 330, 410],
                [320, 332, 301, 334, 390, 330, 320],
                [820, 932, 901, 934, 1290, 1330, 1320]
              ],
              minRange(value) {
                return value.min - 100
              }
            }
          },
          {
            id: 6,
            bar: {
              isStack: true,
              text: '堆叠',
              legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [
                [120, 132, 101, 134, 90, 230, 210],
                [220, 182, 191, 234, 290, 330, 310],
                [150, 232, 201, 154, 190, 330, 410],
                [320, 332, 301, 334, 390, 330, 320],
                [820, 932, 901, 934, 1290, 1330, 1320]
              ],
              minRange(value) {
                return value.min - 100
              }
            }
          }
        ]
      }
    }
  }
</script>
```

:::

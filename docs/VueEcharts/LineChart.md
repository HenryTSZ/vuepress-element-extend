# LineChart

:::demo 通过 `options` 传入基础配置即可

```html
<line-chart class="e-chart" v-for="item in lines" :key="item.id" :options="item.line"></line-chart>

<script>
  export default {
    data() {
      return {
        lines: [
          {
            id: 1,
            line: {
              hideMark: true,
              text: '基础',
              color: ['#ffff00'],
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
              minRange(value) {
                return value.min - 100
              }
            }
          },
          {
            id: 2,
            line: {
              hideMark: true,
              showLabel: true,
              symbolSize: 30,
              color: ['#007fff'],
              text: '文字在圆圈里',
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
              minRange(value) {
                return value.min - 100
              }
            }
          },
          {
            id: 3,
            line: {
              text: '气球',
              color: ['#fe90bf'],
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
              minRange(value) {
                return value.min - 100
              }
            }
          },
          {
            id: 4,
            line: {
              hideMark: true,
              areaOpacity: 1,
              text: '颜色区域渐变',
              color: ['#4cc3ff', '#00aaff'],
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
              minRange(value) {
                return value.min - 100
              }
            }
          },
          {
            id: 5,
            line: {
              text: '隐藏坐标线',
              xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              yAxis: [820, 932, 901, 934, 1290, 1330, 1320],
              minRange: Math.min.apply(null, [820, 932, 901, 934, 1290, 1330, 1320]) - 5,
              maxRange: Math.max.apply(null, [820, 932, 901, 934, 1290, 1330, 1320]) + 5,
              yAxisSplitNumber: 3,
              color: ['#11feef', 'transparent'],
              hideTooltip: true,
              hideToolBox: true,
              gridTop: '20%',
              xAxisMaxLength: 15,
              hideAxisLine: true,
              xAxisTickLength: 0,
              yAxisTickLength: 0,
              yAxisSplitLineColor: 'rgba(40, 183, 251, .4)',
              hideyAxisSplitLine: true,
              showLabel: true,
              labelOffset: [0, 0],
              hideMark: true,
              areaOpacity: 1
            }
          },
          {
            id: 6,
            line: {
              text: '缩放',
              color: ['#ff3890'],
              symbolSize: 5,
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
            id: 7,
            line: {
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
          }
        ]
      }
    }
  }
</script>
```

:::

<template>
  <div class="echarts-container">
    <chart
      ref="bar-line"
      :options="polar"
      auto-resize
      v-if="options.xAxis && options.xAxis.length"
      @click="handleBarClick"
    ></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'BarLineChart',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      polar: {},
      title: '',
      textColor: '#333',
      baseColor: [
        '#45a1f8',
        '#e7aa27',
        '#79cd36',
        '#0fb3f2',
        '#bd20d4',
        '#2073d9',
        '#73a373',
        '#73b9bc',
        '#7289ab',
        '#91ca8c',
        '#f49f42'
      ]
    }
  },
  watch: {
    options: {
      handler: 'renderChart',
      deep: true
    }
  },
  methods: {
    renderChart() {
      let that = this
      this.title = this.options.text || this.options.toolboxName || ''
      let isZoom = this.options.xAxis && this.options.xAxis.length > 10
      this.polar = {
        color: this.options.color || this.baseColor,
        // 标题
        title: {
          text: this.options.text || '',
          textStyle: {
            color: this.textColor
          },
          subtext:
            this.options.subtext ||
            (isZoom ? '当前数据较多，请滚动鼠标或缩放屏幕查看完整数据' : ''),
          subtextStyle: {
            color: this.options.subtextColor || '#f49800',
            fontSize: this.options.subtextFontSize || 12
          },
          left: this.options.titleLeft || 'center'
        },
        // 图例
        legend: {
          type: 'scroll', // 只有容器放不下图例, scroll 才会生效
          show: this.options.showLegend || (this.options.legend && this.options.legend.length > 1),
          data: this.options.legend || [this.options.text],
          right: !this.options.hideTooltip ? 60 : 20,
          top: this.options.legendTop || 25,
          textStyle: {
            color: this.options.legendColor || this.textColor
          }
        },
        // 提示框
        tooltip: {
          show: !this.options.hideTooltip,
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: this.options.tooltipType || 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 工具栏
        toolbox: {
          show: !this.options.hideToolBox,
          feature: {
            saveAsImage: {
              show: !this.options.hideImage,
              name: this.options.toolboxName || this.options.text,
              backgroundColor: 'rgba(0, 35, 55, 0.4)'
            }
          },
          right: this.options.toolboxRight || 25,
          top: this.options.toolboxTop || 25,
          iconStyle: {
            normal: {
              borderColor: this.textColor
            }
          }
        },
        // 直角坐标系内绘图网格
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            show: !this.options.hidexAxis,
            data: this.options.xAxis,
            // 坐标轴轴线
            axisLine: {
              lineStyle: {
                color: this.textColor
              }
            },
            // 坐标轴刻度
            axisTick: {
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
              // 坐标轴刻度标签的显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。
              interval: 0,
              formatter(value) {
                let ret = '' // 拼接加\n返回的类目项
                let maxLength = 8 // 每项显示文字个数
                let valLength = value.length // X轴类目项的文字个数
                let rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
                if (rowN > 1) {
                  // 如果类目项的文字大于8,
                  for (let i = 0; i < rowN; i++) {
                    let temp = '' // 每次截取的字符串
                    let start = i * maxLength // 开始截取的位置
                    let end = start + maxLength // 结束截取的位置
                    // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + '\n'
                    ret += temp // 凭借最终的字符串
                  }
                  return ret
                } else {
                  return value
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            show: !this.options.hideyAxis,
            axisLine: {
              lineStyle: {
                color: this.textColor
              }
            }
          }
        ]
      }
      // 多例
      if (this.options.legend && this.options.legend.length > 1) {
        this.polar.series = []
        this.options.legend.map((item, index) => {
          if (item === '基建概(预)算总投资额') {
            this.polar.series.push({
              name: item,
              type: 'line',
              // barMaxWidth: 25,
              symbolSize: 10,
              data: this.options.yAxis[index]
            })
          } else {
            this.polar.series.push({
              name: item,
              type: 'bar',
              barMaxWidth: 25,
              data: this.options.yAxis[index]
            })
          }
        })
        // 单例
      } else {
        this.polar.series = [
          {
            name: this.options.legend ? this.options.legend[0] : this.options.text,
            type: 'bar',
            barMaxWidth: 25,
            data: this.options.yAxis,
            itemStyle: {
              // 渐变
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: this.options.color ? this.options.color[0] : '#2af598'
                  },
                  {
                    offset: 1,
                    color: this.options.color ? this.options.color[1] : '#009efd'
                  }
                ]),
                barBorderRadius: 4
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: this.options.color ? this.options.color[0] : '#2af598'
                  },
                  {
                    offset: 1,
                    color: this.options.color ? this.options.color[1] : '#009efd'
                  }
                ]),
                barBorderRadius: 4
              }
            }
          }
        ]
      }
      // 开启反转
      if (this.options.reverse) {
        this.polar.xAxis = [
          {
            type: 'value',
            show: !this.options.hideyAxis,
            axisLine: {
              lineStyle: {
                color: this.textColor
              }
            }
          }
        ]
        this.polar.yAxis = [
          {
            type: 'category',
            show: !this.options.hidexAxis,
            data: this.options.xAxis,
            axisLine: {
              lineStyle: {
                color: this.textColor
              }
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ]
        this.polar.series = [
          {
            name: this.options.legend ? this.options.legend[0] : this.options.text,
            type: 'bar',
            barMaxWidth: 25,
            data: this.options.yAxis,
            itemStyle: {
              normal: {
                color(params) {
                  let colorList = [
                    '#45A1F8',
                    '#E7AA27',
                    '#79CD36',
                    '#E87C25',
                    '#27727B',
                    '#FE8463',
                    '#9BCA63',
                    '#FAD860',
                    '#F3A43B',
                    '#60C0DD',
                    '#D7504B',
                    '#C6E579',
                    '#F4E001',
                    '#F0805A',
                    '#26C0C0'
                  ]
                  return that.options.colorList
                    ? that.options.colorList[params.dataIndex]
                    : colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      // 开启缩放
      if (isZoom) {
        this.polar.dataZoom = [
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            start: 1,
            end: 35
          }
        ]
      }
    },
    handleBarClick(event) {
      this.$emit('item-click', event, this.options)
    }
  },
  mounted() {
    this.renderChart()
  }
}
</script>

<style></style>

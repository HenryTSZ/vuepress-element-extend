<template>
  <div class="echarts-container">
    <chart
      ref="bar"
      :options="polar"
      auto-resize
      v-if="options.name && options.name.length"
      @click="handleBarClick"
    ></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
export default {
  name: 'ProgressBarChart',
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
        '#2e8a00',
        '#007fff',
        '#fe90bf',
        '#11feef',
        '#ff3890',
        '#ff644b',
        '#29c342',
        '#ff9600',
        '#a34be0',
        '#11b0ff'
      ],
      baseColors: [
        ['#4cc3ff', '#00aaff'],
        ['#d075eb', '#bc15fa'],
        ['#f8cf5c', '#fdba00'],
        ['#80ff94', '#1bb934'],
        ['#b8acfe', '#755ffc'],
        ['#ff9897', '#f650a0'],
        ['#ffa62e', '#ea5c0f'],
        ['#49fed4', '#04c792'],
        ['#7789f9', '#2a4ff3'],
        ['#fc557c', '#fe2457']
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
      const { name } = this.options
      if (!name || !name.length) {
        return
      }
      const {
        text = '',
        isZoom = name && name.length > 10,
        isGradient,
        color = isGradient ? this.baseColors : this.baseColor,
        textColor = this.textColor,
        textFontSize = 18,
        subtext,
        subtextColor = this.textColor,
        subtextFontSize = 12,
        titleTop = 'auto',
        titleLeft = 'center',
        backgroundColor = 'transparent',
        legend = [text],
        showLegend = legend && legend.length > 1,
        hideTooltip,
        legendTop = 25,
        legendColor = this.textColor,
        legendFontSize = 12,
        tooltipType = 'shadow',
        hideToolBox,
        toolboxName = text,
        hideImage,
        toolboxRight = 25,
        toolboxTop = 25,
        gridLeft = '3%',
        gridRight = '3%',
        gridBottom = '3%',
        gridTop = '15%',
        hideyAxis,
        yAxisLabel,
        hideyAxisLabel,
        hideyAxisLine = false,
        yAxisMaxLength = 8,
        yAxisColor = this.textColor,
        hideyAxisTick = false,
        yAxisFontSize = 12,
        inside,
        insideWidth = 25,
        insideRadius = 25,
        insidePosition = 'inside',
        insideFormat = '{c}',
        outside,
        outsideWidth = 25,
        outsideRadius = 25,
        outsideBarBack = 'rgba(102, 102, 102, 0.5)'
      } = this.options
      this.title = text || toolboxName
      this.polar = {
        color: color,
        // 标题
        title: {
          text: text,
          textStyle: {
            color: textColor,
            fontSize: textFontSize
          },
          subtext: subtext || (isZoom ? '当前数据较多，请滚动鼠标或缩放屏幕查看完整数据' : ''),
          subtextStyle: {
            color: subtextColor,
            fontSize: subtextFontSize
          },
          top: titleTop,
          left: titleLeft,
          backgroundColor: backgroundColor
        },
        // 图例
        legend: {
          type: 'scroll', // 只有容器放不下图例, scroll 才会生效
          show: showLegend,
          data: legend,
          right: !hideTooltip ? 60 : 0,
          top: legendTop,
          textStyle: {
            color: legendColor,
            fontSize: legendFontSize
          }
        },
        // 提示框
        tooltip: {
          show: !hideTooltip,
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: tooltipType // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // 工具栏
        toolbox: {
          show: !hideToolBox,
          feature: {
            saveAsImage: {
              show: !hideImage,
              name: toolboxName,
              backgroundColor: 'rgba(0, 35, 55, 0.4)'
            }
          },
          right: toolboxRight,
          top: toolboxTop,
          iconStyle: {
            normal: {
              borderColor: this.textColor
            }
          }
        },
        // 直角坐标系内绘图网格
        grid: {
          left: gridLeft,
          right: gridRight,
          bottom: gridBottom,
          top: gridTop,
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: !hideyAxis,
            inverse: true,
            data: name,
            // 坐标轴轴线
            axisLine: {
              show: !hideyAxisLine,
              lineStyle: {
                color: yAxisColor
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: !hideyAxisTick,
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
              fontSize: yAxisFontSize,
              color: yAxisColor,
              // 坐标轴刻度标签的显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。
              interval: 0,
              formatter(value) {
                let ret = '' // 拼接加\n返回的类目项
                let maxLength = yAxisMaxLength // 每项显示文字个数
                let valLength = value.length // X轴类目项的文字个数
                let rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
                if (rowN > 1) {
                  // 如果类目项的文字大于8,
                  for (let i = 0; i < rowN; i++) {
                    let temp = '' // 每次截取的字符串
                    let start = i * maxLength // 开始截取的位置
                    let end = start + maxLength // 结束截取的位置
                    // 这里加一个是否是最后一行的判断
                    temp = value.substring(start, end) + (i === rowN - 1 ? '' : '\n')
                    ret += temp // 拼接最终的字符串
                  }
                  return ret
                } else {
                  return value
                }
              }
            }
          },
          {
            show: !hideyAxisLabel,
            inverse: true,
            data: yAxisLabel,
            // 坐标轴轴线
            axisLine: {
              show: !hideyAxisLine,
              lineStyle: {
                color: yAxisColor
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: !hideyAxisTick,
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
              fontSize: yAxisFontSize,
              color: yAxisColor
            }
          }
        ],
        series: [
          {
            name: '内条',
            type: 'bar',
            barGap: '-100%',
            data: inside,
            barWidth: insideWidth,
            itemStyle: {
              normal: {
                barBorderRadius: insideRadius,
                // 添加一个是否渐变
                color(params) {
                  if (isGradient) {
                    let num = color.length
                    return {
                      colorStops: [
                        {
                          offset: 0,
                          color: color[params.dataIndex % num][0] // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: color[params.dataIndex % num][1] // 100% 处的颜色
                        }
                      ],
                      globalCoord: false // 缺省为 false
                    }
                  } else {
                    let num = color.length
                    return color[params.dataIndex % num]
                  }
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: insidePosition,
                formatter: insideFormat
              }
            },
            z: 2
          },
          {
            name: '外条',
            type: 'bar',
            barGap: '-100%',
            data: outside,
            barWidth: outsideWidth,
            itemStyle: {
              normal: {
                barBorderRadius: outsideRadius,
                color: outsideBarBack
              }
            },
            z: 1
          }
        ]
      }
      // 开启缩放
      if (isZoom) {
        this.polar.dataZoom = [
          {
            type: 'inside',
            show: true,
            yAxisIndex: [0],
            start: 1,
            end: 35
          }
        ]
      }
    },
    handleBarClick(event) {
      this.$emit('item-click', event, this.options.xAxis)
    }
  },
  mounted() {
    this.renderChart()
  }
}
</script>

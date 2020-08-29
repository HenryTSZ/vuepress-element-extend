<template>
  <div class="echarts-container">
    <chart
      ref="bar"
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
  name: 'BarChart',
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
      const { xAxis, yAxis } = this.options
      if (!xAxis || !yAxis || !xAxis.length || !yAxis.length) {
        return
      }
      let that = this
      const {
        text = '',
        isZoom = reverse ? yAxis && yAxis.length > 10 : xAxis && xAxis.length > 10,
        color = this.baseColor,
        textColor = this.textColor,
        textFontSize = 18,
        subtext,
        subtextColor = this.textColor,
        subtextFontSize = 12,
        titleTop = 'auto',
        titleLeft = 'center',
        backgroundColor = 'transparent',
        showLegend,
        legend,
        hideTooltip,
        legendTop = 25,
        legendColor = this.textColor,
        legendFontSize = 12,
        tooltipType = 'shadow',
        tooltipFormatter = null,
        hideToolBox,
        toolboxName = text,
        hideImage,
        toolboxRight = 25,
        toolboxTop = 25,
        gridLeft = '3%',
        gridRight = '3%',
        gridBottom = '3%',
        gridTop = '15%',
        hidexAxis,
        hidexAxisLine,
        xAxisColor = this.textColor,
        hidexAxisTick,
        xAxisTickColor = this.textColor,
        xAxisTickType = 'solid',
        xAxisLabelColor = this.textColor,
        xAxisFontSize = 12,
        xAxisLabelInterval = 0,
        xAxisLabelRotate = 0,
        xAxisMaxLength = 8,
        minRange = null,
        maxRange = null,
        yAxisSplitNumber = 5,
        hideyAxis,
        hideyAxisLine,
        yAxisColor = this.textColor,
        hideyAxisTick,
        yAxisTickColor = this.textColor,
        yAxisTickType = 'solid',
        yAxisLabelColor = this.textColor,
        yAxisFontSize = 12,
        yAxisSplitLineColor = this.textColor,
        yAxisSplitLineType = 'solid',
        isStack,
        showLabel,
        labelPosition = 'top',
        labelColor = this.textColor,
        labelFontSize = 12,
        isGradient,
        reverse,
        id
      } = this.options
      this.title = text || toolboxName
      this.polar = {
        color,
        // 标题
        title: {
          text,
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
          backgroundColor
        },
        // 图例
        legend: {
          type: 'scroll', // 只有容器放不下图例, scroll 才会生效
          show: this.$utils.checkParam(showLegend, legend && legend.length > 1),
          data: legend || [text],
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
          },
          formatter: tooltipFormatter
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
        xAxis: [
          {
            type: 'category',
            show: !hidexAxis,
            data: xAxis,
            // 坐标轴轴线
            axisLine: {
              show: !hidexAxisLine,
              lineStyle: {
                color: xAxisColor
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: !hidexAxisTick,
              alignWithLabel: true,
              lineStyle: {
                type: xAxisTickType,
                color: xAxisTickColor
              }
            },
            // 坐标轴刻度标签
            axisLabel: {
              color: xAxisLabelColor,
              fontSize: xAxisFontSize,
              // 坐标轴刻度标签的显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。
              interval: xAxisLabelInterval,
              rotate: xAxisLabelRotate,
              formatter(value) {
                // let ret = '' // 拼接加\n返回的类目项
                // xAxisMaxLength 每项显示文字个数
                let valLength = value.length // X轴类目项的文字个数
                let rowN = Math.ceil(valLength / xAxisMaxLength) // 类目项需要换行的行数
                if (rowN > 1) {
                  // 如果类目项的文字大于 xAxisMaxLength,
                  // for (let i = 0; i < rowN; i++) {
                  //   let temp = '' // 每次截取的字符串
                  //   let start = i * xAxisMaxLength // 开始截取的位置
                  //   let end = start + xAxisMaxLength // 结束截取的位置
                  //   // 这里加一个是否是最后一行的判断
                  //   temp = value.substring(start, end) + (i === rowN - 1 ? '' : '\n')
                  //   ret += temp // 拼接最终的字符串
                  // }
                  // return ret
                  return value.substring(0, xAxisMaxLength) + '…'
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
            min: minRange,
            max: maxRange,
            splitNumber: yAxisSplitNumber,
            show: !hideyAxis,
            axisLine: {
              show: !hideyAxisLine,
              lineStyle: {
                color: yAxisColor
              }
            },
            // 坐标轴刻度
            axisTick: {
              show: !hideyAxisTick,
              alignWithLabel: true,
              lineStyle: {
                type: yAxisTickType,
                color: yAxisTickColor
              }
            },
            // 坐标轴刻度标签
            axisLabel: {
              color: yAxisLabelColor,
              fontSize: yAxisFontSize
            },
            splitLine: {
              lineStyle: {
                type: yAxisSplitLineType,
                color: yAxisSplitLineColor
              }
            }
          }
        ]
      }
      // 多例
      if (legend && legend.length > 1) {
        this.polar.series = legend.map((item, index) => ({
          name: item,
          type: 'bar',
          ...(isStack && { stack: '总量' }),
          barMaxWidth: 25,
          data: yAxis[index],
          label: {
            show: showLabel,
            position: labelPosition,
            color: labelColor,
            fontSize: labelFontSize
          }
        }))
        // 单例
      } else {
        let color0 = ''
        let color1 = ''
        // 是否渐变
        if (isGradient) {
          if (color && color[0] && color[1]) {
            color0 = color[0]
            color1 = color[1]
          } else {
            color0 = this.baseColors[0][0]
            color1 = this.baseColors[0][1]
          }
        } else {
          if (color && color[0]) {
            color0 = color[0]
            color1 = color[0]
          } else {
            color0 = this.baseColor[0]
            color1 = this.baseColor[0]
          }
        }
        this.polar.series = [
          {
            name: legend ? legend[0] : text,
            type: 'bar',
            barMaxWidth: 25,
            data: yAxis,
            label: {
              show: showLabel,
              position: labelPosition,
              color: labelColor,
              fontSize: labelFontSize
            },
            itemStyle: {
              // 渐变
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: color0
                  },
                  {
                    offset: 1,
                    color: color1
                  }
                ]),
                barBorderRadius: 4
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
      // 开启反转
      if (reverse) {
        ;[this.polar.xAxis, this.polar.yAxis] = [this.polar.yAxis, this.polar.xAxis]
        this.polar.yAxis[0].data = [...xAxis].reverse()
        this.polar.series = [
          {
            name: legend ? legend[0] : text,
            type: 'bar',
            barMaxWidth: 25,
            data: [...yAxis].reverse(),
            id: this.$utils.checkParam(id, null),
            label: {
              show: showLabel,
              position: labelPosition,
              color: labelColor,
              fontSize: labelFontSize
            },
            itemStyle: isGradient
              ? {
                  normal: {
                    color(params) {
                      let index = color
                        ? params.dataIndex % color.length
                        : params.dataIndex % that.baseColors.length
                      return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: color ? color[index][0] : that.baseColors[index][0]
                        },
                        {
                          offset: 1,
                          color: color ? color[index][1] : that.baseColors[index][1]
                        }
                      ])
                    },
                    barBorderRadius: 40
                  }
                }
              : {
                  normal: {
                    color(params) {
                      let index = color
                        ? params.dataIndex % color.length
                        : params.dataIndex % that.baseColors.length
                      return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        {
                          offset: 0,
                          color: color ? color[index] : that.baseColor[index]
                        },
                        {
                          offset: 1,
                          color: color ? color[index] : that.baseColor[index]
                        }
                      ])
                    },
                    barBorderRadius: 40
                  }
                }
          }
        ]
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

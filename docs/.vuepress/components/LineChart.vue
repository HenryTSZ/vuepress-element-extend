<template>
  <div class="echarts-container">
    <chart
      ref="line"
      :options="polar"
      auto-resize
      v-if="options.xAxis && options.xAxis.length"
      @click="handleLineClick"
    ></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
export default {
  name: 'LineChart',
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
      const {
        text = '',
        isZoom = xAxis && xAxis.length > 10,
        hideMark,
        color = this.baseColor,
        textColor = this.textColor,
        textFontSize = 18,
        subtext,
        subtextColor = this.textColor,
        subtextFontSize = 12,
        titleLeft = 'center',
        showLegend,
        legend,
        hideTooltip,
        legendTop = 35,
        legendColor = this.textColor,
        tooltipType = 'line',
        tooltipFormatter = null,
        hideToolBox,
        hideImage,
        toolboxName = text,
        toolboxRight = 25,
        toolboxTop = 20,
        gridLeft = '3%',
        gridRight = '3%',
        gridBottom = '3%',
        gridTop = '15%',
        hidexAxis,
        hideAxisLine,
        xAxisColor = this.textColor,
        showxAxisSplitLine,
        xAxisLineOpacity = 1,
        xAxisTickLength = 5,
        hidexAxisLabel,
        xAxisLabelColor = this.textColor,
        xAxisLabelFontSize = 12,
        xAxisLabelInterval = 0,
        xAxisMaxLength = 8,
        minRange = null,
        maxRange = null,
        yAxisSplitNumber = 5,
        hideyAxis,
        yAxisColor = this.textColor,
        hideyAxisSplitLine,
        yAxisSplitLineColor = this.textColor,
        yAxisSplitLineOpacity = 1,
        yAxisTickLength = 5,
        id,
        showLabel,
        smooth = false,
        labelFontSize = 12,
        labelFontWeight = 'normal',
        labelFormat = '{c}',
        labelOffset = [0, 25],
        symbolSize,
        areaOpacity = 0
      } = this.options
      this.title = text || toolboxName || ''
      let markData = []
      // 当开启缩放后，不能使用气球样式
      if (!isZoom && !hideMark) {
        if (yAxis && Array.isArray(yAxis)) {
          markData = yAxis.map((item, index) => ({
            coord: [index, item],
            value: item
          }))
        }
      }
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
          left: titleLeft
        },
        // 图例
        legend: {
          type: 'scroll', // 只有容器放不下图例, scroll 才会生效
          show: this.$utils.checkParam(showLegend, legend && legend.length > 1),
          data: legend || [text],
          right: !hideTooltip ? 50 : 20,
          top: legendTop,
          itemWidth: 40,
          itemHeight: 20,
          textStyle: {
            color: legendColor
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
              backgroundColor: 'rgba(0, 35, 55, 1)'
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
            // boundaryGap: false, // 坐标轴两边留白策略 默认 true
            show: !hidexAxis,
            data: xAxis,
            // 坐标轴轴线
            axisLine: {
              show: !hideAxisLine,
              lineStyle: {
                color: xAxisColor
              }
            },
            // 坐标轴在 grid 区域中的分隔线
            splitLine: {
              show: showxAxisSplitLine,
              lineStyle: {
                opacity: xAxisLineOpacity
              }
            },
            // 坐标轴刻度
            axisTick: {
              length: xAxisTickLength,
              alignWithLabel: true
            },
            // 坐标轴刻度标签
            axisLabel: {
              show: !hidexAxisLabel,
              color: xAxisLabelColor,
              fontSize: xAxisLabelFontSize,
              // 坐标轴刻度标签的显示间隔，在类目轴中有效。可以设置成 0 强制显示所有标签。
              interval: xAxisLabelInterval,
              formatter(value) {
                let ret = '' // 拼接加\n返回的类目项
                // xAxisMaxLength 每项显示文字个数
                let valLength = value.length // X轴类目项的文字个数
                let rowN = Math.ceil(valLength / xAxisMaxLength) // 类目项需要换行的行数
                if (rowN > 1) {
                  // 如果类目项的文字大于8,
                  for (let i = 0; i < rowN; i++) {
                    let temp = '' // 每次截取的字符串
                    let start = i * xAxisMaxLength // 开始截取的位置
                    let end = start + xAxisMaxLength // 结束截取的位置
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
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: minRange,
            max: maxRange,
            splitNumber: yAxisSplitNumber,
            show: !hideyAxis,
            // 坐标轴轴线
            axisLine: {
              show: !hideAxisLine,
              lineStyle: {
                color: yAxisColor
              }
            },
            // 坐标轴在 grid 区域中的分隔线
            splitLine: {
              show: !hideyAxisSplitLine,
              lineStyle: {
                color: yAxisSplitLineColor,
                opacity: yAxisSplitLineOpacity
              }
            },
            // 坐标轴刻度
            axisTick: {
              length: yAxisTickLength,
              alignWithLabel: true
            }
          }
        ]
      }
      // 多例
      if (legend && legend.length > 1) {
        this.polar.series = []
        legend.map((item, index) => {
          this.polar.series.push({
            name: item,
            type: 'line',
            id: id && id[index],
            lineStyle: {
              normal: {
                width: 3
              }
            },
            symbolSize: 10,
            data: yAxis[index]
          })
        })
        // 单例
      } else {
        this.polar.series = [
          {
            name: text,
            type: 'line',
            smooth,
            data: yAxis,
            // 文字在圆圈中显示
            label: {
              normal: {
                show: this.$utils.checkParam(showLabel, isZoom),
                fontSize: labelFontSize,
                fontWeight: labelFontWeight,
                formatter: labelFormat,
                offset: labelOffset
              }
            },
            symbolSize: this.$utils.checkParam(symbolSize, isZoom ? 30 : 5),
            // 气球显示
            markPoint: {
              data: markData
            },
            // 设置区域颜色渐变
            areaStyle: {
              normal: {
                opacity: areaOpacity,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: (color && color[0]) || this.baseColor[0] // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: (color && color[1]) || this.baseColor[1] // 100% 处的颜色
                    }
                  ],
                  globalCoord: true // 缺省为 false
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
    handleLineClick(event) {
      this.$emit('item-click', event, this.options.xAxis)
    }
  },
  mounted() {
    this.renderChart()
  }
}
</script>

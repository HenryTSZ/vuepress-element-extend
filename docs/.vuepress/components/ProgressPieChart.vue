<template>
  <div class="echarts-container">
    <chart
      ref="progress-pie"
      :options="polar"
      auto-resize
      v-if="options.data !== undefined"
      @click="handlePieClick"
    ></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'ProgressPieChart',
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
    options() {
      this.renderChart()
    }
  },
  methods: {
    renderChart() {
      const { data } = this.options
      if (!data) {
        return
      }
      const {
        text = '',
        color = this.baseColor,
        textColor = this.textColor,
        textFontSize = 18,
        subtext,
        subtextColor = this.textColor,
        subtextFontSize = 12,
        titleTop = '85%',
        titleLeft = 'center',
        showLegend,
        legend,
        legendOrient = 'horizontal',
        legendLeft = 20,
        legendTop = 35,
        hideTooltip,
        legendColor = this.textColor,
        tooltipFormatter = '{b}: {c} ({d}%)',
        hideToolBox,
        hideImage,
        toolboxName = text,
        toolboxRight = 25,
        toolboxTop = 20,
        radius = ['75%', '95%'],
        silent = true,
        seriesBg = 'rgba(104, 151, 175, .32)',
        hideName,
        dataSize = 30,
        statusSize = 14
      } = this.options
      this.title = text || toolboxName || ''
      this.polar = {
        color,
        // 标题
        title: {
          text,
          textStyle: {
            color: textColor,
            fontSize: textFontSize
          },
          subtext: subtext,
          subtextStyle: {
            color: subtextColor,
            fontSize: subtextFontSize
          },
          top: titleTop,
          left: titleLeft
        },
        // 图例
        legend: {
          show: showLegend,
          data: legend,
          orient: legendOrient,
          left: legendLeft,
          top: legendTop,
          textStyle: {
            color: legendColor
          }
        },
        // 提示框
        tooltip: {
          show: !hideTooltip,
          trigger: 'item',
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
        series: [
          {
            name: text,
            type: 'pie',
            radius: radius,
            // 图形是否不响应和触发鼠标事件
            silent: silent,
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: color ? color[0] : this.baseColor[0]
                },
                {
                  offset: 1,
                  color: color ? color[1] : this.baseColor[1]
                }
              ]),
              seriesBg
            ],
            label: {
              normal: {
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data,
                name: hideName ? '' : data + '',
                label: {
                  normal: {
                    textStyle: {
                      color: color ? color[1] : this.baseColor[1],
                      fontSize: dataSize
                    }
                  }
                }
              },
              {
                value: 100 - data,
                name: hideName ? '' : status,
                label: {
                  normal: {
                    textStyle: {
                      color: color ? color[0] : this.baseColor[0],
                      fontSize: statusSize
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    },
    handlePieClick(event) {
      this.$emit('item-click', event)
    }
  },
  mounted() {
    this.renderChart()
  }
}
</script>

<style></style>

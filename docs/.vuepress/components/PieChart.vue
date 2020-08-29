<template>
  <div class="echarts-container">
    <chart
      ref="pie"
      :options="polar"
      auto-resize
      v-if="options.seriesData && options.seriesData.length"
      @click="handlePieClick"
    ></chart>
    <no-data :title="title" v-else></no-data>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
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
      const { seriesData } = this.options
      if (!seriesData || !seriesData.length) {
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
        inradius = ['50%', '70%'],
        roseType = false,
        outradius,
        formatter = '{b}: {c}'
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
          left: titleLeft
        },
        // 图例
        legend: {
          show: this.$utils.checkParam(showLegend, legend && legend.length > 1),
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
            // 内环
            name: text,
            type: 'pie',
            radius: inradius,
            // 是否展示成南丁格尔图
            roseType: roseType,
            selectedMode: 'single',
            label: {
              normal: {
                show: !outradius,
                formatter: formatter
              }
            },
            labelLine: {
              normal: {
                show: !outradius
              }
            },
            data: seriesData
          },
          {
            // 外环
            name: text,
            type: 'pie',
            radius: outradius,
            label: {
              normal: {
                show: !!outradius,
                formatter: formatter
              }
            },
            labelLine: {
              normal: {
                show: !!outradius
              }
            },
            data: seriesData
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

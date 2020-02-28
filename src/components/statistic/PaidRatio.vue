<template>
  <div id="paidRatio" style="min-height:300px"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class AlertCount extends Vue {
  myChart: any = undefined;

  init() {
    const echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
    const myChart = echarts.init(document.getElementById('paidRatio'));
    // console.log(document.getElementById("humiture"));
    myChart.setOption({
      textStyle: {
        color: 'rgba(255,255,255,0.7)'
      },
      grid: {
        top: '10%',
        left: '40',
        right: '30',
        bottom: '12%'
      },
      xAxis: {
        type: 'category',
        gridIndex: 0,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        data: this.dateArray
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        max: (value: any) => value.max,
        min: (value: any) => value.min
      },
      series: [
        {
          type: 'line',
          itemStyle: {
            color: 'rgb(76, 159, 236)'
          },
          lineStyle: {
            color: 'rgba(76, 159, 236, 0.8)'
          },
          symbol: 'emptyCircle',
          smooth: true,
          data: this.chartArray,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(18, 164, 240, 0.3)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(18, 164, 240, 0)' // bottom 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          }
        }
      ]
    });
    this.myChart = myChart;
  }

  setData() {
    this.myChart.setOption({
      xAxis: {
        data: this.dateArray
      },
      series: {
        data: this.chartArray
      }
    });
  }

  get chartArray() {
    return [0.9, 0.95, 0.91, 0.96, 0.97, 0.94];
  }

  get dateArray() {
    return [1, 2, 3, 4, 5, 6];
  }

  @Watch('alertStatistic')
  onChanged() {
    this.setData();
  }

  mounted() {
    this.init();
    setTimeout(() => {
      this.myChart.resize();
    }, 300);

    window.onresize = () => {
      this.myChart.resize();
    };

    if (!this.$vuetify.theme.dark) {
      this.myChart.setOption({
        textStyle: {
          color: 'rgba(0,0,0,0.7)'
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          }
        },

        yAxis: {
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          }
        }
      });
    }
  }
}
</script>

<style scoped></style>

<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>成本汇总</span>
      </div>
     <el-date-picker
      v-model="selectDate"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>


      <chart :options="option"></chart>
    </el-card>
  </div>
</template>

<style>
.echarts {
  width: 600px;
  height: 300px;
}
</style>

<script>
import { getItemStatistics } from '@/api/reports';
var moment = require('moment');

export default {
  name: 'reports',
  data: function() {
    return {
      selectDate: [],
      option: {
        title: {
          text: '成本统计'
        },
        tooltip: {},
        legend: {
          data: ['用户来源']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: []
          }
        ]
      },
      pieData: {
        title: {
          text: '成本统计',
          subtext: 'cool',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: 'item_name',
            type: 'pie',
            radius: '55%',
            center: ['42%', '40%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    getInitDate() {
      let firstDay = moment()
        .startOf('month')
        .format('YYYY-MM-DD');
      let endDate = moment()
        .endOf('month')
        .format('YYYY-MM-DD');
      this.selectDate = [];
      this.selectDate.push(firstDay);
      this.selectDate.push(endDate);
    }
  },
  beforeMount() {
    this.getInitDate();
  },
  mounted() {
    getItemStatistics()
      .then(res => {
        console.log('====================');
        let items = res.data;
        console.log(items);
        items.forEach(item => {
          this.option.xAxis.data.push(item._id.item_name);
          this.option.series[0].data.push(item.totalAmount);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

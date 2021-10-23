import { Component } from '@angular/core';
import * as echarts from 'echarts'

import *as $ from "jquery";
// 引入数据处理api
import {subwayDataProcessor} from "./prepro";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  ionViewDidEnter(){
   this.echartInit();}
   echartInit(){
     // let myChart = echarts.init(<HTMLDivElement>document.getElementById('chart'));
   const ec = echarts as any;
   const container = document.getElementById('chart');
   const chart = ec.init(container);

   //jquery.get: get the data of subway.json
   //Descriptions: 提取subway.json中的线路数据，并做出处理
   $.get('assets/data/subway.json', function (data){
     //Descriptions: 处理原始地铁数据
     //Postconditions: 返回包括站点信息和线路信息数据集
     const datasetSource = subwayDataProcessor(data);

     //Preconditions: 构造线路信息数据，用于绘制线路图
     const linesData = [];
     //Descriptions: 将线路信息数据集中信息压入linesData数组，直接用于绘制lines图
     for (const i in datasetSource.linesDataSet) {
       const lineDataSet = datasetSource.linesDataSet[i];
       //单个线路数据
       linesData.push({
         //线路名
         name: lineDataSet.name,
         //线路绘图坐标
         coords: lineDataSet.coords,
         //单个线路样式表
         lineStyle: {
           color: lineDataSet.color,
         }
       })
     }

     //Descriptions: 初始化Echarts图标
     chart.setOption({
       dataset: {
         source: datasetSource.stationsDataSet,
       },
       //数据集，包含站点数据
       xAxis: {
         type: 'value',
         show: false,
         min: -50,
         max: 2100,
       },
       //Descriptions: 全局X轴
       yAxis: {
         type: 'value',
         show: false,
         min: -50,
         max: 1600,
         //反转Y轴
         inverse: true,

       },
       //Descriptions: 全局Y轴
       legend: {

       },
       //Descriptions: 图例
       grid: {
         left: 0,
         right: 0,
         bottom: 0,
       },
       // 关闭动画
       animation: false,
       //Descriptions: 设置图表大小
       //Descriptions: 控制窗口缩放
       dataZoom: [{
         //Descriptions: 控制Y轴
         // dataZoom的模式
         type: 'inside',
         yAxisIndex: 0,
         // 图像刷新频率（毫秒）
         throttle: 0,
         // 最小缩放比例
         minSpan: 20,
         moveOnMouseWheel: false,
         // 数据过滤模式
         filterMode: 'empty',
       },{
         //Descriptions: 控制X轴
         type: 'inside',
         xAxisIndex: 0,
         throttle: 70,
         minSpan: 20,
         moveOnMouseWheel: false,
         filterMode: 'empty',
       },
       ],
       //Descriptions: 线路图与站点图
       series: [{
         //Descriptions: 线路图
         name: '线路',
         type: 'lines',
         coordinateSystem: 'cartesian2d',
         //Descriptions: 绘图数据
         data: linesData,
         polyline: true,
         //Descriptions: 线路总体样式表
         lineStyle: {
           width: 10,
           opacity: 1,
           //线尾样式
           cap: 'round',
         },
         //Descriptions: 获得焦点后样式
         emphasis: {
           focus: 'global',
           blurScope: 'coordinateSystem',
           lineStyle: {
             width: 15,
           }
         },

       },
         {
           //Descriptions: 站点图
           name: '站点',
           type: 'scatter',
           //Descriptions: 指定dataset编码规则
           encode: {
             // 弹出信息框
           tooltip: [[0]],
             x: 5,
             y: 6,
           },
           // 站点图标
           symbol: function(params){
             if(params[2] === '0'){
               return 'circle';
             }else {
               return 'image://assets/imgs/turn.png'
             }

           },
           symbolSize: 10,
           //Descriptions: 站点图标样式表
           itemStyle: {
             color: 'rgb(246,246,246)',
             //透明度
             opacity: 1,
             // 描边
             borderColor: 'rgb(0,0,0)',
             borderWidth: 1,
           },
           //Descriptions: 获得焦点样式
           emphasis: {

           },
           //Descriptions: 文字标签
           label: {
             show: true,
             // 标签格式
             // 标签位置
             position: ['150%', '150%'],
             formatter: '{@0}',
           },
         }],
       //Descriptions: 弹出信息框
       tooltip: {
         show: true,
         // 触发对象
         trigger: 'item',
       },
     })

     // 设置浏览器窗口改变时图表自动调整大小
     window.onresize = chart.resize

   });
  }
}

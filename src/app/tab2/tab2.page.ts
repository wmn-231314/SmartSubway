import { Component,OnInit} from '@angular/core';
import * as echarts from 'echarts'

import *as $ from "jquery";
// 引入数据处理api
import {subwayDataProcessor} from "./prepro";

import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var BMap;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  data :any;
  map: any;
  localaddress: any = null;
  constructor(private geolocation:Geolocation) {}
  ionViewDidEnter(){
   this.echartInit();
   
  }
  ngOnInit() {
    console.log("ngOnInit()调用");
  // 百度地图API功能
	// this.map = new BMap.Map("allmap");  // 创建Map实例
	// this.map.centerAndZoom("北京市");      // 初始化地图,用城市名设置地图中心点
  // this.map.enableScrollWheelZoom(true);
  this.getLocation();
 
}
getLocation() {
  let marker =null;
  let circle =null;
  //getCurrentPosition()方法为geolocation定位插件的定位获取坐标信息
      this.geolocation.getCurrentPosition().then((resp) => {
        //if (resp && resp.coords) {
          //创建地图中心点
          //let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
          //通过geolocation定位插件获取到的经纬度坐标需要转换为百度坐标，否则在百度地图显示会出现偏差
          // let convertor = new BMap.Convertor();//坐标转换对象
          // let pointArr = [];//创建坐标数组
          // pointArr.push(locationPoint);
          // //坐标转换
          // // 第一个属性为坐标数组，
          // // 第二个属性为坐标原始类型，
          // // 第三个属性为坐标目的类型，5为百度坐标
          // convertor.translate(pointArr, 1, 5, (data) => {
          //   if (data.status === 0) {
          //     //创建覆盖物标注
          //     marker = new BMap.Marker(data.points[0]);
          //     //创建圆形覆盖物
          //     circle = new  BMap.Circle(data.points[0],100,{
          //       fillColor:"blue",//圆形填充颜色。当参数为空时，圆形将没有填充效果
          //       fillOpacity:0.1,//圆形填充的透明度，取值范围0 - 1
          //       strokeOpacity:0.3,//圆形边线透明度，取值范围0 - 1
          //       strokeWeight:1//圆形边线的宽度，以像素为单位
          //     })
          //     marker.setPosition(data.points[0]);
          //     //将地图中心点更改为指定坐标点
          //     this.map.panTo(data.points[0]);
          //     //设置地图缩放级别
          //     this.map.setZoom(17);
          //     //添加地图标注
          //     this.map.addOverlay(marker);
          //     this.map.addOverlay(circle);
          //     //设置标注动画，在移动端未生效，暂时未知原因
          //     marker.setAnimation(2); //跳动的动画
          //     //创建地址解析对象Geocoder，可将地理位置与坐标点正反转换
          //     var geoc = new BMap.Geocoder();
          //     //将坐标点解析为地理位置
          //     geoc.getLocation(data.points[0],(res)=>{
          //       this.localaddress = res.addressComponents;
          //       alert(this.localaddress.province+"-"+this.localaddress.city+"-"+this.localaddress.district+"-"+this.localaddress.street+"-"+this.localaddress.streetNumber);
          //     });
          //   }
          // })
          console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
          
       // }
      }).catch(e => {
    alert("定位失败");
        console.log('Error happened when get current position.');
      });
      console.log('hhhhhhhhhhh');
}
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
       bmap:{
        center: [270,681],
        zoom: 10,
        roam: true,
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
        // startValue:270,

         moveOnMouseWheel: false,
         // 数据过滤模式
         filterMode: 'empty',
       },{
         //Descriptions: 控制X轴
         type: 'inside',
         xAxisIndex: 0,
         throttle: 70,
         minSpan: 20,
       //  startValue:681,
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
         center: [270,681],
        // coordinateSystem: 'bmap',
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

/**
 * @description 处理subway.json数据，得到一级数据
 * @param data 为subway.json所转化而来的对象
 * @return {{}} dataset对象
 */
 export function subwayDataProcessor(data) {
    //dataSet：绘图所需所有数据集，包括站点信息和线路信息
    const dataSet = {stationsDataSet:[],linesDataSet:[]
    };

    //stationsDataSet:站点信息数据集
    const stationsDataSet = [
        ['name', 'line', 'is_trans', 'peo_num', 'peo_degree', 'flat_loc_x', 'flat_loc_y', 'map_loc_x', 'map_loc_y'],
    ];
    //通过subway.json导入站点数据，并压入stationsDataSet数组
    const namesTemp = [];  //用于防止重添加相同站点
    
    for (const i in data.l) {
        //Descriptions: 单个站点数据
        let station = [];
        const line = data.l[i];
        const stations = line.st;
        for (const i in stations) {
            //Descriptions: subway.json中单个站点对象
            const stationTemp = stations[i];
            //'name'
            station.push(stationTemp.n);
            //'line'
            station.push(line.ln);
            //'is_trans'
            station.push(stationTemp.t);
            //'peo_num'
            //'peo_degree'
            //todo 人员拥挤度信息
            station.push(0);
            station.push(0.0);
            //'flat_loc_x', 'flat_loc_y'
            const flatLocTemp = stationTemp.p.split(" ");
            station.push(Number(flatLocTemp[0]), Number(flatLocTemp[1]));
            //'map_loc_x', 'map_loc_y'
            const mapLocTemp = stationTemp.sl.split(",");
            station.push(Number(mapLocTemp[0]), Number(mapLocTemp[1]));
            //Descriptions: 防止重复添加
             if (namesTemp.indexOf(station[0]) === -1){
                namesTemp.push(station[0]);
                stationsDataSet.push(station);
             }
            station = [];
        }
    }
    //Descriptions: stationsDataSet站点数据压入dataSet数据集
    dataSet.stationsDataSet = stationsDataSet;

    //linesDataSet:站点信息数据集
    const linesDataSet = [];
    //处理线路数据
    for (let i = 0; i < data.l.length; i++) {
        //lineLocStr: [
        //      "270 681",
        //      "243 681",
        //      "226 681"
        //      ...]
        //Descriptions: the str of location of stations in a line
        //Descriptions: 表示一条线路中每个站点位置坐标的字符串数组
        const lineLocStr = data.l[i].c;
        //lineLoc: [
        //      [270, 681],
        //      [243, 681],
        //      [226, 681]
        //      ...]
        //Descriptions: the location of stations in a line
        //Descriptions: 表示一条线路中每个站点位置坐标的Int数组
        const lineLoc = [];
        lineLocStr.forEach(stationLocStr => {
                const temp = stationLocStr.split(" ");
                lineLoc.push([Number(temp[0]), Number(temp[1])]);
            }
        );
        //push the line into the data of lines
        //Descriptions: 将处理过后的站点位置坐标数据Push进lines数组，用于Echarts
        linesDataSet.push({
            name: data.l[i].ln,
            name_long: data.l[i].kn,
            coords: lineLoc,
            color: '#' + data.l[i].cl,
        });
    }
    dataSet.linesDataSet = linesDataSet;

    // Debug 或 查看数据
    //console.log(dataSet);

    return dataSet;

    //Descriptions: 请求浏览器端下载
    //Preconditions: download(data, strFileName, strMimeType)
    //download(JSON.stringify(dataSet), 'dataset.json')
}
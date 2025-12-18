import React from "react";
import ReactECharts from "echarts-for-react";

export default function LineTopGenre({data}:{data:any}) {
  

  const option = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map(g => g.name),
      axisLabel: {
        rotate: 30,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Total",
        type: "line",
        smooth: true,
        data: data.map(g => g.total),
        areaStyle: null, 
      },
    ],
  };

  return ( 
      <ReactECharts option={option} style={{ height: 300 }} /> 
  );
}

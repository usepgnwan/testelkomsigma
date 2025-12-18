import React from "react";
import ReactECharts from "echarts-for-react";

export default function BarGenreTvMovie({data }: {data:any}) {
  const genres = data.map((i) => i.genre);
  const tvData = data.map((i) => i.tv);
  const movieData = data.map((i) => i.movies);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      bottom: 0,
      data: ["TV", "Movies"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: genres,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "TV",
        type: "bar",
        data: tvData,
        barGap: 0,
        barWidth: "30%",
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
      {
        name: "Movies",
        type: "bar",
        data: movieData,
        barWidth: "30%",
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
        },
      },
    ],
  };

  return (
   
      <ReactECharts option={option}  />
  
  );
}

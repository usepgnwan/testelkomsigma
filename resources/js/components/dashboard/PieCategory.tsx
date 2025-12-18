import React from "react";
import ReactECharts from "echarts-for-react";

export default function PieCategory({data}) {
    const option = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c} ({d}%)",
        },
        legend: {
            bottom: 0,
            left: "center",
        },
        series: [
            {
                name: "Content",
                type: "pie",
                radius: "70%",
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.3)",
                    },
                },
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{ height: 300, width: "100%" }}
        />
    );
}

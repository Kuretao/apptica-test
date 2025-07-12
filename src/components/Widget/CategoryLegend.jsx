import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import {transformChartData} from "../../utils/transformChartData.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function ChartWidget({ data, categories, visibleCategories }) {
    const chartData = transformChartData(data, categories, visibleCategories);

    return (
        <Line
            data={chartData}
            options={{
                responsive: true,
                plugins: {
                    legend: { display: true },
                    tooltip: { mode: "index", intersect: false },
                },
                scales: {
                    x: {
                        type: "category",
                    },
                    y: {
                        beginAtZero: true,
                        reverse: true,
                    },
                },
            }}
        />
    );
}

export default ChartWidget;

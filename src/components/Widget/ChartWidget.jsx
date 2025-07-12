import { Line } from "react-chartjs-2";
import {transformChartData} from "../../utils/transformChartData.js";

function ChartWidget({ data, categories, visibleCategories }) {
    const chartData = transformChartData(data, categories, visibleCategories);

    return (
        <Line data={chartData} options={{
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { mode: "index", intersect: false }
            }
        }} />
    );
}


export default ChartWidget;

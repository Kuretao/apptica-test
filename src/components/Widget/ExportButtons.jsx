import { saveAs } from "file-saver";
import Papa from "papaparse";
import { useRef } from "react";

function ExportButtons({ data }) {
    const chartRef = useRef();

    const handleExportPNG = () => {
        const url = chartRef.current.toBase64Image();
        const link = document.createElement("a");
        link.href = url;
        link.download = "chart.png";
        link.click();
    };

    const handleExportCSV = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "chart.csv");
    };

    return (
        <div>
            <button onClick={handleExportPNG}>Экспорт PNG</button>
            <button onClick={handleExportCSV}>Экспорт CSV</button>
        </div>
    );
}

export default ExportButtons;

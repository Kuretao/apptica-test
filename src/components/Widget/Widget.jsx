import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, fetchCategories, fetchChartData, setSelectedCountry, setSelectedPeriod, toggleCategoryVisibility } from "../../store/topHistorySlice";
import CountrySelector from "./CountrySelector";
import CategoryLegend from "./CategoryLegend";
import DateRangePicker from "./DateRangePicker";
import ChartWidget from "./ChartWidget";
import ExportButtons from "./ExportButtons";

function Widget() {
    const dispatch = useDispatch();
    const {
        countries,
        categories,
        selectedCountry,
        selectedPeriod,
        chartData,
        visibleCategories,
        loading,
        error,
    } = useSelector(state => state.topHistory);

    useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCountry && selectedPeriod?.start && selectedPeriod?.end) {
            dispatch(fetchChartData({ countryId: selectedCountry, period: selectedPeriod }));
        }
    }, [dispatch, selectedCountry, selectedPeriod]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div style={{ width: "100%" }}>
            <CountrySelector countries={countries} />
            <DateRangePicker />
            <CategoryLegend categories={categories} visibleCategories={visibleCategories} />
            <ChartWidget data={chartData} categories={categories} visibleCategories={visibleCategories} />
            <ExportButtons data={chartData} />
        </div>
    );
}

export default Widget;

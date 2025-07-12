import { useDispatch, useSelector } from "react-redux";
import { setSelectedCountry } from "../../store/topHistorySlice";

function CountrySelector({ countries }) {
    const dispatch = useDispatch();
    const selectedCountry = useSelector(state => state.topHistory.selectedCountry);
    if (!countries || countries.length === 0) {
        return <div>Загрузка стран...</div>;
    }
    console.log("Countries:", countries);

    return (
        <select
            value={selectedCountry || ""}
            onChange={e => dispatch(setSelectedCountry(e.target.value))}
        >
            <option value="" disabled>Выберите страну</option>
            {countries.map(country => (
                <option key={country.id} value={country.id}>{country.name}</option>
            ))}
        </select>
    );
}

export default CountrySelector;

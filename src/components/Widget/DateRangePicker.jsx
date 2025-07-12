import { useDispatch, useSelector } from "react-redux";
import { setSelectedPeriod } from "../../store/topHistorySlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker() {
    const dispatch = useDispatch();
    const selectedPeriodRaw = useSelector(state => state.topHistory.selectedPeriod) ?? { start: null, end: null };

    const selectedPeriod = {
        start: selectedPeriodRaw.start ? new Date(selectedPeriodRaw.start) : null,
        end: selectedPeriodRaw.end ? new Date(selectedPeriodRaw.end) : null,
    };

    return (
        <div>
            <DatePicker
                selectsRange
                startDate={selectedPeriod.start}
                endDate={selectedPeriod.end}
                onChange={(dates) => {
                    const [start, end] = dates || [null, null];
                    dispatch(setSelectedPeriod({
                        start: start ? start.toISOString() : null,
                        end: end ? end.toISOString() : null,
                    }));
                }}
                maxDate={new Date()}
                minDate={new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                dateFormat="yyyy-MM-dd"
            />
        </div>
    );
}

export default DateRangePicker;

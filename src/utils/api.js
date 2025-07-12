const API_KEY = "fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l";

const api = {
    async getCountries() {
        const res = await fetch(`https://api.apptica.com/v1/geo?B4NKGg=${API_KEY}`);
        const json = await res.json();
        console.log("Countries API response:", json);
        return json;
    },
    async getCategories() {
        const res = await fetch(`https://api.apptica.com/v1/applicationCategory?platform=1&B4NKGg=${API_KEY}`);
        return res.json();
    },
    async getChartData(countryId, period) {
        try {
            const { start, end } = period || {};
            const from = start instanceof Date ? start.toISOString().slice(0, 10) : start;
            const to = end instanceof Date ? end.toISOString().slice(0, 10) : end;
            const url = `https://api.apptica.com/package/top_history/9379/${countryId}?date_from=${from}&date_to=${to}&platforms=1&B4NKGg=${API_KEY}`;
            console.log("Fetching chart data from URL:", url);
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const json = await res.json();
            return json;
        } catch (error) {
            console.error("Error fetching chart data:", error);
            throw error;
        }
    }

};

export default api;

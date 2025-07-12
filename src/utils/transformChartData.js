export function transformChartData(rawData = {}, categories = [], visibleCategories = []) {
    const labelsSet = new Set();
    const datasets = [];
    Object.values(rawData).forEach(categoryData => {
        if (!categoryData) return;
        Object.values(categoryData).forEach(subCategoryData => {
            if (!subCategoryData) return;
            Object.keys(subCategoryData).forEach(date => labelsSet.add(date));
        });
    });

    const labels = Array.from(labelsSet).sort();

    categories.forEach(cat => {
        if (!visibleCategories.includes(cat.id)) return;

        const catData = rawData[cat.id];
        if (!catData) return;

        const data = labels.map(date => {
            let value = null;
            Object.values(catData).forEach(subCatData => {
                if (subCatData && subCatData[date] !== undefined) {
                    value = subCatData[date];
                }
            });
            return value;
        });

        datasets.push({
            label: cat.title,
            data,
            borderColor: getColorForCategory(cat.id),
            fill: false,
        });
    });

    return { labels, datasets };
}

function getColorForCategory(id) {
    const hue = (parseInt(id, 10) * 137) % 360;
    return `hsl(${hue}, 70%, 50%)`;
}




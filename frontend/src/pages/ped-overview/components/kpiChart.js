import ReportsLineChart from "fragments/Charts/ReportsLineChart";
import indicatorsMap from 'constants/indicators-map';

function KpiChart({ code, values, showTitle, color, bgColor }) {
    const title = showTitle === true ? indicatorsMap.get(code).shortTitleInSubcategory : "";
    const unit = indicatorsMap.get(code).unit;
    const formattedValues = formatKpiDataForChart(values, unit);
    const description = (<>
        {/* (<strong>This</strong>) is a demo description. */}
    </>
    );

    return (
        <ReportsLineChart
            color={color}
            title={title}
            description={description}
            chart={formattedValues}
            titleVariant="body2"
            bgColor={bgColor}
        />

    );
}

function formatKpiDataForChart(entries, unit) {
    if (!entries) {
        return null;
    }
    const label = "Value (" + unit + ")";
    entries.sort((a, b) => a.year - b.year);

    // Map the sorted entries to labels and data
    const labels = entries.map(entry => entry.year);
    const values = entries.map(entry => entry.value);

    // Create the formatted chart data
    const formattedData = {
        labels: labels,
        datasets: {
            label: label,
            data: values
        }
    };

    return formattedData;
}

KpiChart.defaultProps = {
    showTitle: true,
    color: "info",
    bgColor: ""
};


export default KpiChart;
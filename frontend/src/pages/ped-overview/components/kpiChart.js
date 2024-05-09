import ReportsLineChart from "fragments/Charts/ReportsLineChart";
import ProgressLineChart from "examples/Charts/LineCharts/ProgressLineChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import indicatorsMap from 'constants/indicators-map';

function KpiChart({ code, values }) {
    const title = indicatorsMap.get(code).title;
    const unit = indicatorsMap.get(code).unit;
    const formattedValues = formatKpiDataForChart(values, unit);
    const description = (<>
        (<strong>This</strong>) is a demo description.
    </>
    );
    return (
        <ReportsLineChart
            color="info"
            title={title}
            description= {description}
            chart={formattedValues}
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

export default KpiChart;
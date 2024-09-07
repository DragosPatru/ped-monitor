import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DataTable from "fragments/Tables/DataTable";

const formatValue = (value) => {
    if (value) {
        if (Number.isInteger(value)) {
            return value;
        }
        return parseFloat(value.toFixed(2));
    }
    return value;

};

const valuesTableRows = (values, unit) => {
    const rows = values.length ? (values.map(value => ({
        year: value.year,
        unit: unit,
        value: formatValue(value.value),
    }))) : [];

    return rows;
};

const valuesTableColumns = [
    { Header: "year", accessor: "year", width: "33%", align: "left" },
    { Header: "U.M.", accessor: "unit", width: "33%", align: "left" },
    { Header: "value", accessor: "value", align: "left" }
];

function KpiTable({ values, unit, color }) {
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const [tableColumns, setTableColumns] = useState(valuesTableColumns);
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        fetchValues();
    }, [lastUpdated]);

    const fetchValues = async () => {
        toTableRows(values);
    };

    const toTableRows = (values) => {
        const decoratedValues = values.length ? (values.map(value => ({
            ...value
        }))) : [];

        // Table data
        const rows = valuesTableRows(decoratedValues, unit);
        setTableRows(rows);
    };

    return (
        <MDBox
            variant="gradient"
            bgColor={color}
            borderRadius="lg"
            coloredShadow={color}
            sx={{ overflowY: 'auto', height: '100%' }}>
            <DataTable
                table={{ columns: tableColumns, rows: tableRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                canSearch={false}
                noEndBorder
            />
        </MDBox>

    );
}

export default KpiTable;

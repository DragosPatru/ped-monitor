import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import MDButton from "components/MDButton";
import DataTable from "fragments/Tables/DataTable";

import ValueDeleteModal from "./valueDeleteModal";
import ValueCreateModal from "./valueCreateModal";

// Service
import IndicatorService from "services/IndicatorService";

// Data
import { valuesTableRows, valuesTableColumns } from "./valuesTableData";

function ValuesTable({ indicatorId, allowDataChanges, dataSourceCodes, onError, onAsyncOp, onAsyncOpEnd }) {
  const [valueToProcess, setValueToProcess] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [tableColumns, setTableColumns] = useState(valuesTableColumns);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    fetchValues();
  }, [lastUpdated]);

  const fetchValues = async () => {
    try {
      const values = await IndicatorService.getValues(indicatorId);
      toTableRows(values);

    } catch (error) {
      onError && onError(error);
    }
  };

  const toTableRows = (values) => {
    const decoratedValues = values.length ? (values.map(value => ({
      ...value,
      onRemove: () => openDeleteModal(value),
      allowUpdates: allowDataChanges
  }))) : [];

    // Table data
    const rows = valuesTableRows(decoratedValues);
    setTableRows(rows);
  };


  // Create Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = (needReload = false) => {
    setCreateModalOpen(false);
    if (needReload === true) {
      setLastUpdated(Date.now());
    }
  }

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = (value) => {
    setValueToProcess(value);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = (needReload = false) => {
    setDeleteModalOpen(false);
    setValueToProcess(null);
    if (needReload === true) {
      setLastUpdated(Date.now());
    }
  };

  return (
    <Card>
      <MDBox
        pt={3} px={3}
        variant="contained"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDBox
          variant="contained"
          // bgColor="dark"
          borderRadius="lg"
        // coloredShadow="info"
        >
          <MDTypography variant="h6" color="dark">
            Values
          </MDTypography>

        </MDBox>
        <MDButton variant="contained" color="dark" size="medium" onClick={openCreateModal}>
          <Icon>add</Icon>&nbsp;ADD NEW VALUE
        </MDButton>

        <ValueCreateModal indicatorId={indicatorId} dataSourceCodes={dataSourceCodes} isOpen={createModalOpen} onClose={closeCreateModal} />
        <ValueDeleteModal value={valueToProcess} isOpen={deleteModalOpen} onClose={closeDeleteModal} />
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns: tableColumns, rows: tableRows }}
          isSorted={false}
          entriesPerPage={true}
          showTotalEntries={true}
          noEndBorder
        //canSearch
        />
      </MDBox>
    </Card>
  );
}

export default ValuesTable;

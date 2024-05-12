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

import TaskDefinitionModal from "./taskDefinitionModal";
import TaskEditModal from "./taskEditModal";
import TaskDeleteModal from "./taskDeleteModal";

// Service
import IndicatorService from "services/IndicatorService";

// Data
import { tasksTableRows, tasksTableColumns } from "./tasksTableData";

function TasksTable({ indicatorId, onError, onAsyncOp, onAsyncOpEnd }) {
  const [taskToProcess, setTaskToProcess] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [tableColumns, setTableColumns] = useState(tasksTableColumns);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [lastUpdated]);

  const fetchTasks = async () => {
    try {
      const tasks = await IndicatorService.getTasks(indicatorId);
      toTableRows(tasks);

    } catch (error) {
      onError && onError(error);
    }
  };

  const toTableRows = (tasks) => {
    const decoratedTasks = tasks.length ? (tasks.map(task => ({
      ...task,
      onRemove: () => openDeleteModal(task),
      onEdit: () => openEditModal(task),
    }))) : [];

    // Table data
    const rows = tasksTableRows(decoratedTasks);
    setTableRows(rows);
  };


  // Create Task Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = (needReload = false) => {
    setCreateModalOpen(false);
    if (needReload === true) {
      setLastUpdated(Date.now());
    }
  }

  // Edit Task Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = (task) => {
    setTaskToProcess(task);
    setEditModalOpen(true);
  }
  const closeEditModal = (needReload = false) => {
    setTaskToProcess(null);
    setEditModalOpen(false);
    if (needReload === true) {
      setLastUpdated(Date.now());
    }
  }

  // Delete Task Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = (task) => {
    setTaskToProcess(task);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = (needReload = false) => {
    setDeleteModalOpen(false);
    setTaskToProcess(null);
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
            Tasks
          </MDTypography>

        </MDBox>
        <MDButton variant="contained" color="dark" size="medium" onClick={openCreateModal}>
          <Icon>add</Icon>&nbsp;ADD NEW TASK
        </MDButton>

        <TaskDefinitionModal indicatorId={indicatorId} isOpen={createModalOpen} onClose={closeCreateModal} />
        <TaskEditModal task={taskToProcess} isOpen={editModalOpen} onClose={closeEditModal} />
        <TaskDeleteModal task={taskToProcess} isOpen={deleteModalOpen} onClose={closeDeleteModal} />
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

export default TasksTable;

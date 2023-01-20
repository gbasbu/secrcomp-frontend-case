import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'Task id', width: 250 },
  { field: 'project_name', headerName: 'Project Name', width: 250 },
  { field: 'task_name', headerName: 'Task Name', width: 250 },
  { field: 'status', headerName: 'Status', width: 250 }
]

export default function DataTable({ rows, setSelectedRows, setClickRowData }) {
  const handleClickEvent = params => {
    // set SelectedRows for delete all data
    params.length > 0 ? setSelectedRows(params) : setSelectedRows(null)
  }

  const handleRowClickEvent = (params, event, details) => {
    // Set click row data for get select row data
    setClickRowData(params.row)
  }

  return (
    <div style={{ height: 400, width: '100%', paddingTop: '50px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={handleRowClickEvent}
        onSelectionModelChange={handleClickEvent}
      />
    </div>
  )
}

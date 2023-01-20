import { useEffect, useState } from 'react'
import { Container } from '@mui/material'

// Components
import Button from './components/Button'
import Table from './components/Table'
import Dialog from './components/Dialog'

// Fake Data
import data from './assets/data/data.json'

function App() {
  const [isTableShow, setIsTableShow] = useState(false)
  const [selectedRows, setSelectedRows] = useState(null)
  const [clickRowData, setClickRowData] = useState(null)
  const [tableData, setTableData] = useState(data.tasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Buttons data
  const buttons = [
    {
      text: 'Show Tasks',
      variant: 'contained',
      sx: { mr: 3 },
      onClick: () => setIsTableShow(prev => !prev),
      show: true
    },
    {
      text: 'Create Task',
      variant: 'contained',
      sx: { mr: 3 },
      show: true,
      onClick: () => {
        setClickRowData(null)
        setIsDialogOpen(true)
      }
    },
    {
      text: 'Delete Task',
      variant: 'contained',
      color: 'error',
      show: selectedRows,
      onClick: () => handleDeleteTask()
    }
  ]

  const handleDeleteTask = () => {
    selectedRows.map(item => setTableData(prev => prev.filter(row => item !== row.id)))
  }

  // Open update dialog if row click
  useEffect(() => {
    if (!clickRowData) return
    setIsDialogOpen(true)
  }, [clickRowData])

  return (
    <div className="App">
      <Container sx={{ pt: 5 }}>
        {buttons.map((item, index) => (
          <Button
            key={index}
            variant={item.variant}
            sx={item.sx}
            color={item.color}
            text={item.text}
            onClick={item.onClick}
            show={item.show}
          />
        ))}
        {isTableShow && (
          <Table
            rows={tableData}
            setSelectedRows={setSelectedRows}
            setClickRowData={setClickRowData}
          />
        )}
      </Container>
      {/* Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setClickRowData(null)
        }}
        selectedRow={clickRowData}
        title={clickRowData ? 'Update Task' : 'Create Task'}
        buttonText={clickRowData ? 'Update' : 'Create'}
        tableData={tableData}
        setTableData={setTableData}
        task={clickRowData}
      />
    </div>
  )
}

export default App

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

// Components
import Button from '../Button'

export default function AlertDialog({ open, onClose, title, buttonText, selectedRow, tableData, setTableData, task }) {
  const [id, setId] = useState('')
  const [projectName, setProjectName] = useState('')
  const [taskName, setTaskName] = useState('')
  const [status, setStatus] = useState('Not Started')

  // Select Menu Items Data
  const items = [
    {
      label: 'Not Started'
    },
    {
      label: 'In Progress'
    },
    {
      label: 'Overdue'
    }
  ]

  // Get click row data and set
  useEffect(() => {
    if (!task) return
    setId(task.id)
    setProjectName(task.project_name)
    setTaskName(task.task_name)
    setStatus(task.status)
  }, [task])

  // Clear form data
  const clearForm = () => {
    setId('')
    setProjectName('')
    setTaskName('')
    setStatus('Not Started')
    onClose()
  }

  const handleChange = params => {
    setStatus(params.target.value)
  }

  const handleOnClick = () => {
    if (selectedRow) {
      // Update task
      const index = tableData.findIndex(item => item.id === task.id)
      const updatedData = tableData
      updatedData[index].id = id
      updatedData[index].project_name = projectName
      updatedData[index].task_name = taskName
      updatedData[index].status = status
      setTableData([...updatedData])
    } else {
      // Create new task
      setTableData(prev => [...prev, { id: id, project_name: projectName, task_name: taskName, status: status }])
    }
    clearForm()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          onClose()
          clearForm()
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent fullWidth>
          <TextField
            label="Id"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <TextField
            label="Project Name"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
            value={projectName}
            onChange={event => setProjectName(event.target.value)}
          />
          <TextField
            label="Task Name"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
            value={taskName}
            onChange={event => setTaskName(event.target.value)}
          />
          <FormControl
            fullWidth
            sx={{ mt: 4 }}
          >
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Age"
              onChange={handleChange}
            >
              {items.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.label}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ mb: 2 }}>
          <Button
            variant="contained"
            sx={{ mr: 2 }}
            text={buttonText}
            show={true}
            onClick={handleOnClick}
          />
        </DialogActions>
      </Dialog>
    </div>
  )
}

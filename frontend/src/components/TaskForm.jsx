import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  DialogActions
} from '@mui/material';

const STATUS_OPTIONS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
};

const TaskForm = ({ onClose, onAddTask, onUpdateTask, task }) => {
  const [newTask, setNewTask] = useState({ title: '', status: 'TODO', id: null });
  const [errors, setErrors] = useState({ title: '', status: '' });

  useEffect(() => {
    if (task) {
      setNewTask(task);
    } else {
      setNewTask({ title: '', status: 'TODO', id: null });
    }
  }, [task]);

  const validate = () => {
    let isValid = true;
    let errors = { title: '', status: '' };

    if (newTask.title.trim() === '') {
      errors.title = 'Title is required';
      isValid = false;
    }
    
    if (!newTask.status) {
      errors.status = 'Status is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({ ...prevTask, [name]: value.toUpperCase() })); 
  };

  const handleSubmit = () => {
    if (validate()) {
      if (newTask.id) {
        onUpdateTask(newTask);
      } else {
        onAddTask(newTask);
      }
      setNewTask({ title: '', status: 'TODO', id: null });
    }
  };

  return (
    <>
      <DialogTitle>{newTask.id ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the title and status of the task.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Task Title"
          type="text"
          fullWidth
          value={newTask.title}
          onChange={handleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
        <FormControl fullWidth margin="dense" error={Boolean(errors.status)}>
          <InputLabel>Task Status</InputLabel>
          <Select
            name="status"
            value={newTask.status || 'TODO'}
            onChange={handleChange}
            label="Task Status"
          >
            {Object.entries(STATUS_OPTIONS).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.status}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {newTask.id ? 'Update Task' : 'Add Task'}
        </Button>
      </DialogActions>
    </>
  );
};

export default TaskForm;

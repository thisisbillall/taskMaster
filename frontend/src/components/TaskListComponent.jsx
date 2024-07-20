import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  Divider,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TaskForm from './TaskForm'; 

const STATUS_COLORS = {
  TODO: 'rgba(255, 99, 71, 0.2)',         
  IN_PROGRESS: 'rgba(135, 206, 250, 0.2)',  
  DONE: 'rgba(169, 169, 169, 0.2)'         
};

// Defining the desired ordet of statuses
const STATUS_ORDER = ['IN_PROGRESS', 'TODO', 'DONE'];

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'EAT', status: 'DONE' },
    { id: 2, title: 'SLEEP', status: 'DONE' },
    { id: 3, title: 'CODE', status: 'IN_PROGRESS' },
    { id: 4, title: 'EAT', status: 'TODO' },
    { id: 5, title: 'REPEAT', status: 'TODO' },
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleClickOpen = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { id: tasks.length + 1, title: newTask.title, status: newTask.status }
    ]);
    handleClose();
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    handleClose();
  };

  // Function to get the order index of the status
  const getStatusOrderIndex = (status) => {
    return STATUS_ORDER.indexOf(status);
  };

  // Sorting tasks based on the order
  const sortedTasks = [...tasks].sort((a, b) => 
    getStatusOrderIndex(a.status) - getStatusOrderIndex(b.status)
  );

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">
          All Tasks
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleClickOpen(null)}
        >
          Add Task
        </Button>
      </Box>

      
      <List>
        {sortedTasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
          <ListItem
            key={task.id}
            style={{
              backgroundColor: STATUS_COLORS[task.status] || '#ffffff', 
              marginBottom: '8px',
              borderRadius: '4px',
              padding: '8px'
            }}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={task.title}
              secondary={task.status}
            />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {sortedTasks.filter(task => task.status === 'TODO').map(task => (
          <ListItem
            key={task.id}
            style={{
              backgroundColor: STATUS_COLORS[task.status] || '#ffffff',
              marginBottom: '8px',
              borderRadius: '4px',
              padding: '8px'
            }}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={task.title}
              secondary={task.status}
            />
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {sortedTasks.filter(task => task.status === 'DONE').map(task => (
          <ListItem
            key={task.id}
            style={{
              backgroundColor: STATUS_COLORS[task.status] || '#ffffff',
              marginBottom: '8px',
              borderRadius: '4px',
              padding: '8px'
            }}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleClickOpen(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={task.title}
              secondary={task.status}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <TaskForm
          onClose={handleClose}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          task={editingTask}
        />
      </Dialog>
    </Container>
  );
};

export default TaskList;

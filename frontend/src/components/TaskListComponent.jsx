import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'EAT',
      status: 'Done'
    },
    {
      id: 2,
      title: 'SLEEP',
      status: 'Done'
    },
    {
      id: 3,
      title: 'CODE',
      status: 'Ongoing'
    },
    {
      id: 4,
      title: 'EAT',
      status: 'Pending'
    },
    {
      id: 5,
      title: 'REPEAT',
      status: 'Pending'
    },
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ marginBottom: '16px' }}
      >
        Add New Task
      </Button>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={task.title}
              secondary={task.status}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;

import React, {  useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([
    {
        'id':1,
        'title':'EAT',
        'status':'Done'
    },
    {
        'id':2,
        'title':'SLEEP',
        'status':'Done'
    },
    {
        'id':3,
        'title':'CODE',
        'status':'Ongoing'
    },
    {
        'id':4,
        'title':'EAT',
        'status':'pending'
    },
    {
        'id':5,
        'title':'REPEAT',
        'status':'Pending'
    },
    
  ]);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  };

  return (
    <div>
      <h2>Tasks</h2>
      <a>Add New Task</a>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

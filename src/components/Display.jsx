import React from 'react';
import '../App.css';

function Display({ notCompletedTodos, inProgressTodos, completedTodos, onDelete, onDrop }) {

  
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id); 
    e.dataTransfer.effectAllowed = 'move'; 
    e.target.style.cursor = 'move'; 
  };

  
  const handleDragOver = (e) => {
    e.preventDefault();  
  };


  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('id'); 
    onDrop(todoId, newStatus);  
  };

  return (
    
    <div className="todo-container">
      
      <div
        className="todo-column"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'NotCompleted')}
      >
        <h2>Not Completed</h2>
        {notCompletedTodos.map(todo => (
          <div
            className="todo-item"
            key={todo.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, todo.id)}
          >
            <p>{todo.name}</p>
            <p>{todo.status}</p>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        ))}
        
      </div>

   
      <div
        className="todo-column"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'InProgress')}
      >
        <h2>In Progress</h2>
        {inProgressTodos.map(todo => (
          <div
            className="todo-item"
            key={todo.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, todo.id)}
          >
            <p>{todo.name}</p>
            <p>{todo.status}</p>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>

     
      <div
        className="todo-column"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'Completed')}
      >
        <h2>Completed</h2>
        {completedTodos.map(todo => (
          <div
            className="todo-item"
            key={todo.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, todo.id)}
          >
            <p>{todo.name}</p>
            <p>{todo.status}</p>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;
    
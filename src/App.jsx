import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Add from './components/Add';
import Display from './components/Display';

function TodoList() {
  const [todos, setTodos] = useState([]);

  
  const fetchTodos = async () => {
    const res = await axios.get('https://todo-c468f-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json');
    const fetchedTodos = res.data
      ? Object.entries(res.data).map(([id, todo]) => ({ id, ...todo }))
      : [];
    setTodos(fetchedTodos);
  };


  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

 
  const handleDelete = async (id) => {
    await axios.delete(`https://todo-c468f-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json`);
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };


  const handleDrop = async (id, newStatus) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = { ...updatedTodos[todoIndex], status: newStatus };
      
     
      await axios.put(`https://todo-c468f-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json`, updatedTodos[todoIndex]);

    
      setTodos(updatedTodos);
 
  };

  useEffect(() => {
    fetchTodos(); 
  }, []);

  
  const notCompletedTodos = todos.filter(todo => todo.status === 'NotCompleted');
  const inProgressTodos = todos.filter(todo => todo.status === 'InProgress');
  const completedTodos = todos.filter(todo => todo.status === 'Completed');

  return (
    <div>
      <Add onAddTodo={addTodo} />
      <Display
        notCompletedTodos={notCompletedTodos}
        inProgressTodos={inProgressTodos}
        completedTodos={completedTodos}
        onDelete={handleDelete}
        onDrop={handleDrop} 
      />
    </div>
  );
}

export default TodoList;

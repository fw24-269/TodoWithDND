import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Add({ onAddTodo }) {
  const [data, setData] = useState({ name: '', status: '' });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  
  const handleAdd = async () => {
    if (!data.name || !data.status) {
      alert('Please fill in both fields');
      return;
    }
    const res = await axios.post(
      'https://todo-c468f-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json',
      data
    );
    const newTodo = { id: res.data.name, ...data };
    onAddTodo(newTodo);
    setData({ name: '', status: 'NotCompleted' });
  };

  return (
    <div className='form'>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Enter todo name"
      />
      <select name="status" value={data.status} onChange={handleChange}>
        <option value="">Status</option>
        <option value="Completed">Completed</option>
        <option value="NotCompleted">Not Completed</option>
        <option value="InProgress">In Progress</option>
      </select>
      <button onClick={handleAdd}>Add Todo</button>
    </div>
  );
}

export default Add;


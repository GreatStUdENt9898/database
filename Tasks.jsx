import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tasks(){
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({Title:'', Description:'', Category:'', Budget:'', Deadline:'', Employer_ID:''});

  useEffect(()=>{ fetchTasks(); },[]);
  async function fetchTasks(){
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  }
  async function createTask(e){
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', form);
    setForm({Title:'', Description:'', Category:'', Budget:'', Deadline:'', Employer_ID:''});
    fetchTasks();
  }
  async function deleteTask(id){
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <form onSubmit={createTask} className="mb-4 grid grid-cols-2 gap-2">
        <input placeholder="Title" value={form.Title} onChange={e=>setForm({...form, Title:e.target.value})} />
        <input placeholder="Category" value={form.Category} onChange={e=>setForm({...form, Category:e.target.value})} />
        <input placeholder="Budget" value={form.Budget} onChange={e=>setForm({...form, Budget:e.target.value})} />
        <input placeholder="Deadline (YYYY-MM-DD)" value={form.Deadline} onChange={e=>setForm({...form, Deadline:e.target.value})} />
        <input placeholder="Employer ID" value={form.Employer_ID} onChange={e=>setForm({...form, Employer_ID:e.target.value})} />
        <textarea placeholder="Description" value={form.Description} onChange={e=>setForm({...form, Description:e.target.value})} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Create Task</button>
      </form>

      <div className="grid gap-2">
        {tasks.map(t=> (
          <div key={t.Task_ID} className="p-3 bg-white rounded shadow-sm">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{t.Title}</div>
                <div className="text-sm">{t.Description}</div>
                <div className="text-xs">Budget: {t.Budget} | Deadline: {t.Deadline} | Employer: {t.EmployerName}</div>
              </div>
              <div>
                <button onClick={()=>deleteTask(t.Task_ID)} className="text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

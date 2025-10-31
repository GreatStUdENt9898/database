import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users(){
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({Name:'', Email:'', Role:'Freelancer', Contact:'', Password:''});

  useEffect(()=>{ fetchUsers(); },[]);

  async function fetchUsers(){
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  }

  async function createUser(e){
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users', form);
    setForm({Name:'', Email:'', Role:'Freelancer', Contact:'', Password:''});
    fetchUsers();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <form onSubmit={createUser} className="mb-4 grid grid-cols-2 gap-2">
        <input placeholder="Name" value={form.Name} onChange={e=>setForm({...form, Name:e.target.value})} />
        <input placeholder="Email" value={form.Email} onChange={e=>setForm({...form, Email:e.target.value})} />
        <select value={form.Role} onChange={e=>setForm({...form, Role:e.target.value})}>
          <option>Freelancer</option>
          <option>Employer</option>
        </select>
        <input placeholder="Contact" value={form.Contact} onChange={e=>setForm({...form, Contact:e.target.value})} />
        <input placeholder="Password" value={form.Password} onChange={e=>setForm({...form, Password:e.target.value})} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Create</button>
      </form>

      <div className="grid gap-2">
        {users.map(u=> (
          <div key={u.User_ID} className="p-3 bg-white rounded shadow-sm">{u.Name} — {u.Email} — {u.Role}</div>
        ))}
      </div>
    </div>
  );
}

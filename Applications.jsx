import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Applications(){
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({Task_ID:'', Freelancer_ID:''});

  useEffect(()=>{ fetchApplications(); },[]);
  async function fetchApplications(){
    const res = await axios.get('http://localhost:5000/api/applications');
    setApplications(res.data);
  }
  async function apply(e){
    e.preventDefault();
    await axios.post('http://localhost:5000/api/applications', form);
    setForm({Task_ID:'', Freelancer_ID:''});
    fetchApplications();
  }
  async function updateStatus(id, status){
    await axios.put(`http://localhost:5000/api/applications/${id}/status`, { status });
    fetchApplications();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Applications</h2>
      <form onSubmit={apply} className="mb-4 grid grid-cols-2 gap-2">
        <input placeholder="Task ID" value={form.Task_ID} onChange={e=>setForm({...form, Task_ID:e.target.value})} />
        <input placeholder="Freelancer ID" value={form.Freelancer_ID} onChange={e=>setForm({...form, Freelancer_ID:e.target.value})} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Apply</button>
      </form>

      <div className="grid gap-2">
        {applications.map(a=> (
          <div key={a.App_ID} className="p-3 bg-white rounded shadow-sm flex justify-between">
            <div>
              <div className="font-semibold">{a.TaskTitle} — {a.FreelancerName}</div>
              <div className="text-sm">Status: {a.Status} | Applied: {a.Date_Applied}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>updateStatus(a.App_ID, 'Accepted')} className="px-2 py-1 border">Accept</button>
              <button onClick={()=>updateStatus(a.App_ID, 'Rejected')} className="px-2 py-1 border">Reject</button>
              <button onClick={()=>updateStatus(a.App_ID, 'Completed')} className="px-2 py-1 border">Complete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

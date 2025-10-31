import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Feedback(){
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({App_ID:'', Rating:5, Comment:''});

  useEffect(()=>{ fetchFeedback(); },[]);
  async function fetchFeedback(){
    const res = await axios.get('http://localhost:5000/api/feedback');
    setFeedbacks(res.data);
  }
  async function createFeedback(e){
    e.preventDefault();
    await axios.post('http://localhost:5000/api/feedback', form);
    setForm({App_ID:'', Rating:5, Comment:''});
    fetchFeedback();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Feedback</h2>
      <form onSubmit={createFeedback} className="mb-4 grid grid-cols-2 gap-2">
        <input placeholder="Application ID" value={form.App_ID} onChange={e=>setForm({...form, App_ID:e.target.value})} />
        <input type="number" min="1" max="5" value={form.Rating} onChange={e=>setForm({...form, Rating:e.target.value})} />
        <input placeholder="Comment" value={form.Comment} onChange={e=>setForm({...form, Comment:e.target.value})} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Submit Feedback</button>
      </form>

      <div className="grid gap-2">
        {feedbacks.map(f=> (
          <div key={f.Feedback_ID} className="p-3 bg-white rounded shadow-sm">
            <div className="font-semibold">Task: {f.TaskTitle || '—'}</div>
            <div>Rating: {f.Rating} — {f.Comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

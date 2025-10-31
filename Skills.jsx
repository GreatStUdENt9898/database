import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Skills(){
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({Skill_Name:'', Description:''});

  useEffect(()=>{ fetchSkills(); },[]);
  async function fetchSkills(){
    const res = await axios.get('http://localhost:5000/api/skills');
    setSkills(res.data);
  }
  async function createSkill(e){
    e.preventDefault();
    await axios.post('http://localhost:5000/api/skills', form);
    setForm({Skill_Name:'', Description:''});
    fetchSkills();
  }
  async function deleteSkill(id){
    await axios.delete(`http://localhost:5000/api/skills/${id}`);
    fetchSkills();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <form onSubmit={createSkill} className="mb-4 grid grid-cols-2 gap-2">
        <input placeholder="Skill name" value={form.Skill_Name} onChange={e=>setForm({...form, Skill_Name:e.target.value})} />
        <input placeholder="Description" value={form.Description} onChange={e=>setForm({...form, Description:e.target.value})} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Create Skill</button>
      </form>

      <div className="grid gap-2">
        {skills.map(s=> (
          <div key={s.Skill_ID} className="p-3 bg-white rounded shadow-sm flex justify-between">
            <div>
              <div className="font-semibold">{s.Skill_Name}</div>
              <div className="text-sm">{s.Description}</div>
            </div>
            <div>
              <button onClick={()=>deleteSkill(s.Skill_ID)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

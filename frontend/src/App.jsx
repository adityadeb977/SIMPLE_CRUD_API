import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const App = () => {
  const[showForm,setShowForm] = useState(false);
  const[name,setName]=useState('');
  const[age,setAge]=useState('');
  const[stream,setStream]=useState('');
  const[students,setStudents]=useState([]);
  const[update,setShowUpdate]=useState(false);
  const [updateId, setUpdateId] = useState(null);
  useEffect(()=>{
    fetchStudents();
  },[])
  const fetchStudents = async (e)=>{
    try {
      const response = await axios.get('http://localhost:3000/api/students');
    setStudents(response.data);

  }
    catch (error) {
      console.error('Error getting students');
      alert('Error Getting Students');
    }
  }
    
  const handleAddStudent = async (e) => {
      e.preventDefault();
    if(!name.trim())
    {
      alert('Name is required');
      return;
    }
    if(!age || age<1 ||age>120)
    {
      alert('Please enter valid age (1-120)');
      return;
    }
    if(!stream.trim())
    {
      alert('Please enter stream');
      return;
    }
    try {
      
    const response= await axios.post('http://localhost:3000/api/students',{
      name: name.trim(),
      age,
      stream: stream.trim()
    })
    setShowForm(false);
    setName('');
    setAge('');
    setStream('')
    await fetchStudents();
    alert('Student Added Successfully');

    } catch (error) {
      console.error(error);
      alert('Error Adding Student');
    }
  
  }
  const handleDeleteStudent = async(id)=>{
    try {
      const response = await axios.delete(`http://localhost:3000/api/students/${id}`);
      await fetchStudents();
      alert('Student Deleted Successfully');
    } catch (error) {
      console.error(error);
      alert('Error deleting student')
    }
  }
  const handleUpdateStudent = async(id)=>{
    try {
      const response=await axios.put(`http://localhost:3000/api/students/${id}`,{
        name: name.trim(),
        age,
        stream: stream.trim()
      });
      await fetchStudents();
      setShowUpdate(false);
      alert('Student Updated Successfully')
    } catch (error) {
      console.error(error);
      alert('Error Updating Student');
    }
  }
  return (
    <div className='bg-blue-50 shadow-md min-h-screen'>
      <div className='bg-blue-400 text-center py-5'>
        <h1 className="inline-block pt-5 pb-5 bg-zinc-200 rounded-lg px-6 shadow-md">Simple CRUD Project</h1>
      </div>
      <div className='flex justify-between py-5'>
        <p className='mx-40 px-6 py-3 bg-zinc-200 rounded-lg shadow-md'>Students</p>
        <button className='mx-40 px-6 py-3 bg-zinc-200 rounded-lg shadow-md hover:bg-zinc-300' onClick={()=>setShowForm(true)}>Add Student</button>
      </div>
      {showForm &&
      <form onSubmit={handleAddStudent} className='mx-40 py-6 px-3 bg-fuchsia-300 rounded-xl shadow-md'>
        <input className='block px-3 py-3 outline-none' type="text" value={name} placeholder='Enter Student Name' onChange={(e)=>setName(e.target.value)}/>
        <input className='block px-3 py-3 outline-none' type="number" value={age} placeholder='Enter Student Age' onChange={(e)=>setAge(e.target.value)}/>
        <input className='block px-3 py-3 outline-none' type="text" value={stream} placeholder='Enter Student Stream' onChange={(e)=>setStream(e.target.value)}/>
        <div className='flex justify-between'>
        <button type='submit' className='px-3 py-3 bg-fuchsia-700 rounded-xl shadow-md hover:bg-fuchsia-800' >Add Student</button>
        <button type="button" className='px-8 py-3 bg-fuchsia-700 rounded-xl shadow-md hover:bg-fuchsia-800' onClick={()=>setShowForm(false)}>Close</button>
        </div>
      </form>}
      {students.length=== 0 ? (<p className='mx-40 py-6 px-3 bg-red-500 shadow-md rounded-xl text-center text-white'>No Students Yet</p>): (
        <div className='grid grid-cols-3 gap-4'>
          
            {students.map((student)=>(
               <div key={student._id} className='bg-white shadow-md rounded-lg border border-gray-200 p-6'> 
               <h3 className='text-lg font-bold text-blue-600 mb-3'>{student.name}</h3>
              <p className='text-gray-700 mb-2'>
                <span className='font-semibold'>Age: </span>{student.age}
              </p>
              <p className='text-gray-700'>
                  <span className='font-semibold'>Stream: </span>{student.stream}
              </p>
              <div className='flex justify-between'>
                <button type="button" className='py-3 px-3 bg-red-500 hover:bg-red-600 rounded-lg shadow-md text-white' onClick={()=>handleDeleteStudent(student._id)}>Delete</button>
                <button type="button" className='py-3 px-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md text-white' onClick={()=>{
                  setShowUpdate(true);
                  setUpdateId(student._id);
                  setName(student.name);
                  setAge(student.age);
                  setStream(student.stream);
                }}>Update</button>
              </div>
               </div>
            ))}
          
        </div>
      )}
      {update &&
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          handleUpdateStudent(updateId)}}
          className='mx-40 py-6 px-6 bg-fuchsia-200 mt-3 rounded-lg shadow-md'>
          <input className='block outline-none py-3 px-3 mb-2 w-full' type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input className='block outline-none py-3 px-3 mb-2 w-full' type="number" placeholder='Enter Age' value={age} onChange={(e)=>setAge(e.target.value)}/>
          <input className='block outline-none py-3 px-3 mb-2 w-full' type="text" placeholder='Enter Stream' value={stream} onChange={(e)=>setStream(e.target.value)}/>
          <div className='flex justify-between'>
          <button type='submit' className='py-3 px-3 bg-fuchsia-700 rounded-xl shadow-md hover:bg-fuchsia-500'>Update</button>
          <button type='button' className='py-3 px-3 bg-gray-500 rounded-xl shadow-md hover:bg-gray-600' onClick={()=>setShowUpdate(false)}>Close</button>
          </div>
        </form>
      </div>
}
    </div>
  )
}

export default App
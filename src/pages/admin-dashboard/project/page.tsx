import React, { useEffect } from 'react'
import { DataTable } from './components/data-table'
import axios from 'axios'
import { Button } from 'antd'
import UpdateDialog from './components/updateDialog'


export default function Project() {
  const [Project, setProject] = React.useState([])
  useEffect(() => {
    axios.get("http://localhost:4000/api/project")
      .then(res => {
        setProject(res?.data?.response?.data || [])
        console.log(res?.data?.response?.data)
      })
  }, [])


  return (
    <div>
      <h1 className='text-2xl font-extrabold flex justify-between items-center gap-4'>
        <h1>Project Management</h1>
        <Button type='default' size='large' className='bg-primary text-white'>Create</Button>
      </h1>
      <div>
        <DataTable data={Project} />
        <UpdateDialog />
      </div>
    </div>
  )
}

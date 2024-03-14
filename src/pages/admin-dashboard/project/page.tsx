import React, { useEffect } from 'react'
import { DataTable } from './components/data-table'
import axios from 'axios'
import { Button } from 'antd'
import UpdateDialog from './components/updateDialog'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'


export default function Project() {
  const navigate = useNavigate()
  const [Project, setProject] = React.useState([])
  const trigger = useAppSelector((state) => state.trigger.trigger)
  useEffect(() => {
    axios.get("http://localhost:4000/api/project")
      .then(res => {
        setProject(res?.data?.response?.data || [])
        console.log(res?.data?.response?.data)
      })
  }, [trigger])


  return (
    <div>
      <h1 className='text-2xl font-extrabold flex justify-between items-center gap-4'>
        <h1>Project Management</h1>
        <Button type='default' size='large' className='bg-primary text-white' onClick={() => navigate("/admin-dashboard/project/create")}>Create</Button>
      </h1>
      <div>
        <DataTable data={Project} />
        <UpdateDialog />
      </div>
    </div>
  )
}

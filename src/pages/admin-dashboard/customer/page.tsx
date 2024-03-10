import React, { useEffect } from 'react'
import { DataTable } from './components/data-table'
import axios from 'axios'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'


export default function CustomerPage() {
  const [customer, setCustomer] = React.useState([])
  const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:4000/api/customer")
        .then(res => {
            setCustomer(res?.data?.data)
        })
    }, [])


  return (
    <div>
        <h1 className='text-2xl font-extrabold flex justify-between items-center gap-4'>
            <h1>Customer Management</h1>
            <Button type='default' size='large' className='bg-primary text-white'
              onClick={() => navigate("/admin-dashboard/customer/create")}
            >Create</Button>
        </h1>
        <div>
            <DataTable data={customer}/>
        </div>
    </div>
  )
}

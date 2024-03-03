import React, { useEffect } from 'react'
import { DataTable } from './components/data-table'
import axios from 'axios'
import { Button } from 'antd'


export default function CustomerPage() {
  const [customer, setCustomer] = React.useState([])
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
            <Button type='default' size='large' className='bg-primary text-white'>Create</Button>
        </h1>
        <div>
            <DataTable data={customer}/>
        </div>
    </div>
  )
}

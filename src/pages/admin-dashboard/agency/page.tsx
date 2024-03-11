import React, { useEffect } from 'react'
import { DataTable } from './components/data-table'
import axios from 'axios'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const res = {
    "status": 200,
    "message": "Lấy thành công danh sách đại lý",
    "data": [
        {
            "AgencyId": 1,
            "UserId": 4,
            "Name": "ABC Realty",
            "Email": "ABCRealty@gmail.com ",
            "PhoneNumber": "0123456788",
            "User": {
                "UserId": 4,
                "Username": "agency_1",
                "Password": "123456",
                "Role": "agency"
            }
        }
    ]
}
export default function AgencyPage() {
  const [agencies, setAgencies] = React.useState([])
    useEffect(() => {
        axios.get("http://localhost:4000/api/agency")
        .then(res => {
            setAgencies(res?.data?.data)
        })
    }, [])

    const navigate = useNavigate()


  return (
    <div>
        <h1 className='text-2xl font-extrabold flex justify-between items-center gap-4'>
            <h1>Agency Management</h1>
            <Button type='default' size='large' className='bg-primary text-white' onClick={() => {
                navigate('/admin-dashboard/agency/create')
            }}>Create</Button>
        </h1>
        <div>
            <DataTable data={agencies}/>
        </div>
    </div>
  )
}

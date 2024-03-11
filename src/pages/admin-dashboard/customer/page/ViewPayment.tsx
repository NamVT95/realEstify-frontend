import React, { useEffect } from 'react'
import axios from 'axios'
import { DataTable } from './components/data-table'
import { useParams } from 'react-router-dom'
import { columns } from './components/columns'

export default function ViewPayment() {
    const [booking, setBooking] = React.useState([])
    const {id} = useParams()
    console.log(id)

    useEffect(() => {
        axios.get("http://localhost:4000/api/booking")
        .then(res => {
            console.log(res?.data?.data)
            console.log(res?.data?.data?.filter((data: any) => data.CustomerId == id))
            setBooking(res?.data?.data?.filter((data: any) => data.CustomerId == id))
        })
        .catch(err => {
            console.log(err)
        }
        )

    }, [])


  return (
    <div><h1 className='font-bold text-2xl'>
        View Payment
        </h1>

        <div className='mt-4'>
            <DataTable data={booking} columns={columns} />
        </div>
        
    </div>
  )
}

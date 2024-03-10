import React, { useEffect } from 'react'
import { BOOKING_DATA } from '../booking/data/data'
import { columns } from '../booking/components/columns'
import { DataTable } from '../booking/components/data-table'
import axios from 'axios'

export default function ViewBookingCustomer() {
    const [booking, setBooking] = React.useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/api/booking")
        .then(res => {
            console.log(res?.data)
        })
        .catch(err => {
            console.log(err)
        }
        )

    }, [])


  return (
    <div><h1>
        View Booking Customer
        </h1>

        <div className='mt-4'>
            <DataTable data={BOOKING_DATA} columns={columns} />
        </div>
        
    </div>
  )
}

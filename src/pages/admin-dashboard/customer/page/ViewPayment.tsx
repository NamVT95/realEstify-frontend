import React, { useEffect } from 'react'
import axios from 'axios'
import { DataTable } from './components/data-table'
import { useParams } from 'react-router-dom'
import { columns } from './components/columns'
import { Card, CardHeader } from '@/components/ui/card'
import { format } from 'date-fns'
import { Badge } from 'antd'

export default function ViewPayment() {
    const [booking, setBooking] = React.useState([])
    const {id} = useParams()
    console.log(id)

    const [payments, setPayments] = React.useState([
        {
            "PaymentProcessDetailsId": 4,
            "PaymentProcessId": 2,
            "PaymentDate": null,
            "Time": 1,
            "Amount": 0.4,
            "Status": "Not Yet Paid",
            "Description": "Không có ghi chú"
        },
        {
            "PaymentProcessDetailsId": 5,
            "PaymentProcessId": 2,
            "PaymentDate": null,
            "Time": 2,
            "Amount": 0.4,
            "Status": "Not Yet Paid",
            "Description": "Không có ghi chú"
        }
    ])

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
    <div>
        {/* button go to previous page */}
        <button
            onClick={() => window.history.back()}
            className='bg-primary text-white p-2 rounded-md mb-4'
        >
            Go back
        </button>
        
        <h1 className='font-bold text-2xl'>
        View Payment
        </h1>

        <div className='mt-4 grid gap-10 grid-cols-2'>
            {
                payments?.length == 0 || payments == null ? (
                    <div>Không có dữ liệu</div>
                ) : (
                    <>
                        {
                payments.map((payment: any) => {
                    
                    return (
                        <Card>
                            <CardHeader>
                                <div className='flex justify-between gap-4'>
                                    <div className='flex flex-col justify-between'>
                                        <div className='font-bold flex gap-2'>Payment Id: {payment.PaymentProcessDetailsId} - <div className='font-bold'>Lần thứ: {payment.Time}</div></div>
                                        
                                        <div className='font-bold'>Số tiền: {payment.Amount} tỷ</div>
                                        <div className='font-bold'>
                                            Hạn trả: {
                                                payment.PaymentDate != null ?
                                                format(new Date(payment.PaymentDate), "dd/MM/yyyy")
                                                : (null)
                                            }
                                        </div>
                                    </div>
                                    <div className='flex gap-4 flex-col'>
                                       <Badge className='p-2 rounded-full bg-primary text-white font-semibold'>{payment.Status}</Badge>
                                        
                                    </div>
                                </div>
                                <div className='font-bold'>Description: {payment.Description}</div>
                            </CardHeader>
                        </Card>
                    )})
            }
                    </>
                )
            }
        </div>
        
    </div>
  )
}

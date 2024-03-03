import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { BOOKING_DATA, MOCK_BOOKING_DATA } from './data/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { get } from 'http'
import { getPeddingBooking } from '@/lib/api/getPeddingBooking'

export default function BookingManagement() {
  const [data, setData] = useState([])

  useEffect(() => {
    const handleGetPeddingBooking = async () => {
      try {
        const res = await getPeddingBooking()
        console.log(res.response.data)
        setData(res.response.data)
      } catch (error) {
        console.log(error)
      }
    }
    handleGetPeddingBooking()
  }, [])

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='font-bold text-2xl'>Booking Management</h1>
      </div>
      <div className='bg-white p-2'>
        <Tabs defaultValue="cho-xac-nhan">
          <TabsList>
            <TabsTrigger value="cho-xac-nhan">Chờ xác nhận</TabsTrigger>
            <TabsTrigger value="da-xac-nhan">Đơn đã xác nhận</TabsTrigger>
          </TabsList>
          <TabsContent value="cho-xac-nhan">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          {/* <TabsContent value="da-xac-nhan">
            <DataTable data={MOCK_BOOKING_DATA} columns={columns} />
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  )
}

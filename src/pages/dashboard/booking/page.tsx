import { DataTable } from './components/data-table'
import { DataTable2 } from "./selectPropertyTable/data-table";
import { columns } from './components/columns'
import { BOOKING_DATA, MOCK_BOOKING_DATA } from './data/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { get } from 'http'
import { getPeddingBooking } from '@/lib/api/getPeddingBooking'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { getApproveBooking } from '@/lib/api/getApproveBooking'
import { getRejectedBooking } from '@/lib/api/getRejectBooking'
import { Button } from '@/components/ui/button'
import { switchTrigger } from '@/store/renderTrigger'

export default function BookingManagement() {
  const [data, setData] = useState([])
  const [approvedData, setApprovedData] = useState([])
  const [openingForSales, setOpeningForSales] = useState([])
  const [rejectedData, setRejectedData] = useState([])
  const { trigger } = useAppSelector((state) => state.trigger)
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    const handleGetPeddingBooking = async () => {
      try {
        const res = await getPeddingBooking(user.id || 0)
        setData(res)
      } catch (error) {
        console.log(error)
      }
    }
    const handleGetApprovedBooking = async () => {
      try {
        const res = await getApproveBooking(user.id || 0)
        setApprovedData(res || [])
      } catch (error) {
        console.log(error)
      }
    }
    const handleGetIsSelectedBooking = async () => {
      try {
        const res = await getApproveBooking(user.id || 0)
        setOpeningForSales(res || [])
      } catch (error) {
        console.log(error)
      }
    }

    const handleGetRejectedBooking = async () => {
      try {
        const res = await getRejectedBooking(user.id || 0)
        setRejectedData(res || [])
      } catch (error) {
        console.log(error)
      }
    }
    handleGetRejectedBooking()
    handleGetPeddingBooking()
    handleGetApprovedBooking()
    handleGetIsSelectedBooking()
  }, [trigger, user.id])

  return (
    <div className='flex flex-col gap-8'>
      <div className='w-full flex gap-4 justify-between items-center'>
        <h1 className='font-bold text-2xl'>Booking Management</h1>
        <Button onClick={() => dispatch(switchTrigger())}>
          Reload Data
        </Button>
      </div>
      <div className='bg-white p-2'>
        <Tabs defaultValue="cho-xac-nhan">
          <TabsList >
            <TabsTrigger value="cho-xac-nhan">Chờ xác nhận</TabsTrigger>
            <TabsTrigger value="da-xac-nhan">Đơn đã xác nhận</TabsTrigger>
            <TabsTrigger value="da-huy-bo">Đơn đã hủy</TabsTrigger>
            <TabsTrigger value="da-trong-gio">Đơn trong giờ mở bán</TabsTrigger>
          </TabsList>
          <TabsContent value="cho-xac-nhan">
            <DataTable data={data} columns={columns} />
          </TabsContent>
          <TabsContent value="da-xac-nhan">
            <DataTable data={approvedData} columns={columns} />
          </TabsContent>
          <TabsContent value="da-huy-bo">
            <DataTable data={rejectedData} columns={columns} />
          </TabsContent>
          <TabsContent value="da-trong-gio">
            <DataTable2 data={openingForSales} columns={columns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

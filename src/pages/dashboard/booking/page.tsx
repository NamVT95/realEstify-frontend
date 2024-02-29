import { DataTable } from './components/data-table'
import { columns } from './components/columns'

export default function BookingManagement() {
  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h1 className='font-bold text-2xl'>Booking Management</h1>
      </div>
      <div className='bg-white p-2'>
        <DataTable data={[]} columns={columns} />
      </div>
    </div>
  )
}

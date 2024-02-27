import Header from '@/pages/dashboard/components/Header'
import Sidebar from '@/pages/dashboard/components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className='h-screen flex flex-col'>
        <Header />
        <div className='flex-1'>
            <Sidebar />
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

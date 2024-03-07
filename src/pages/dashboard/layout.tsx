import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export default function DashboardLayout() {
  return (
    <div className='h-screen flex flex-col'>
        <Header />
        <div className='flex-1 flex'>
            <Sidebar />
            <div className='flex-1 p-4 bg-slate-100'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

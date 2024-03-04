import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import Avatar from "@/assets/hero.jpg"
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { logout } from '@/store/auth/loginUserSlice'

export default function Header() {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john@gmail.com"
  })

  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 bg-primary z-50 text-white">
      <nav className="flex items-center py-5 px-10 justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white ">RealEstify Staff Dashboard</h1>
        </div>
        <div className="">
          {
            currentUser && (
              <Popover>
                <PopoverTrigger>
                  <div className="flex gap-2 items-center">
                    <div>
                      <img src={Avatar} alt="profile" className="w-10 h-10 rounded-full" />
                    </div>
                    User
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2">
                    <Link to={"/dashboard/setting"}>Profile</Link>
                    <Button type="button" onClick={() => {
                      dispatch(logout());
                      setTimeout(() => {
                        navigate("/login")
                      }, 1000);

                    }}>Logout</Button>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </nav>
    </header>
  )
}

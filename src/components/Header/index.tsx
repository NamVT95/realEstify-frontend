import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Avatar from "@/assets/hero.jpg"
export default function Header() {
  // check current user get from redux or state(call api)
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "John Doe",
    email: "john@gmail.com"
  })


  return (
    <header className="sticky top-0 bg-white z-50">
      <nav className="flex items-center py-5 px-10 justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-700 ">RealEstify</h1>
        <div className="ml-10">
          <ul className="md:flex space-x-8 hidden ">
            <li><Link to={"/"} className="text-gray-800 font-semibold">Listings</Link></li>
            <li><Link to={"/about"} className="text-gray-800 font-semibold">About</Link></li>
            <li><Link to={"/contact"} className="text-gray-800 font-semibold">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="">
        {
          currentUser ? (
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
                    <Link to={"/profile"}>Profile</Link>
                    <Link to={"/settings"}>Settings</Link>
                    <Link to={"/logout"}>Logout</Link>
                  </div>
                </PopoverContent>
              </Popover>
          ) : (
            <Link to={"/login"}>
              <Button type="button">Login</Button>
            </Link>
          )
        }
      </div>
      </nav>
    </header>
  )
}

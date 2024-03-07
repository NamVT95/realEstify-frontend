import { cx } from "class-variance-authority"
import { BookImageIcon, CogIcon, HomeIcon, Menu, Ticket, User2, XIcon } from "lucide-react"
import { useState } from "react"
import { CSSTransition } from "react-transition-group"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Home",
    icon: (
      <HomeIcon className="w-8 h-8" />
    ),
    link: "/dashboard"
  },
  {
    title: "Booking Management",
    icon: (
      <Ticket className="w-8 h-8" />
    ),
    link: "/dashboard/booking"
  },
  {
    title: "Profile Setting",
    icon: (
      <CogIcon className="w-8 h-8" />
    ),
    link: "/dashboard/setting"
  }
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  return (
    <div className={cx("sidebar", { "sidebar-closed": !isOpen })}>
      <button
        className={"flex items-center ml-2"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {!isOpen ? <Menu /> : <XIcon />}
      </button>
      <ul className="mt-4 flex flex-col gap-2">
        {menuItems.map(item => (
          <Link to={item.link} key={item.title}>
            <div
              className={cn(
                "flex gap-4 items-center cursor-pointer hover:bg-primary hover:text-white rounded-sm p-2 font-semibold",
                location.pathname.toLowerCase() == item.link.toLowerCase() &&
                  "bg-primary text-white"
              )}
            >
              {item.icon}
              <CSSTransition
                in={isOpen}
                timeout={200}
                classNames={"fade"}
                unmountOnExit
              >
                <span>{item.title}</span>
              </CSSTransition>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

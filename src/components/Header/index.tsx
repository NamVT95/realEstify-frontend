import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Header() {
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
        <Link to={"/login"}>
          <Button type="button">Login</Button>
        </Link>
      </div>
      </nav>
    </header>
  )
}

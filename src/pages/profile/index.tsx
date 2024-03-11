import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { formatPrice } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { updateInfo } from "@/store/auth/loginUserSlice";
import { Form, Input } from 'antd';
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


    // id: 14,
    // Username: 'test_9',
    // Role: 'customer',
    // Email: 'nguyenvanB@gmail.com',
    // PhoneNumber: '0123456787',
    // Address: 'Thủ Đức',
    // FullName: 'Nguyễn Văn B',
    
type FieldType = {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
};
export default function ProfilePage() {
    const [userData, setUserData] = useState<any>({})
    const user = useAppSelector(state => state.loginUser.user)

    const [bookings, setBookings] = useState<any[]>([])
    const dispatch = useAppDispatch()

    console.log(user)

    //call api to get user data
    useEffect(() => {
        const fetchUserData = async () => {
            //get user from redux
            // const { data, error } = await getUserById(userId)
            // if (error) {
            //     console.log(error)
            //     return
            // }
            // if (data != null) {
            //     setUserData(data?.data)
            // }
        }
        fetchUserData()
    }, [])

    const onFinish = (values: FieldType) => {
        console.log('Success:', values);
      //   call ap
          axios.put("http://localhost:4000/api/customer/"+user?.id, {
                fullName: values.fullname,
                email: values.email,
                phoneNumber: values.phoneNumber,
                address: values.address,
          })
          .then(res => {
              console.log(res)
              toast.success("Update successfully")
              dispatch(updateInfo({user: {...user, 
                FullName: values.fullname,
                Email: values.email,
                PhoneNumber: values.phoneNumber,
                Address: values.address,
            }}))
          })
          .catch(err => {
              console.log(err)
                toast.error("Update failed")
          })
      };

    //call api to get user data
    useEffect(() => {
        const fetchUserData = () => {
            axios.get("http://localhost:4000/api/booking")
            .then(res => {
                console.log((res?.data?.data as any[]).filter(item => item.CustomerId = user?.id))
                setBookings((res?.data?.data as any[]).filter(item => item.CustomerId = user?.id))
            
            })
            .catch(err => {
                console.log(err)
            })
        }
        fetchUserData()
    }, [])

    const currentUser  = useAppSelector(state => state.loginUser.user)
    console.log(currentUser)



  return (
    <div>
        <Header />
        <div className="bg-gray-100">
            <h1 className="container text-2xl p-4 font-bold">
                Profile Page
            </h1>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src={"https://avatar.iran.liara.run/public/boy?username="+currentUser?.FullName || "Real"} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                <h1 className="text-xl font-bold">{currentUser?.FullName}</h1>
                                <p className="text-gray-700">{currentUser?.Role}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">General Information</h2>

                            <div>
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    initialValues={{ 
                                        fullname: currentUser?.FullName,
                                        email: currentUser?.Email,
                                        phoneNumber: currentUser?.PhoneNumber,
                                        address: currentUser?.Address
                                     }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    
                                >
                                    <Form.Item<FieldType>
                                        label="Full Name"
                                        name="fullname"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Phone Number"
                                        name="phoneNumber"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Address"
                                        name="address"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>


                                    <Button type="submit">
                                        Update
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gray-100">
            <h1 className="container text-2xl p-4 font-bold">
                Booking History
            </h1>
         
            <div className="p-8 rounded-md bg-white border shadow container">
                {
                    bookings.length > 0 ? (
                        <div>
                            {
                                bookings.map((booking, index) => (
                                    <div key={index} className="flex justify-between items-center border-b py-4">
                                        <div>
                                            <p>Booking ID: {booking?.BookingId}</p>
                                            <p>Booking Date: {format(new Date(booking?.BookingDate), "PPP")}</p>
                                            <p className="flex items-center gap-2">Booking Status: <div className={cn("py-1 px-2 rounded-full", booking?.Status == "Approved" ? "bg-green-200 text-green-600" : "bg-slate-200 text-slate-600")}>{booking?.Status}</div></p>
                                            <p>Payment method: {booking?.SelectionMethod}</p>
                                            <p>Agency Name: {booking?.Agency?.Name}</p>
                                            <p>Project Name: {booking?.Project?.Name}</p>
                                            <p>Amount Deposit: {formatPrice(booking?.AmountDeposit)}</p>
                                        </div>
                                        <div>
                                            <Link to={"/detail/"+booking?.Project?.ProjectId}>
                                                <Button>
                                                    View Project
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div>
                            <p>No booking history</p>
                        </div>
                    )
                }
            </div>
            
        </div>
        <Footer />
    </div>
  )
}

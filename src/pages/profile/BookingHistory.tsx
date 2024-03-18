import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { formatPrice } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { updateInfo } from "@/store/auth/loginUserSlice";
import { Form, Input } from 'antd';
import axios from "axios";
import { format, set } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentHistory from "./PaymentHistory";



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
export default function BookingHistory() {
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
        axios.put("http://localhost:4000/api/customer/" + user?.id, {
            fullName: values.fullname,
            email: values.email,
            phoneNumber: values.phoneNumber,
            address: values.address,
        })
            .then(res => {
                console.log(res)
                toast.success("Update successfully")
                dispatch(updateInfo({
                    user: {
                        ...user,
                        FullName: values.fullname,
                        Email: values.email,
                        PhoneNumber: values.phoneNumber,
                        Address: values.address,
                    }
                }))
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
                    console.log(user?.id)
                    console.log((res?.data?.data as any[]).filter(item => item.Customer.UserId == user?.id))
                    setBookings((res?.data?.data as any[]).filter(item => item.Customer.UserId == user?.id))

                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchUserData()
    }, [])

    const currentUser = useAppSelector(state => state.loginUser.user)

    const [message, setMessage] = useState<string>("Bấm vào nút View Payment để xem")

    const [payments, setPayments] = useState<any[]>([])
    // const [payments, setPayments] = useState([
    //     {
    //         "PaymentProcessDetailsId": 4,
    //         "PaymentProcessId": 2,
    //         "PaymentDate": null,
    //         "Time": 1,
    //         "Amount": 0.4,
    //         "Status": "Not Yet Paid",
    //         "Description": "Không có ghi chú"
    //     },
    //     {
    //         "PaymentProcessDetailsId": 5,
    //         "PaymentProcessId": 2,
    //         "PaymentDate": null,
    //         "Time": 2,
    //         "Amount": 0.4,
    //         "Status": "Not Yet Paid",
    //         "Description": "Không có ghi chú"
    //     }
    // ])

    const handleClickPayment = (bookingId: number) => {
        axios.get("http://localhost:4000/api/customer/debt/" + bookingId)
            .then(res => {
                console.log(res)
                setPayments(res?.data?.response?.data)
            })
            .catch(err => {
                console.log(err)
                setPayments([])
                setMessage("Không có đợt trả góp của booking có id: " + bookingId)
                toast.info("Không có đợt trả góp của booking có id: " + bookingId)
            })
    }

    return (
        <div>
            <Header />
            <div className="bg-gray-100">
                <h1 className="container text-2xl p-4 font-bold">
                    Booking History
                </h1>

                <div className="grid p-8 gap-4">
                    <div className="rounded-md bg-white border shadow container col-span-1">
                        {
                            bookings.length > 0 ? (
                                <div>
                                    {
                                        bookings.map((booking, index) => (
                                            <>
                                            <div key={index} className="flex justify-between items-center border-b py-4">
                                                <div>
                                                    <p>User ID: {booking?.Customer?.UserId}</p>
                                                    <p>Booking ID: {booking?.BookingId}</p>
                                                    <p>Booking Date: {format(new Date(booking?.BookingDate), "PPP")}</p>
                                                    <p className="flex items-center gap-2">Booking Status: <div className={cn("py-1 px-2 rounded-full", booking?.Status == "Approved" ? "bg-green-200 text-green-600" : "bg-slate-200 text-slate-600")}>{booking?.Status}</div></p>
                                                    <p>Payment method: {booking?.SelectionMethod}</p>
                                                    <p>Agency Name: {booking?.Agency?.Name}</p>
                                                    <p>Project Name: {booking?.Project?.Name}</p>
                                                    <p>Amount Deposit: {formatPrice(booking?.AmountDeposit)}</p>
                                                </div>
                                                <div className="flex flex-col gap-2 justify-stretch items-stretch">
                                                    <Link to={"/detail/" + booking?.Project?.ProjectId}>
                                                        <Button>
                                                            View Project
                                                        </Button>
                                                    </Link>
                                                    <Button onClick={() => handleClickPayment(booking?.BookingId)}>
                                                        View Payment
                                                    </Button>
                                                </div>
                                            </div>
                                            <PaymentHistory bookingId={booking?.BookingId} projectId={booking?.Project?.ProjectId}/>
                                            </>
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
                    <div className="col-span-1">
                        
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

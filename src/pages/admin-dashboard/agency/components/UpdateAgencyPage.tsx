import { Button } from "@/components/ui/button";
import { Form, Input } from 'antd';
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
    FullName?: string;
    Email?: string;
    PhoneNumber?: string;
    Address?: string;
};
export default function UpdateAgencyPage() {
    const [userData, setUserData] = useState<any>({
        Name: "",
        Email: "",
        PhoneNumber: "",
    })
    const { id } = useParams()
    const navigate = useNavigate()


    const onFinish = (values: FieldType) => {
        console.log('Success:', values);
        //   call ap
        axios.put("http://localhost:4000/api/customer/" + userData?.UserId, {
            fullName: values.FullName,
            email: values.Email,
            phoneNumber: values.PhoneNumber,
            address: values.Address,
        })
            .then(res => {
                console.log(res)
                toast.success("Update successfully")
                navigate("/admin-dashboard/customer")

            })
            .catch(err => {
                console.log(err)
                toast.error("Update failed")
            })
    };

    //call api to get user data
    useEffect(() => {
        const fetchUserData = () => {
            axios.get("http://localhost:4000/api/agency/"+id)
                .then(res => {
                    console.log((res?.data?.data as any[]))
                    setUserData((res?.data?.data as any[]))

                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchUserData()
    }, [])


    const { register, handleSubmit, formState: { errors }, setValue} = useForm();
    const onSubmit = (data:any) => {
        console.log(data);

        axios.put("http://localhost:4000/api/agency/" + id, {
            UserId: userData?.UserId,
            Name: data?.Name,
            Email: data?.Email,
            PhoneNumber: data?.PhoneNumber,
        })
        .then(res => {
            toast.success("Update successfully")
            navigate("/admin-dashboard/agency")
        })
        .catch(err => {
            console.log(err)
            toast.error("Update failed")
        })

    
    };
    
    useEffect(() => {
        setValue("Name", userData?.Name)
        setValue("Email", userData?.Email)
        setValue("PhoneNumber", userData?.PhoneNumber)
    }, [userData])

    console.log(errors);

    // CustomerId: 17,
    // UserId: 15,
    // FullName: 'Admin1',
    // Email: 'admin@gmail.com',
    // PhoneNumber: '0902930932',
    // Address: 'HCM',
    return (
        <div>
            <div className="bg-gray-100">
                <h1 className="container text-2xl p-4 font-bold">
                    Agency Information:  Id={userData?.CustomerId}
                </h1>
                <div className="container mx-auto py-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <label className="text-sm font-semibold" htmlFor="Name">Name</label>
      <input className="py-2 border rounded-sm px-2" type="text" placeholder="Name" {...register("Name", {})} />
      <label className="text-sm font-semibold" htmlFor="Email">Email</label>
      <input className="py-2 border rounded-sm px-2" type="email" placeholder="Email" {...register("Email", {})} />
      <label className="text-sm font-semibold" htmlFor="PhoneNumber">PhoneNumber</label>
      <input className="py-2 border rounded-sm px-2" type="text" placeholder="PhoneNumber" {...register("PhoneNumber", {})} />

      <Button type="submit">
        Submit
      </Button>
    </form>
                </div>
            </div>
            {/* <div className="bg-gray-100">
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
            
        </div> */}
        </div>
    )
}

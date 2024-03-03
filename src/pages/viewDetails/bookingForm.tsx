import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postBookingProperties } from "@/lib/api/booking";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/hooks/useStore';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormLabel } from '@/components/ui/form';


interface BookingFormProps {
    projectId: number;
}

function BookingForm({ projectId }: BookingFormProps) {
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.loginUser.user);
    const formik = useFormik({
        initialValues: {
            name: user ? user.FullName || '' : '',
            email: user ? user.Email || '' : '',
            phone: user ? user.PhoneNumber || '' : '',
            selectionMethod: 'VNPay',
            deposit: 1000000,
            agency: 1,
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().min(10, "Not a valid phone number").matches(/^[0-9]+$/, 'Phone must be a number').required('Phone number is required'),
        }),
        onSubmit: async (values) => {
            try {
                const bookingData = {
                    projectId: projectId,
                    customerId: user ? user.id || 0 : 0,
                    agencyId: 1,
                    name: values.name,
                    selectionMethod: 'VNPay',
                    email: values.email,
                    phone: values.phone,
                    AmountDeposit: 1000000,
                };
                console.log(bookingData);
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    const isFormValid = Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length > 0;

    const handleBooking = () => {
        const token = localStorage.getItem('token');
        if (token) {
            formik.handleSubmit();
        } else {
            toast.error('You need to login to book a property');
            navigate('/login');
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className="container my-10 space-y-4">
            <div className="flex items-center text-2xl font-semibold text-red-500">
                Booking:
            </div>
            <div  >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your name"
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                ) : null}
            </div>
            <div className='space-y-2'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
            </div>
            <div className='space-y-2'>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                </label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your phone number"
                />
                {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-red-500">{formik.errors.phone}</div>
                ) : null}
            </div>
            <div className='w-full grid grid-cols-3 gap-3'>
                <div className='col-span-1 space-y-2'>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Theme
                    </label>
                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="VNPay">VNPay</SelectItem>
                            <SelectItem value="Momo">Momo</SelectItem>
                            <SelectItem value="ZaloPay">ZaloPay</SelectItem>
                            <SelectItem value="Bank">Bank</SelectItem>
                            <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-1 space-y-2">
                    <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                        Deposit
                    </label>
                    <Input
                        id="deposit"
                        name="deposit"
                        type="number"
                        placeholder="Enter your phone number"
                        value={formik.values.deposit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className='col-span-1 space-y-2'>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Agency
                    </label>
                    <Select>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Agency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">Agency 1</SelectItem>
                            <SelectItem value="2">Agency 2</SelectItem>
                            <SelectItem value="3">Agency 3</SelectItem>
                            <SelectItem value="4">Agency 4</SelectItem>
                            <SelectItem value="5">Agency 5</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex justify-center">
                <AlertDialog>
                    <AlertDialogTrigger className={`w-full ${!isFormValid ? 'cursor-not-allowed' : ''}`} disabled={!isFormValid}>
                        <Button className='w-full' disabled={!isFormValid} type='button'>
                            Send
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction type='submit' onClick={() => {
                                handleBooking();
                            }}>Okay</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </form>
    );
};

export default BookingForm;

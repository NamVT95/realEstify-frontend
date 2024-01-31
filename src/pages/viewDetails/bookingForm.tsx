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
import { useToast } from "@/components/ui/use-toast"
import { notification } from 'antd'


interface BookingFormProps {
    propertyId: number;
    deposit: number;
}

function BookingForm({ propertyId }: BookingFormProps) {
    const { toast } = useToast()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
            deposit: 50000000,
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().min(10, "Not a valid phone number").matches(/^[0-9]+$/, 'Phone must be a number').required('Phone number is required'),
            deposit: Yup.number().min(50000000, 'Deposit must be at least 50,000,000 VND').required('Deposit is required'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: async (values) => {
            try {
                const bookingData = {
                    propertyId: propertyId,
                    email: values.email,
                    phone: values.phone,
                    deposit: values.deposit,
                };

                const result = await postBookingProperties(bookingData);
                console.log(result.data.message);
                notification.success({
                    message: 'Booking successful',
                    description: result.data.message,
                    placement: 'topRight',
                    duration: 2,
                })
                if (result.error) {
                    console.error("Error:", result.error);
                    notification.error({
                        message: 'Booking failed',
                        description: result.error,
                        placement: 'topRight',
                        duration: 2,
                    })
                } else {
                    console.log("Booking successful:", result.data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    });

    const isFormValid = Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length > 0;

    const handleIncrease = () => {
        formik.setFieldValue('deposit', formik.values.deposit + 5000000);
    };

    const handleDecrease = () => {
        // Ensure the deposit doesn't go below the minimum value
        const newDeposit = Math.max(formik.values.deposit - 5000000, 50000000);
        formik.setFieldValue('deposit', newDeposit);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="container my-10 space-y-4">
            <div className="flex justify-center items-center text-2xl font-semibold">
                Booking
            </div>
            <div>
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
            <div>
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
            <div>
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
            <div>
                <label htmlFor="deposit">Deposit</label>
                <Input
                    type="number"
                    id="deposit"
                    name="deposit"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.deposit}
                    min={50000000}
                    step={5000000}
                />
                {formik.touched.deposit && formik.errors.deposit ? (
                    <div className="text-red-500">{formik.errors.deposit}</div>
                ) : null}
                <div className='flex gap-4 pt-2'>
                    <Button onClick={handleDecrease} type='button'>-</Button>
                    <Button onClick={handleIncrease} type='button'>+</Button>
                </div>


            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Type your message here"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                ></textarea>
                {formik.touched.message && formik.errors.message ? (
                    <div className="text-red-500">{formik.errors.message}</div>
                ) : null}
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
                                formik.handleSubmit();
                            }}>Okay</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </form>
    );
};

export default BookingForm;

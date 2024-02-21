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
    projectId: number;
}

function BookingForm({ projectId }: BookingFormProps) {
    const { toast } = useToast()
    const formik = useFormik({
        initialValues: {
            projectId: projectId,
            name: '',
            email: '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().min(10, "Not a valid phone number").matches(/^[0-9]+$/, 'Phone must be a number').required('Phone number is required'),
        }),
        onSubmit: async (values) => {
            try {
                const bookingData = {
                    project_id: projectId,
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                };
                console.log(bookingData);

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

    return (
        <form onSubmit={formik.handleSubmit} className="container my-10 space-y-4">
            <div className="flex items-center text-2xl font-semibold text-red-500">
                Booking:
            </div>
            <div className='space-y-2'>
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

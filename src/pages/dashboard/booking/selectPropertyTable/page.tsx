import { axiosClient, handleApiError } from "@/lib/api/config/axiosClient"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Select, Space } from 'antd';
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"
import axios from "axios";
import { convertPaymentMethod } from "@/pages/admin-dashboard/project/PaymentMethodPage";

export default function SelectPropertyForBooking() {
    const param = useParams()
    const id: number = Number(param.slug)
    const [booking, setBooking] = useState<any>(null)
    const [properties, setProperties] = useState<any>([])
    const [selectedProperty, setSelectedProperty] = useState<any>(null)
    const [selectedInstallment, setSelectedInstallment] = useState<any>(null)
    const [openingForSalesId, setOpeningForSalesId] = useState<any>(null)

    const [paymentMethods, setPaymentMethods] = useState<any>([])


    useEffect(() => {
        const getBookingById = async (id: number) => {
            try {
                const { data } = await axiosClient.get(`/api/booking/${id}`);
                setBooking(data?.response?.data)
                const res = await axiosClient.get(`/api/property/${data?.response?.data?.Project?.ProjectId}/list-property-by-projectId`);
                setProperties(res?.data?.data)
                const res2 = await axiosClient.get(`/api/openingForSales/${data?.response?.data?.Project?.ProjectId}`);
                setOpeningForSalesId(res2?.data?.data[0]?.OpeningForSalesId)

                const res3 = await axiosClient.get(`/api/investor/payment-options/${data?.response?.data?.Project?.ProjectId}`);
                setPaymentMethods(convertPaymentMethod(res3.data?.data))
                console.log(convertPaymentMethod(res3.data?.data))
            } catch (error) {
                console.log(error)
            }
        };

        getBookingById(id)
    }, [id])


    const handleChangeProperty = (value: string) => {
        setSelectedProperty(value)
    };
    const handleChangeInstallment = (value: string) => {
        setSelectedInstallment(value)
    };

    const handleSubmit = async () => {
        const submitData = {
            OpeningForSalesId: Number(openingForSalesId),
            PropertyId: Number(selectedProperty),
            BookingId: Number(id),
            AgencyId: Number(booking?.Agency?.AgencyId),
            PaymentMethod: Number(selectedInstallment)
        }
        try {
            const res = await axiosClient.post(`/api/agency/opening-for-sales-detail`, submitData);
            console.log(res)
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            }
        }
    }
    return (
        <div className="flex flex-col justify-between gap-4 ">
            <div className="flex gap-2 items-center" >
                <div>Apartment Number</div>
                <Select
                    defaultValue={properties[0]?.PropertyId}
                    style={{ width: 120 }}
                    onChange={handleChangeProperty}
                    options={
                        properties.map((property: any) => {
                            return {
                                label: property.ApartmentNumber,
                                value: property.PropertyId
                            }
                        })
                    }
                />
            </div>
            <div>
                <div className="flex gap-2 items-center" >
                    <div>Installment</div>
                    <Select
                        style={{ width: 120 }}
                        onChange={handleChangeInstallment}
                        options={
                            paymentMethods.map((pm: any) => {
                                console.log(pm)
                                return {
                                    label: `${pm?.PaymentMethodId} - ${pm?.details?.length} đợt`,
                                    value: +pm?.PaymentMethodId
                                }
                            })
                        }
                    />
                </div>

            </div>
            <Button className="w-20" onClick={() => {
                handleSubmit()
            }}>
                Save
            </Button>
            {/* 
            {
                PayMethodId: "1",
                details: [
                    {
                        PaymentOptionId: "1",
                        Batch: "1",
                        Percentage: "10",
                        Date: "2021-10-10",
                        Note: "note"
                    },
                    {
                        PaymentOptionId: "2",
                        Batch: "2",
                        Percentage: "20",
                        Date: "2021-10-10",
                        Note: "note"
                    }
                ]
            }
            <div> */}
                {
                    paymentMethods?.map((pm: any) => {
                        console.log(pm)
                        if(selectedInstallment != pm?.PaymentMethodId) return
                        return (
                            <div key={pm?.PaymentMethodId}>
                                <h1>Payment Method {pm?.PaymentMethodId}</h1>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date/Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pm?.details.map((detail: any) => {
                                                console.log(detail)
                                                return (
                                                    <tr key={detail?.PaymentOptionId}>
                                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{detail?.PaymentOption?.Batch}</td>
                                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{detail?.PaymentOption?.Date}</td>
                                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{detail?.PaymentOption?.Percentage}</td>
                                                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{detail?.PaymentOption?.Note}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    })
                }
        </div>
    )
}

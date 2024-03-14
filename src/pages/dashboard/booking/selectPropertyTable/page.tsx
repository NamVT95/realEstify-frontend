import { axiosClient, handleApiError } from "@/lib/api/config/axiosClient"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Select, Space } from 'antd';
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

export default function SelectPropertyForBooking() {
    const param = useParams()
    const id: number = Number(param.slug)
    const [booking, setBooking] = useState<any>(null)
    const [properties, setProperties] = useState<any>([])
    const [selectedProperty, setSelectedProperty] = useState<any>(null)
    const [selectedInstallment, setSelectedInstallment] = useState<any>(null)
    const [openingForSalesId, setOpeningForSalesId] = useState<any>(null)

    const installmentPayment = [
        3, 6, 9
    ]

    useEffect(() => {
        const getBookingById = async (id: number) => {
            try {
                const { data } = await axiosClient.get(`/api/booking/${id}`);
                setBooking(data?.response?.data)
                const res = await axiosClient.get(`/api/property/${data?.response?.data?.Project?.ProjectId}/list-property-by-projectId`);
                setProperties(res?.data?.data)
                const res2 = await axiosClient.get(`/api/openingForSales/${data?.response?.data?.Project?.ProjectId}`);
                setOpeningForSalesId(res2?.data?.data[0]?.OpeningForSalesId)
            } catch (error) {
                handleApiError(error);
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
            NumberInstallments: Number(selectedInstallment)
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
                            installmentPayment.map((installment: any) => {
                                return {
                                    label: `${installment} months`,
                                    value: installment
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
        </div>
    )
}

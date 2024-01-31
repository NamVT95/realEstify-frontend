import FullLayout from "@/FullLayout"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatPrice } from "@/lib/formatting"
import { Button } from "@/components/ui/button"
import BookingForm from "./bookingForm"
import { getPropertyById } from "@/lib/api/properties"
import { propertyInterface } from "@/interface/properties.interface"
import { useParams } from "react-router-dom"
export default function ViewDetailsPage() {
    const params = useParams<{ id: string }>();
    const propertyId = params.id ? parseInt(params.id, 10) : 0;

    const [property, setProperty] = useState<propertyInterface>()

    useEffect(() => {
        const fetchProperties = async () => {
            const { data, error } = await getPropertyById(propertyId)
            if (error) {
                console.log(error)
                return
            }

            if (data != null) {
                setProperty(data?.data)
            }
        }

        fetchProperties()

        window.scrollTo(0, 0)
    }, [])

    return (
        <FullLayout>
            {property ? (
                <div className='container my-10 space-y-4'>
                    <section className="flex items-center justify-center font-semibold text-2xl pb-5">
                        Real Estate Listing
                    </section>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">

                            <Card key={property.title}>
                                <CardHeader>
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className='w-full object-[50%_75%] object-cover aspect-video brightness-75'
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="inline-flex flex-shrink-0 items-center  text-black  text-lg font-bold leading-7 pb-1">
                                        {property.title}
                                    </div>
                                    <div className="inline-flex items-center pr-[6.5625rem] text-gray-600  text-sm leading-5 py-1">
                                        {property.address}
                                    </div>
                                    <div className="flex items-center justify-between pt-3">
                                        <div className=" text-2xl font-semibold text-end">
                                            {formatPrice(property.price)}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                        <Card className="col-span-2 box-border">

                            <div className="flex items-center justify-center text-2xl font-semibold bg-primary color text-white py-1 rounded-tr-md rounded-tl-md">
                                Detail
                            </div>
                            <div className="p-3">
                                <div className="font-semibold">
                                    Name: {property.title}
                                </div>
                                <div className="py-2">
                                    Location: {property.address}
                                </div>
                                <div className="py-2">
                                    Price: {formatPrice(property.price)}
                                </div>
                                <div className="py-2">
                                    Detail Description:
                                </div>
                                <div className="py-2">
                                    Number of Bedrooms: {property.items[0].value}
                                </div>
                                <div className="py-2">
                                    Number of Bathrooms: {property.items[1].value}
                                </div>
                                <div className="py-2">
                                    Square Footage: {property.items[2].value}
                                </div>
                                <div className="flex justify-end">
                                    <Button type="button" className=''>Schedule a viewing</Button>
                                </div>
                            </div>
                        </Card>

                    </div>
                    <Card>
                        <BookingForm propertyId={property.property_id} deposit={property.price} />
                    </Card>
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="text-2xl font-semibold text-center">
                        Not Found
                    </div>
                </div>
            )}
        </FullLayout>
    )
}
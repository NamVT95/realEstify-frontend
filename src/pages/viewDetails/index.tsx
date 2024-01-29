import FullLayout from "@/FullLayout"
import { useEffect } from "react"
import { useAppSelector } from "@/hooks/useStore"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatPrice } from "@/lib/formatting"
import { Button } from "@/components/ui/button"
import BookingForm from "./bookingForm"

export default function ViewDetailsPage() {
    const selectedProperty = useAppSelector(state => state.selectedProperty)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <FullLayout>
            <div className='container my-10 space-y-4'>
                <section className="flex items-center justify-center font-semibold text-2xl pb-5">
                    Real Estate Listing
                </section>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <Card key={selectedProperty.title}>
                            <CardHeader>
                                <img
                                    src={selectedProperty.image}
                                    alt={selectedProperty.title}
                                    className='w-full object-[50%_75%] object-cover aspect-video brightness-75'
                                />
                            </CardHeader>
                            <CardContent>
                                <div className="inline-flex flex-shrink-0 items-center  text-black  text-lg font-bold leading-7 pb-1">
                                    {selectedProperty.title}
                                </div>
                                <div className="inline-flex items-center pr-[6.5625rem] text-gray-600  text-sm leading-5 py-1">
                                    {selectedProperty.address}
                                </div>
                                <div className="flex items-center justify-between pt-3">
                                    <div className=" text-2xl font-semibold text-end">
                                        {formatPrice(selectedProperty.price)}
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
                                Name: {selectedProperty.title}
                            </div>
                            <div className="py-2">
                                Location: {selectedProperty.address}
                            </div>
                            <div className="py-2">
                                Price: {formatPrice(selectedProperty.price)}
                            </div>
                            <div className="py-2">
                                Detail Description:
                            </div>
                            <div className="py-2">
                                Number of Bedrooms: {selectedProperty.items[0].value}
                            </div>
                            <div className="py-2">
                                Number of Bathrooms: {selectedProperty.items[1].value}
                            </div>
                            <div className="py-2">
                                Square Footage: {selectedProperty.items[2].value}
                            </div>
                            <div className="flex justify-end">
                                <Button type="button" className=''>Schedule a viewing</Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card>
                    <BookingForm />
                </Card>
            </div>
        </FullLayout>
    )
}
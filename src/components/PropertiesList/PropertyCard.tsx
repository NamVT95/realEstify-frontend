
import { Card, CardContent, CardHeader } from "../ui/card"
import { formatPrice } from "@/lib/formatting";
import { Link } from "react-router-dom";
import { propertyInterface } from "@/interface/properties.interface";
import { Bed, Bath, Grid2X2 } from 'lucide-react';

interface PropertysCardProps {
    property: propertyInterface;
}

type IconMappingType = {
    bed: JSX.Element;
    bath: JSX.Element;
    area: JSX.Element;
}

const IconMapping: IconMappingType = {
    bed: <Bed size={24} className='text-gray-700' />,
    bath: <Bath size={24} className='text-gray-700' />,
    area: <Grid2X2 size={24} className='text-gray-700' />,
}

export default function PropertyCard({ property }: PropertysCardProps) {
    return (
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
                <div className="flex items-center justify-start gap-3 py-1">
                    {property.items.map((item) => (
                        <div key={item.icon} className="flex items-center justify-start">
                            {IconMapping[item.icon.toLowerCase() as keyof IconMappingType]}
                            <div className="ml-2 text-gray-600 text-sm leading-5">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between pt-3">
                    <div className=" text-2xl font-semibold text-end">
                        {formatPrice(property.price)}
                    </div>
                    <div className="text-end font-medium text-blue-500 select-none hover:cursor-pointer">
                        <Link to={`/detail/${property.property_id}`}>View Details</Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

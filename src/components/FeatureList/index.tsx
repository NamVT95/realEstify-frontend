import { propertiesInterface } from "@/interface/properties.interface"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Bed, Bath, Grid2X2 } from 'lucide-react';
import { formatPrice } from "@/lib/formatting";

type IProps = {
  properties: propertiesInterface[]
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

export default function FeatureList({
  properties
}: IProps) {
  return (
    <div className='container my-10 space-y-4'>
      <div className=" text-gray-700 text-2xl font-semibold leading-8">Featured Listings</div>
      <div className="grid grid-cols-3 gap-4">
        {
          properties.map((feature, index) => (
            <Card key={feature.title + index}>
              <CardHeader>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className='w-full object-[50%_75%] object-cover aspect-video brightness-75'
                />
              </CardHeader>
              <CardContent>
                <div className="inline-flex flex-shrink-0 items-center  text-black  text-lg font-bold leading-7 pb-1">
                  {feature.title}
                </div>
                <div className="inline-flex items-center pr-[6.5625rem] text-gray-600  text-sm leading-5 py-1">
                  {feature.address}
                </div>
                <div className="flex items-center justify-start gap-3 py-1">
                  {feature.items.map((item) => (
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
                    {formatPrice(feature.price)}
                  </div>
                  <div className="text-end font-medium text-blue-500 select-none hover:cursor-pointer">
                    View Details
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

import { propertiesInterface } from "@/interface/properties.interface"
import { Card, CardContent, CardHeader } from "../ui/card"

type IProps = {
  featureList: propertiesInterface[]
}

export default function FeatureList({
  featureList
}: IProps) {
  return (
    <div className='container my-10 space-y-4'>
      <div className=" text-gray-700 text-2xl font-semibold leading-8">Featured Listings</div>
      <div className="grid grid-cols-3 gap-4">
        {
          featureList.map((feature, index) => (
            <Card key={feature.title + index}>
              <CardHeader>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className='w-full object-[50%_75%] object-cover aspect-video brightness-75'
                />
              </CardHeader>
              <CardContent>
                <div className="inline-flex flex-shrink-0 items-center  text-black  text-lg font-bold leading-7">
                  {feature.title}
                </div>
                <div className="inline-flex items-center pr-[6.5625rem] text-gray-600  text-sm leading-5">
                  {feature.address}
                </div>
                <div className="">
                  {feature.items.map((item) => (
                    <div key={item.icon}>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">

                      </span>
                    </div>
                  ))}
                </div>

              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

import { propertyInterface } from "@/interface/properties.interface"
import PropertyCard from "./PropertyCard";

type IProps = {
  properties: propertyInterface[]
}

export default function PropertiesList({
  properties
}: IProps) {
  return (
    <div className='container my-10 space-y-4'>
      <div className=" text-gray-700 text-2xl font-semibold leading-8">Properties Listing</div>
      <div className="grid grid-cols-3 gap-4">
        {
          properties.map((property, index) => (
            <PropertyCard property={property} key={property.title + index} />
          ))
        }
      </div>
    </div>
  )
}

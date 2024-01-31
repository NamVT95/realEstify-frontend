import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import PropertiesList from '@/components/PropertiesList'
import { useEffect, useState } from 'react'
import { getProperties } from '@/lib/api/properties'

export default function HomePage() {
  // const properties = useAppSelector(state => state.properties)

  const [properties, setProperties] = useState([])

  useEffect(() => {

    const fetchProperties = async () => {
      const { data, error } = await getProperties()
      if (error) {
        console.log(error)
        return
      }

      if (data != null) {
        setProperties(data?.data)
      }
    }

    fetchProperties()
  }, [])

  return (
    <FullLayout>
      <Hero />
      <PropertiesList properties={properties} />
    </FullLayout>
  )
}

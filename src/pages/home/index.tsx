import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import PropertiesList from '@/components/PropertiesList'
import { useAppSelector } from '@/hooks/useStore'


export default function HomePage() {
  const properties = useAppSelector(state => state.properties)

  return (
    <FullLayout>
      <Hero />
      <PropertiesList properties={properties} />
    </FullLayout>
  )
}

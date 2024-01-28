import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import FeatureList from '@/components/FeatureList'
import { useAppSelector } from '@/hooks/useStore'


export default function HomePage() {
  const properties = useAppSelector(state => state.properties)

  return (
    <FullLayout>
      <Hero />
      <FeatureList properties={properties} />
    </FullLayout>
  )
}

import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import FeatureList from '@/components/FeatureList'
import { featureList } from '@/exampleData/featureList'



export default function HomePage() {

  return (
    <FullLayout>
      <Hero />
      <FeatureList featureList={featureList} />
    </FullLayout>
  )
}

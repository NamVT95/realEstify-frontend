import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import FeatureList from '@/components/FeatureList'



export default function HomePage() {
  const featureList = [{
    title: "Modern House with Pool",
    address: "Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn",
    items: [{
      icon: "bed",
      value: "3",
    },{
      icon: "bath",
      value: "2",
    },{
      icon: "area",
      value: "1200",
    }],
    price: "$1,200,000"
  },]

  return (
    <FullLayout>
      <Hero />
      <FeatureList featureList={featureList}/>
    </FullLayout>
  )
}

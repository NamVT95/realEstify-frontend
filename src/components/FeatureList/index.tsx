import { Card, CardContent, CardHeader } from "../ui/card"

type IProps = {
  featureList: any[]
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
              <h1 className="h-52 bg-red-400">
                Day la anh
              </h1>
            </CardHeader>
            <CardContent>
            <div className="inline-flex flex-shrink-0 items-center  text-black  text-lg font-bold leading-7">
              Modern House with Pool
            </div>
            <div className="inline-flex items-center pr-[6.5625rem] text-gray-600  text-sm leading-5">
              Số 72a Lê Thánh Tôn, Quận 1, Sài Gòn.
            </div>

            </CardContent>
          </Card>
        ))
      }
      </div>
    </div>
  )
}

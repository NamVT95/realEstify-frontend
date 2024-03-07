import heroImage from "@/assets/hero.jpg"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Hero(
  {
    value,
    handleChange,
    handleSearch
  }: {
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSearch: () => void
  }
) {
  return (
    <div className='relative'>
         <div>
          <img
              src={heroImage}
              alt='hero'
              className='w-full h-[500px] object-[50%_75%] object-cover aspect-video brightness-75'
          />
         </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4'>
          <div className='flex flex-col items-center justify-center w-full h-full sapce-y-2'>
            <h1 className='text-5xl font-bold text-white'>RealEstify</h1>
            <p className='text-xl text-white'>Helps you find the best property for you</p>
          </div>

          <div className="flex w-full items-center">
            <Input type="text" placeholder="Property" className='rounded-r-none' value={value} onChange={handleChange}/>
            <Button type="button" className='rounded-l-none' onClick={handleSearch}>Search</Button>
          </div>

        </div>
      </div>
  )
}

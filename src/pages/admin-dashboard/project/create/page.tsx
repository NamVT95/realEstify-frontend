import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateProjectPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const onSubmit = (data:any) =>{
    console.log(data)
    axios.post("http://localhost:4000/api/project/create-project", data)
    .then(res => {
      console.log(res)
      toast.success(res?.data?.message)
      navigate("/admin-dashboard/project")
    })
    .catch(err => {
      // error 500
      if(err?.response?.status === 500) return toast.error('Internal Server Error')

      else{
        toast.error(err?.response?.data?.message)
      }
    })

  };
  console.log(errors);


  return (
    <div className='space-y-4 p-4'>
      <h1 className='font-black text-4xl'>Create Project</h1>

      <div>
  
    <form onSubmit={handleSubmit(onSubmit)} className='spave-y-4'>
      <div  className='flex  gap-4 mb-8'>
        <div className='flex flex-col gap-4'>
          <label htmlFor="Name">Name</label>
          <input type="text" placeholder="Name" {...register("Name", {})} className='py-2 px-4'/>
          <label htmlFor="InvestorId">InvestorId</label>
          <select {...register("InvestorId")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="Location">Location</label>
          <input type="text" placeholder="Location" {...register("Location", {})} className='py-2 px-4'/>
          <label htmlFor="Thumbnail">Thumbnail</label>
          <input type="text" placeholder="Thumbnail" {...register("Thumbnail", {})} className='py-2 px-4'/>
          <label htmlFor="Type">Type</label>
          <select {...register("Type")}>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
        </div>
        <div className='flex flex-col gap-4'>
          <label htmlFor="NumberOfApartments">NumberOfApartments</label>
          <input type="number" placeholder="NumberOfApartments" {...register("NumberOfApartments", {})} className='py-2 px-4'/>
          <label htmlFor="NumberOfShops">NumberOfShops</label>
          <input type="number" placeholder="NumberOfShops" {...register("NumberOfShops", {})} className='py-2 px-4'/>
          <label htmlFor="LandArea">LandArea</label>
          <input type="number" placeholder="LandArea" {...register("LandArea", {})} className='py-2 px-4'/>
          <label htmlFor="ConstructionDensity">ConstructionDensity</label>
          <input type="number" placeholder="ConstructionDensity" {...register("ConstructionDensity", {})} className='py-2 px-4'/>
          <label htmlFor="Status">Status</label>
          <input type="text" placeholder="Status" {...register("Status", {})} className='py-2 px-4'/>
          <label htmlFor="Status">StartDate</label>
          <input type="date" placeholder="StartDate" {...register("StartDate", {})} className='py-2 px-4'/>
          <label htmlFor="Status">EndDate</label>
        <input type="date" placeholder="EndDate" {...register("EndDate", {})} className='py-2 px-4'/>

        </div>
        
      </div>
      <Button type='submit'>Submit</Button>
    </form>


      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// ProjectId: 3,
//           Name: 'The Antonia Phú Mỹ Hưng',
//           InvestorId: 1,
//           Location: 'Đường Nguyễn Lương Bằng, P.Tân Phú, Quận 7, TP.HCM',
//           Thumbnail: 
//             'https://phumyhungcorp.com.vn/wp-content/uploads/2019/05/vi-tri-the-antonia-co-logo.jpg',
//           Type: 'Apartment',
//           NumberOfApartments: 366,
//           NumberOfShops: 0,
//           LandArea: 5880,
//           ConstructionDensity: 80,
//           Status: null,
//           StartDate: '2011-06-26T17:00:00.000Z',
//           EndDate: null,
//           Description: null,
//           Investor: {
//             InvestorId: 1,
//             Name: 'CÔNG TY TNHH PHÁT TRIỂN PHÚ MỸ HƯNG',
//             Email: ' phumyhung@phumyhung.vn',
//             PhoneNumber: '(028) 5411-9999',
//             Address: 
//               'Tầng 10, Tòa nhà Lawrence S.Ting, 801 Nguyễn Văn Linh, P. Tân Phú, Q.7, TP. HCM',
//             UserId: 3
//           }
//         }
export default function UpdateProject() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate()
    
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:4000/api/project/${id}`)
        .then(res => {
            console.log(res)
            setValue("Name", res?.data?.response?.data?.Name)
            setValue("InvestorId", res?.data?.response?.data?.InvestorId)
            setValue("Location", res?.data?.response?.data?.Location)
            setValue("Thumbnail", res?.data?.response?.data?.Thumbnail)
            setValue("Type", res?.data?.response?.data?.Type)
            setValue("NumberOfApartments", res?.data?.response?.data?.NumberOfApartments)
            setValue("NumberOfShops", res?.data?.response?.data?.NumberOfShops)
            setValue("LandArea", res?.data?.response?.data?.LandArea)
            setValue("ConstructionDensity", res?.data?.response?.data?.ConstructionDensity)
            setValue("Status", res?.data?.response?.data?.Status)
            setValue("StartDate", res?.data?.response?.data?.StartDate)
            setValue("EndDate", res?.data?.response?.data?.EndDate)
        })
        .catch(err => {
            console.log(err)
        })
        }
    , [id])


    const onSubmit = (data:any) =>{
      console.log(data)
      axios.put("http://localhost:4000/api/investor/project/"+id, {
        ...data,
        InvestorId: 1
      })
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
        <h1 className='font-black text-4xl'>Update Project</h1>
        <div>
    
      <form onSubmit={handleSubmit(onSubmit)} className='spave-y-4'>
        <div  className='flex  gap-4 mb-8'>
          <div className='flex flex-col gap-4'>
            <label htmlFor="Name">Name</label>
            <input type="text" placeholder="Name" {...register("Name", {})} className='py-2 px-4'/>
            <label htmlFor="InvestorId">InvestorId</label>
            <select {...register("InvestorId")} disabled>
                <option value="1">Investor_1</option>
            </select>
            <label htmlFor="Location">Location</label>
            <input  type="text" placeholder="Location" {...register("Location", {})} className='py-2 px-4'/>
            <label htmlFor="Thumbnail">Thumbnail</label>
            <input  type="text" placeholder="Thumbnail" {...register("Thumbnail", {})} className='py-2 px-4'/>
            <label htmlFor="Type">Type</label>
            <select {...register("Type")} >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
            </select>
          </div>
          <div className='flex flex-col gap-4'>
            <label htmlFor="NumberOfApartments">NumberOfApartments</label>
            <input  type="number" placeholder="NumberOfApartments" {...register("NumberOfApartments", {})} className='py-2 px-4'/>
            <label htmlFor="NumberOfShops">NumberOfShops</label>
            <input  type="number" placeholder="NumberOfShops" {...register("NumberOfShops", {})} className='py-2 px-4'/>
            <label htmlFor="LandArea">LandArea</label>
            <input  type="number" placeholder="LandArea" {...register("LandArea", {})} className='py-2 px-4'/>
            <label htmlFor="ConstructionDensity">ConstructionDensity</label>
            <input  type="number" placeholder="ConstructionDensity" {...register("ConstructionDensity", {})} className='py-2 px-4'/>
            <label htmlFor="Status">Status</label>
            <input  type="text" placeholder="Status" {...register("Status", {})} className='py-2 px-4'/>
            <label htmlFor="Status">StartDate</label>
            <input  type="date" placeholder="StartDate" {...register("StartDate", {})} className='py-2 px-4'/>
            <label htmlFor="Status">EndDate</label>
          <input  type="date" placeholder="EndDate" {...register("EndDate", {})} className='py-2 px-4'/>
  
          </div>
          
        </div>
        <Button type='submit'>Submit</Button>
      </form>
  
  
        </div>
      </div>
    )
}

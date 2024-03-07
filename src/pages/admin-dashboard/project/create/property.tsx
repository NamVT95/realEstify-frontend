import React from 'react'
import { useForm } from 'react-hook-form';

export default function PropertyPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data:any) => console.log(data);
    console.log(errors);

  return (
    <div>


        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="ProjectId" {...register} />
            <input type="text" placeholder="Type" {...register("Type", {})} />
            <input type="number" placeholder="Floor" {...register("Floor", {})} />
            <input type="number" placeholder="ApartmentNumber" {...register("ApartmentNumber", {})} />
            <input type="number" placeholder="ShopNumber" {...register("ShopNumber", {})} />
            <input type="text" placeholder="Area" {...register("Area", {})} />
            <input type="number" placeholder="Price" {...register} />

            <input type="submit" />
            </form>
        </div>
    </div>
  )
}

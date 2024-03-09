import React, { useEffect } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createOneProperty, sendData } from '@/lib/api/createOneProperty'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useStore'
import { switchTrigger } from '@/store/renderTrigger'

const formSchema = z.object({
    type: z.string(),
    floor: z.string(),
    apartmentNumber: z.string(),
    area: z.string(),
    price: z.string()
})
export default function CreateOneForm() {
    const dispatch = useAppDispatch();
    const param = useParams<{ id: string }>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "apartment",
            floor: "1",
            apartmentNumber: "101",
            area: "100",
            price: "1.0"
        },
    })
    const handleCreateOneProperty = async (data: z.infer<typeof formSchema>) => {
        const sendData: sendData = {
            ProjectId: Number(param.id),
            Type: data.type,
            Floor: parseInt(data.floor),
            ApartmentNumber: data.apartmentNumber,
            ShopNumber: 1,
            Area: parseInt(data.area),
            Price: parseFloat(data.price)
        }
        await createOneProperty(sendData);
        dispatch(switchTrigger())
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        handleCreateOneProperty(values);
    }
    useEffect(() => {
        const floorValue = form.watch('floor');
        const updatedApartmentNumber = `${floorValue}${form.getValues('apartmentNumber').substring(floorValue.length)}`;
        form.setValue('apartmentNumber', updatedApartmentNumber);
    }, [form.watch('floor')]);
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="floor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} type="number" min={1} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="apartmentNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apartment Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Area</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} type='number' step='0.01' min={0.01} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} type='number' step='0.01' min={0.01} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

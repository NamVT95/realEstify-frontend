
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { formatPrice } from "@/lib/formatting";
import { Link } from "react-router-dom";
import { propertyInterface } from "@/interface/properties.interface";
import { Bed, Bath, Grid2X2 } from 'lucide-react';
import { ProjectInterface } from "@/interface/projects.interface";
import Background from "@/assets/hero.jpg"
import { axiosClient } from "@/lib/api/config/axiosClient";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface PropertysCardProps {
    project: ProjectInterface;
}


export default function ProjectCard({ project }: PropertysCardProps) {
    console.log(project)

    const [response, setResponse] = useState<any>({})

    const getOpeningForSale = async () => {
        try {
            const response = await axiosClient.get(`/api/openingForSales/${project?.ProjectId}`)
            if(new Date(response?.data?.data[0]?.StartDate)){
                console.log(true)
            }else{
                console.log(false)
            }
            setResponse(response?.data?.data[0] || [])
            console.log((new Date(response?.data?.data[0]?.StartDate)) < new Date())
            console.log((new Date(response?.data?.data[0]?.StartDate) && ((new Date(response?.data?.data[0]?.StartDate)) < new Date())))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOpeningForSale()
    }, [])


    return (
        <Card className="mb-20">
            <Link to={`/detail/${project.ProjectId}`} className="col-span-1">
                <div className="hover:cursor-pointer h-full relative">
                    <img src={project.Thumbnail || Background} alt={project.Name} className="object-cover h-full w-full rounded-md min-h-[250px]" />
                    {
                       (new Date(response?.StartDate) && ((new Date(response?.StartDate)) < new Date())) ? 
                       <div className="py-2 px-4 rounded-tr-md rounded-bl-md bg-green-200 text-green-500 absolute top-0 right-0 font-bold">Đang mở bán</div>
                        : 
                        <div className="py-2 px-4 rounded-tr-md rounded-bl-md bg-red-200 text-red-500 absolute top-0 right-0 font-bold">Chưa mở bán</div>
}
                </div>
            </Link>
            <CardFooter>
                <div className="mt-2 w-full text-center text-2xl font-bold">{project.Name}</div>
            </CardFooter>
        </Card>
    )
}

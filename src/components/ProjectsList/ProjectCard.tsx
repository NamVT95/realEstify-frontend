
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { formatPrice } from "@/lib/formatting";
import { Link } from "react-router-dom";
import { propertyInterface } from "@/interface/properties.interface";
import { Bed, Bath, Grid2X2 } from 'lucide-react';
import { ProjectInterface } from "@/interface/projects.interface";
import Background from "@/assets/hero.jpg"

interface PropertysCardProps {
    project: ProjectInterface;
}


export default function ProjectCard({ project }: PropertysCardProps) {
    console.log(project)
    return (
        <Card className="justify-self-stretch">
            <Link to={`/detail/${project.ProjectId}`} className="col-span-1 h-[250px]">
                <div className="hover:cursor-pointer h-full relative">
                    <img src={project.Thumbnail || Background} alt={project.Name} className="object-cover h-full w-full rounded-md" />
                    {
                       ( project?.StartDate && ((project?.StartDate) < new Date())) ? 
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

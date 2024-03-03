
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { formatPrice } from "@/lib/formatting";
import { Link } from "react-router-dom";
import { propertyInterface } from "@/interface/properties.interface";
import { Bed, Bath, Grid2X2 } from 'lucide-react';
import { ProjectInterface } from "@/interface/projects.interface";

interface PropertysCardProps {
    project: ProjectInterface;
}


export default function ProjectCard({ project }: PropertysCardProps) {
    return (
        <Card>
            <Link to={`/detail/${project.ProjectId}`} className="col-span-1 h-[250px]">
                <div className="hover:cursor-pointer h-full">
                    <img src={project.Thumbnail} alt={project.Name} className="object-cover h-full w-full rounded-md" />

                </div>
            </Link>
            <CardFooter>
                <div className="mt-2 w-full text-center text-2xl font-bold">{project.Name}</div>
            </CardFooter>
        </Card>
    )
}

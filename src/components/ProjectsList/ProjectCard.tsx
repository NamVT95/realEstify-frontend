
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
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
        <Link to={`/detail/${project.ProjectId}`}>
            <div className="w-350px hover:cursor-pointer">
                <img src={project.Thumbnail} alt={project.Name} />
                <div className="mt-2 w-full text-center text-2xl font-bold">{project.Name}</div>
            </div>
        </Link>
    )
}

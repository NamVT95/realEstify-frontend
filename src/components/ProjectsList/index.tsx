import { ProjectInterface } from "@/interface/projects.interface";
import ProjectCard from "./ProjectCard";

type IProps = {
  projects: ProjectInterface[]
}

export default function ProjectsList({
  projects
}: IProps) {
  return (
    <div className='container my-10 space-y-4'>
      <div className=" text-gray-700 text-2xl font-semibold leading-8">Projects Listing</div>
      <div className="grid grid-cols-3 gap-4 justify-stretch justify-self-stretch justify-items-stretch">
        {
          projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))
        }
      </div>
    </div>
  )
}

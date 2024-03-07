import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import ProjectsList from '@/components/ProjectsList'
import { useEffect, useState } from 'react'
import { getProjects } from '@/lib/api/project'

export default function HomePage() {

  const [projects, setProjects] = useState([])
  const fetchProjects = async () => {
    const { data, error } = await getProjects()
    if (error) {
      console.log(error)
      return
    }
    if (data != null) {
      setProjects(data?.response.data)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const [value, setValue] = useState('')
  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  console.log(projects)

  const handleSearch = () => {
    if(value === '') return fetchProjects()
    setProjects(projects.filter((project: any) => project.Name.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <FullLayout>
      <Hero value={value} handleChange={handleChange} handleSearch={handleSearch}/>
      {projects ? (
        projects.length === 0 ? (
          <div className="container mx-auto text-center text-2xl font-semibold">
            No projects found
          </div>
        ) : (
          <ProjectsList projects={projects} />
        )
      ) : (
        <div className="container mx-auto text-center text-2xl font-semibold">
          Loading...
        </div>
      )}
    </FullLayout>
  )
}

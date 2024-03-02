import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import ProjectsList from '@/components/ProjectsList'
import { useEffect, useState } from 'react'
import { getProjects } from '@/lib/api/project'

export default function HomePage() {

  const [projects, setProjects] = useState([])

  useEffect(() => {

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

    fetchProjects()
  }, [])

  return (
    <FullLayout>
      <Hero />
      {projects ? (
        projects.length === 0 ? (
          <div className="container mx-auto text-center text-2xl font-semibold">
            Loading...
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

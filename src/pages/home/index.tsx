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
        setProjects(data?.data)
      }
    }

    fetchProjects()
  }, [])

  return (
    <FullLayout>
      <Hero />
      <ProjectsList projects={projects} />
    </FullLayout>
  )
}

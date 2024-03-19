import FullLayout from '@/FullLayout'
import Hero from './components/hero'
import ProjectsList from '@/components/ProjectsList'
import { useEffect, useState } from 'react'
import { getProjects } from '@/lib/api/project'

export default function HomePage() {

  const [projects, setProjects] = useState<any>([])
  const fetchProjects = async () => {
    const { data, error } = await getProjects()
    if (error) {
      console.log(error)
      setProjects([
        {
            "ProjectId": 3,
            "Name": "The Antonia Phú Mỹ Hưng",
            "InvestorId": 1,
            "Location": "Đường Nguyễn Lương Bằng, P.Tân Phú, Quận 7, TP.HCM",
            "Thumbnail": "https://phumyhungcorp.com.vn/wp-content/uploads/2019/05/vi-tri-the-antonia-co-logo.jpg",
            "Type": "Apartment",
            "NumberOfApartments": 366,
            "NumberOfShops": 0,
            "LandArea": 5880,
            "ConstructionDensity": 80,
            "Status": null,
            "StartDate": "2011-06-26T17:00:00.000Z",
            "EndDate": null,
            "Description": null,
            "Investor": {
                "InvestorId": 1,
                "Name": "CÔNG TY TNHH PHÁT TRIỂN PHÚ MỸ HƯNG",
                "Email": " phumyhung@phumyhung.vn",
                "PhoneNumber": "(028) 5411-9999",
                "Address": "Tầng 10, Tòa nhà Lawrence S.Ting, 801 Nguyễn Văn Linh, P. Tân Phú, Q.7, TP. HCM",
                "UserId": 3
            }
        },
        {
            "ProjectId": 4,
            "Name": "Phú Mỹ Hưng Midtown",
            "InvestorId": 1,
            "Location": "Lô M5,6,7,8 Đường số 16, Phường Tân Phú, Quận 7, TP.HCM",
            "Thumbnail": "https://phumyhung.vn/wp-content/uploads/2022/03/Sakura-Park-midtownjpg.jpg",
            "Type": "Apartment",
            "NumberOfApartments": 300,
            "NumberOfShops": 0,
            "LandArea": 56331,
            "ConstructionDensity": 80,
            "Status": null,
            "StartDate": "2011-06-26T17:00:00.000Z",
            "EndDate": null,
            "Description": null,
            "Investor": {
                "InvestorId": 1,
                "Name": "CÔNG TY TNHH PHÁT TRIỂN PHÚ MỸ HƯNG",
                "Email": " phumyhung@phumyhung.vn",
                "PhoneNumber": "(028) 5411-9999",
                "Address": "Tầng 10, Tòa nhà Lawrence S.Ting, 801 Nguyễn Văn Linh, P. Tân Phú, Q.7, TP. HCM",
                "UserId": 3
            }
        },
        {
            "ProjectId": 5,
            "Name": "Cardinal Court",
            "InvestorId": 1,
            "Location": "Khu đất C13B (Đô thị Phú Mỹ Hưng), P. Tân Phú, Quận 7, TP.HCM",
            "Thumbnail": "https://phumyhung.vn/wp-content/uploads/2022/01/cardinal-cour-1.jpg",
            "Type": "Apartment",
            "NumberOfApartments": 182,
            "NumberOfShops": 0,
            "LandArea": 10780,
            "ConstructionDensity": 100,
            "Status": null,
            "StartDate": "2011-06-26T17:00:00.000Z",
            "EndDate": null,
            "Description": null,
            "Investor": {
                "InvestorId": 1,
                "Name": "CÔNG TY TNHH PHÁT TRIỂN PHÚ MỸ HƯNG",
                "Email": " phumyhung@phumyhung.vn",
                "PhoneNumber": "(028) 5411-9999",
                "Address": "Tầng 10, Tòa nhà Lawrence S.Ting, 801 Nguyễn Văn Linh, P. Tân Phú, Q.7, TP. HCM",
                "UserId": 3
            }
        }])
      return
    }
    if (data != null) {
      setProjects(data?.response.data)
    } else {
      
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

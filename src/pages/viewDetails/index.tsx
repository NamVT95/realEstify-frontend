import FullLayout from "@/FullLayout"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatPrice } from "@/lib/formatting"
import { Button } from "@/components/ui/button"
import BookingForm from "./bookingForm"
import { useParams } from "react-router-dom"
import { ProjectInterface } from "@/interface/projects.interface"
import { getProjectById } from "@/lib/api/project"
import { Building2, UsersRound, MapPin, Home, Store, LandPlot, } from 'lucide-react';
export default function ViewDetailsPage() {
    const params = useParams<{ id: string }>();
    const projectId = params.id ? parseInt(params.id, 10) : 0;

    const [project, setProject] = useState<ProjectInterface | any>()

    useEffect(() => {
        const fetchProperties = async () => {
            const { data, error } = await getProjectById(projectId)
            if (error) {
                console.log(error)
                setProject({
                    ProjectId: 3,
                    Name: "The Antonia Phú Mỹ Hưng",
                    InvestorId: 1,
                    Location: "Đường Nguyễn Lương Bằng, P.Tân Phú, Quận 7, TP.HCM",
                    Thumbnail:
                      "https://phumyhungcorp.com.vn/wp-content/uploads/2019/05/vi-tri-the-antonia-co-logo.jpg",
                    Type: "Apartment",
                    NumberOfApartments: 366,
                    NumberOfShops: 0,
                    LandArea: 5880,
                    ConstructionDensity: 80,
                    Status: null,
                    StartDate: "2011-06-26T17:00:00.000Z",
                    EndDate: null,
                    Description: null,
                    Investor: {
                      InvestorId: 1,
                      Name: "CÔNG TY TNHH PHÁT TRIỂN PHÚ MỸ HƯNG",
                      Email: " phumyhung@phumyhung.vn",
                      PhoneNumber: "(028) 5411-9999",
                      Address:
                        "Tầng 10, Tòa nhà Lawrence S.Ting, 801 Nguyễn Văn Linh, P. Tân Phú, Q.7, TP. HCM",
                      UserId: 3,
                    },
                  })

                return
            }
            if (data != null) {
                console.log(data?.response.data)
                setProject(data?.response.data)
            }
        }

        fetchProperties()

        window.scrollTo(0, 0)
    }, [])

    return (
        <FullLayout>
            {project ? (
                <div className='container my-10 space-y-4'>
                    <div>
                        <img src={project.Thumbnail} alt={project.Name} className="rounded-md" />
                    </div>
                    <div className="my-8 space-y-4">
                        <div className="text-2xl font-semibold text-red-500">Overal:</div>
                        <div className="">{project.Description}</div>
                    </div>
                    <div>
                        <Card className="grid grid-cols-2 gap-4 py-8 px-16 space-y-4">
                            <div className="col-span-1 flex  items-center gap-4">
                                <Building2 size={32} />
                                <div className="text-lg font-semibold">
                                    Project name:
                                    <div className="text-base font-normal">
                                        {project.Name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <UsersRound size={32} />
                                <div className="text-lg font-semibold">
                                    Investor name:
                                    <div className="text-base font-normal">
                                        {project.Investor.Name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <MapPin size={32} />
                                <div className="text-lg font-semibold">
                                    Location:
                                    <div className="text-base font-normal">
                                        {project.Location}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <Building2 size={32} />
                                <div className="text-lg font-semibold">
                                    Project Type:
                                    <div className="text-base font-normal">
                                        {project.Type}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <Home size={32} />
                                <div className="text-lg font-semibold">
                                    Apartments:
                                    <div className="text-base font-normal">
                                        {project.NumberOfApartments}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <Store size={32} />
                                <div className="text-lg font-semibold">
                                    Shops:
                                    <div className="text-base font-normal">
                                        {project.NumberOfShops}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <LandPlot size={32} strokeOpacity={2} />
                                <div className="text-lg font-semibold">
                                    Totaln Area:
                                    <div className="text-base font-normal">
                                        {project.LandArea}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <LandPlot size={32} />
                                <div className="text-lg font-semibold">
                                    Constructionn Density:
                                    <div className="text-base font-normal">
                                        {project.ConstructionDensity}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="my-8 space-y-4">
                        <div className="text-2xl font-semibold text-red-500">Investor:</div>
                        <div className="">{project.Description}</div>
                    </div>
                    <div>
                        <Card className="grid grid-cols-2 gap-4 py-8 px-16 space-y-4">
                            <div className="col-span-1 flex  items-center gap-4">
                                <Building2 size={32} />
                                <div className="text-lg font-semibold">
                                    Name:
                                    <div className="text-base font-normal">
                                        {project.Investor.Name}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <UsersRound size={32} />
                                <div className="text-lg font-semibold">
                                    Email:
                                    <div className="text-base font-normal">
                                        {project.Investor.Email}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <MapPin size={32} />
                                <div className="text-lg font-semibold">
                                    Phone number:
                                    <div className="text-base font-normal">
                                        {project.Investor.PhoneNumber}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 flex  items-center gap-4">
                                <Building2 size={32} />
                                <div className="text-lg font-semibold">
                                    Address:
                                    <div className="text-base font-normal">
                                        {project.Investor.Address}
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <img src={project.Thumbnail} alt={project.Name} className="col-span-1 h-full w-full rounded-md" />
                        <BookingForm projectId={projectId} />
                    </div>
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="text-2xl font-semibold text-center">
                        Not Found
                    </div>
                </div>
            )}
        </FullLayout>
    )
}
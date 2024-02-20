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

    const [project, setProject] = useState<ProjectInterface>()

    useEffect(() => {
        const fetchProperties = async () => {
            const { data, error } = await getProjectById(projectId)
            if (error) {
                console.log(error)
                return
            }

            if (data != null) {
                console.log(data?.data)
                setProject(data?.data)
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
                        <img src={project.Thumbnail} alt={project.Name} />
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
                                    Invester name:
                                    <div className="text-base font-normal">
                                        {project.Investor.name}
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
                    <div>
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
import { Separator } from "@/components/ui/separator";
import { ProjectInterface } from "@/interface/projects.interface";
import { getProjectById } from "@/lib/api/project";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreatePropertyForm from "./component/create-property-form";
import PropertyList from "./component/property-list";

export default function ProjectDetail() {
  const [project, setProject] = useState<ProjectInterface | null | any>({
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
  });
  const param = useParams<{ id: string }>();

//   useEffect(() => {
//     const handleGetProject = async () => {
//       const data = await getProjectById(Number(param.id));
//       if (data.error) {
//         console.log(data.error);
//         return;
//       } else {
//         setProject(data.data.response.data);
//         console.log(data.data.response.data);
//       }
//     };
//     handleGetProject();
//     console.log(param.id);
//   }, [param.id]);
  return (
    <div>
      {project ? (
        <div>
          <div className="grid grid-cols-2 gap-4 pb-2">
            <div className="col-span-1">
              <div className="w-full space-y-2 h-full">
                <img
                  src={project.Thumbnail}
                  alt={project.Name}
                  className="rounded-md w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-lg font-semibold">{project.Name}</h1>
                  <p>{project.Description}</p>
                  <p className="text-sm italic">{project.Location}</p>
                </div>
                <div>
                  <p>Type: {project.Type}</p>
                  <p>Number of Apartments: {project.NumberOfApartments}</p>
                  <p>Number of Shops: {project.NumberOfShops}</p>
                  <p>Land Area: {project.LandArea}</p>
                  <p>Construction Density: {project.ConstructionDensity}</p>
                  <p>
                    Start Date:{" "}
                    {format(new Date(project.StartDate), "dd/MM/yyyy")}
                  </p>
                  <p>
                    End Date: {format(new Date(project.EndDate), "dd/MM/yyyy")}
                  </p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <div className="font-semibold">Investor</div>
                    <p>{project.Investor.Name}</p>
                  </div>
                  <div className="col-span-1">
                    <div className="font-semibold">Contact</div>
                    <p>Phone: {project.Investor.PhoneNumber}</p>
                    <p>
                      Email:{" "}
                      <span className="italic">{project.Investor.Email}</span>
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold">Address: </p>
                    <div className="text-base font-normal">
                      {project.Investor.Address}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 mt-2 ">
            <div className="col-span-1">
              <PropertyList />
            </div>
            <div className="col-span-1 ">
              <CreatePropertyForm />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

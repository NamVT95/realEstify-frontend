import { InvestorInterface } from "./investor.interface";

export interface ProjectInterface {
  ProjectId: number;
  Name: string;
  InvestorId: number;
  Location: string;
  Thumbnail: string;
  Type: string;
  NumberOfApartments: number;
  NumberOfShops: number;
  LandArea: number;
  ConstructionDensity: number;
  Status: string;
  StartDate: Date;
  EndDate: Date;
  Description: string;
  Investor: InvestorInterface;
}

// {

//     ProjectId: 1,

//     Name: 'Phú Mỹ Hưng The Horizon',

//     InvestorId: 1,

//     Location: 'Trần Văn Trà - Luther King',

//     Thumbnail:

//       'https://phumyhung.vn/the-horizon/wp-content/uploads/2022/11/phong-cach-thiet-ke.jpg',

//     Type: 'Apartment',

//     NumberOfApartments: 166,

//     NumberOfShops: 10,

//     LandArea: 5805,

//     ConstructionDensity: 49.6,

//     Status: 'Planned',

//     StartDate: null,

//     EndDate: null,

//     Description:

//       'Chuỗi tiện ích nội khu tiêu chuẩn được chọn lọc khắt khe cho những chủ nhân tôn quý, mang lại tiện nghi tối đa cho cuộc sống hàng ngày.',

//     Investor: {

//       investorId: 1,

//       name: 'CÔNG TY TNHH PHÁT TRIỂN PHÚ MỸ HƯNG',

//       email: 'phumyhung@phumyhung.vn',

//       phoneNumber: '(028) 5411-9999',

//       address:

//         'Tầng 10, Tòa nhà Lawrence S.Ting, 801 Nguyễn Văn Linh, P. Tân Phú, Q.7, TP. HCM'

//     }

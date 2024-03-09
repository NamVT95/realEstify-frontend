export interface PropertyInterface {
  PropertyId: number;
  ProjectId: number;
  Type: string;
  Floor: number;
  ApartmentNumber: string;
  ShopNumber?: number | null;
  Area: number;
  Price: number;
  Description?: string | null;
}

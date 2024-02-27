export interface propertyInterface {
  property_id: number;
  project_id: number;
  title: string;
  address: string;
  price: number;
  image: string;
  description: string;
  project: projectInterface;
  items: propertiesItemInterface[];
}

interface propertiesItemInterface {
  item_id: number;
  icon: string;
  value: number;
}

export interface projectInterface {
  project_id: number;
  name: string;
  status: string;
  start_date: string;
  end_date: string;
  description: string;
  investor_id: number;
}

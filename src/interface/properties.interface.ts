export interface propertyInterface {
    id: string,
    title: string,
    address: string,
    items: propertiesItemInterface[],
    price: number,
    image: string,
}

interface propertiesItemInterface {
    icon: string,
    value: number,
}
export interface propertiesInterface {
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
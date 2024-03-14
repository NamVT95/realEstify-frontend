import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/hooks/useStore";
import { PropertyInterface } from "@/interface/properties.interface";
import { getPropertyByProId } from "@/lib/api/getPropertyByProId";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PropertyList() {
    const param = useParams<{ id: string }>();
    const [properties, setProperties] = React.useState<PropertyInterface[]>([]);
    const { trigger } = useAppSelector((state) => state.trigger)

    const handleGetProperties = async () => {
        const data = await getPropertyByProId(Number(param.id));
        setProperties(data.data);
        console.log(data.data);
    };

    useEffect(() => {
        handleGetProperties();
    }, [trigger]);
    return (
        <div className="space-y-2">
            {properties.map((propertiy, index) => (
                <div key={index}>
                    <Card className="flex items-start">
                        <CardHeader className="bg-primary rounded-l-md text-primary-foreground h-full ">
                            <CardTitle >
                                {propertiy.ApartmentNumber}
                            </CardTitle>
                            <CardDescription className="text-primary-foreground">
                                Floor:
                                {propertiy.Floor}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 flex gap-4 flex-1">
                            <div>
                                <div>
                                    {propertiy.Type}
                                </div>
                                <div>
                                    Price: {
                                        new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                        }).format(propertiy.Price)
                                    }
                                </div>
                            </div>
                            <Separator orientation="vertical" />
                            <div>
                                Area: {propertiy.Area}m²
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}

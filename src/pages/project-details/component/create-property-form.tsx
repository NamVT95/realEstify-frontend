import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateOneForm from "./form/create-one-form";

export default function CreatePropertyForm() {
    return (
        <div className="w-full ">
            <Tabs defaultValue="one" className="w-full">
                <TabsList className="w-full flex bg-slate-200">
                    <TabsTrigger value="many" className="flex-1">Create many</TabsTrigger>
                    <TabsTrigger value="one" className="flex-1">Create one</TabsTrigger>
                </TabsList>
                <TabsContent value="many">
                    Make changes to your account here.
                </TabsContent>
                <TabsContent value="one">
                    <CreateOneForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}

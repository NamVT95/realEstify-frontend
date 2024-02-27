import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { useAppSelector } from "@/hooks/useStore"
import { useEffect, useState } from "react"
import {Checkbox, Form, Input } from 'antd';
import { Button } from "@/components/ui/button";

const onFinish = (values: FieldType) => {
  console.log('Success:', values);
//   call api
    // updateUserData(values)
    // .then(res => {
    //     console.log(res)
    // })
    // .catch(err => {
    //     console.log(err)
    // })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
};
export default function ProfilePage() {
    const [userData, setUserData] = useState<any>({})
    // const {userId} = useAppSelector(state => state.user)


    //call api to get user data
    useEffect(() => {
        const fetchUserData = async () => {
            //get user from redux
            // const { data, error } = await getUserById(userId)
            // if (error) {
            //     console.log(error)
            //     return
            // }
            // if (data != null) {
            //     setUserData(data?.data)
            // }
        }
        fetchUserData()
    }, [])






  return (
    <div>
        <Header />
        <div className="bg-gray-100">
            <h1 className="container text-2xl p-4 font-bold">
                Profile Page
            </h1>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src="https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-1/428597535_2070136736712576_7843519202547082075_n.jpg?stp=c3.0.200.200a_dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFDLDJaJozhy6pPnYnUA--Q_70L5wA1ZVb_vQvnADVlVshaHRql9kh2Tflri-hPlkapIXiLuLYMnCGDmb_ZosUj&_nc_ohc=VP24t4cVeisAX-ulEFx&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBU2-3BtY5NJ3HJwsOyHHfOlmv27DAa7XnzkjtjN3oKvQ&oe=65E31F5A" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
                                <h1 className="text-xl font-bold">Gia Huan</h1>
                                <p className="text-gray-700">Agency</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">General Information</h2>

                            <div>
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    
                                >
                                    <Form.Item<FieldType>
                                        label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Phone Number"
                                        name="phoneNumber"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item<FieldType>
                                        label="Address"
                                        name="address"
                                        rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                        <Input />
                                    </Form.Item>


                                    <Button type="submit">
                                        Update
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

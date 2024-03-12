import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { updateInfo } from "@/store/auth/loginUserSlice";
import { Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

// id: 14,
// Username: 'test_9',
// Role: 'customer',
// Email: 'nguyenvanB@gmail.com',
// PhoneNumber: '0123456787',
// Address: 'Thủ Đức',
// FullName: 'Nguyễn Văn B',

type FieldType = {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
};
export default function ViewProfilePage() {
  const user = useAppSelector((state) => state.loginUser.user);

  const dispatch = useAppDispatch();

  console.log(user);

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
    };
    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
    //   call ap
    axios
      .put("http://localhost:4000/api/customer/" + user?.id, {
        fullName: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address,
      })
      .then((res) => {
        console.log(res);
        toast.success("Update successfully");
        dispatch(
          updateInfo({
            user: {
              ...user,
              FullName: values.fullname,
              Email: values.email,
              PhoneNumber: values.phoneNumber,
              Address: values.address,
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Update failed");
      });
  };

  const currentUser = useAppSelector((state) => state.loginUser.user);

  return (
    <div>
      <Header />
      <div className="bg-gray-100">
        <h1 className="container text-2xl p-4 font-bold">Profile Page</h1>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      "https://avatar.iran.liara.run/public/boy?username=" +
                        currentUser?.FullName || "Real"
                    }
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  />
                  <h1 className="text-xl font-bold">{currentUser?.FullName}</h1>
                  <p className="text-gray-700">{currentUser?.Role}</p>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">General Information</h2>

                {/* view profile and have link to update page */}
                <div className="flex flex-col mb-4">
                  <div className="font-bold">Fullname</div>
                  <div>{currentUser?.FullName}</div>
                </div>
                <div className="flex flex-col mb-4">
                  <div className="font-bold">Email</div>
                  <div>{currentUser?.Email}</div>
                </div>
                <div className="flex flex-col mb-4">
                  <div className="font-bold">Phone</div>
                  <div>{currentUser?.PhoneNumber}</div>
                </div>

                <div className="flex flex-col mb-4">
                  <div className="font-bold">Address</div>
                  <div>{currentUser?.Address}</div>
                </div>

                <Button type="button" className="w-32" onClick={() => {
                    navigate("/profile/update")
                }}>
                    Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

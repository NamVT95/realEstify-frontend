import React, { useEffect } from "react";
import axios from "axios";
import { DataTable } from "./components/data-table";
import { useParams } from "react-router-dom";
import { columns } from "./components/columns";
import { Card, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "antd";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export default function ViewPayment() {
  const [booking, setBooking] = React.useState([]);
  const { id, bookingId } = useParams();
  console.log(id);

  const [payments, setPayments] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/booking")
      .then((res) => {
        console.log(res?.data?.data);
        console.log(
          res?.data?.data?.filter((data: any) => data.CustomerId == id)
        );
        setBooking(
          res?.data?.data?.filter((data: any) => data.CustomerId == id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/api/customer/debt/" + bookingId)
        .then(res => {
            console.log(res?.data?.response?.data)
            setPayments(res?.data?.response?.data)
        })
        .catch(err => {
            console.log(err)
            setPayments([{
                PaymentProcessDetailsId: 1,
                Time: 1,
                Amount: 1000000,
                PaymentDate: "2022-12-12",
                Status: "Chưa trả",
                Description: "Chưa trả"
            }])
            setMessage("Không có đợt trả góp của booking có id: " + bookingId)
        })
    }, []);


    const handlePayment = (id: number) => {
        axios.put("http://localhost:4000/api/paymentForSales/" + id)
        .then(res => {
            console.log(res)
            toast.success("Xác nhận thanh toán thành công")
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
            toast.error("Xác nhận thanh toán thất bại: " + err?.response?.data?.message)
        })
    }

  return (
    <div>
      {/* button go to previous page */}
      <button
        onClick={() => window.history.back()}
        className="bg-primary text-white p-2 rounded-md mb-4"
      >
        Go back
      </button>

      <h1 className="font-bold text-2xl">View Payment</h1>

      <div className="col-span-1">
        <div className="grid gap-4 grid-cols-1">
          {payments?.length == 0 || payments == null ? (
            <Card className="w-full h-[200px] flex items-center justify-center">
              <p>
            {
                message
            }  
              </p>
            </Card>
          ) : (
            <>
              {payments.map((payment: any) => {
                return (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between gap-4">
                        <div className="flex flex-col justify-between">
                          <div className="font-bold flex gap-2">
                            Payment Id: {payment.PaymentProcessDetailId} -{" "}
                            <div className="font-bold">
                              Lần thứ: {payment.Time}
                            </div>
                          </div>

                          <div className="font-bold">
                            Số tiền: {payment.Amount} tỷ
                          </div>
                          <div className="font-bold">
                            Hạn trả:{" "}
                            {payment.PaymentDate != null
                              ? format(
                                  new Date(payment.PaymentDate),
                                  "dd/MM/yyyy"
                                )
                              : null}
                          </div>
                        </div>
                        <div className="flex gap-4 flex-col">
                          <Badge className="p-2 rounded-full bg-primary text-white font-semibold">
                            {payment.Status}
                          </Badge>

                          {
                            payment?.Status == "Paid" ? <></> : (
                                <Button onClick={() => handlePayment(payment?.PaymentProcessDetailId)}>
                                    Xác nhận đã thanh toán
                                </Button>
                            )
                          }
                        </div>
                      </div>
                      <div className="font-bold">
                        Description: {payment.Description}
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

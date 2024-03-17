import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatting";
import { Card } from "antd";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { convertPaymentMethod } from "../admin-dashboard/project/PaymentMethodPage";

export default function PaymentHistory({ bookingId, projectId}: { bookingId: string, projectId: string}) {
  const [payments, setPayments] = useState([]);
    const [message, setMessage] = useState("");
    const [allPaymentmethod, setAllPaymentmethod] = useState<any[]>([])

    console.log(projectId)

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/customer/debt/" + bookingId)
      .then((res) => {
        console.log(res);
        setPayments(res?.data?.response?.data);
        console.log(res?.data?.response?.data)
        return res?.data?.response?.data
      })
      .then((data) => {
        console.log(data)
        axios.get(`http://localhost:4000/api/investor/payment-options/${projectId}`)
        .then((res) => {
            // setData(res.data)
            console.log(convertPaymentMethod(res.data?.data))
            setAllPaymentmethod(convertPaymentMethod(res.data?.data))
        })
        .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err);
        setPayments([]);
        setMessage("Không có đợt trả góp của booking có id: " + bookingId);
      });
      console.log(bookingId)
      
      
  }, []);
//   {
//     PaymentProcessDetailId: 9,
//     PaymentProcessId: 3,
//     PaymentDate: null,
//     PaymentOptionId: 38,
//     Status: 'Unpaid',
//     Description: null
//   },


  return (
    <div>
      <div className="grid gap-4 grid-cols-1">
        {payments?.length == 0 || payments == null ? (
          <Card className="w-full h-[200px] flex items-center justify-center">
            <p>{message}</p>
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
                          Số tiền: {formatPrice(payment.Amount)}
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
  );
}

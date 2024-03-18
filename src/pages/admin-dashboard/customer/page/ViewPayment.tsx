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
import { formatPrice } from "@/lib/formatting";
import { convertPaymentMethod } from "../../project/PaymentMethodPage";

export default function ViewPayment() {
  const [booking, setBooking] = React.useState([]);
  const { id, bookingId } = useParams();
  console.log(id);

  const [payments, setPayments] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState("");
  const [allPaymentmethod, setAllPaymentmethod] = React.useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/booking")
      .then((res) => {
        console.log(res?.data?.data);
        console.log(res?.data?.data?.find((data: any) => data.BookingId == bookingId)?.ProjectId);
        console.log(
          res?.data?.data?.filter((data: any) => data.CustomerId == id)
        );
        setBooking(
          res?.data?.data?.filter((data: any) => data.CustomerId == id)
        );

        return res?.data?.data?.find((data: any) => data.BookingId == bookingId)?.ProjectId
      })
      .then(data => {
        axios
          .get(
            `http://localhost:4000/api/investor/payment-options/${data}`
          )
          .then((res) => {
            console.log(res.data?.data);
            console.log(convertPaymentMethod(res.data?.data));
            setAllPaymentmethod(convertPaymentMethod(res.data?.data));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/customer/debt/" + bookingId)
      .then((res) => {
        console.log(res);
        setPayments(res?.data?.response?.data);
        console.log(res?.data?.response?.data);
        return res?.data?.response?.data;
      })
      .then((data) => {
        console.log(data);
        
      })
      .catch((err) => {
        console.log(err);
        setPayments([]);
        setMessage("Không có đợt trả góp của booking có id: " + bookingId);
      });
    console.log(bookingId);
  }, []);



    const handlePayment = (id: number) => {
        axios.put("http://localhost:4000/api/paymentForSales/" + id)
        .then(res => {
            console.log(res)
            toast.success("Xác nhận thanh toán thành công")
            setTimeout(() => {
                window.location.reload()
            }, 1000)
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
              {allPaymentmethod?.map((paymentMethod) => {
        if(paymentMethod?.details[0]?.PaymentMethod != payments[0]?.PaymentProcess?.PaymentMethod) return null;

        return (
          <div>
            <h1>{paymentMethod.PaymentMethod}</h1>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Batch
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Percentage
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thông tin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Note
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentMethod?.details?.map((detail, index) => (
                  <tr key={detail.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {detail.PaymentOption.Batch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {detail.PaymentOption.Percentage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {detail.PaymentOption.Date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {detail.PaymentOption.Note}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index == 0 ? (
                        formatPrice(
                          ((detail.PaymentOption.Percentage / 100) *
                          payments[0]?.PaymentProcess?.TotalAmount)
                         - 10000000) 
                      ) : (
                        formatPrice(
                          (detail.PaymentOption.Percentage / 100) *
                          payments[0]?.PaymentProcess?.TotalAmount
                        )
                      )}
                    </td>
                    <td className="py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center">
                      <Badge className="p-2 rounded-full bg-primary text-white font-semibold">
                        {
                          payments[index]?.Status
                        }
                      </Badge>
                    </td>
                    <td>
                      {
                        payments[index]?.Status != "Paid" && (
                          <Button onClick={() => handlePayment(payments[index]?.PaymentProcessDetailId)} className="bg-primary text-white p-2 rounded-md">
                            Xác nhận thanh toán
                          </Button>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

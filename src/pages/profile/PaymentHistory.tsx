import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatting";
import { Card } from "antd";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { convertPaymentMethod } from "../admin-dashboard/project/PaymentMethodPage";

export default function PaymentHistory({
  bookingId,
  projectId,
}: {
  bookingId: string;
  projectId: string;
}) {
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [allPaymentmethod, setAllPaymentmethod] = useState<any[]>([]);

  console.log(projectId);

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
        axios
          .get(
            `http://localhost:4000/api/investor/payment-options/${projectId}`
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
        setPayments([]);
        setMessage("Không có đợt trả góp của booking có id: " + bookingId);
      });
    console.log(bookingId);
  }, []);

  // {
  //   PaymentMethodId: '1',
  //   details: [
  //     {
  //       PaymentOptionForProjectId: 34,
  //       PaymentMethod: 1,
  //       ProjectId: 4,
  //       PaymentOptionId: 35,
  //       PaymentOption: {
  //         PaymentOptionId: 35,
  //         Batch: 1,
  //         Percentage: 25,
  //         Date: '2023-04-01',
  //         Note: 'Thanh toán đợt 1'
  //       }
  //     },
  //     {
  //       PaymentOptionForProjectId: 35,
  //       PaymentMethod: 1,
  //       ProjectId: 4,
  //       PaymentOptionId: 36,
  //       PaymentOption: {
  //         PaymentOptionId: 36,
  //         Batch: 2,
  //         Percentage: 35,
  //         Date: '2023-07-01',
  //         Note: 'Thanh toán đợt 2'
  //       }
  //     },

  // {
  //   PaymentProcessDetailId: 9,
  //   PaymentProcessId: 3,
  //   PaymentDate: null,
  //   PaymentOptionId: 38,
  //   Status: 'Paid',
  //   Description: null,
  //   PaymentProcess: {
  //     PaymentProcessId: 3,
  //     BookingId: 1035,
  //     PaymentDate: '2024-03-17T12:33:25.202Z',
  //     TotalAmount: 1000000000,
  //     PaymentMethod: 2,
  //     Status: 'Not Yet Paid',
  //     Description: 'Không có ghi chú'
  //   }
  // },

  return (
    <div>
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Badge className="p-2 rounded-full bg-primary text-white font-semibold">
                        {
                          payments[index]?.Status
                        }
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
      {/* <div className="grid gap-4 grid-cols-1">
        {payments?.length == 0 || payments == null ? (
          <Card className="w-full h-[200px] flex items-center justify-center">
            <p>{message}</p>
          </Card>
        ) : (
          <>
            {payments.map((payment: any, index) => {
              console.log(payment);
              return (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col justify-between">
                        <div className="font-bold flex gap-2">
                          Payment Id: {payment.PaymentProcessDetailId} -{" "}
                          <div className="font-bold">Lần thứ: {index + 1}</div>
                        </div>

                        <div className="font-bold">
                          Số tiền:{" "}
                          {formatPrice(payment?.PaymentProcess?.TotalAmount)}
                        </div>
                        <div className="font-bold">
                          Hạn trả:{" "}
                          {payment?.PaymentProcess?.PaymentDate != null
                            ? format(
                                new Date(payment?.PaymentProcess?.PaymentDate),
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
      </div> */}
    </div>
  );
}

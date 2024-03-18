import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { convertPaymentMethod } from "./PaymentMethodPage";

interface TableItem {
  batch: number | null;
  date: string;
  percentage: number;
  note: string;
}

const ViewPaymentTable: React.FC = () => {
  const [data, setData] = useState<TableItem[]>([]);
  const { id , payId} = useParams();
  const [newItem, setNewItem] = useState<TableItem>({
    batch: null,
    date: "",
    percentage: 0,
    note: "",
  });
  const [pmindex, setPmindex] = useState(0);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/investor/payment-options/${id}`)
      .then((res) => {
        // setData(res.data)
        const convertedData = convertPaymentMethod(res.data?.data) as any[];
        console.log(convertedData);
        setPmindex(1 + +convertedData?.length || 0);

        console.log(convertedData.filter((item: any) => item?.details[0]?.PaymentMethod == payId)[0]?.details)
        console.log(convertedData.filter((item: any) => item?.details[0]?.PaymentMethod == payId)[0]?.details?.map((item: any) => {
          return (
            {
              batch: item?.PaymentOption?.Batch,
              date: item?.PaymentOption?.Date,
              percentage: item?.PaymentOption?.Percentage,
              note: item?.PaymentOption?.Note
            }
          )
        }));

        setData(convertedData.filter((item: any) => item?.details[0]?.PaymentMethod == payId)[0]?.details?.map((item: any) => {
          return (
            {
              batch: item?.PaymentOption?.Batch,
              date: item?.PaymentOption?.Date,
              percentage: item?.PaymentOption?.Percentage,
              note: item?.PaymentOption?.Note
            }
          )
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isDateInput, setIsDateInput] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const toggleInputType = () => {
    setIsDateInput(!isDateInput);
  };

  const handleEditItem = (item: TableItem) => {
    setNewItem(item);
  };



  const handleDeleteItem = (batch: number) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const updatedData = data.filter((item) => item.batch !== batch);
      setData(updatedData);
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      {/* back to previous */}
      <button onClick={() => window.history.back()} className="underline text-blue-600">Back</button>
      <h1 className="text-2xl font-semibold">Payment Method of project {id}</h1>
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Batch
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Percentage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.batch}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.batch}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.percentage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPaymentTable;

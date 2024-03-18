import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { convertPaymentMethod } from "./PaymentMethodPage";
import axios from "axios";
import { toast } from "react-toastify";

interface TableItem {
  id: number | null;
  phase: string;
  paymentDate: string;
  percentage: number;
  note: string;
}

const CRUDTable: React.FC = () => {
  const [data, setData] = useState<TableItem[]>([]);
  const { id, payId } = useParams();
  const [pmindex, setPmindex] = useState(0);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/investor/payment-options/${id}`)
      .then((res) => {
        // setData(res.data)
        const convertedData = convertPaymentMethod(res.data?.data) as any[];
        console.log(convertedData);
        setPmindex(1 + +convertedData?.length || 0);

        console.log(
          convertedData.filter(
            (item: any) => item?.details[0]?.PaymentMethod == payId
          )[0]?.details
        );
        console.log(
          convertedData
            .filter((item: any) => item?.details[0]?.PaymentMethod == payId)[0]
            ?.details?.map((item: any) => {
              return {
                id: item?.PaymentOption?.PaymentOptionId,
                batch: item?.PaymentOption?.Batch,
                date: item?.PaymentOption?.Date,
                percentage: item?.PaymentOption?.Percentage,
                note: item?.PaymentOption?.Note,
              };
            })
        );

        setData(
          convertedData
            .filter((item: any) => item?.details[0]?.PaymentMethod == payId)[0]
            ?.details?.map((item: any) => {
              return {
                id: item?.PaymentOption?.PaymentOptionId,
                phase: item?.PaymentOption?.Batch,
                paymentDate: item?.PaymentOption?.Date,
                percentage: item?.PaymentOption?.Percentage,
                note: item?.PaymentOption?.Note,
              };
            })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [newItem, setNewItem] = useState<TableItem>({
    id: null,
    phase: "",
    paymentDate: "",
    percentage: 0,
    note: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleEditItem = (item: TableItem) => {
    setNewItem(item);
  };

  const handleAddItem = () => {
    //check date ís latest
    if (isDateInput) {


      const latestDate = data.reduce(
        (maxDate, item) => {
          const dateRegex = /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
          if (!dateRegex.test(item.date)) {
            console.log("item.date", item.date)
            return maxDate;
          }else{
            console.log("item.date", item.date, new Date(item.date) > new Date(maxDate))
            return new Date(item.date) > new Date(maxDate) ? item.date : maxDate
          }
        },
        "1900-01-01"
      );
      console.log(latestDate)
      if (new Date(newItem.date) < new Date(latestDate)) {
        alert("The date must not be before the latest date");
        return;
      }
    }


    const totalPercentage = data.reduce(
      (sum, item) => +sum + +item.percentage,
      +newItem.percentage
    );
    console.log(totalPercentage);

    if (totalPercentage > 100) {
      alert("The total percentage must not exceed 100%");
      return;
    }
    const newbatch =
      data.length > 0 ? (data[data.length - 1]?.batch ?? 0) + 1 : 1;
    setData([...data, { ...newItem, batch: newbatch }]);
    setNewItem({
      batch: null,
      date: "",
      percentage: 0,
      note: "",
    });
  };

  const handleUpdateItem = () => {
    const updatedData = data.map((item) =>
      item.id === newItem.id ? newItem : item
    );
    // validation
    const totalPercentage = updatedData.reduce(
      (sum, item) => +sum + +item.percentage,
      0
    );
    console.log(totalPercentage);
    if (totalPercentage > 100) {
      alert("The total percentage must not exceed 100%");
      return;
    }
    
    setData(updatedData);
   

    axios.put(`http://localhost:4000/api/investor/payment-option/${newItem?.id}`, {
      date: newItem.paymentDate,
      percentage: newItem.percentage,
      note: newItem.note,
    })
    .then((res) => {
      console.log(res);
      toast.success("Updated successfully");
      setNewItem({
        id: null,
        phase: "",
        paymentDate: "",
        percentage: 0,
        note: "",
      });
    }
    )
    .catch((err) => {
      console.log(err?.response);
      toast.error("Update failed: "+ err?.response?.data?.message);
    });
  };

  return (
    <div>
      <h2>CRUD Table</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.phase}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.paymentDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.percentage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.note}
              </td>
              <td className="flex gap-4">
                <Button onClick={() => handleEditItem(item)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {newItem.id && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Edit Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phase:
                <input
                  type="text"
                  name="phase"
                  value={newItem.phase}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Date:
                <input
                  type="date"
                  name="paymentDate"
                  value={newItem.paymentDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Percentage:
                <input
                  type="number"
                  name="percentage"
                  value={newItem.percentage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Note:
                <input
                  type="text"
                  name="note"
                  value={newItem.note}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleUpdateItem}>Update</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRUDTable;

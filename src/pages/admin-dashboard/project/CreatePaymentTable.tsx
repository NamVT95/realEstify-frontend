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

const CreatePaymentTable: React.FC = () => {
  const [data, setData] = useState<TableItem[]>([
    {
      batch: 1,
      date: "2023-04-01",
      percentage: 25,
      note: "Thanh toán đợt 1",
    },
    {
      batch: 2,
      date: "2023-07-01",
      percentage: 35,
      note: "Thanh toán đợt 2",
    },
    {
      batch: 3,
      date: "2023-10-01",
      percentage: 40,
      note: "Thanh toán đợt 3",
    },
  ]);
  const {id} = useParams()
  const [newItem, setNewItem] = useState<TableItem>({
    batch: null,
    date: "",
    percentage: 0,
    note: "",
  });
  const [pmindex, setPmindex] = useState(0)

  React.useEffect(() => {
    axios.get(`http://localhost:4000/api/investor/payment-options/${id}`)
    .then((res) => {
      // setData(res.data)
      const convertedData = convertPaymentMethod(res.data?.data) as any[];
      console.log(convertedData);
      setPmindex((1 + +convertedData?.length) || 0);
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const [isDateInput, setIsDateInput] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const toggleInputType = () => {
    setIsDateInput(!isDateInput);
  };

  const handleAddItem = () => {
    const totalPercentage = data.reduce(
      (sum, item) => +sum + +item.percentage,
      +newItem.percentage
    );
    console.log(totalPercentage);

    if (totalPercentage > 100) {
      alert("The total percentage must not exceed 100%");
      return;
    }
    const newbatch = data.length > 0 ? (data[data.length - 1]?.batch ?? 0) + 1 : 1;
    setData([...data, { ...newItem, batch: newbatch }]);
    setNewItem({
      batch: null,
      date: "",
      percentage: 0,
      note: "",
    });
  };

  const handleEditItem = (item: TableItem) => {
    setNewItem(item);
  };

  const handleUpdateItem = () => {
    const updatedData = data.map((item) =>
      item.batch === newItem.batch ? newItem : item
    );
    setData(updatedData);
    setNewItem({
      batch: null,
      date: "",
      percentage: 0,
      note: "",
    });
  };

  const handleDeleteItem = (batch: number) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const updatedData = data.filter((item) => item.batch !== batch);
      setData(updatedData);
    }
  };
const navigate = useNavigate()
  const handleSubmit = () => {
    // check if the total percentage is 100
    const totalPercentage = data.reduce(
      (sum, item) => +sum + +item.percentage,
      0
    );
    if (totalPercentage !== 100) {
      alert("The total percentage must be 100%");
      return;
    }
    console.log(data);

    

    axios.post("http://localhost:4000/api/investor/payment-option-for-project", {
      "projectId": id,
      "paymentMethod": pmindex,
      "paymentOptions": data
    })
    .then(res => {
      console.log(res)
      toast.success("Create payment method successfully")
      navigate("/admin-dashboard/project/"+ id +"/payment-method")

    })
    .catch(err => {
      console.log(err)
      toast.error("Create payment method failed" + err?.response?.data?.message)
    })
  };

  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 text-emerald-600">Batch</th>
            <th className="px-4 py-2 text-emerald-600">Payment Date</th>
            <th className="px-4 py-2 text-emerald-600">Percentage</th>
            <th className="px-4 py-2 text-emerald-600">Note</th>
            <th className="px-4 py-2 text-emerald-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.batch}>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.batch}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.date}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.percentage}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.note}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium space-x-4">
                <Button onClick={() => handleEditItem(item)}>Edit</Button>
                <Button onClick={() => handleDeleteItem(item?.batch ?? 0)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3 className="text-lg font-semibold mb-4">Add/Edit Item</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-[500px]">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {isDateInput ? (
                <div>
                  <p>Payment Date:</p>
                  <input
                    type="date"
                    name="date"
                    value={newItem.date}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                  />
                </div>
              ) : (
                <div>
                  <p>Thông tin:</p>
                <input
                  type="text"
                  name="date"
                  value={newItem.date || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                />
                </div>
              )}
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
        <button
          type="button"
          onClick={toggleInputType}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          {isDateInput ? "Switch to Text" : "Switch to Date"}
        </button>
        <div className="mt-4">
          {newItem.batch === null ? (
            <Button onClick={handleAddItem}>Add</Button>
          ) : (
            <Button onClick={handleUpdateItem}>Update</Button>
          )}
        </div>
      </div>

      <Button onClick={handleSubmit} className="mt-10">
        Create Payment Method
      </Button>
    </div>
  );
};

export default CreatePaymentTable;
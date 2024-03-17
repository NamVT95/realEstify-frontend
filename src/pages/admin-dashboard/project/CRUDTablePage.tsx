import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface TableItem {
  id: number | null;
  phase: string;
  paymentDate: string;
  percentage: number;
  note: string;
}

const CRUDTable: React.FC = () => {
  const [data, setData] = useState<TableItem[]>([
    {
      id: 1,
      phase: "Phase 1",
      paymentDate: "2023-04-01",
      percentage: 25,
      note: "Note 1",
    },
    {
      id: 2,
      phase: "Phase 2",
      paymentDate: "2023-07-01",
      percentage: 35,
      note: "Note 2",
    },
    {
      id: 3,
      phase: "Phase 3",
      paymentDate: "2023-10-01",
      percentage: 40,
      note: "Note 3",
    },
  ]);

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
    const newId = data.length > 0 ? (data[data.length - 1]?.id ?? 0) + 1 : 1;
    setData([...data, { ...newItem, id: newId }]);
    setNewItem({
      id: null,
      phase: "",
      paymentDate: "",
      percentage: 0,
      note: "",
    });
  };

  const handleEditItem = (item: TableItem) => {
    setNewItem(item);
  };

  const handleUpdateItem = () => {
    const updatedData = data.map((item) =>
      item.id === newItem.id ? newItem : item
    );
    setData(updatedData);
    setNewItem({
      id: null,
      phase: "",
      paymentDate: "",
      percentage: 0,
      note: "",
    });
  };

  const handleDeleteItem = (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    }
  };

  return (
    <div>
      <h2>CRUD Table</h2>
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="px-4 py-2 text-emerald-600">ID</th>
            <th className="px-4 py-2 text-emerald-600">Phase</th>
            <th className="px-4 py-2 text-emerald-600">Payment Date</th>
            <th className="px-4 py-2 text-emerald-600">Percentage</th>
            <th className="px-4 py-2 text-emerald-600">Note</th>
            <th className="px-4 py-2 text-emerald-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.id}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.phase}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.paymentDate}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.percentage}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium">
                {item.note}
              </td>
              <td className="border border-emerald-500 px-4 py-2 text-emerald-600 font-medium space-x-4">
                <Button onClick={() => handleEditItem(item)}>Edit</Button>
                <Button onClick={() => handleDeleteItem(item?.id ?? 0)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3 className="text-lg font-semibold mb-4">Add/Edit Item</h3>
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
          {newItem.id === null ? (
            <Button
              onClick={handleAddItem}
            >
              Add
            </Button>
          ) : (
            <Button
              onClick={handleUpdateItem}
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CRUDTable;

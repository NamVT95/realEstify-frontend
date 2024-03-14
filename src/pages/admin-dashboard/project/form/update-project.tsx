import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { createOpenForSale, getProjectById } from '@/lib/api/project';
import { closeUpdateForm, setProject } from '@/store/project/updateProjectSlice';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { switchTrigger } from '@/store/renderTrigger';

export default function UpdateProjectForm() {
    const dispatch = useAppDispatch();
    const { projectId } = useAppSelector((state) => state.updateProject);
    const [fromDate, setFromDate] = useState<Date>(new Date()); // Set default value to today
    const [toDate, setToDate] = useState<Date>(new Date()); // Set default value to today

    const handleGetProjectById = async () => {
        const { data, error } = await getProjectById(projectId);
        dispatch(setProject({ project: data?.response.data }));
        console.log(data, error);
    };

    useEffect(() => {
        if (projectId !== 0) {
            handleGetProjectById();
        }
    }, [projectId]);

    const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();

        // Check if selectedDate is valid and later than or equal to today
        if (!isNaN(selectedDate.getTime()) && selectedDate >= today) {
            setFromDate(selectedDate);

            // Update toDate to be 1 day later than fromDate
            const newToDate = new Date(selectedDate);
            newToDate.setDate(selectedDate.getDate() + 1);
            setToDate(newToDate);
        }
    };

    const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(event.target.value);

        // Check if selectedDate is valid and later than fromDate
        if (!isNaN(selectedDate.getTime()) && fromDate && selectedDate > fromDate) {
            setToDate(selectedDate);
        }
    };

    const handleSave = async () => {
        const data = await createOpenForSale(projectId, fromDate.toISOString(), toDate.toISOString());
        console.log(data);
        if (data.error) {
            toast.error(data.error.message);
            setTimeout(() => {
                dispatch(closeUpdateForm())
            }, 500);
        }
        if (data.data) {
            toast.success(data.data.message);
            setTimeout(() => {
                dispatch(closeUpdateForm())
            }, 500);
        }
        dispatch(switchTrigger())
    }

    return (
        <div className='space-y-4 w-full'>
            <div className='w-full flex '>
                <div className='flex-1'>From Date:</div>
                <input
                    type="date"
                    className='border-primary border-2 px-4 py-2 rounded-md'
                    onChange={handleFromDateChange}
                    value={fromDate?.toISOString().split('T')[0]} // Ensure input reflects the selected date
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>
            <div className='w-full flex'>
                <div className='flex-1'>To Date:</div>
                <input
                    type="date"
                    className='border-primary border-2 px-4 py-2 rounded-md'
                    onChange={handleToDateChange}
                    value={toDate?.toISOString().split('T')[0]} // Ensure input reflects the selected date
                    min={fromDate?.toISOString().split('T')[0]} // Set min attribute to fromDate to restrict selection
                />
            </div>
            <div className='flex gap-2'>
                <div className='flex gap-2'>
                    From:
                    <div className='font-medium'>
                        {format(fromDate, 'dd/MM/yyyy')}
                    </div>
                </div>
                -
                <div className='flex gap-2'>
                    To:
                    <div className='font-medium'>
                        {format(toDate, 'dd/MM/yyyy')}
                    </div>
                </div>
            </div>
            <div>
                <Button onClick={() => {
                    handleSave();
                }}>
                    Save
                </Button>
            </div>
        </div>
    );
}

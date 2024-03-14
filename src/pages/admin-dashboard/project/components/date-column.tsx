import { Row } from '@tanstack/react-table'
import { DataType } from './data-table'
import { axiosClient } from '@/lib/api/config/axiosClient'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

interface DateColumnProps {
    row: Row<DataType>
    type: "end" | "start"
}

export default function DateColumn({ row, type }: DateColumnProps) {
    const [response, setResponse] = useState({})

    const getOpeningForSale = async (id: number) => {
        try {
            const response = await axiosClient.get(`/api/openingForSales/${id}`)
            setResponse(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOpeningForSale(row.original.ProjectId)
    }, [row.original.ProjectId])

    if (Object.keys(response).length === 0) {
        return <td>Loading...</td>
    }

    if (response?.data?.length === 0) {
        return <td>No opening for sale</td>
    } else {
        if (type === "start") {
            return <div>{(new Date(response.data?.[0]?.StartDate)).toLocaleDateString()}</div>
        } else {
            return <div>{(new Date(response.data?.[0]?.EndDate)).toLocaleDateString()}</div>
        }

    }
}

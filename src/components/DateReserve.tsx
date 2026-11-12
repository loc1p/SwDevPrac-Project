'use client'
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function DateReserve({initialDate,onDateChange}:{initialDate?:Dayjs|null,onDateChange:(value:Dayjs|null)=>void}){
    const [reserveDate,setReserveDate] = useState<Dayjs|null>(initialDate ?? null)
    return(
        <div className="flex flex-row rounded-lg w-fit px-5 py-3 justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                className="bg-white"
                 format="DD/MM/YYYY" disablePast value={reserveDate}
                onChange={(newValue)=>{
                    setReserveDate(newValue);
                    onDateChange(newValue)
                }}
                />
            </LocalizationProvider>
        </div>
    )
}
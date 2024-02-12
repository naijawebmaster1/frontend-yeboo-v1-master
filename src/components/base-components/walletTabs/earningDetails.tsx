import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts"
import { useSelector } from "react-redux";
import { useState } from "react";
import { getTotalAmountForYear, getTotalAmountForMonth } from "../../../services/utils/helpersFunc";
// Function to format vertical axis labels to display values in thousands (K)
const formatYAxisLabel = (value: number) => {
    return `${value / 1000}K`;
}



const EarningDetails = () => {
    const { transactions } = useSelector((state: any) => state.transactions)
    const [currentFilter, setCurrentFilter] = useState('monthly')
    const currentYear = Number(new Date().getFullYear())

    const data = [
        { name: 'JAN', income: getTotalAmountForMonth(1, transactions) },
        { name: 'FEB', income: getTotalAmountForMonth(2, transactions) },
        { name: 'MAR', income: getTotalAmountForMonth(3, transactions) },
        { name: 'APR', income: getTotalAmountForMonth(4, transactions) },
        { name: 'MAY', income: getTotalAmountForMonth(5, transactions) },
        { name: 'JUN', income: getTotalAmountForMonth(6, transactions) },
        { name: 'JUL', income: getTotalAmountForMonth(7, transactions) },
        { name: 'AUG', income: getTotalAmountForMonth(8, transactions) },
        { name: 'SEP', income: getTotalAmountForMonth(9, transactions) },
        { name: 'OCT', income: getTotalAmountForMonth(10, transactions) },
        { name: 'NOV', income: getTotalAmountForMonth(11, transactions) },
        { name: 'DEC', income: getTotalAmountForMonth(12, transactions) },
    ]

    const yearlyData = [
        { name: `${currentYear - 8}`, income: getTotalAmountForYear(Number(currentYear -8), transactions) },
        { name: `${currentYear - 7}`, income: getTotalAmountForYear(Number(currentYear -7), transactions) },
        { name: `${currentYear - 6}`, income: getTotalAmountForYear(Number(currentYear -6), transactions) },
        { name: `${currentYear - 5}`, income: getTotalAmountForYear(Number(currentYear -5), transactions) },
        { name: `${currentYear - 4}`, income: getTotalAmountForYear(Number(currentYear -4), transactions) },
        { name: `${currentYear - 3}`, income: getTotalAmountForYear(Number(currentYear -3), transactions) },
        { name: `${currentYear - 2}`, income: getTotalAmountForYear(Number(currentYear -2), transactions) },
        { name: `${currentYear - 1}`, income: getTotalAmountForYear(Number(currentYear -1), transactions) },
        { name: `${currentYear}`, income: getTotalAmountForYear(Number(currentYear), transactions) },
    ]
    return (
        <div className="w-full flex flex-col gap-y-4">
            <span className='w-full bg-[#FBFBFB] flex justify-between items-center p-4'>
                <><h6 className='text-[#696C70] text-xs font-normal'>Earning Analytics</h6></>
                <select 
                onChange={(e) => setCurrentFilter(e.target.value)}
                name="duration" className="text-[#3E4247] text-xs font-normal border-1 rounded outline-none">
                    <option value="monthly">Monthly</option>
                    <option value="annually">Annually</option>
                    {/* <option value="weekly">Weekly</option> */}
                </select>
            </span>

            <div className="w-full border-solid border-1 border-[#FBFBFB]">
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        width={1045}
                        height={400}
                        data={
                            currentFilter === 'monthly' ? data : currentFilter === 'annually' ? yearlyData : data
                        }
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                        }}
                        style={{
                            width: '100%',
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                            type="number"
                            domain={[0, 950000]}
                            tickFormatter={formatYAxisLabel}
                            ticks={[50000, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000]}
                        />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stackId="1"
                            stroke="#33BB77"
                            fill="#EBF8F1"
                        />
                        <ReferenceLine y={750000} stroke="red" strokeDasharray="3 3" label="High" />
                        <ReferenceLine y={150000} stroke="blue" strokeDasharray="3 3" label="Low" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default EarningDetails
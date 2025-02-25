import { useQuery } from "@tanstack/react-query";
import { FaUserCheck } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { GiNurseMale } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', '#59815B'];
const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
const data = [
    {
        name: 'January',
        uv: 7500,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'February',
        uv: 5000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        uv: 9500,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'April',
        uv: 4500,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'May',
        uv: 6000,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'June',
        uv: 7500,
        pv: 4300,
        amt: 2100,
    },
];
const Statistics = () => {


    const axiosSecure = useAxiosSecure()
    const { data: adminStats } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/adminStats");
            return res.data;
        }

    });

    return (
        <div>

             <h2 className="text-center font-bold text-xl text-PrimaryColor mb-4">Analytics & Insights</h2>
            <div className="flex flex-col lg:grid grid-cols-12 ">
               
                {/* stats container */}
                <div className="flex justify-center col-span-6 gap-5 flex-col mt-5 text-center ">
                    <div className="stats w-3/5 max-w-sm bg-base-100 border border-base-300 shadow-lg text-white  mx-auto">
                        <div className="stat">
                            <div className="stat-title flex gap-2 items-center justify-center text-gray-300 "><RiSecurePaymentLine className="text-2xl text-SecondaryColor" />Total Payment</div>
                            <div className="stat-value text-center">{adminStats?.payment}$</div>

                        </div>

                    </div>
                    <div className="stats w-3/5 max-w-sm bg-base-100 border border-base-300 shadow-lg mx-auto text-white">
                        <div className="stat">
                            <div className="stat-title  flex gap-2 items-center justify-center text-gray-300"><GiNurseMale className="text-2xl text-SecondaryColor" />Total Tour Guides</div>
                            <div className="stat-value">{adminStats?.totalTourGuides}</div>

                        </div>

                    </div>
                    <div className="stats w-3/5 max-w-sm bg-base-100 border border-base-300 shadow-lg mx-auto text-white">
                        <div className="stat ">
                            <div className="stat-title flex gap-2 items-center justify-center text-gray-300"><GoPackage className="text-2xl text-SecondaryColor" />Total Packages</div>
                            <div className="stat-value">{adminStats?.totalPackages}</div>

                        </div>

                    </div>
                    <div className="stats w-3/5 max-w-sm bg-base-100 border border-base-300 shadow-lg mx-auto text-white">
                        <div className="stat ">
                            <div className="stat-title flex gap-2 items-center justify-center text-gray-300"><FaUserCheck className="text-2xl text-SecondaryColor " /> Total Clients  </div>
                            <div className="stat-value">{adminStats?.totalClient}</div>


                        </div>

                    </div>
                </div>
                <div className="col-span-6 flex  flex-col items-center justify-center" >

                    <h3 className="text-center font-bold md:text-lg lg:text-xl my-7">Monthly Sales Analysis</h3>


                    {/* Chart */}

                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>

                </div>
            </div>
        </div>
    )
}

export default Statistics

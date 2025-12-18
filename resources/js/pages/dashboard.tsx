import BarGenreTvMovie from '@/components/dashboard/BarGenreTvMovie'; 
import LineTopGenre from '@/components/dashboard/LineTopGenre';
import PieCategory from '@/components/dashboard/PieCategory';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard, dashboardcategory, dashboardsummary } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarDays, FilmIcon, Play, Star, TrendingUp, UserPen } from 'lucide-react';
import {   useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {

    const [panelVisible, setPanelVisible] =  useState(false); 
    const [dates, setDates] = useState<[Dayjs, Dayjs] | null>(() => [
        dayjs().startOf('month'), 
        dayjs().endOf('month'),  
    ]);
  
    const [uri, seturi] = useState("");
    const [loading, setLoading] = useState(false);
    const getData = async (uri : string) => { 
            try {
                setLoading(true); 
                const res = await fetch(
                    uri,
                    { method: "GET" }
                ); 
                const d = await res.json(); 
                return d;
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
    };

    const [resume, setresume] = useState({})
    const [piecategory, setpiecategory] = useState([])
    const [topten, settopten] = useState([])
    const [datagroupcategory, setdatagroupcategory] = useState([])
    useEffect(()=>{
        let newDate = [dates[0].format("YYYY-MM-DD"),dates[1].format("YYYY-MM-DD")];
        (async()=>{
            await getData(dashboardsummary({datestart:newDate[0], dateend:newDate[1]}).url).then((v)=>{ 
                setresume(v)
                let datapie = [{ value: (v?.data !== undefined ? v?.data.total_movies  : 0), name: "Movies" },
                { value: (v?.data !== undefined ? v?.data.total_tv_show  : 0), name: "TV Show" }];
                setpiecategory(datapie)
                settopten(v.data !== undefined ? v.data.top_ten_genre : [])
            })

             await getData(dashboardcategory({datestart:newDate[0], dateend:newDate[1]}).url).then((v)=>{
                setdatagroupcategory(v)
             });
        })()
    },[dates])
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className='flex justify-end  pr-5'>
                        <div className="inline-flex items-center space-x-2 cursor-pointer"
                                onClick={(e) => {
                                e.stopPropagation();
                                setPanelVisible(true);
                                }}>
                                <CalendarDays /> 
                                <p>
                                {dates 
                                    ? `${dates[0].format('DD MMM YYYY')} ~ ${dates[1].format('DD MMM YYYY')}, ${dates[1].diff(dates[0], 'day')} Hari` 
                                    : 'Pilih tanggal'
                                }
                                </p>
                            </div>
                            <div style={{ position: 'relative', height: '0', overflow: 'hidden' , right:'20px'}}>
                                <DatePicker.RangePicker
                                    open={panelVisible}
                                    value={dates} 
                                    onOpenChange={setPanelVisible}
                                    placement="bottomLeft"   
                                    getPopupContainer={() => document.body}   
                                    style={{
                                        opacity: 0,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        pointerEvents: 'none',
                                        width: '1px',
                                        height: '1px'
                                    }}
                                    
                                    onChange={(ranges) => {
                                        if (ranges?.[0] && ranges?.[1] && ranges[1].diff(ranges[0], 'day') > 0) {
                                            setDates([ranges[0], ranges[1]]);
                                        } else {
                                            setDates(null);
                                        }
                                        setPanelVisible(false);
                                    }}
                                />
                            </div>
                </div>

                <div className="grid grid-cols-6 max-md:grid-cols-1 gap-4 ">
                     <div className='  shadow-sm border border-gray-100 rounded-2xl min-h-10 row-span-2 col-span-3 relative'>  
                            {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl z-40'></div>
                            ) }  
                            <div className='p-4 '>
                                <h5 className='  font-semibold'>Total Berdasarkan Kategory</h5>
                                <PieCategory data={piecategory} /> 
                            </div>
                     </div>
                     <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl overflow-hidden text-center space-y-3 relative">
                       {loading && (
                             <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl'></div>
                        ) }
                        <div className='p-6'>
                            <div className="mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                🎬
                            </div>

                            <h5 className="text-sm font-medium text-gray-500">
                                Total Movies
                            </h5>

                            <h1 className="mt-3 text-4xl font-extrabold text-indigo-700">
                                {resume?.data !== undefined ? resume?.data.total_movies  : 0}
                            </h1>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl overflow-hidden text-center space-y-3 relative">
                        {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl'></div>
                            ) }
                            <div className='p-6'>
                                <div className="mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                    <FilmIcon />
                                </div>

                                <h5 className="text-sm font-medium text-gray-500">
                                    Total Tv Show
                                </h5>

                                <h1 className="mt-3 text-4xl font-extrabold text-indigo-700">
                                     
                                {resume?.data !== undefined ? resume?.data.total_tv_show  : 0}
                                </h1>
                            </div> 
                    </div> 
                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl overflow-hidden text-center space-y-3 relative">
                        {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl'></div>
                            ) }
                        <div className='p-6'>
                            <div className="mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <Play />
                            </div>

                            <h5 className="text-sm font-medium text-gray-500">
                                Total Genre
                            </h5>

                            <h1 className="mt-3 text-4xl font-extrabold text-indigo-700">
                                 {resume?.data !== undefined ? resume?.data.total_genre  : 0} 
                            </h1>
                        </div> 
                    </div> 
                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl overflow-hidden text-center space-y-3 relative">
                        {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl'></div>
                            ) }
                        <div className='p-6'>
                            <div className="mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <Star />
                            </div>

                            <h5 className="text-sm font-medium text-gray-500">
                                Avarage Rating
                            </h5>

                            <h1 className="mt-3 text-4xl font-extrabold text-indigo-700">
                               {resume?.data !== undefined ? resume?.data.average_rating  : 0} 
                            </h1>
                        </div> 
                    </div> 
                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl overflow-hidden text-center space-y-3 relative">
                        {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl'></div>
                            ) }
                        <div className='p-6'>
                            <div className="mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <UserPen />
                            </div>

                            <h5 className="text-sm font-medium text-gray-500">
                                Total Vote
                            </h5> 
                            <h1 className="mt-3 text-4xl font-extrabold text-indigo-700">
                                  {resume?.data !== undefined ? resume?.data.total_vote  : 0} 
                            </h1>
                        </div> 
                    </div> 
                    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl overflow-hidden text-center space-y-3 relative">
                        {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl'></div>
                            ) }
                        <div className='p-6'>
                            <div className="mx-auto mb-3 w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                            <TrendingUp />
                            </div>

                            <h5 className="text-sm font-medium text-gray-500">
                                Top Genre
                            </h5>

                            <div>
                                <h1 className="mt-3 text-4xl font-extrabold text-indigo-700">
                                   
                                    {resume?.data !== undefined ? (resume?.data.top_genre !== undefined ? resume?.data.top_genre.total : 0)  : 0} 
                                </h1>
                                <small className='line-clamp-1'> {resume?.data !== undefined ? (resume?.data.top_genre !== undefined ? resume?.data.top_genre.name : 0)  : 0}  </small>
                            </div>
                       </div>
                    </div> 
            
                    <div className='  shadow-sm border border-gray-100 rounded-2xl   col-span-3 relative min-h-72'>
                            {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl  z-40'></div>
                            ) }  
                            <h5 className=' p-4 font-semibold'>Tren Berdasarkan Genre</h5>
                             <BarGenreTvMovie data={datagroupcategory} />
                     </div>
                    <div className='  shadow-sm border border-gray-100 rounded-2xl min-h-72  col-span-3'>  
                            {loading && (
                                <div className='backdrop-blur-sm w-full h-full absolute rounded-2xl  z-40'></div>
                            ) }  
                            <h5 className=' p-4 font-semibold'>Top 10 Genre</h5>
                             <LineTopGenre data={topten} />
                     </div>
                </div>
                 
            </div>
        </AppLayout>
    );
}

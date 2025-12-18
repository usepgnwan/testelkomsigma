import useCustom from "@/components/custom/useCustom";
import { usePage } from "@inertiajs/react";
import { Skeleton } from "antd";
import { Clock9, Star, TrendingUp, Users } from "lucide-react";

export default function DetailCard({ detailData }) {
    const { DateID} = useCustom(); 
    const { url, props } = usePage();
    return (
          <div className='w-full'>
                <div className='border border-gray-200 p-4'>
                    <div className='flex space-x-2'>
                            {detailData?.poster_path !== null ? (
                                    <div className="h-56 w-40 overflow-hidden rounded">
                                        <img
                                            src={`${props.tmdb.uri_img_tmdb}${detailData?.poster_path}`}
                                            className="w-full h-full object-cover"
                                            alt="poster"
                                        />
                                    </div>
                                ):(
                                    <div className='h-56 w-40'>
                                        <Skeleton.Image className="!w-full !h-full"/>
                                    </div>
                                )}
                            <div className='w-8/12 p-4 relative'>
                                <h3 className='font-semibold text-lg line-clamp-1'> { detailData?.title }  </h3>
                                <div className="flex flex-col space-y-1">
                                    <small>Original Title : { detailData?.title }</small>
                                    <small>Category : { detailData?.category }</small>
                                    <div className="flex space-x-2 flex-wrap">
                                        {detailData.genres !== undefined && detailData?.genres.map((v)=>(
                                    
                                            <small className="px-2 bg-blue-400 text-nowrap rounded-2xl text-white">
                                            { v.name }
                                        </small>
                                    
                                        ))}
                                    </div>
                                </div>
                                <p>
                                    {detailData?.overview}
                                </p>

                                <div className="mt-4 space-x-4">
                                    <small className='inline-flex items-center  text-xs'><Star className='text-yellow-400 w-4 h-4' /> &nbsp; {detailData?.vote_average}</small>
                                    <small className='inline-flex items-center col-span-2  text-nowrap text-xs'><Clock9  className='text-yellow-400 w-4 h-4'/> &nbsp;
                                    {detailData?.release_date !== undefined && detailData?.release_date !== null && (
                                        DateID(detailData?.release_date  , "date")
                                    ) }
                                    
                                    { detailData?.date_sycn !== undefined && detailData?.date_sycn!== null  &&(
                                        DateID(detailData?.date_sycn  , "date")
                                    ) }
                                    
                                    </small>
                                    <small className='inline-flex items-center  text-xs'><Users  className='text-yellow-400 w-4 h-4'/> &nbsp; {detailData?.vote_count}</small>
                                    <small className='inline-flex items-center  text-xs'><TrendingUp  className='text-yellow-400 w-4 h-4'/> &nbsp; {detailData?.popularity}&nbsp; people</small>
                                </div> 
                            
                            
                            </div>
                        </div> 
                </div>
            </div>
    )
}
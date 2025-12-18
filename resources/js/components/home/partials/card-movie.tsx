import useCustom from "@/components/custom/useCustom";
import { usePage } from "@inertiajs/react";
import { Skeleton } from "antd";
import { Clock9, Star, Users } from "lucide-react";

export function CardMovie({ detailData , isnew }){
    
    const { DateID} = useCustom();
    const {props,url } = usePage(); 
    return (
         <div className={`${isnew ? 'border-none' : 'border border-gray-200 '} cursor-pointer`}>
            <div className='flex space-x-2'>
                      {detailData?.poster_path !== null ? ( 
                        <div className={`${isnew ? ' h-24  w-16':'h-56 w-40 '}overflow-hidden rounded`}>
                            <img
                                src={`${props.tmdb.uri_img_tmdb}${detailData?.poster_path}`}
                                className="w-full h-full object-cover"
                                alt="poster"
                            />
                        </div>
                    ):(
                        <div className={`${isnew ? ' h-24  w-16':'h-56 w-40 '} `}>
                            <Skeleton.Image className="!w-full !h-full"/>
                        </div>
                    )}
                    <div className={`${ isnew ? 'w-5/6':'w-8/12  p-4 '} relative`}>
                            <h3 className='font-semibold text-lg line-clamp-1'> { detailData?.title }  </h3>

                                {!isnew&& ( 
                                    <div className="flex flex-col space-y-1"> 
                                        <small>Category : { detailData?.category }</small>
                                        
                                    </div>
                                )}
                                <p className={`${isnew ? 'line-clamp-2 text-sm' :'line-clamp-3'}`}>
                                    {detailData?.overview}
                                </p>

                            <div className='text-right'>
                                <small className=' text-red-300 '>Read more</small>
                            </div> 
                        {!isnew &&(
                             <div className='grid grid-cols-4 absolute bottom-5 w-full px-4'>
                            <small className='inline-flex items-center  text-xs'><Star className='text-yellow-400 w-4 h-4' /> &nbsp; {detailData?.vote_average}</small>
                           
                            <small className='inline-flex items-center col-span-2  text-nowrap text-xs'><Clock9  className='text-yellow-400 w-4 h-4'/> &nbsp;
                              {detailData?.release_date !== undefined && detailData?.release_date !== null ? (
                                        DateID(detailData?.release_date  , "date")
                                    ) : (
                                        DateID(detailData?.date_sync  , "date")
                                ) }
                            </small>
                            <small className='inline-flex items-center  text-xs'><Users  className='text-yellow-400 w-4 h-4'/> &nbsp; {detailData?.vote_count}</small>
                        </div> 
                    
                        )}
                       
                    
                    </div>
            </div> 
        </div>
    )
}

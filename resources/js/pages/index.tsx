import { Header } from '@/components/home/header';
import { ListMovies } from '@/components/home/partials/list-movies';
import { NewMovieList } from '@/components/home/partials/new-movielist';
import { Trending } from '@/components/home/partials/trending';
import { Jumbotron } from '@/components/jumbotron';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Clock9, Star, Users } from 'lucide-react';

export default function Index({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const {props } = usePage(); 
    return (
        <>
            <Head title="Home"></Head>
            <Header />
            <div className='space-y-24 max-w-7xl mx-auto max-md:w-full max-md:px-6'> 
                <section className=' grid grid-cols-3 mt-28 gap-4 h-[400px] max-md:h-full max-md:grid-cols-1 max-md:gap-3'>
                    <div className='col-span-2 max-md:col-span-1 rounded-2xl overflow-hidden'>
                        <Jumbotron/>
                    </div>
                    <div className=' bg-black/90  backdrop-blur-sm  p-5 rounded-2xl flex flex-col space-y-3 text-white'>
                        <h3>New Movie List</h3>
                        <div className='bg-white rounded-2xl h-full p-6 text-black flex flex-col space-y-2'>
                          
                             <NewMovieList />

                        </div>
                    </div>
                </section>
                <section className=' space-y-12 my-36'>
                    <div className=' space-y-4  text-center'>
                        <h3 className='font-bold text-4xl'>Movies List System</h3>
                        <div className="flex items-center text-center w-96 max-md:w-full mx-auto">
                            <div className="flex-1 border-b border-gray-300 mr-2"></div>
                            <span className="text-red-500 text-base tracking-widest">✦✦✦</span>
                            <div className="flex-1 border-b border-gray-300 ml-2"></div>
                        </div>
                        <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam fugit quos tenetur numquam. Tenetur, possimus </p>
                    </div>

                    <div className='space-y-8'>
                        <h4 className='font-bold text-3xl'>Trending </h4>
                        <Trending />
                    </div>
                    <div className='space-y-8'> 
                        <h4 className='font-bold text-3xl'>Explore what’s streaming </h4>
                        <ListMovies /> 
                    </div>
                </section>

            </div>
        
            <footer className=' w-full p-4 text-center text-white bg-black/90 bottom-0 '>
                    Usep Gunawan
            </footer>
        </>
    );
}

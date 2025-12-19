<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Movies as Mmovies;
use App\Models\Genre;
use App\Models\GenreMovies;
use Illuminate\Support\Facades\Hash;

use App\Helpers\DataTable\WithSorting;
use App\Helpers\DataTable\WithPerPagePagination;
use App\Helpers\Sync\DataSync;
 
class Movies extends Controller
{
    use WithPerPagePagination, WithSorting,DataSync;
  
    public $mModel;
    public $filters = [
        'search' => ''
    ];
    public function __construct(Mmovies $mModel){
        $this->mModel = $mModel;
    }

    public function getRowsQuery(Request $request)
    {
        $query =  $this->mModel::with('genres')->when(!is_null($request->get('search')), function($q) use ($request){
             $q->where("category","ilike", "%" .$request->get('search'). "%")->orwhere("name","ilike", "%" .$request->get('search'). "%");
        });

        return $this->applySorting($query,$request);
    }

    public function getRows(Request $request)
    { 
        return $this->applyPagination($this->getRowsQuery($request),$request);
    }

    public function create(Request $request): Response
    { 
        $this->default_sorts = ["date_sycn" => "desc"];
        $data = $this->getRows($request); 
        $search = $request->get('search'); 
        return Inertia::render('dashboard/movies',
        [
            'data' => $data,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show(Mmovies $genre){
   
        return response()->json(["data"=> $genre]);
    }

    public function store(Request $request){ 
        $popularity = ["popularity.desc","popularity.asc",""];
        $uri = ["discover/movie?include_video=true&language=en-US&include_adult=false","discover/tv?include_video=true&language=en-US&include_adult=false"];
        $id = rand(0, 1); 
        $page = rand(1,10); // ini akan random mengambil data page berapa di batasin 10 agar tidak membebankan server dan mengambil max data 200 karna 1 page 20 data untuk sampling cukup
        $link  = $uri[$id] . "&sort_by=" . $popularity[$id];
        $link .=  $link . "&page=" . $page;
 

        $data = collect($this->GetApiTmdb($link ,"results"))->map(function($v) use ($id){  
          
            if($id == 1){ 
                $v['video'] =false;
                $realese_date = $v['first_air_date'];
                $v['title'] =  $v['name'];
                $v['original_title'] =  $v['original_name'];
                $v['release_date'] =  $realese_date;
                unset( $v['name']);
                unset($v['first_air_date']);
                unset($v['origin_country']);
                unset($v['original_name']);
            } 
            $v['category'] = $id == 0 ? "Movie" : "Tv";
            $v['date_sycn'] = now();
            $v['release_date'] = !empty($v['release_date'])   ? $v['release_date'] : null;
            return $v;
        });
 
        $this->mModel::upsert(
                            collect($data)->map(fn ($item) => [
                                'id' => $item['id'],  
                                'category' => $item['category'],
                                'title' => $item['title'],
                                'original_title' => $item['original_title'],
                                'original_language' => $item['original_language'],
                                'overview' => $item['overview'],
                                'slug' =>  $this->mModel::generateUniqueSlug($item['title']),
                                'adult' => $item['adult'],
                                'backdrop_path' => $item['backdrop_path'],
                                'poster_path' => $item['poster_path'], 
                                'popularity' => $item['popularity'],
                                'release_date' => $item['release_date'],
                                'video' => $item['video'],
                                'vote_average' => $item['vote_average'],
                                'vote_count' => $item['vote_count'],
                                'date_sycn' => $item['date_sycn'],
                                'updated_at'=> now(),
                                'created_at'=> now(),
                            ])->toArray(),
                            ['id'],
                            [
                                'title',
                                'backdrop_path',
                                'poster_path', 
                                'popularity',
                                'vote_average',
                                'vote_count',
                                'date_sycn'
                            ]
                        );


        $pivotData = []; 
        foreach ($data as $item) {
            $movieId =  $this->mModel::where('id', $item['id'])->value('id');

            if (! $movieId) continue;

            foreach ($item['genre_ids'] as $genreTmdbId) {
                $genreId = Genre::where('id', $genreTmdbId)->value('id');

                if ($genreId) {
                    $pivotData[] = [
                        'movie_id' => $movieId,
                        'genre_id' => $genreId,
                    ];
                }
            }
        }

        GenreMovies::upsert(
            $pivotData,
            ['movie_id', 'genre_id']
        );


        return redirect()->back()->with('success', 'Sycn berhasil');     
    }
 
    public function getList(Request $request){
        $this->default_sorts = ["id" => "desc","date_sycn"=>"desc"];
        $data = $this->getRows($request); 
        return response()->json(["data"=>$data]);
    }
}
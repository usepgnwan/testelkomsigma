<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Genre as Mgenre;
use Illuminate\Support\Facades\Hash;

use App\Helpers\DataTable\WithSorting;
use App\Helpers\DataTable\WithPerPagePagination;
use App\Helpers\Sync\DataSync;
 
class Genre extends Controller
{
    use WithPerPagePagination, WithSorting,DataSync;
  
    public $mModel;
    public $filters = [
        'search' => ''
    ];
    public function __construct(Mgenre $mModel){
         $this->mModel = $mModel;
    }

    public function getRowsQuery(Request $request)
    {
        $query =  $this->mModel::when(!is_null($request->get('search')), function($q) use ($request){
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
        $data = $this->getRows($request); 
        $search = $request->get('search'); 
        return Inertia::render('dashboard/genre',
        [
            'data' => $data,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show(Mgenre $genre){
   
        return response()->json(["data"=> $genre]);
    }

    public function store(Request $request){
        // ini kondisi mengambil data genre movie dan tv
        $uri = ["genre/movie/list?language=en","genre/tv/list?language=en"];
        $id = rand(0, 1); 
        $data = collect($this->GetApiTmdb($uri[$id],"genres"))->map(function($v) use ($id){  
            $v['category'] = $id == 0 ? "Movie" : "Tv";
            $v['date_sycn'] = now();
            return $v;
        });


        $this->mModel::upsert(
            collect($data)->map(fn ($item) => [
                'id'   => $item['id'],
                'name'      => $item['name'],
                'category'  => $item['category'],
                'date_sycn' => $item['date_sycn'],
                'updated_at'=> now(),
                'created_at'=> now(),
            ])->toArray(),
            ['id'],  
            ['name', 'category', 'date_sycn']
        );
        return redirect()->back()->with('success', 'Sycn berhasil');     
    }
 
}
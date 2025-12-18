<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User as Muser;
use Illuminate\Support\Facades\Hash;

use App\Helpers\DataTable\WithSorting;
use App\Helpers\DataTable\WithPerPagePagination;

class User extends Controller
{
    use WithPerPagePagination, WithSorting;
  
    public $user;
    public $filters = [
        'search' => ''
    ];
    public function __construct(Muser $user){
         $this->user = $user;
    }

    public function getRowsQuery(Request $request)
    {
        $query =  $this->user::when(!is_null($request->get('search')), function($q) use ($request){
             $q->where("name","ilike", "%" .$request->get('search'). "%");
        })->select('users.*');

        return $this->applySorting($query,$request);
    }

    public function getRows(Request $request)
    {

        return $this->applyPagination($this->getRowsQuery($request),$request);
    }

    public function create(Request $request): Response
    {

        $user = $this->getRows($request); 
        $search = $request->get('search'); 
        return Inertia::render('dashboard/user',
        [
            'user' => $user,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function show(Muser $user){
   
        return response()->json(["data"=> $user]);
    }

    public function store(Request $request){
        $data =  $request->all();
        unset( $data['repeat_password']);
        $data['password'] = Hash::make( $data['password']); 
        $this->user->create($data);
        return redirect()->back()->with('success', 'User berhasil ditambah');
    }

    public function update(MUser $user, Request $request)
    { 
        $data =  $request->all();  
        $user->fill($data);
        $user->save(); 
        return redirect()->back()->with('success', 'User berhasil diedit');
    }

    public function delete(MUser $user){
        $user->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
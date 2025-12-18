<?php

namespace App\Helpers\DataTable;

use Illuminate\Http\Request;
trait WithSorting
{
    public $sorts = [];
    public $default_sorts = [];
    public function sortBy($field, $status = false)
    {
        // return to sort by event
       foreach($this->default_sorts as $key => $value){
          unset($this->sorts[$key]);
       }

       if (! isset($this->sorts[$field])) return $this->sorts[$field] = 'asc';

       if ($this->sorts[$field] === 'asc') return $this->sorts[$field] = 'desc';

        unset($this->sorts[$field]);
    }

    public function applySorting($query,Request $request){
   
        $this->sorts = !is_null($request->get('sorts')) ? $request->get('sorts') : $this->default_sorts; 
        foreach ($this->sorts as $field => $direction) {
            $query->orderBy($field, $direction);
        }

        return $query;
    }
}

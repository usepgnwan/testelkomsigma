<?php

namespace App\Helpers\DataTable;

use Illuminate\Http\Request;

trait WithPerPagePagination
{
    protected int $perPage = 10;

 
    protected function resolvePerPage(Request $request): int
    {
        $perPage = !is_null( $request->get('per_page')) ? $request->get('per_page')  : session('perPage', $this->perPage);
        // $perPage = 10;
        $perPage = $perPage ?: $this->perPage;
 
        session(['perPage' => $perPage]);

        return $perPage;
    }
 
    protected function applyPagination($query, Request $request)
    {
        $perPage = $this->resolvePerPage($request);
        $page = (int) $request->input('page', 1);

        return $query->paginate($perPage, ['*'], 'page', $page)->appends($request->all()); ;
    }
}

<?php 

namespace App\Helpers\Sync; 
use GuzzleHttp\Client;

trait DataSync
{
    public function GetApiTmdb($uri, $type){  
        $client = new Client();
        $response = $client->request('GET',config('services.movie.uri_tmdb') . $uri, [
            'headers' => [
                'Authorization' => 'Bearer ' . config('services.movie.bearer'),
                'accept' => 'application/json',
            ],
        ]);
        $data = json_decode($response->getBody()->getContents(), true);
        return $data[$type] ?? [];
    }
}
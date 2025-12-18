<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Genre;
use App\Models\GenreMovies;
use App\Models\Movies;
use Illuminate\Support\Facades\Hash;
 
class Dashboard extends Controller
{
 public function summary($datestart, $dateend){
    $baseQuery = Movies::whereBetween('date_sycn', [$datestart, $dateend]);
    $totalMovies = (clone $baseQuery)->where('category', 'Movie')->count();
    $totalTvShow = (clone $baseQuery)->where('category', 'Tv')->count();
    $averageRating = round((clone $baseQuery)->avg('vote_average'),1);
    $totalVote = (clone $baseQuery)->sum('vote_count');
    $totalGenre = GenreMovies::join('movies', 'movies.id', '=', 'genre_movies.movie_id')
        ->whereBetween('movies.date_sycn', [$datestart, $dateend])
        ->distinct('genre_movies.genre_id')
        ->count('genre_movies.genre_id');

   $topGenre = $this->topGenre($datestart, $dateend);
    return response()->json([
        "data" => [
            'total_movies'   => $totalMovies,
            'total_tv_show'  => $totalTvShow,
            'total_genre'    => $totalGenre,
            'average_rating' => $averageRating,
            'total_vote'     => $totalVote,
            'top_genre'      => $topGenre[0] ?? [],
            'top_ten_genre'      => $topGenre,
        ]
    ]);
 }
public function groupbycategory($datestart, $dateend)
{
    $data = GenreMovies::join('movies', 'movies.id', '=', 'genre_movies.movie_id')
        ->join('genres', 'genres.id', '=', 'genre_movies.genre_id')
        ->whereBetween('movies.date_sycn', [$datestart, $dateend])
        ->select(
            'genres.name as genre',
            \DB::raw("SUM(CASE WHEN movies.category = 'Tv' THEN 1 ELSE 0 END) as tv"),
            \DB::raw("SUM(CASE WHEN movies.category = 'Movie' THEN 1 ELSE 0 END) as movies")
        )
        ->groupBy('genres.id', 'genres.name')
        ->orderBy('genres.name')
        ->get();

    return response()->json($data);
}


 public function topGenre($datestart, $dateend){
     $topGenre = GenreMovies::join('movies', 'movies.id', '=', 'genre_movies.movie_id')
        ->join('genres', 'genres.id', '=', 'genre_movies.genre_id')
        ->whereBetween('movies.date_sycn', [$datestart, $dateend])
        ->select(
            'genres.name',
            \DB::raw('COUNT(genre_movies.genre_id) as total')
        )
        ->groupBy('genres.id', 'genres.name')
        ->orderByDesc('total')
        ->limit(10)
        ->get();

    return $topGenre;
 }
}
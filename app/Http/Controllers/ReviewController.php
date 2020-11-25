<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Route;
use App\Models\Review;


class ReviewController extends Controller
{
    public function storeReview($id, Request $request)
    {
        // to do validation

        $diff = $request->input('difficulty');
        $rating = $request->input('rating');
        $text = $request->input('text');
        $user_id = $request->input('user_id');
        // $user_name = $request->input('user_name');
        // $user_surname = $request->input('user_surname');

        $review = new Review;
        $review->user_id = $user_id;
        $review->route_id = $id;
        $review->difficulty = $diff;
        $review->rating = $rating;
        $review->text = $text;
        // $review->user_name = $user_name;
        // $review->user_surname = $user_surname;

        $review->save();


        return response(compact('diff', 'rating', 'user_id', 'text'), 200)
        ->header('Content-Type', 'application/json');

    }
}
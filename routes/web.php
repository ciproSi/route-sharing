<?php

use Illuminate\Support\Facades\Route;

//use App\Http\Controllers\IndexController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::post('/api/user/{id}/dog', 'ApiController@dog');

Route::get('/{path?}', 'IndexController@index')->name('index')->where('path', '.*');



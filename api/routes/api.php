<?php

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::post('updateProfile', 'AuthController@updateProfile');
    Route::get('profile', 'AuthController@profile');

    Route::get('articles', 'ArticleController@articleList');
    Route::post('addArticle', 'ArticleController@add');
    Route::get('myarticles', 'ArticleController@myArticles');
    Route::post('deleteArticle/{id}', 'ArticleController@deleteArticle');
});

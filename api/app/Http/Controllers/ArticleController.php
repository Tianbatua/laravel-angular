<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\User;
use App\Article;

class ArticleController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['articleList']]);
    }

    public function articleList()
    {
        $articles = Article::all();
        return response()->json($articles);
    }

    public function add(Request $request)
    {
        $article = new Article;
        $article->body = $request['body'];
        $article->user_id = auth()->user()->id;
        if($article->save()){
            return response()->json([
                'success' => true,
                'message' => 'add article successful'
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'add article failed'
            ]);
        }
    }

}

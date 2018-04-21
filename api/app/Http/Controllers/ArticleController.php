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
        $articles = \DB::table('articles')
            ->leftJoin('users', 'articles.user_id', '=', 'users.id')
            ->orderBy('articles.created_at', 'desc')
            ->select('users.username', 'articles.body')
            ->get();
        return response()->json($articles);
    }

    public function myArticles()
    {
        $articles = \DB::table('articles')
            ->leftJoin('users', 'articles.user_id', '=', 'users.id')
            ->where('users.id', '=', auth()->user()->id)
            ->orderBy('articles.created_at', 'desc')
            ->select('users.username', 'articles.body', 'articles.id')
            ->get();
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

    public function deleteArticle($id)
    {
        $article = Article::find($id);

        if($article->delete()){
            return response()->json([
                'success' => true,
                'message' => 'article deleted'
            ]);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'failed'
            ]);
        }
    }



}

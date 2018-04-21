<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;
use App\User;
use App\UserAddress;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup', 'articleList']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Oops error'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function signup(SignUpRequest $request)
    {
      User::create([
        // $request->all(),
        'username' => $request['username'],
        'email' => $request['email'],
        'password' => $request['password'],
        'user_roles_id' => 3
      ]);

      return $this->login($request); 
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
      $profile = \DB::table('users')
            ->leftJoin('user_addresses', 'users.id', '=', 'user_addresses.user_id')
            ->leftJoin('user_roles', 'users.user_roles_id', '=', 'user_roles.id')
            ->where('users.id', '=', auth()->user()->id)
            ->select('users.username', 'users.email', 'user_addresses.address', 'user_addresses.province', 'user_addresses.city', 'user_addresses.country', 'user_addresses.postal_code', 'user_roles.label')
            ->get();
      if(!$profile){
        return response()->json([
          'success' => false,
          'message' => 'No user found'
        ]);
      }else{
        return response()->json($profile[0]);
      }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
      return response()->json([
          'access_token' => $token,
          'token_type' => 'bearer',
          'expires_in' => auth()->factory()->getTTL() * 600,
          'user' => auth()->user()->username
      ]);
    }

    public function updateProfile(Request $request)
    {
      $updateUser = \DB::table('users')
            ->where('users.id', '=', auth()->user()->id)
            ->update([
              'users.username' => $request['username'] 
            ]);
      $updateAddress = UserAddress::updateOrCreate(
          ['user_id' => auth()->user()->id],
          [
            'address' => $request['address'],
            'province' => $request['province'],
            'city' => $request['city'],
            'country' => $request['country'],
            'postal_code' => $request['postal_code']
          ]
      );
      if(!$updateUser){
        return response()->json([
          'success' => false,
          'message' => 'update failed'
        ]);
      }else{
        return response()->json([
          'success' => true,
          'message' => 'update successful!',
        ]);
      }
    }
}
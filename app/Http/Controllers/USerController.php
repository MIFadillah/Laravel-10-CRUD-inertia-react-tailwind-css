<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();
        return Inertia::render('Users/Index', ['users' => $users]);
    }
    public function editUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return Inertia::render('404')->with('message', 'User not found')->status(404);
        }

        $editorRole = 'editor';

        if ($user->hasRole($editorRole)) {
            $user->removeRole($editorRole);
        } else {
            $user->assignRole($editorRole);
        }
        return redirect(route('user.index'))->with('success', 'Role Updated.');
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $createPost = Permission::create(['name' => 'create_post']);
        $editPost = Permission::create(['name' => 'edit_post']);
        $deletePost = Permission::create(['name' => 'delete_post']);

        $role = Role::create(['name' => 'editor']);
        $role->givePermissionTo($createPost, $editPost, $deletePost);
    }
}


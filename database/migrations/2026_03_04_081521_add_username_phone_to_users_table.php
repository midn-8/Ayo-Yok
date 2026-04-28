<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Jangan bikin id lagi!
            $table->string('username')->unique()->after('name');
            $table->string('phone_number')->after('username');
            $table->string('role')->default('customer')->after('phone_number');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username','phone_number','role']);
        });
    }
};
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_page_is_accessible(): void
    {
        $response = $this->get(route('login'));

        $response->assertOk();
        $response->assertSee('name="email"', false);
        $response->assertSee('name="password"', false);
        $response->assertSee('name="remember"', false);
    }

    public function test_register_page_is_accessible(): void
    {
        $response = $this->get(route('register'));

        $response->assertOk();
        $response->assertSee('name="username"', false);
        $response->assertSee('name="email"', false);
        $response->assertSee('name="phone_number"', false);
        $response->assertSee('name="password"', false);
        $response->assertSee('name="password_confirmation"', false);
    }

    public function test_user_can_register_and_is_redirected_to_dashboard(): void
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'username' => 'testuser',
            'email' => 'test@example.com',
            'phone_number' => '081234567890',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'username' => 'testuser',
            'email' => 'test@example.com',
            'phone_number' => '081234567890',
        ]);
    }

    public function test_user_can_log_in_and_is_redirected_to_dashboard(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $response = $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password123',
            'remember' => '1',
        ]);

        $response->assertRedirect(route('dashboard'));
        $this->assertAuthenticatedAs($user);
    }

    public function test_invalid_login_shows_validation_error(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $response = $this->from(route('login'))->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertRedirect(route('login'));
        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_guest_is_redirected_from_dashboard_to_login(): void
    {
        $response = $this->get(route('dashboard'));

        $response->assertRedirect(route('login'));
    }

    public function test_root_route_redirects_into_the_new_app_flow(): void
    {
        $response = $this->get(route('root'));

        $response->assertRedirect(route('dashboard'));
    }

    public function test_guest_is_redirected_to_login_from_event_alias_route(): void
    {
        $response = $this->get('/events/123');

        $response->assertRedirect(route('login'));
    }

    public function test_guest_is_redirected_to_login_from_invite_route(): void
    {
        $response = $this->get('/invite/neon-party?theme=party-neon');

        $response->assertRedirect(route('login'));
    }

    public function test_login_redirects_back_to_intended_event_page(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $this->get('/events/123')->assertRedirect(route('login'));

        $response = $this->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertRedirect('/events/123');
        $this->assertAuthenticatedAs($user);
    }

    public function test_registration_redirects_back_to_intended_invitation_page(): void
    {
        $this->get('/invite/elegant-night?theme=elegant-night')->assertRedirect(route('login'));

        $response = $this->post(route('register.store'), [
            'name' => 'Invite User',
            'username' => 'inviteuser',
            'email' => 'invite@example.com',
            'phone_number' => '081111111111',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect('/invite/elegant-night?theme=elegant-night');
        $this->assertAuthenticated();
    }

    public function test_registration_redirects_back_to_intended_payment_page(): void
    {
        $this->get('/payment/evt-101')->assertRedirect(route('login'));

        $response = $this->post(route('register.store'), [
            'name' => 'Payment User',
            'username' => 'paymentuser',
            'email' => 'payment@example.com',
            'phone_number' => '082222222222',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect('/payment/evt-101');
        $this->assertAuthenticated();
    }

    public function test_user_can_log_out_and_is_redirected_to_login(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('logout'));

        $response->assertRedirect(route('login'));
        $response->assertSessionHas('status', 'You have been logged out.');
        $this->assertGuest();
    }
}

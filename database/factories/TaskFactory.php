<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'due_date' => fake()->date('now', '+1 year'),
            'status' => fake()->randomElement(['pending', 'completed', 'in_progress']),
            'priority' => fake()->randomElement(['high', 'low', 'medium']),
            'image-path' => fake()->imageUrl(),
            'assigned_user_id' => 1,
            'created_at' => 1,
            'updated_at' => 1
        ];
    }
}

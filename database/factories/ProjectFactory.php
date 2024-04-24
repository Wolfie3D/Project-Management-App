<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
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
            'image-path' => fake()->imageUrl(),
            'created_at' => 1,
            'updated_at' => 1
        ];
    }
}

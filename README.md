# Project Management System

## Introduction

This project is a Project Management System built using Laravel 11 for the backend and Inertia.js with React for the frontend. It provides functionalities for managing users, tasks, and projects. This README will guide you through the features and route definitions used in the application.

## Technologies Used

1. Laravel 11: A framework for building web applications.
2. Inertia.js: A library that allows you to create modern single-page applications (SPAs) using traditional server-side routing and controllers.
3. React: A library for building user interfaces, used here to create a dynamic and responsive frontend.

## Features

User Authentication and Verification: Secure user login and email verification.
User Profile Management: Users can edit, update, and delete their profiles.
Task Management: Users can create, view, update, and delete tasks. They can also view tasks assigned to them.
Project Management: Users can create, view, update, and delete projects.

## Routes

### Public Routes

Redirect to Dashboard: Automatically redirects from the home page to the dashboard.

### Protected Routes

These routes are protected by authentication middleware.

## Authenticated and Verified Users

Routes within this group require the user to be logged in and their email verified.

### Dashboard

GET /dashboard: Displays the dashboard.

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

### Task Management

GET /task/my-tasks: Shows tasks assigned to the logged-in user.

Route::get('task/my-tasks', [TaskController::class, 'myTasks'])->name('task.myTasks');

Task Resource Routes: Allows creating, viewing, updating, and deleting tasks.

Route::resource('task', TaskController::class);

### User Management

User Resource Routes: Allows creating, viewing, updating, and deleting users.

Route::resource('user', UserController::class);

### Project Management

Project Resource Routes: Allows creating, viewing, updating, and deleting projects.

Route::resource('project', ProjectController::class);

### Profile Management

GET /profile: Displays the profile edit form.

Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

PATCH /profile: Updates profile information.

Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
DELETE /profile: Deletes the user profile.

Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

## Conclusion

This Project Management System leverages the power of Laravel 11, Inertia.js, and React to provide a seamless and efficient user experience. It offers robust features for managing users, tasks, and projects, making it a comprehensive tool for project management. For further customization or contribution, feel free to explore and modify the codebase as needed.

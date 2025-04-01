# Web-Dev-Task-Management
Task Management: Online Task Tracking Platform
Project Overview
Task Management is a comprehensive online task tracking platform designed to provide an efficient and organized way to manage tasks for both users and administrators. It allows users to create, assign, and track tasks while providing administrators with the ability to oversee task progress and team collaboration. The platform leverages the power of JWT authentication for secure user management and provides dynamic task filtering and user role-specific functionality.
The platform aims to provide a user-friendly interface that streamlines the process of task creation, progress tracking, and team management. Admins can also add, update, and remove tasks, ensuring the workflow remains efficient and up-to-date.
Features:
For Users:
Task Listing: Browse and view all assigned tasks based on priority or category.
Task Creation: Create new tasks and assign them to team members.
Task Progress Tracking: Monitor progress, mark tasks as completed, and update status.
Dynamic Task Filtering: Users can filter tasks based on priority, category, and deadline.
Task Search: Easily search for tasks by keyword, category, or assignee.
JWT Authentication: Secure login/logout for users to manage their tasks and preferences.
User Profile: Manage user data and track assigned tasks.
Interactive Dashboard: Personalized dashboard displaying pending, in-progress, and completed tasks.
For Admins:
Task Management: Admins can add, update, and delete tasks, manage descriptions and deadlines.
User Assignment: Assign tasks to specific users or teams and track their progress.
Dynamic Task Creation: Create new tasks, define priority levels, and categorize tasks.
Reporting & Analytics: Admins can view task completion statistics, workload distribution, and team performance.
Admin Authentication: Secure login/logout system using JWT.
Role-based Access Control: Different functionalities based on user roles (admin/user).
Group Members:
Orazymbetov Zhantore
Nurtaza Ayaulym
Kudryakov Andrey
Technologies Used:
Front-End: Angular, TypeScript, HTML, CSS
Back-End: Django, Django REST Framework (DRF)
Authentication: JWT (JSON Web Tokens)
Styling: Angular Material, CSS for custom design
Database: PostgreSQL (or another relational database)
Front-End (Angular):
Task Listing and Assignment: Users can create, assign, and manage tasks efficiently.
Admin Interface: Admins have an interface to oversee task assignments, progress, and user engagement.
JWT Authentication: Secure authentication for users and admins to access the platform.
Routing and Dynamic Views: Dynamic rendering of views based on user interaction (ngFor, ngIf).
Task Filtering: Filters for browsing tasks based on priority, category, and deadline.
Key Features of the Front-End:
Task Management System: Users can create, assign, and track tasks with a single click.
Admin Dashboard: Admins can create, update, and delete tasks, as well as monitor team workload.
JWT Authentication: Both admins and users need to log in using JWT tokens to access secure routes.
Routing Module: Dynamic routing based on user interaction with components like task details, admin pages, and user profile.
Use of Directives: ngFor and ngIf used for rendering dynamic content (e.g., task lists, filtering).
Back-End (Django):
Models:
Task: Represents individual tasks with attributes like title, description, priority, status, and deadline.
User: Represents users (both team members and admins), with authentication and role-based permissions.
Assignment: Represents the relationship between users and tasks, tracking who is responsible for each task.
Category: Categorizes tasks into different types (e.g., Development, Design, Testing, etc.).
Relations:
Assignment to User (ForeignKey): Each task assignment is tied to a user (foreign key relationship).
Task to Category (ForeignKey): Each task belongs to a category, linking tasks to their respective groups.
Views and API:
CRUD Operations: Admins can create, read, update, and delete tasks and assignments via API views.
Token-based Authentication: JWT tokens are used for secure user login/logout.
FBV and CBV: Functional-based views (FBVs) for simple operations, and class-based views (CBVs) for more complex scenarios like listing, updating, and deleting resources.
Key Features of the Back-End:
Task and Assignment Management: Admins can manage tasks and user assignments using views with CRUD operations.
Token-based Authentication: Protects the platform with JWT, allowing only authenticated users to access certain resources.
Model Relations: Relations between models such as User and Assignment, and Task and Category ensure structured data management.
Serializers: Use of serializers to convert complex data into JSON for API responses (using ModelSerializer).
Project Flow:
User Registration/Login: Users register and log in using JWT authentication.
Task Browsing: After logging in, users can browse assigned tasks, filter them by category or priority, and view task details.
Task Creation & Assignment: Users (or admins) can create tasks and assign them to specific users or teams.
Task Progress Management: Users can update the status of tasks (e.g., In Progress, Completed) as they work on them.
Admin Features: Admins can access a separate dashboard where they can add, modify, and delete tasks, as well as monitor user performance.
JWT Token Handling: After login, a JWT token is generated, stored in local storage (or cookies), and sent with API requests for authorization.

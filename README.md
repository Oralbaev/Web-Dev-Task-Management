Task Management: Online Task Tracking PlatformProject OverviewTask Management is a comprehensive online task tracking platform designed to provide an efficient and organized way to manage tasks for both users and administrators. It allows users to create, assign, and track tasks while providing administrators with the ability to oversee task progress and team collaboration. The platform leverages the power of JWT authentication for secure user management and provides dynamic task filtering and user role-specific functionality.
The platform aims to provide a user-friendly interface that streamlines the process of task creation, progress tracking, and team management. Admins can also add, update, and remove tasks, ensuring the workflow remains efficient and up-to-date.
FeaturesFor Users:Task Listing: Browse and view all assigned tasks based on priority or category.
Task Creation: Create new tasks and assign them to team members.
Task Progress Tracking: Monitor progress, mark tasks as completed, and update status.
Dynamic Task Filtering: Users can filter tasks based on priority, category, and deadline.
Task Search: Easily search for tasks by keyword, category, or assignee.
JWT Authentication: Secure login/logout for users to manage their tasks and preferences.
User Profile: Manage user data and track assigned tasks.
Interactive Dashboard: Personalized dashboard displaying pending, in-progress, and completed tasks.
For Admins:Task Management: Admins can add, update, and delete tasks, manage descriptions and deadlines.
User Assignment: Assign tasks to specific users or teams and track their progress.
Dynamic Task Creation: Create new tasks, define priority levels, and categorize tasks.
Reporting & Analytics: Admins can view task completion statistics, workload distribution, and team performance.
Admin Authentication: Secure login/logout system using JWT.
Role-based Access Control: Different functionalities based on user roles (admin/user).
Group MembersOrazymbetov Zhantore
Nurtaza Ayaulym
Kudryakov Andrey
Technologies UsedFront-End:Angular
TypeScript
HTML
CSS
Angular Material (for UI design)
Back-End:Django
Django REST Framework (DRF)
PostgreSQL (or another relational database)
Authentication:JWT (JSON Web Tokens)
Front-End (Angular)Task Listing and Assignment: Users can create, assign, and manage tasks efficiently.
Admin Interface: Admins have an interface to oversee task assignments, progress, and user engagement.
JWT Authentication: Secure authentication for users and admins to access the platform.
Routing and Dynamic Views: Dynamic rendering of views based on user interaction (ngFor, ngIf).
Task Filtering: Filters for browsing tasks based on priority, category, and deadline.
Back-End (Django)Models:Task: Represents individual tasks with attributes like title, description, priority, status, and deadline.
User: Represents users (both team members and admins), with authentication and role-based permissions.
Assignment: Represents the relationship between users and tasks, tracking who is responsible for each task.
Category: Categorizes tasks into different types (e.g., Development, Design, Testing, etc.).
Relations:Assignment to User (ForeignKey): Each task assignment is tied to a user (foreign key relationship).
Task to Category (ForeignKey): Each task belongs to a category, linking tasks to their respective groups.
Views and API:CRUD Operations: Admins can create, read, update, and delete tasks and assignments via API views.
Token-based Authentication: JWT tokens are used for secure user login/logout.
FBV and CBV: Function-based views (FBVs) for simple operations, and class-based views (CBVs) for more complex scenarios like listing, updating, and deleting resources.
Project FlowUser Registration/Login: Users register and log in using JWT authentication.
Task Browsing: After logging in, users can browse assigned tasks, filter them by category or priority, and view task details.
Task Creation & Assignment: Users (or admins) can create tasks and assign them to specific users or teams.
Task Progress Management: Users can update the status of tasks (e.g., In Progress, Completed) as they work on them.
Admin Features: Admins can access a separate dashboard where they can add, modify, and delete tasks, as well as monitor user performance.
JWT Token Handling: After login, a JWT token is generated, stored in local storage (or cookies), and sent with API requests for authorization.
Installation & SetupPrerequisitesNode.js and npm installed
Angular CLI installed (npm install -g @angular/cli)
Python and pip installed
PostgreSQL database setup
Front-End SetupNavigate to the front-end directory:
cd frontendInstall dependencies:
npm installStart the Angular application:
ng serveBack-End SetupNavigate to the back-end directory:
cd backendCreate a virtual environment:
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`Install dependencies:
pip install -r requirements.txtApply database migrations:
python manage.py migrateStart the Django server:
python manage.py runserverNow, open http://localhost:4200/ in your browser to access the Task Management platform.
ContributingFork the repository.
Create a feature branch (git checkout -b feature-name).
Commit changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-name).
Open a pull request.
LicenseThis project is licensed under the MIT License - see the LICENSE file for details.

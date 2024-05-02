# Task Management System

## Table of Contents

1. [Description](#description)
2. [File Structure](#file-structure)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Components](#components)
6. [Services](#services)
7. [Deployed Link](#deployed-link)

## Description

The Task Management System is a web application designed to help users manage their tasks efficiently. It provides features such as user authentication, task creation, assignment, and tracking.

## File Structure

```
public
|- favicon.ico
|- index.html
|- logo192.png
|- logo512.png
|- manifest.json
|- robots.txt
src
|- components
|  |- LoginPage.js
|  |- RegisterPage.js
|  |- TaskAssignment.js
|  |- TaskDetails.js
|  |- TaskList.js
|  |- TaskSummary.js
|  |- UserList.js
|  |- UserProfile.js
|- services
|  |- taskService.js
|  |- userService.js
|- App.css
|- App.js
|- index.css
|- index.js
|- logo.svg
|- reportWebVitals.js
|- setupTests.js
README.md
package-lock.json
package.json
```

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd task-management-system
   ```

3. Install dependencies:

   ```
   npm install
   ```

## Usage

To start the development server, run:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Components

1. **LoginPage.js**: Component for user login.
2. **RegisterPage.js**: Component for user registration.
3. **TaskAssignment.js**: Component for assigning tasks to users.
4. **TaskDetails.js**: Component for displaying detailed information about a task.
5. **TaskList.js**: Component for displaying a list of tasks.
6. **TaskSummary.js**: Component for displaying a summary of task metrics.
7. **UserList.js**: Component for displaying a list of users.
8. **UserProfile.js**: Component for displaying user profile information.

## Services

1. **taskService.js**: Service for interacting with task-related functionalities (e.g., fetching tasks, creating tasks).
2. **userService.js**: Service for interacting with user-related functionalities (e.g., user authentication, user registration).

## Deployed Link

https://tasks-frontend-gray.vercel.app/



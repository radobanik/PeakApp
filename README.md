
# PeakApp 

A comprehensive climbing and bouldering application that allows climbers to discover routes, share their achievements, and connect with the climbing community.

##  Features

### Core Functionality

-   **Interactive Map** - Explore climbing objects and routes with advanced filtering
-   **Route Management** - Browse, add, and review climbing routes with detailed information
-   **Community Sharing** - Share your climbing sessions and achievements with other climbers
-   **Activity Tracking** - Log your climbs with difficulty ratings, attempts, and personal notes
-   **Social Features** - Follow other climbers, like sessions, and comment on posts
-   **Reviews & Ratings** - Rate routes and share your experience with the community

### Advanced Features

-   **Geographic Filtering** - Filter routes by coordinates, difficulty, and climbing structure type
-   **Approval System** - Moderated content with official/unofficial route designation
-   **Achievement System** - Track your progress and unlock achievements
-   **Notification System** - Stay updated on likes, comments, and follows
-   **Report System** - Flag inappropriate content for admin review
-   **Multi-language Support** - Country and city-based localization

### Admin Features

-   **Backoffice Mode** - Comprehensive admin panel for content moderation
-   **Feature Flags** - Toggle features like comments and approval-only content
-   **Content Approval** - Review and approve climbing objects and routes
-   **Report Management** - Handle user-submitted reports
-   **User Management** - Administer user accounts and roles

## 🚀 Tech Stack

### Frontend

-   **React** with TypeScript
-   **React Router** for navigation
-   **TanStack Query** for data fetching and caching
-   **Tailwind CSS** for styling
-   **Leaflet** for interactive maps
-   **Zod** for form validation
-   **React Hook Form** for form management

### Backend

-   **Node.js** with Express
-   **TypeScript** for type safety
-   **Prisma ORM** for database management
-   **PostgreSQL** as database
-   **JWT** for authentication
-   **AWS S3** for file storage
-   **Passport.js** for authentication strategies

### DevOps & Tools

-   **Docker** for containerization
-   **Cypress** for E2E testing
-   **ESLint** & **Prettier** for code quality

## 📋 Prerequisites

-   Node.js (v18 or higher)
-   Docker & Docker Compose
-   PostgreSQL (via Docker)
-   AWS S3 bucket (for file storage)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd peak-app

```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd apps/backend

```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env

```

Fill in the required environment variables:

```env
# Database
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=peak_app_db

# JWT
JWT_SECRET=your_jwt_secret

# AWS S3
AWS_S3_BUCKET_NAME=your_bucket_name
AWS_S3_REGION=your_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# PgAdmin (optional)
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

```

### 3. Install Dependencies

From the root directory:

```bash
npm install --legacy-peer-deps

```

### 4. Start Database

```bash
docker compose up -d

```

This will start:

-   PostgreSQL database on port 5432
-   PgAdmin on port 5050

### 5. Run Database Migrations

```bash
cd apps/backend
npm run migrate

```

### 6. Initialize Data

For mock data:

```bash
npm run init-data

```

Or import real data from Toplogger:

```bash
npm run import-toplogger

```

### 7. Start Development Servers

From the root directory:

```bash
npm run dev

```

This will start:

-   Backend API on `http://localhost:8080`
-   Frontend app on `http://localhost:5173`

Or start them individually:

```bash
npm run dev:backend  # Backend only
npm run dev:frontend # Frontend only

```

### Linting & Formatting

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors
npm run prettier      # Check formatting
npm run prettier:fix  # Fix formatting
npm run format        # Fix both linting and formatting

```

##  Authentication

The application uses JWT-based authentication with the following roles:

-   **USER** - Standard user with access to basic features
-   **ADMIN** - Administrative access with content moderation capabilities

### Default Admin Account (after init-data)

```
Email: emily.johnson@password123.com
Password: password123

```

## API Documentation

The backend includes Swagger API documentation. After starting the backend, visit:

```
http://localhost:8080/api-docs

```

## Database Management

Access PgAdmin at `http://localhost:5050` with the credentials from your `.env` file to manage the PostgreSQL database.




## Key Components

### Map Component

Interactive Leaflet map with clustering for climbing objects, search functionality, and advanced filtering options.

### Route Management

Complete CRUD operations for climbing routes with image uploads, difficulty ratings, and approval workflow.

### Session Sharing

Create climbing sessions with multiple activities, add photos, and share with the community.

### Notification System

Real-time notifications for user interactions (likes, comments, follows) with customizable settings.

## Deployment

### Building for Production

```bash
# Build frontend
cd apps/frontend
npm run build

# Backend runs directly with Node.js
cd apps/backend
npm start

```

### Docker Deployment

The project includes a `docker-compose.yml` for containerized deployment. Adjust the configuration for production use.

### Code Quality

-   Follow the ESLint and Prettier configurations
-   Write tests for new features
-   Update documentation as needed
-   Ensure all tests pass before submitting PR

## Authors
The following members of the legendary team contributed to the development of this application:

- [Radoslav Banik](https://www.linkedin.com/in/radoslav-ban%C3%ADk/)
- [Michal Nosáľ](https://github.com/maklmor)
- [Adam Haluška](https://www.linkedin.com/in/adam-haluska/)
- [Matúš Fedorko](https://www.linkedin.com/in/mat%C3%BA%C5%A1-fedorko-24a178310/)

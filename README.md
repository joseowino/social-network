# 🌐 Social Network

A full-stack Facebook-like social platform built with **Go**, **SQLite**, and a modern **JavaScript frontend**. Users can follow each other, create posts, join groups, chat in real-time, and receive notifications — all containerized with Docker for easy deployment.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Authentication & Sessions](#-authentication--sessions)
- [Database Migrations](#-database-migrations)
- [WebSocket Communication](#-websocket-communication)
- [Docker Deployment](#-docker-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

This social network application provides a complete social media experience with modern web technologies. Built as a learning project to demonstrate full-stack development skills, it includes all the essential features you'd expect from a social platform: user profiles, posts, groups, real-time chat, and notifications.

The project emphasizes clean architecture, containerization, and real-time communication while maintaining simplicity and educational value.

## ✨ Features

### 👤 User Management
- **Registration & Login**: Complete user authentication with email verification
- **Profile Management**: Public/private profiles with customizable information
- **Avatar Upload**: Support for JPEG, PNG, and GIF image formats
- **Session Management**: Persistent login sessions with secure cookie handling

### 🧑‍🤝‍🧑 Social Features
- **Follow System**: Send/receive follow requests with approval workflow
- **Privacy Controls**: Toggle between public and private profiles
- **User Discovery**: Browse and search for other users

### 📝 Content Creation
- **Posts**: Create posts with text, images, or GIFs
- **Privacy Levels**: 
  - Public (visible to all users)
  - Followers only (visible to followers)
  - Selected followers (visible to chosen followers)
- **Comments**: Interactive commenting system on posts

### 👥 Groups
- **Group Creation**: Create groups with custom titles and descriptions
- **Membership Management**: Invite users or approve join requests
- **Group Events**: Create events with RSVP functionality
- **Group Chat**: Dedicated chat rooms for each group

### 💬 Real-Time Communication
- **Private Messaging**: Direct messages between users
- **Group Chat**: Real-time group conversations
- **Emoji Support**: Rich emoji integration
- **Instant Delivery**: WebSocket-powered real-time messaging

### 🔔 Notifications
- **Follow Requests**: Notifications for new follow requests
- **Group Invitations**: Alerts for group membership invitations
- **Join Requests**: Notifications for group join requests (for group creators)
- **Event Notifications**: Alerts for new group events

## 🧱 Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Svelte/Vue.js/Next.js | Client-side user interface |
| **Backend** | Go (Golang) | Server-side logic and API |
| **Database** | SQLite | Data persistence |
| **Real-Time** | WebSocket (Gorilla) | Live chat and notifications |
| **Authentication** | Sessions + Cookies | User authentication |
| **Migrations** | golang-migrate | Database schema management |
| **Security** | bcrypt | Password hashing |
| **IDs** | UUID | Unique identifiers |
| **Containerization** | Docker | Application deployment |

## 🗂️ Project Structure

```
social-network/
├── backend/
│   ├── server.go                    # Main server entry point
│   ├── pkg/
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   │   └── sqlite/
│   │   │   │       ├── 000001_create_users_table.up.sql
│   │   │   │       ├── ...
│   │   │   └── sqlite/
│   │   │       └── sqlite.go        # Database connection & migrations
│   │   ├── handlers/                # HTTP request handlers
│   │   ├── middleware/              # Authentication & middleware
│   │   ├── models/                  # Data models
│   │   └── websocket/               # WebSocket handlers
│   ├── uploads/                     # User uploaded files
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/              # UI components
│   │   ├── pages/                   # Application pages
│   │   ├── stores/                  # State management
│   │   └── utils/                   # Utility functions
│   ├── public/                      # Static assets
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml               # Multi-container setup
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose
- Go 1.19+ (for local development)
- Node.js 16+ (for local development)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/social-network.git
   cd social-network
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)

### Local Development Setup

#### Backend Setup
```bash
cd backend
go mod tidy
go run server.go
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/register` | Create new user account | `{email, password, firstName, lastName, dateOfBirth, nickname?, avatar?, aboutMe?}` |
| POST | `/api/login` | Authenticate user | `{email, password}` |
| POST | `/api/logout` | End user session | - |

### User & Profile Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get current user profile |
| PUT | `/api/profile` | Update user profile |
| GET | `/api/users/:id` | Get user profile by ID |
| POST | `/api/users/:id/follow` | Send follow request |
| PUT | `/api/users/:id/follow` | Accept/decline follow request |
| DELETE | `/api/users/:id/follow` | Unfollow user |

### Posts & Content Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/feed` | Get user's personalized feed |
| POST | `/api/posts` | Create new post |
| GET | `/api/posts/:id` | Get specific post |
| POST | `/api/posts/:id/comments` | Add comment to post |
| GET | `/api/posts/:id/comments` | Get post comments |

### Groups Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/groups` | Browse all groups |
| POST | `/api/groups` | Create new group |
| GET | `/api/groups/:id` | Get group details |
| POST | `/api/groups/:id/join` | Request to join group |
| POST | `/api/groups/:id/invite` | Invite user to group |
| POST | `/api/groups/:id/events` | Create group event |
| PUT | `/api/groups/:id/events/:eventId/rsvp` | RSVP to event |

### Notifications Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Get user notifications |
| PUT | `/api/notifications/:id/read` | Mark notification as read |

## 🔐 Authentication & Sessions

### Session Management
- Sessions are stored in SQLite database for persistence
- Cookie-based authentication with secure HTTP-only cookies
- Automatic session cleanup for expired sessions
- Session timeout after 24 hours of inactivity

### Password Security
- Passwords are hashed using bcrypt with salt
- Minimum password requirements enforced
- No plain text passwords stored

### Frontend Integration
```javascript
// Include credentials in API requests
fetch('/api/endpoint', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

## 🗄️ Database Migrations

### Migration System
The project uses `golang-migrate` for database schema management:

```bash
# Apply all migrations
migrate -path backend/pkg/db/migrations/sqlite -database sqlite3://database.db up

# Rollback one migration
migrate -path backend/pkg/db/migrations/sqlite -database sqlite3://database.db down 1
```

### Creating New Migrations
```bash
# Create a new migration
migrate create -ext sql -dir backend/pkg/db/migrations/sqlite -seq migration_name
```

### Auto-Migration
Migrations are automatically applied on application startup through the `sqlite.go` file.

## 🔌 WebSocket Communication

### Connection Endpoint
```
ws://localhost:8080/ws/chat
```

### Message Format
```json
{
  "type": "private_message",
  "recipient": "user_id",
  "content": "Hello world!",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Supported Message Types
- `private_message`: Direct messages between users
- `group_message`: Messages in group chats
- `notification`: Real-time notifications
- `typing_indicator`: Typing status updates

## 🐳 Docker Deployment

### Development Environment
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Environment
```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d --build
```

### Container Configuration

#### Backend Container
- **Port**: 8080
- **Environment**: Production Go binary
- **Volume**: `/app/uploads` for file storage
- **Health Check**: `/api/health` endpoint

#### Frontend Container
- **Port**: 3000
- **Environment**: Optimized production build
- **Nginx**: Serves static files and proxies API requests

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   # Backend tests
   cd backend && go test ./...
   
   # Frontend tests
   cd frontend && npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Create a Pull Request**

### Code Style Guidelines

#### Go (Backend)
- Follow `gofmt` formatting
- Use meaningful variable names
- Add comments for exported functions
- Keep functions small and focused

#### JavaScript (Frontend)
- Use ES6+ features
- Follow consistent naming conventions
- Add JSDoc comments for complex functions
- Use semantic HTML and accessible design

### Testing Requirements
- Unit tests for all new backend functions
- Integration tests for API endpoints
- Frontend component tests
- End-to-end tests for critical user flows

### Reporting Issues
- Use the GitHub issue template
- Include steps to reproduce
- Add relevant screenshots or logs
- Label issues appropriately

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Contributors

- **Backend Team**: Go developers and database architects
- **Frontend Team**: JavaScript/Framework specialists
- **DevOps Team**: Docker and deployment specialists
- **Community**: Open source contributors

## 🙏 Acknowledgments

- [Gorilla WebSocket](https://github.com/gorilla/websocket) - Real-time communication
- [golang-migrate](https://github.com/golang-migrate/migrate) - Database migrations
- [bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt) - Password hashing
- [SQLite](https://sqlite.org/) - Database engine

---

**Ready to build something amazing?** Start by forking this repository and following our [Getting Started](#-getting-started) guide!

For questions or support, please [open an issue](https://github.com/yourusername/social-network/issues) or join our community discussions.
# 🌐 Social Network

A full-stack Facebook-like social platform built with **Go**, **SQLite**, and a modern **JavaScript frontend** (Next). Users can follow each other, post content, create events, chat in real time, join groups, and receive notifications — all containerized using Docker.

---

## 🚀 Features

### 👤 User Accounts
- Registration with email, name, password, etc.
- Optional profile info: nickname, avatar, about me
- Login with persistent sessions (via cookies)

### 🧑‍🤝‍🧑 Followers
- Send follow requests (auto-accept for public profiles)
- Accept or reject follower requests
- Toggle profile privacy (public/private)

### 🙍‍♂️ Profile Pages
- View your own or other users' profiles
- Show posts, followers, and following
- Edit personal info

### 📝 Posts
- Create posts with text, image, or GIF
- Privacy options: Public / Followers / Selected Followers
- Add comments to posts

### 👥 Groups
- Create and manage groups
- Invite others or request to join
- Group-only posts and events
- Events with RSVP ("Going" / "Not Going")

### 💬 Chat (WebSocket)
- Real-time private messaging (emoji support)
- Group chat room for each group

### 🔔 Notifications
- Follow request, group invite, join request, new group event
- Realtime delivery and separate from chat messages

---

## 🧱 Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | Svelte / Vue / Next.js         |
| Backend   | Go (Golang)                    |
| Database  | SQLite                         |
| Real-Time | WebSocket (Gorilla)            |
| Auth      | Sessions + Cookies (in Go)     |
| Migrations| golang-migrate                 |
| Security  | bcrypt (password hashing)      |
| UUIDs     | gofrs/uuid or google/uuid      |
| Docker    | Two separate containers        |

---

## 🗂️ Project Structure

```

social-network/
├── backend/
│   ├── server.go
│   └── pkg/
│       ├── db/
│       │   ├── migrations/sqlite/
│       │   └── sqlite/sqlite.go
│       └── ...handlers, middleware, etc.
├── frontend/
│   └── src/
│       └── ...Svelte/Vue components
├── docker/
│   ├── backend.Dockerfile
│   └── frontend.Dockerfile
└── docker-compose.yml

````

---

## 🐳 Dockerized Setup

### Prerequisites
- Docker
- Docker Compose

### Running the project

```bash
# Start both frontend and backend
docker-compose up --build
````

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:5000](http://localhost:5000)

---

## 🔌 API Overview (Sample Endpoints)

| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/register`         | Create a user         |
| POST   | `/api/login`            | Log in user           |
| GET    | `/api/profile`          | Get own profile info  |
| POST   | `/api/posts`            | Create a post         |
| GET    | `/api/posts/feed`       | Get post feed         |
| POST   | `/api/users/:id/follow` | Follow a user         |
| GET    | `/api/groups`           | Browse all groups     |
| POST   | `/api/groups/:id/join`  | Request to join group |
| WS     | `/ws/chat`              | Real-time messaging   |

---

## ⚙️ Migrations

tool: `golang-migrate`

```bash
# Run migrations manually (for testing)
migrate -path backend/pkg/db/migrations/sqlite -database sqlite3://db.sqlite3 up
```

On app start, migrations are auto-applied via code in `sqlite.go`.

---

## 🔐 Sessions & Cookies

* Sessions are stored in the database
* Users stay logged in until they explicitly log out
* Use `credentials: "include"` in frontend `fetch()` to send cookies

---

## 🔧 Configurable Environment (optional)

Set up a `.env` file for settings like:

```env
SESSION_SECRET=your_secret_key
PORT=5000
```

---

## ✅ To-Do / Future Work

* [ ] Admin panel
* [ ] Password reset
* [ ] Profile image cropping
* [ ] Notification preferences
* [ ] Light/Dark mode in frontend

---

## 👥 Authors

* Backend: \[]
* Frontend: \[]
* Docker & DevOps: \[]

---

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/license/mit).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

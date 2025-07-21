CREATE TABLE IF NOT EXISTS replycomments (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    parent_comment_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

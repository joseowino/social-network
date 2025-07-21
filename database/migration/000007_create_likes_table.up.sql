CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    post_id INTEGER,
    comment_id INTEGER,
    type TEXT NOT NULL CHECK(type IN ('like', 'dislike')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

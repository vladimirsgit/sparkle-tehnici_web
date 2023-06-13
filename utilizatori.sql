CREATE TYPE roles AS ENUM('admin', 'moderator', 'common');

CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL,
    role roles NOT NULL DEFAULT 'common',
    email VARCHAR(100) NOT NULL,
    chat_color VARCHAR(50) DEFAULT 'black',
    add_date TIMESTAMP DEFAULT current_timestamp,
    code VARCHAR(200),
    confirmed_email boolean DEFAULT false,
    phone VARCHAR(100),
    picture VARCHAR(200)
);

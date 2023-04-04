CREATE DATABASE noteworthy;

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    created_at TIMESTAMPTZ DEFAULT now(), 
    updated_at TIMESTAMPTZ
);

CREATE TABLE notebooks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ
);
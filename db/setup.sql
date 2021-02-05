CREATE DATABASE cbr_manager_database;

CREATE TABLE cbr_workers (
    worker_id SERIAL PRIMARY KEY,
    name CHAR(50) NOT NULL,
    location_id INT
);

INSERT INTO cbr_workers (name, location_id)
    VALUES ('David', 373);
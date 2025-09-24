INSERT INTO users (id, first_name, last_name, email, password, role, language, status) VALUES
    (UUID(), 'Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'ADMIN', 'English', 'ACTIVE'),
    (UUID(), 'Bob', 'Smith', 'bob.smith@example.com', 'password123', 'USER', 'English', 'ACTIVE'),
    (UUID(), 'Charlie', 'Brown', 'charlie.brown@example.com', 'password123', 'USER', 'Spanish', 'ACTIVE'),
    (UUID(), 'Diana', 'Prince', 'diana.prince@example.com', 'password123', 'USER', 'English', 'ACTIVE'),
    (UUID(), 'Ethan', 'Hunt', 'ethan.hunt@example.com', 'password123', 'LIBRARIAN', 'French', 'INACTIVE');

INSERT INTO users (id, first_name, last_name, email, password, role, language, status) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Fiona', 'Carter', 'fiona.carter@example.com', 'password123', 'USER', 'German', 'ACTIVE'),
    ('550e8400-e29b-41d4-a716-446655440002', 'George', 'Miller', 'george.miller@example.com', 'password123', 'ADMIN', 'English', 'INACTIVE'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Hannah', 'Lee', 'hannah.lee@example.com', 'password123', 'LIBRARIAN', 'Korean', 'ACTIVE'),
    ('550e8400-e29b-41d4-a716-446655440004', 'Ivan', 'Petrov', 'ivan.petrov@example.com', 'password123', 'USER', 'Russian', 'ACTIVE'),
    ('550e8400-e29b-41d4-a716-446655440005', 'Julia', 'Martinez', 'julia.martinez@example.com', 'password123', 'USER', 'Spanish', 'INACTIVE');

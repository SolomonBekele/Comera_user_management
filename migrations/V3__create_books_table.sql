CREATE TABLE IF NOT EXISTS  books (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    publication_date DATE,
    publisher VARCHAR(150),
    genre VARCHAR(100),
    language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
);

INSERT INTO books (
    title, author, isbn, publication_date, publisher, genre, language, updated_at
) VALUES
('Clean Code', 'Robert C. Martin', '9780132350884', '2008-08-01', 'Prentice Hall', 'Software Engineering', 'English', NOW()),
('The Pragmatic Programmer', 'Andrew Hunt, David Thomas', '9780201616224', '1999-10-30', 'Addison-Wesley', 'Programming', 'English', NOW()),
('Introduction to Algorithms', 'Thomas H. Cormen', '9780262033848', '2009-07-31', 'MIT Press', 'Algorithms', 'English', NOW()),
('Design Patterns', 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides', '9780201633610', '1994-10-21', 'Addison-Wesley', 'Software Design', 'English', NOW()),
('Artificial Intelligence: A Modern Approach', 'Stuart Russell, Peter Norvig', '9780136042594', '2010-12-11', 'Pearson', 'Artificial Intelligence', 'English', NOW());

INSERT INTO books (
    id, title, author, isbn, publication_date, publisher, genre, language, updated_at
) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'Deep Learning', 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', '9780262035613', '2016-11-18', 'MIT Press', 'Machine Learning', 'English', NOW()),
('770e8400-e29b-41d4-a716-446655440002', 'Clean Architecture', 'Robert C. Martin', '9780134494166', '2017-09-20', 'Prentice Hall', 'Software Architecture', 'English', NOW()),
('770e8400-e29b-41d4-a716-446655440003', 'Database System Concepts', 'Abraham Silberschatz, Henry Korth, S. Sudarshan', '9780078022159', '2010-01-15', 'McGraw-Hill', 'Databases', 'English', NOW()),
('770e8400-e29b-41d4-a716-446655440004', 'Computer Networks', 'Andrew S. Tanenbaum, David J. Wetherall', '9780132126953', '2010-10-07', 'Pearson', 'Networking', 'English', NOW()),
('770e8400-e29b-41d4-a716-446655440005', 'Pattern Recognition and Machine Learning', 'Christopher M. Bishop', '9780387310732', '2006-08-17', 'Springer', 'Machine Learning', 'English', NOW());

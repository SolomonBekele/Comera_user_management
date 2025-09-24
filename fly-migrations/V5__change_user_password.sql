update users set PASSWORD = '$argon2id$v=19$m=65536,t=3,p=4$X+OpYxHNS/3HjwySnyM9Fg$qBsP3gYmP5VONcphJv8KE85T4EvnM39GRHM/o7NxaSk';

ALTER TABLE books
CHANGE COLUMN created_at createdAt TIMESTAMP;

ALTER TABLE books
CHANGE COLUMN updated_at updatedAt TIMESTAMP;

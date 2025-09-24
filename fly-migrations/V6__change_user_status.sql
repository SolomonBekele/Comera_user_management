-- ALTER TABLE users
-- MODIFY COLUMN status ENUM('PENDING','VERIFIED','NOT VERIFIED') NOT NULL;

-- UPDATE users
-- SET status = 'PENDING'
-- WHERE status NOT IN ('PENDING','VERIFIED','NOT VERIFIED');

-- UPDATE users
-- SET status = 'VERIFIED';

-- ALTER TABLE users
-- MODIFY COLUMN status ENUM('PENDING','VERIFIED','NOT VERIFIED') NOT NULL;


-- Step 1: Temporarily change to VARCHAR
ALTER TABLE users
MODIFY COLUMN status VARCHAR(20) NOT NULL;

-- Step 2: Update existing values
UPDATE users
SET status = 'VERIFIED'
WHERE status = 'ACTIVE';

UPDATE users
SET status = 'NOT VERIFIED'
WHERE status = 'INACTIVE';

-- Step 3: Change column back to ENUM
ALTER TABLE users
MODIFY COLUMN status ENUM('PENDING','VERIFIED','NOT VERIFIED') NOT NULL;

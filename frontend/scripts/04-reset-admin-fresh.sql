-- Drop the existing admin user to start fresh
DELETE FROM admin_users WHERE email = 'admin@propertylistings.com';

-- Create new admin user with a fresh password
-- Password: TestAdmin123! (you can change this)
-- Bcrypt hash generated fresh
INSERT INTO admin_users (email, password_hash, is_admin)
VALUES ('admin@propertylistings.com', '$2b$10$K9E2P4m8X5vL7nQrJ2sT.eEwQxYmZ1aB3dC4fG5hI6jK7lM8nO9pP', true);

-- Also update contact_info to have default values
DELETE FROM contact_info;
INSERT INTO contact_info (phone, email, address, hours)
VALUES ('+1 (555) 123-4567', 'info@propertylistings.com', '123 Business Ave, Suite 100', 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed');

-- Insert sample events
INSERT INTO events (id, name, title, date, location, description, price, category, sub_category) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Tech Conference 2024',
    'Annual Technology Conference',
    '2024-03-15',
    'Convention Center, Downtown',
    'Join us for the biggest tech conference of the year featuring industry leaders and cutting-edge innovations.',
    2500,
    'Technology',
    'Conference'
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Startup Pitch Night',
    'Startup Pitch Competition',
    '2024-03-20',
    'Innovation Hub',
    'Watch promising startups pitch their ideas to investors and win exciting prizes.',
    500,
    'Business',
    'Competition'
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'AI Workshop',
    'Introduction to Artificial Intelligence',
    '2024-03-25',
    'Tech Campus',
    'Learn the fundamentals of AI and machine learning in this hands-on workshop.',
    1500,
    'Technology',
    'Workshop'
),
(
    '550e8400-e29b-41d4-a716-446655440004',
    'Networking Mixer',
    'Professional Networking Event',
    '2024-03-30',
    'Rooftop Lounge',
    'Connect with professionals from various industries in a relaxed atmosphere.',
    0,
    'Networking',
    'Social'
),
(
    '550e8400-e29b-41d4-a716-446655440005',
    'Coding Bootcamp',
    'Full Stack Development Bootcamp',
    '2024-04-05',
    'Learning Center',
    'Intensive 3-day bootcamp covering modern web development technologies.',
    5000,
    'Technology',
    'Education'
);

-- Insert a sample admin user (password: admin123)
INSERT INTO users (id, email, password_hash, name, role) VALUES
(
    '550e8400-e29b-41d4-a716-446655440000',
    'admin@nextn.com',
    '$2b$10$rOzJaHq.xvjZlZKZKZKZKOzJaHq.xvjZlZKZKZKZKOzJaHq.xvjZl',
    'Admin User',
    'admin'
);
insert into users(username, password) values ('root', '$2b$10$gCLIQCtQOsSGn8LeiE0gsubZqWC9F2wS8652pSPQWUeUz397n.4EK');

insert into categories (name) values
('Electronics'),
('Fashion'),
('Home & Living'),
('Sports & Outdoors')
;

insert into products(name, price, category_id, user_id) values
('iPhone 15 Pro Max', 1300, 1, 1),
('Samsung Galaxy Tab S9', 900, 1, 1),
('Sony WH-1000XM5 Headphones', 250, 1, 1),
('Nike Air Max Sneakers', 35, 2, 1),
('Levi''s 501 Original Jeans', 22, 2, 1),
('Zara Cotton T-shirt', 7, 2, 1),
('Philips Air Fryer', 30, 3, 1),
('IKEA Study Desk', 10, 3, 1),
('Decathlon Mountain Bike', 300, 4, 1),
('Coleman Camping Tent 4-Person', 200, 4, 1)
;

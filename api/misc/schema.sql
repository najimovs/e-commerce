create table categories (
	id serial primary key,
	name varchar(64) not null unique
);

create table products (
	id serial primary key,
	name varchar(255) not null,
	img_url varchar(255) default '/images/no_image.png',
	price float not null,
	c_id int REFERENCES categories( id )
);

-- ALTER TABLE products ADD img_url varchar(255) default '/images/no_image.png';

insert into categories (name) values
('Electronics'),
('Fashion'),
('Home & Living'),
('Sports & Outdoors')
;

insert into products(name, price, c_id) values
('iPhone 15 Pro Max', 1300, 1),
('Samsung Galaxy Tab S9', 900, 1),
('Sony WH-1000XM5 Headphones', 250, 1),
('Nike Air Max Sneakers', 35, 2),
('Levi''s 501 Original Jeans', 22, 2),
('Zara Cotton T-shirt', 7, 2),
('Philips Air Fryer', 30, 3),
('IKEA Study Desk', 10, 3),
('Decathlon Mountain Bike', 300, 4),
('Coleman Camping Tent 4-Person', 200, 4)
;

-- QUERIES

-- SELECT CATEGORIES
select
	c.name name,
	count(p.c_id)::int count_of_products
from products p
join categories c on c.id = p.c_id
group by c.id
;

-- SELECT ALL PRODUCTS
select distinct(name), price, img_url from products
limit 2 offset ( 1 - 0 ) * 2;
;

-- ( p - 1 ) * ipp
-- ( 3 - 1 ) * 10
-- ceil( C / ipp )

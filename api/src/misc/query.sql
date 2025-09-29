
-- ALTER TABLE products ADD img_url varchar(255) default '/images/no_image.png';



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

import { query } from "./db.js"

try {

	query( `insert into products(name, price, c_id) values
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
;` )

	console.log( "OK")
}
catch( err ) {

	console.log( err )
}

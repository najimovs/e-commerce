create table users (
	id serial primary key,
	username varchar(32) not null unique,
	password varchar(255) not null
);

create table permissions (
	id serial primary key,
	rights int not null,
	user_id int references users( id ) on delete cascade on update cascade
);

create table categories (
	id serial primary key,
	name varchar(64) not null unique,
	img_url varchar(255) default '/images/no_image.png'
);

create table products (
	id serial primary key,
	name varchar(255) not null,
	img_url varchar(255) default '/images/no_image.png',
	price float not null,
	created_at timestamp default current_timestamp,
	category_id int references categories( id ) on delete cascade on update cascade,
	user_id int references users( id ) on delete cascade on update cascade
);

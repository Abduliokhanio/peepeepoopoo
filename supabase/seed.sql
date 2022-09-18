create table categories (
    id integer primary key generated always as identity,
    name text,
    imageUrl text,
    imageAlt text,
    availableDays integer[],
    availableTimes integer[]
);

create table products (
    id integer primary key generated always as identity,
    name text,
    imageUrl text,
    imageAlt text,
    qty INT,
    description text,
    price DECIMAL(10,2)
);

insert into public.products (name, imageUrl, imageAlt, qty, description, price)
values
  ('Nu''s Korean BBQ Beef Ribs', null, null, 10, null, 14.99),
  ('Grilled Pork Ribs, Egg, Pork Patty', null, null, 10, 'Com Suron, Trung, Cha', 11.99),
  ('Grilled Pork, Egg', null, null, 10, null, 9.99);
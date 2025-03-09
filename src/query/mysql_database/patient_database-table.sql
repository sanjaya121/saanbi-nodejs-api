CREATE DATABASE estore;

Create table estore.categories(id int not null,category varchar(45) default null,parent_category_id int default null,primary key (id));

INSERT INTO estore.categories (id, category, parent_category_id) values 
(2,'Women',NULL),
(3,'Kids',NULL),
(4,'Casual Wear',1),
(5,'Party Wear',2),
(6,'Foot Wear',2),
(7,'Accessories',3);

select * from estore.categories;


create database if not exists patientsdb;
use patientsdb;
drop table if exists patients;
create table patients
(
id bigint unsigned not null auto_increment,
first_name varchar(255) default null,
last_name varchar(255) default null,
email varchar(255) default null,
address varchar(255) default null,
diagnosis varchar(255) default null,
phone varchar(255) default null,
status varchar(255) default null,
created_at timestamp default current_timestamp,
image_url varchar(255) default null,
primary key(id),
constraint UQ_Patients_Email unique(email)

) auto_increment =1;
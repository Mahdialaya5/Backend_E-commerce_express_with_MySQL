CREATE DATABASE  E-commerce;
USE E-commerce;

-- create  tables
CREATE TABLE  users(
    id INT AUTO_INCREMENT  PRIMARY KEY,
    user_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password_user VARCHAR(250) NOT NULL,
    photo VARCHAR(250) ,
    role_user ENUM('user','company','admin'),
       UNIQUE KEY unique_email (email)
);

CREATE TABLE products(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    product_name VARCHAR(250) NOT NULL,
    price INT NOT NULL
    add_At TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    photo VARCHAR(250) ,
    company_id INT NOT NULL,
       FOREIGN KEY (company_id) REFERENCES users(id)
);
CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    adress  VARCHAR(255) NOT NULL,
    user_id INT 
        FOREIGN KEY (user_id) REFERENCES users(id)
   
);
CREATE TABLE order_details(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    product  VARCHAR(250) NOT NULL ,
    user_id INT 
        FOREIGN KEY (user_id) REFERENCES users(id)
        FOREIGN KEY (product) REFERENCES products(product_name)
   
);
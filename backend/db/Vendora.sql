create database vendora;
use vendora;
-- drop database vendora;


CREATE TABLE Vendors (
    vendor_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_name VARCHAR(100) NOT NULL,
    gst_number VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    country VARCHAR(50),
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Vendors (vendor_id, vendor_name, gst_number, email, phone, country, status) VALUES 
(1, 'Tech World Solutions', '24ABCDE1234F1Z5', 'contact@techworld.com', '9876543210', 'India', 'Active'),
(2, 'Office Supplies Co', '27VWXYZ5678G2A1', 'sales@officesupplies.com', '8765432109', 'India', 'Active'),
(3, 'Global Gadgets Inc', 'US-GAD-998877', 'support@globalgadgets.com', '1234567890', 'USA', 'Active');


CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Products (product_id, product_name) VALUES 
(1, 'Dell Latitude Laptop'),
(2, 'Logitech Wireless Mouse'),
(3, 'HP LaserJet Printer'),
(4, 'Ergonomic Office Chair'),
(5, 'Samsung 24" Monitor');

select * from Products;

CREATE TABLE VendorProducts (
    vendor_product_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    product_id INT NOT NULL,
    vendor_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vendor
        FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_product
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE CASCADE
);

INSERT INTO VendorProducts (vendor_product_id, vendor_id, product_id, vendor_price) VALUES 
(1, 1, 1, 45000.00), 
(2, 1, 2, 850.00),   
(3, 1, 5, 12000.00), 
(4, 2, 3, 15000.00),
(5, 2, 4, 5500.00),  
(6, 3, 1, 48000.00); 

select * from VendorProducts;

CREATE TABLE Purchases (
    purchase_id INT PRIMARY KEY AUTO_INCREMENT,
    vendor_id INT NOT NULL,
    invoice_number VARCHAR(100) UNIQUE,
    purchase_date DATE NOT NULL,
    total_amount DECIMAL(12,2) DEFAULT 0,
    paid_amount DECIMAL(12,2) DEFAULT 0,
    pending_amount DECIMAL(12,2) DEFAULT 0,
    payment_status ENUM('Paid','Partial','Unpaid') DEFAULT 'Unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_purchase_vendor
        FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id)
        ON DELETE CASCADE
);

INSERT INTO Purchases (purchase_id, vendor_id, invoice_number, purchase_date, total_amount, paid_amount, pending_amount, payment_status) VALUES 
(1, 1, 'INV-TW-001', '2023-10-01', 91700.00, 91700.00, 0.00, 'Paid'),
(2, 2, 'INV-OS-102', '2023-10-05', 30000.00, 15000.00, 15000.00, 'Partial'),
(3, 1, 'INV-TW-005', '2023-10-10', 1700.00, 0.00, 1700.00, 'Unpaid'),
(4, 3, 'INV-GG-900', '2023-10-12', 48000.00, 48000.00, 0.00, 'Paid'),
(5, 2, 'INV-OS-108', '2023-10-15', 11000.00, 11000.00, 0.00, 'Paid'),
(6, 1, 'INV-TW-012', '2023-10-18', 45000.00, 0.00, 45000.00, 'Unpaid'),
(7, 1, 'INV-TW-015', '2023-10-20', 25700.00, 10000.00, 15700.00, 'Partial'),
(8, 2, 'INV-OS-115', '2023-10-22', 16500.00, 0.00, 16500.00, 'Unpaid'),
(9, 3, 'INV-GG-910', '2023-10-25', 96000.00, 50000.00, 46000.00, 'Partial'),
(10, 1, 'INV-TW-020', '2023-10-28', 850.00, 850.00, 0.00, 'Paid');




CREATE TABLE PurchaseItems (
    purchase_item_id INT PRIMARY KEY AUTO_INCREMENT,
    purchase_id INT NOT NULL,
    vendor_product_id INT NOT NULL,
    quantity INT NOT NULL,
    purchase_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,

    CONSTRAINT fk_purchase
        FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_vendor_product
        FOREIGN KEY (vendor_product_id) REFERENCES VendorProducts(vendor_product_id)
        ON DELETE CASCADE
);

INSERT INTO PurchaseItems (purchase_id, vendor_product_id, quantity, purchase_price, total_price) VALUES 
(1, 1, 2, 45000.00, 90000.00), 
(1, 2, 2, 850.00, 1700.00),     
(2, 3, 2, 15000.00, 30000.00),  
(3, 2, 2, 850.00, 1700.00),     
(4, 6, 1, 48000.00, 48000.00),  
(5, 4, 2, 5500.00, 11000.00),  
(6, 1, 1, 45000.00, 45000.00),  
(7, 3, 1, 12000.00, 12000.00),  
(7, 2, 1, 850.00, 850.00),
(8, 4, 3, 5500.00, 16500.00),   
(9, 6, 2, 48000.00, 96000.00),  
(10, 2, 1, 850.00, 850.00);    



CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    purchase_id INT NOT NULL,
    payment_date DATE NOT NULL,
    amount_paid DECIMAL(12,2) NOT NULL,
    payment_mode VARCHAR(50),
    reference_number VARCHAR(100),

    CONSTRAINT fk_payment_purchase
        FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id)
        ON DELETE CASCADE
);

INSERT INTO Payments (purchase_id, payment_date, amount_paid, payment_mode, reference_number) VALUES 
(1, '2023-10-02', 91700.00, 'Bank', 'REF001'),
(2, '2023-10-06', 15000.00, 'UPI', 'UPI123456'),
(4, '2023-10-12', 48000.00, 'Cash', NULL),
(5, '2023-10-16', 11000.00, 'Bank', 'REF002'),
(7, '2023-10-21', 10000.00, 'UPI', 'UPI654321'),
(9, '2023-10-26', 50000.00, 'Bank', 'REF003'),
(10, '2023-10-28', 850.00, 'Cash', NULL);


CREATE TABLE Stock (
    product_id INT PRIMARY KEY,
    quantity_available INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_stock_product
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE CASCADE
);

INSERT INTO Stock (product_id, quantity_available) VALUES 
(1, 6), (2, 5), (3, 2), (4, 5), (5, 1)
ON DUPLICATE KEY UPDATE quantity_available = VALUES(quantity_available);
select * from stock;
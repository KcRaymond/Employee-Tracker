INSERT INTO department (name) VALUES ('Accounting');
INSERT INTO department (name) VALUES ('Creative');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Administration');

INSERT INTO role (title, salary, department_id) VALUES ('Graphic Artist', '40000', 2);
INSERT INTO role (title, salary, department_id) VALUES ('Art Director', '75000', 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', '60000', 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Rep', '40000', 3);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', '60000', 3);
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager', '40000', 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kasey', 'Raymond', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Cyrus', 'Weeks', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jessie', 'Rogers', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Patrick', 'Wokurka', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Mark', 'Ribolzi', 4);

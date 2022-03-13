INSERT INTO department (dept_name) 
VALUES ("Producer"), ("Actors"), ("Artist"), ("Directors");

INSERT INTO role (job_title, job_salary, department_id)
VALUES ("Writer", 90000.00,1), ("Voice Actor",75000.00,2), ("Illustrator",80000.00,3 ), ("Directors",95000.00,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jasmine","Sharpe",1,1), ("Nyah", "Cook",2,2), ("Aliyah", "Adams", 3,3), ("Mya", "Roberts",4,4);
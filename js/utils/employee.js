import { employeesData } from '../../data/employees.js';

function findEmployeeById(empId) {
  return employeesData.find(emp => emp.empId === empId);
}

export { findEmployeeById };

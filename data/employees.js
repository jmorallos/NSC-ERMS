import { documentsData } from './documents.js';

const employeesData = [
  {
    listno: 1, empId: '2023-001', profileImage: './assets/placeholder.svg', name: 'Dr. Evelyn Reed', email:
      'e.reed@university.edu', contact: '123-456-7890', position: 'Professor', department: 'Computer Science', status:
      'Active', documents: documentsData['2023-001'] || []
  },
  {
    listno: 2, empId: '2023-002', profileImage: './assets/placeholder.svg', name: 'Dr. Samuel Green', email:
      's.green@university.edu', contact: '234-567-8901', position: 'Associate Professor', department: 'Physics', status:
      'Active', documents: documentsData['2023-002'] || []
  },
  {
    listno: 3, empId: '2023-003', profileImage: './assets/placeholder.svg', name: 'Anna Gomez', email:
      'a.gomez@university.edu', contact: '345-678-9012', position: 'Librarian', department: 'Library', status: 'On Leave',
    documents: documentsData['2023-003'] || []
  },
  {
    listno: 4, empId: '2023-004', profileImage: './assets/placeholder.svg', name: 'Marcus Wright', email:
      'm.wright@university.edu', contact: '456-789-0123', position: 'IT Support', department: 'Administration', status:
      'Active', documents: documentsData['2023-004'] || []
  },
];

export { employeesData };
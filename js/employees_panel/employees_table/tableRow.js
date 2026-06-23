export function renderEmployees(data) {
    const empTable = document.getElementById('emp-table');
    const empTableTBody = document.getElementById('emp-tbody');
    empTableTBody.replaceChildren('');

    data.forEach((emp) => {
        const tr = document.createElement('tr');

        const empId = document.createElement('td');
        empId.textContent = emp.employeeId ?? "--";

        const empNameEmail = document.createElement('td');
        const name = document.createElement('p');
        const email = document.createElement('p');
        name.textContent = `${emp.fname} ${emp.lname}`;
        email.textContent = emp.email;

        const contact = document.createElement('td');
        contact.textContent = emp.contactNumber;

        const position = document.createElement('td');
        position.textContent = emp.position;

        const department = document.createElement('td');
        department.textContent = emp.department;

        const status = document.createElement('td');
        status.textContent = emp.status;

        const popOver = document.createElement('button');
        popOver.setAttribute('type', "button");
        popOver.textContent = '...';



        empNameEmail.append(name, email);
        tr.append(
            empId,
            empNameEmail,
            contact,
            position,
            department,
            status,
            popOver
        );

        empTableTBody.append(tr);
    })
}
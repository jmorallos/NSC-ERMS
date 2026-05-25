function doc(id, name, { type = "pdf", size = "1.0 MB", date, source = "upload" } = {}) {
    return {
        id,
        name,
        type,
        size,
        date: date || "2018-06-01",
        source
    };
}

export const EMPLOYEES = [
    {
        id: "EMP-001",
        fname: "Aileen D.",
        lname: "Santos",
        email: "aileen.santos@nsc.edu",
        contact: "09171234567",
        address: "123 Rizal St, Catarman",
        position: "Registrar",
        dept: "Admissions",
        status: "Active",
        start_date: "2018-06-01",
        updated: "May 12, 2026",
        picture: null,
        docs: [
            doc(1, "Diploma.pdf"),
            doc(2, "Transcript.pdf"),
            doc(3, "Appointment Letter.pdf")
        ]
    },
    {
        id: "EMP-002",
        fname: "Cesar M.",
        lname: "Villanueva",
        email: "cesar.villanueva@nsc.edu",
        contact: "09281234567",
        address: "45 Bonifacio Ave, Calbayog",
        position: "IT Support Lead",
        dept: "IT Services",
        status: "Active",
        start_date: "2019-03-12",
        updated: "May 18, 2026",
        picture: null,
        docs: [
            doc(4, "Diploma.pdf"),
            doc(5, "Transcript.pdf"),
            doc(6, "Employment Contract.pdf")
        ]
    },
    {
        id: "EMP-003",
        fname: "Lydia P.",
        lname: "Ramos",
        email: "lydia.ramos@nsc.edu",
        contact: "09391234567",
        address: "9 Del Pilar St, Catarman",
        position: "HR Officer",
        dept: "Human Resources",
        status: "Pending Docs",
        start_date: "2021-01-20",
        updated: "May 10, 2026",
        picture: null,
        docs: [
            doc(7, "Transcript.pdf"),
            doc(8, "ID Copy.pdf")
        ]
    },
    {
        id: "EMP-004",
        fname: "Rolando T.",
        lname: "Perez",
        email: "rolando.perez@nsc.edu",
        contact: "09501234567",
        address: "78 Mabini St, Catarman",
        position: "Accounting Clerk",
        dept: "Finance",
        status: "On Leave",
        start_date: "2017-09-05",
        updated: "Apr 30, 2026",
        picture: null,
        docs: [
            doc(9, "Diploma.pdf"),
            doc(10, "Clearance.pdf"),
            doc(11, "Service Record.pdf")
        ]
    },
    {
        id: "EMP-005",
        fname: "Ma. Teresa L.",
        lname: "Cruz",
        email: "teresa.cruz@nsc.edu",
        contact: "09611234567",
        address: "31 Quezon Blvd, Laoang",
        position: "Faculty Coordinator",
        dept: "Academic Affairs",
        status: "Active",
        start_date: "2016-11-14",
        updated: "May 20, 2026",
        picture: null,
        docs: [
            doc(12, "Diploma.pdf"),
            doc(13, "Transcript.pdf"),
            doc(14, "Appointment Letter.pdf"),
            doc(15, "Service Record.pdf")
        ]
    },
    {
        id: "EMP-006",
        fname: "Jerome A.",
        lname: "Navarro",
        email: "jerome.navarro@nsc.edu",
        contact: "09721234567",
        address: "56 Panganiban St, Catarman",
        position: "Facilities Supervisor",
        dept: "Operations",
        status: "Active",
        start_date: "2020-06-30",
        updated: "May 16, 2026",
        picture: null,
        docs: [
            doc(16, "Employment Contract.pdf"),
            doc(17, "ID Copy.pdf")
        ]
    },
    {
        id: "EMP-007",
        fname: "Felicia G.",
        lname: "Tuazon",
        email: "felicia.tuazon@nsc.edu",
        contact: "09831234567",
        address: "12 Osmena St, Allen",
        position: "Library Staff",
        dept: "Student Services",
        status: "Pending Docs",
        start_date: "2022-02-11",
        updated: "May 08, 2026",
        picture: null,
        docs: [
            doc(18, "Transcript.pdf"),
            doc(19, "License Copy.pdf")
        ]
    },
    {
        id: "EMP-008",
        fname: "Noel P.",
        lname: "Castillo",
        email: "noel.castillo@nsc.edu",
        contact: "09881234567",
        address: "88 Burgos St, Catarman",
        position: "Guidance Counselor",
        dept: "Student Services",
        status: "Active",
        start_date: "2019-08-19",
        updated: "May 21, 2026",
        picture: null,
        docs: [
            doc(20, "Diploma.pdf"),
            doc(21, "Transcript.pdf"),
            doc(22, "Appointment Letter.pdf")
        ]
    }
];

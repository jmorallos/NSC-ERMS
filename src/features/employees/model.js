import { formatEmployeeDate, getFileType, getToday } from "./utils.js";

export const SCHEMA_VERSION = 2;

export function getFullName(employee) {
    if (!employee) {
        return "";
    }
    return [employee.fname, employee.lname].filter(Boolean).join(" ").trim();
}

export function splitFullName(name = "") {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) {
        return { fname: "", lname: "" };
    }
    if (parts.length === 1) {
        return { fname: parts[0], lname: "" };
    }
    const lname = parts.pop();
    return { fname: parts.join(" "), lname };
}

export function normalizeEmployee(raw = {}) {
    if (raw.fname !== undefined && raw.lname !== undefined) {
        return cloneEmployee({
            id: raw.id,
            fname: raw.fname || "",
            lname: raw.lname || "",
            email: raw.email || "",
            contact: raw.contact || "",
            address: raw.address || "",
            position: raw.position || raw.role || "",
            dept: raw.dept || raw.department || "",
            status: raw.status || "Active",
            start_date: raw.start_date || raw.since || "",
            updated: raw.updated || formatEmployeeDate(),
            picture: raw.picture ?? null,
            docs: normalizeDocs(raw.docs || raw.documents || [])
        });
    }

    const { fname, lname } = splitFullName(raw.name || "");

    return cloneEmployee({
        id: raw.id,
        fname,
        lname,
        email: raw.email || "",
        contact: raw.contact || raw.phone || "",
        address: raw.address || "",
        position: raw.position || raw.role || "",
        dept: raw.dept || raw.department || "",
        status: raw.status || "Active",
        start_date: raw.start_date || raw.since || "",
        updated: raw.updated || formatEmployeeDate(),
        picture: raw.picture ?? null,
        docs: normalizeDocs(raw.docs || raw.documents || [])
    });
}

export function normalizeDocs(docs = []) {
    if (!docs.length) {
        return [];
    }

    if (typeof docs[0] === "string") {
        return docs.map((name, index) => ({
            id: Date.now() + index,
            name,
            type: getFileType(name),
            size: "—",
            date: getToday(),
            source: "upload"
        }));
    }

    return docs.map(cloneDoc);
}

export function cloneDoc(doc) {
    return {
        id: doc.id,
        name: doc.name,
        type: doc.type || getFileType(doc.name),
        size: doc.size || "—",
        date: doc.date || getToday(),
        source: doc.source || "upload"
    };
}

export function cloneEmployee(employee) {
    return {
        id: employee.id,
        fname: employee.fname || "",
        lname: employee.lname || "",
        email: employee.email || "",
        contact: employee.contact || "",
        address: employee.address || "",
        position: employee.position || "",
        dept: employee.dept || "",
        status: employee.status || "Active",
        start_date: employee.start_date || "",
        updated: employee.updated || "",
        picture: employee.picture ?? null,
        docs: (employee.docs || []).map(cloneDoc)
    };
}

export function getSearchHaystack(employee) {
    return [
        getFullName(employee),
        employee.fname,
        employee.lname,
        employee.position,
        employee.dept,
        employee.id,
        employee.email,
        employee.contact
    ]
        .join(" ")
        .toLowerCase();
}

export function getNextDocId(employees = []) {
    let max = 0;
    employees.forEach((employee) => {
        employee.docs.forEach((doc) => {
            if (typeof doc.id === "number" && doc.id > max) {
                max = doc.id;
            }
        });
    });
    return max + 1;
}

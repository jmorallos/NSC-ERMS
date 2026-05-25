import { renderEmployeesView } from "../features/employees/view.js";
import { renderQuickExportView } from "../features/quickExport/view.js";
import { renderBackupRestoreView } from "../features/backupRestore/view.js";
import { renderSettingsView } from "../features/settings/view.js";

const ROUTES = {
    employees: {
        title: "Employees",
        render: renderEmployeesView
    },
    "quick-export": {
        title: "Quick Export",
        render: renderQuickExportView
    },
    "backup-and-restore": {
        title: "Backup and Restore",
        render: renderBackupRestoreView
    },
    settings: {
        title: "Settings",
        render: renderSettingsView
    }
};

function normalizeHash(hash) {
    return (hash || "").replace("#", "").trim().toLowerCase();
}

export function resolveRoute(hash) {
    const key = normalizeHash(hash);

    if (ROUTES[key]) {
        return { key, ...ROUTES[key] };
    }

    return { key: "employees", ...ROUTES.employees };
}

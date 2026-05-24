import { createFeaturePlaceholder } from "../../shared/components/featurePlaceholder.js";

export function renderQuickExportView() {
    return createFeaturePlaceholder({
        title: "Quick Export",
        description: "Generate ready-to-send reports for HR, payroll, and compliance.",
        highlights: [
            {
                title: "Saved templates",
                text: "Reuse standard exports for monthly and yearly reports."
            },
            {
                title: "Flexible filters",
                text: "Export by department, status, or date range."
            },
            {
                title: "One-click delivery",
                text: "Download or send via email with tracking."
            }
        ],
        primaryAction: "Create export",
        secondaryAction: "Manage templates"
    });
}

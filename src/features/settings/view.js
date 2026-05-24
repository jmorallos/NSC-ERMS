import { createFeaturePlaceholder } from "../../shared/components/featurePlaceholder.js";

export function renderSettingsView() {
    return createFeaturePlaceholder({
        title: "Settings",
        description: "Tune departments, roles, and security for NSC workflows.",
        highlights: [
            {
                title: "Access control",
                text: "Define permissions for admins, HR, and department leads."
            },
            {
                title: "Organization",
                text: "Manage departments, titles, and reporting lines."
            },
            {
                title: "System defaults",
                text: "Set document retention and export formats."
            }
        ],
        primaryAction: "Edit roles",
        secondaryAction: "Update policies"
    });
}

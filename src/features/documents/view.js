import { createFeaturePlaceholder } from "../../shared/components/featurePlaceholder.js";

export function renderDocumentsView() {
    return createFeaturePlaceholder({
        title: "Documents",
        description: "Organize contracts, memos, and compliance files in one place.",
        highlights: [
            {
                title: "Smart folders",
                text: "Group documents by employee, type, or validity period."
            },
            {
                title: "Expiry alerts",
                text: "Track renewal dates and set reminders for staff."
            },
            {
                title: "Secure access",
                text: "Control visibility by department and role."
            }
        ],
        primaryAction: "Upload document",
        secondaryAction: "Bulk tag"
    });
}

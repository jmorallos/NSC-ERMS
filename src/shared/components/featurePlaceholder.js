export function createFeaturePlaceholder({
    title,
    description,
    highlights = [],
    primaryAction,
    secondaryAction
}) {
    const section = document.createElement("section");
    section.className = "feature-placeholder";

    const header = document.createElement("div");
    header.className = "feature-header";

    const heading = document.createElement("h2");
    heading.textContent = title;

    const copy = document.createElement("p");
    copy.textContent = description;

    header.append(heading, copy);

    const actions = document.createElement("div");
    actions.className = "feature-actions";

    if (primaryAction) {
        const primary = document.createElement("button");
        primary.type = "button";
        primary.className = "btn btn-primary";
        primary.textContent = primaryAction;
        actions.appendChild(primary);
    }

    if (secondaryAction) {
        const secondary = document.createElement("button");
        secondary.type = "button";
        secondary.className = "btn btn-ghost";
        secondary.textContent = secondaryAction;
        actions.appendChild(secondary);
    }

    const grid = document.createElement("div");
    grid.className = "feature-grid";

    highlights.forEach((item) => {
        const card = document.createElement("article");
        card.className = "feature-card";

        const cardTitle = document.createElement("h3");
        cardTitle.textContent = item.title;

        const cardText = document.createElement("p");
        cardText.textContent = item.text;

        card.append(cardTitle, cardText);
        grid.appendChild(card);
    });

    section.append(header, actions, grid);
    return section;
}

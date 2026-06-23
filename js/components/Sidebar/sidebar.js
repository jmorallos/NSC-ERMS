export const Sidebar = () => {
    return /* html */ `
        <div id="sidebar" class="sidebar" role="tablist" aria-orientation="vertical">
            <div class="sidebar__brand">
                <strong>NSC - ERMS</strong>
            </div>

            <button id="tab-employees" class="sidebar__btn sidebar__btn--active" role="tab" aria-selected="true">
                <svg class="sidebar__svg">
                    <use href="./assets/icons.svg#icon-employees"></use>
                </svg>
                Employees
            </button>
        </div>
    `;
}
import { viewEmployees } from "./views/ViewEmployees.js";

const root = document.querySelector("#root");

export function render() {
	root.innerHTML = /* html */ `

<aside id="sidebar">
	<div id="brand" class="brand">
		<div id="logo">
			<img src="assets/NSC-logo.jpg" />
		</div>
		<h1>NSC</h1>
		<p>Employee Records Management</p>
	</div>
	<nav>
		<a class="active" onclick="navigate('employees', this)">
			<svg class="my-icon">
				<use href="./assets/icons/icons.svg#icon-users"></use>
			</svg>
			Employees
		</a>
		<a onclick="navigate('departments', this)">
			<svg class="my-icon">
				<use href="./assets/icons/icons.svg#icon-building"></use>
			</svg>
			Departments
		</a>
		<a onclick="navigate('export', this)">
			<svg class="my-icon">
				<use href="./assets/icons/icons.svg#icon-backup"></use>
			</svg>
			Backup & Restore
		</a>
		<a onclick="navigate('export', this)">
			<svg>
				<use href="./assets/icons/icons.svg#icon-export"></use>
			</svg>
			Export Data
		</a>
		<a onclick="navigate('export', this)">
			<svg>
				<use href="./assets/icons/icons.svg#icon-settings"></use>
			</svg>
			Settings
		</a>
	</nav>
	<div class="sidebar-footer">College HR System v1.0</div>

</aside>
<div id="view-root">
	${viewEmployees()}
</div>
`;
}

render();
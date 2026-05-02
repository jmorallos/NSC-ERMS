const root = document.getElementById("view-root");

if (root) {
  root.innerHTML = `
    <p><strong>App:</strong> ${window.nscApp?.appName ?? "NSC-ERMS"}</p>
    <p><strong>Version:</strong> ${window.nscApp?.version ?? "N/A"}</p>
    <p>Next step: wire employee, department, and document modules.</p>
  `;
}

document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  loadSkills();
});

async function loadProjects() {
  const container = document.getElementById("projects-grid");

  try {
    const response = await fetch("config/projects.json");
    const projects = await response.json();

    projects.forEach((project) => {
      const article = document.createElement("article");
      article.className = "project card";
      const tagsHtml = project.tags
        .map((tag) => `<span class="chip">${tag}</span>`)
        .join("");

      article.innerHTML = `
        <div class="media" role="img" aria-label="Screenshot of ${project.title}"></div>
        <div class="body">
          <h3>${project.title}</h3>
          <p class="muted">${project.description}</p>
          <div class="meta">
            ${tagsHtml}
          </div>
          <div class="actions">
            <a class="btn ghost" href="${project.link}" target="_blank">Source</a>
          </div>
        </div>
      `;

      container.appendChild(article);
    });
  } catch (error) {
    console.error("Error loading projects:", error);
    container.innerHTML = "<p>Failed to load projects.</p>";
  }
}

async function loadSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return; 

  try {
    const response = await fetch("config/skills.json");
    if (!response.ok) throw new Error("Could not find skills.json");
    
    const skills = await response.json();

    container.innerHTML = "";

    skills.forEach((group) => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "group";

      const chipsHtml = group.items
        .map(item => `<span class="chip">${item}</span>`)
        .join("");

      groupDiv.innerHTML = `
        <h3>${group.category}</h3>
        <div class="stack">
          ${chipsHtml}
        </div>
      `;

      container.appendChild(groupDiv);
    });

  } catch (error) {
    console.error("Error loading skills:", error);
    container.innerHTML = "<p>Unable to load skills.</p>";
  }
}
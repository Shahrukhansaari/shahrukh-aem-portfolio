const techData = {
  aem: [
    ["AEM Sites", "Components, templates, editable templates and content structures."],
    ["AEM Forms", "Adaptive Forms, EDS Forms, validation and submission flows."],
    ["AEM Assets", "DAM-oriented content and asset integration patterns."],
    ["AEMaaCS", "Cloud-native AEM implementation and deployment readiness."],
    ["Edge Delivery Services", "Blocks, document-based authoring and performance-focused delivery."],
    ["Universal Editor", "Modern, flexible content authoring and component integration."]
  ],
  backend: [
    ["Java", "Enterprise backend development and service implementation."],
    ["Sling Models", "Clean server-side content models and component logic."],
    ["OSGi", "Modular services, configuration and dependency management."],
    ["Servlets", "Resource-type and path-oriented HTTP integrations."],
    ["JCR", "Repository APIs, content structures and queries."],
    ["Workflows & Sling Jobs", "Process automation, asynchronous jobs and operational workflows."]
  ],
  frontend: [
    ["HTL", "Secure and maintainable AEM presentation layer."],
    ["JavaScript", "Interactive components, EDS blocks and browser-side behavior."],
    ["CSS", "Responsive, accessible and component-focused styling."],
    ["React", "Modern frontend development and application patterns."],
    ["EDS Blocks", "Reusable blocks optimized for Edge Delivery Services."],
    ["Responsive UI", "Mobile-first experiences across enterprise channels."]
  ],
  cloud: [
    ["Adobe Cloud Manager", "Pipelines, deployments, environments and release management."],
    ["CI/CD", "Automated build, quality and deployment workflows."],
    ["Git", "Version control and collaborative engineering practices."],
    ["Dispatcher", "Caching, security and request routing considerations."],
    ["Cloud Environments", "Development, stage and production configuration."],
    ["Configuration Management", "OSGi settings, secrets and environment variables."]
  ]
};

const architectureData = [
  ["Business Requirement", "Understand goals, users, content and integration needs."],
  ["AEM Architecture", "Define scalable content, component and service architecture."],
  ["AEM Components / EDS / Forms", "Implement the experience layer for authors and end users."],
  ["Backend Services & Integrations", "Connect APIs, DAM, workflows and enterprise systems."],
  ["Adobe Cloud", "Deploy through cloud environments and modern CI/CD practices."],
  ["End User", "Deliver a reliable, accessible and performant digital experience."]
];

const panel = document.querySelector("#tech-panel");
const tabs = document.querySelectorAll(".tech-tab");

function renderTech(key) {
  panel.innerHTML = techData[key].map(([title, desc]) =>
    `<article class="tech-chip"><strong>${title}</strong><span>${desc}</span></article>`
  ).join("");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderTech(tab.dataset.tech);
  });
});
renderTech("aem");

const architecture = document.querySelector("#architecture-flow");
const detail = document.querySelector("#architecture-detail");

architectureData.forEach(([title, desc], index) => {
  const node = document.createElement("button");
  node.className = `arch-node${index === 0 ? " active" : ""}`;
  node.innerHTML = `<strong>${index + 1}. ${title}</strong><span>Click to explore</span>`;
  node.addEventListener("click", () => {
    document.querySelectorAll(".arch-node").forEach(n => n.classList.remove("active"));
    node.classList.add("active");
    detail.textContent = desc;
  });
  architecture.appendChild(node);
});
detail.textContent = architectureData[0][1];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const rfpForm = document.querySelector("#rfp-form");
const formNote = document.querySelector("#form-note");

const intakeConfig = {
  recipientEmail: "valueaddedassets@gmail.com",
  formEndpoint: ""
};

function updateHeader() {
  header.dataset.elevated = window.scrollY > 24 ? "true" : "false";
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function formatRequest(data) {
  return [
    "Appraisal RFP Intake",
    "",
    `Name: ${data.name}`,
    `Organization: ${data.organization || "Not provided"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Property / Market: ${data.property}`,
    `Property Type: ${data.propertyType}`,
    `Assignment Purpose: ${data.purpose}`,
    `Timing: ${data.timing || "Not provided"}`,
    "",
    "Details:",
    data.details || "Not provided"
  ].join("\n");
}

rfpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(rfpForm).entries());
  const subject = encodeURIComponent(`Appraisal RFP - ${data.property}`);
  const body = encodeURIComponent(formatRequest(data));
  window.location.href = `mailto:${intakeConfig.recipientEmail}?subject=${subject}&body=${body}`;
  formNote.textContent = "Your email app is opening with the RFP summary prepared.";
});

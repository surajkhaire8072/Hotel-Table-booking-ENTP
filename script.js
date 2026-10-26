const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const dateInput = document.getElementById("date");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
dateInput.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (dateInput.value < localToday) {
    dateInput.setCustomValidity("Please select today or a future date.");
    dateInput.reportValidity();
    dateInput.setCustomValidity("");
    return;
  }

  const form = new FormData(event.currentTarget);
  const guestCount = form.get("guests");
  const reference = "AN" + Math.random().toString(36).slice(2, 7).toUpperCase();
  const message = document.getElementById("bookingMessage");
  message.textContent =
    `Demo request created, ${form.get("name")}! Table for ${guestCount} on ${form.get("date")} at ${form.get("time")}. Reference: ${reference}. This is not a confirmed restaurant reservation.`;
  event.currentTarget.reset();
  dateInput.min = localToday;
});

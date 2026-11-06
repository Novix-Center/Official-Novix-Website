// ONE PLACE TO EDIT for the public pages. Leave a value empty ("") and the matching button shows "coming soon".
const CONFIG = {
  company: "[COMPANY NAME]",     // the legal operator of Novix (an adult or a company)
  email: "",                      // support email, e.g. "support@yourdomain.com"
  booking: "",                    // your meeting booking link (https://...)
};

document.querySelectorAll("[data-company]").forEach((el) => (el.textContent = CONFIG.company));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

function wire(selector, value, makeHref, soon) {
  document.querySelectorAll(selector).forEach((el) => {
    if (value) { el.href = makeHref(value); if (el.hasAttribute("data-show-value")) el.textContent = value; }
    else { const s = document.createElement("span"); s.className = el.className.replace("button", "button disabled"); s.textContent = soon; el.replaceWith(s); }
  });
}
wire("[data-booking]", CONFIG.booking, (v) => v, "Booking coming soon");
wire("[data-email]", CONFIG.email, (v) => "mailto:" + v, "Contact email coming soon");

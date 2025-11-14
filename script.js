/* ---------- YEAR ---------- */
document.getElementById("year") && (document.getElementById("year").textContent = new Date().getFullYear());

/* ---------- POPUP ---------- */
function openPopup(id) {
  const p = document.getElementById(id);
  if (!p) return;
  p.classList.add("active");
}

function closePopup(id) {
  const p = document.getElementById(id);
  if (!p) return;
  p.classList.remove("active");
}

// close when clicking outside image
document.addEventListener("click", function (e) {
  const openPopups = document.querySelectorAll(".popup.active");
  openPopups.forEach(p => {
    const img = p.querySelector(".popup-img");
    if (p === e.target) p.classList.remove("active");
    // clicking on the close button handled inline to stopPropagation
  });
});

/* ---------- FORM HANDLING (FormSubmit) ---------- */
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    // Build order summary from checked boxes and form fields
    const getChecked = (name) => {
      return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);
    };

    const heroes = getChecked("heroes");
    const foods = getChecked("foods");
    const drinks = getChecked("drinks");

    const eventName = bookingForm.querySelector('input[name="event_name"]').value || "";
    const childInfo = bookingForm.querySelector('input[name="child_info"]').value || "";
    const date = bookingForm.querySelector('input[name="date"]').value || "";
    const time = bookingForm.querySelector('input[name="time"]').value || "";
    const duration = bookingForm.querySelector('select[name="duration"]').value || "";
    const count = bookingForm.querySelector('input[name="count"]').value || "";
    const notes = bookingForm.querySelector('textarea[name="notes"]').value || "";
    const phone = bookingForm.querySelector('input[name="phone"]').value || "";

    let summary = `ღონისძიების სახელი: ${eventName}\n`;
    summary += `ბავშვის სახელი/ასაკი: ${childInfo}\n`;
    summary += `თარიღი: ${date} ${time}\n`;
    summary += `ხანგრძლივი: ${duration}\n`;
    summary += `ბავშვების რაოდენობა: ${count}\n\n`;

    if (heroes.length) {
      summary += `გმირები:\n- ${heroes.join("\n- ")}\n\n`;
    }
    if (foods.length) {
      summary += `კერძები:\n- ${foods.join("\n- ")}\n\n`;
    }
    if (drinks.length) {
      summary += `სასმელები:\n- ${drinks.join("\n- ")}\n\n`;
    }

    summary += `კომენტარი: ${notes}\n`;
    summary += `ტელეფონი: ${phone}\n`;

    // Put into hidden input so FormSubmit includes it
    const hidden = document.getElementById("order_summary");
    if (hidden) hidden.value = summary;

    // allow normal submit to proceed (FormSubmit will handle redirect)
    // optionally, you can show a small spinner here
  });
}

/* ---------- WHATSAPP QUICK SEND ---------- */
const whatsappBtn = document.getElementById("whatsappBtn");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", function () {
    const getChecked = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);

    const heroes = getChecked("heroes").join(", ");
    const foods = getChecked("foods").join(", ");
    const drinks = getChecked("drinks").join(", ");

    const eventName = (document.querySelector('input[name="event_name"]')||{}).value || "";
    const childInfo = (document.querySelector('input[name="child_info"]')||{}).value || "";
    const date = (document.querySelector('input[name="date"]')||{}).value || "";
    const time = (document.querySelector('input[name="time"]')||{}).value || "";
    const phone = (document.querySelector('input[name="phone"]')||{}).value || "";
    const notes = (document.querySelector('textarea[name="notes"]')||{}).value || "";

    let message = `KidsLand დაჯავშნა:\n`;
    if (eventName) message += `ღონისძიება: ${eventName}\n`;
    if (childInfo) message += `ბავშვი: ${childInfo}\n`;
    if (date) message += `თარიღი: ${date} ${time}\n`;
    if (heroes) message += `გმირები: ${heroes}\n`;
    if (foods) message += `კერძები: ${foods}\n`;
    if (drinks) message += `სასმელები: ${drinks}\n`;
    if (notes) message += `კომენტარი: ${notes}\n`;
    if (phone) message += `ტელ: ${phone}\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/995598881919?text=${encoded}`, "_blank");
  });
}
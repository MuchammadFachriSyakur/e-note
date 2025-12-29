const openForm = document.getElementById("openForm");
const formSection = document.getElementById("formSection");
const dashboard = document.querySelector(".dashboard");

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const totalEl = document.getElementById("total");
const countEl = document.getElementById("count");
const historyEl = document.getElementById("history");

const nominalInput = document.getElementById("nominal");
const preview = document.getElementById("nominalPreview");
const emptyHistory = document.getElementById("emptyHistory");

let total = 0;
let count = 0;

/* FORMAT RUPIAH */
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

/* OPEN FORM */
openForm.onclick = () => {
  dashboard.classList.add("hidden");
  formSection.classList.remove("hidden");
  nominalInput.focus();
};

/* CANCEL */
cancelBtn.onclick = () => {
  formSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  nominalInput.value = "";
  preview.innerText = "";
};

/* INPUT RUPIAH */
nominalInput.addEventListener("input", () => {
  let value = nominalInput.value.replace(/\D/g, "");

  if (!value) {
    nominalInput.value = "";
    preview.innerText = "";
    return;
  }

  let number = parseInt(value);
  nominalInput.value = formatRupiah(number);
  preview.innerText = `Nominal: ${formatRupiah(number)}`;
});

/* SAVE */
saveBtn.onclick = () => {
  const rawValue = nominalInput.value.replace(/\D/g, "");
  const nominal = parseInt(rawValue);
  const provider = document.getElementById("provider").value;

  if (!nominal) {
    alert("Nominal belum diisi");
    return;
  }

  emptyHistory.style.display = "none";

  total += nominal;
  count++;

  totalEl.innerText = formatRupiah(total);
  countEl.innerText = count;

  const li = document.createElement("li");
  li.innerText = `${provider} - ${formatRupiah(nominal)}`;
  historyEl.prepend(li);

  nominalInput.value = "";
  preview.innerText = "";

  formSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
};

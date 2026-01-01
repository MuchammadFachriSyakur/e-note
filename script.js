/* ======================
   DOM ELEMENTS
====================== */
const openForm = document.getElementById("openForm");
const formSection = document.getElementById("formSection");
const dashboard = document.querySelector(".dashboard");

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const totalEl = document.getElementById("total");
const countEl = document.getElementById("count");
const historyEl = document.getElementById("history");
const emptyHistory = document.getElementById("emptyHistory");

const nominalInput = document.getElementById("nominal");
const preview = document.getElementById("nominalPreview");
const providerSelect = document.getElementById("provider");

const filterDateInput = document.getElementById("filterDate");
const resetFilterBtn = document.getElementById("resetFilter");

/* ======================
   STATE & CONSTANT
====================== */
const STORAGE_KEY = "transaksi_konter_pulsa";

let state = {
  transactions: [],
};

/* ======================
   UTILITIES
====================== */
const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

const getNow = () => {
  const now = new Date();
  return {
    display:
      now.toLocaleDateString("id-ID") +
      " " +
      now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    iso: now.toISOString().split("T")[0],
  };
};

/* ======================
   STORAGE
====================== */
const saveStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
};

const loadStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  state.transactions = data ? JSON.parse(data) : [];
};

/* ======================
   RENDER
====================== */
const createTransactionItem = (trx) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <div class="transaction-provider">
      <span class="provider-icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 20h.01"></path>
          <path d="M7 20v-4"></path>
          <path d="M12 20v-8"></path>
          <path d="M17 20V8"></path>
          <path d="M22 20V4"></path>
        </svg>
      </span>
      <span>${trx.provider}</span>
    </div>

    <div class="transaction-amount">${trx.nominal_pulsa}</div>

    <div class="transaction-date">
      <span class="date-icon">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M12 7v5l3 3"></path>
        </svg>
      </span>
      ${trx.tanggal}
    </div>
  `;
  return li;
};

const renderTransactions = (list) => {
  historyEl.innerHTML = "";

  if (list.length === 0) {
    emptyHistory.style.display = "block";
    updateSummary([]);
    return;
  }

  emptyHistory.style.display = "none";

  list.forEach((trx) => {
    historyEl.prepend(createTransactionItem(trx));
  });

  updateSummary(list);
};

const updateSummary = (list) => {
  const total = list.reduce((sum, trx) => sum + trx.harga_jual, 0);
  totalEl.innerText = formatRupiah(total);
  countEl.innerText = list.length;
};

/* ======================
   ACTIONS
====================== */
const addTransaction = () => {
  const raw = nominalInput.value.replace(/\D/g, "");
  const nominal = parseInt(raw);
  if (!nominal) return alert("Nominal belum diisi");

  const time = getNow();

  const transaksi = {
    id: Date.now(),
    tanggal: time.display,
    tanggalISO: time.iso,
    nominal_pulsa: formatRupiah(nominal),
    harga_jual: nominal,
    provider: providerSelect.value,
  };

  state.transactions.push(transaksi);
  saveStorage();
  renderTransactions(state.transactions);
  closeForm();
};

const filterByDate = (date) => {
  const filtered = state.transactions.filter((trx) => trx.tanggalISO === date);
  renderTransactions(filtered);
};

/* ======================
   UI HANDLERS
====================== */
const openFormUI = () => {
  dashboard.classList.add("hidden");
  formSection.classList.remove("hidden");
  nominalInput.focus();
};

const closeForm = () => {
  formSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  nominalInput.value = "";
  preview.innerText = "";
};

/* ======================
   EVENTS
====================== */
openForm.onclick = openFormUI;
cancelBtn.onclick = closeForm;
saveBtn.onclick = addTransaction;

filterDateInput.addEventListener("change", (e) => {
  if (e.target.value) filterByDate(e.target.value);
});

resetFilterBtn.onclick = () => {
  filterDateInput.value = "";
  renderTransactions(state.transactions);
};

nominalInput.addEventListener("input", () => {
  const value = nominalInput.value.replace(/\D/g, "");
  if (!value) {
    nominalInput.value = "";
    preview.innerText = "";
    return;
  }
  const number = parseInt(value);
  nominalInput.value = formatRupiah(number);
  preview.innerText = `Nominal: ${formatRupiah(number)}`;
});

/* ======================
   INIT
====================== */
loadStorage();
renderTransactions(state.transactions);

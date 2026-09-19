/**
 * BioData Profile Maker Engine
 */

// Initial Biodata Defaults
const defaultBiodata = {
  themeColor: '#8b1111',
  borderPreset: 'royal-corner',
  bgPreset: 'watermark-ganesha',
  symbolPreset: 'ganesha',
  invocation: '|| Shri Ganeshay Namah ||',
  docTitle: 'Biodata',
  photoUrl: '',
  photoPlacement: 'top-right',
  personalDetails: [
    { label: 'Full Name', value: 'Kunal Shamrao Kamble' },
    { label: 'Date of Birth', value: '15/08/1997' },
    { label: 'Height', value: "5'5\"" },
    { label: 'Place of Birth', value: 'Pune' },
    { label: 'Caste', value: 'Mahar' },
    { label: 'Religion', value: 'Buddhist' },
    { label: 'Higher Education', value: '12th' },
    { label: 'Job/Occupation', value: 'IT Technician' }
  ],
  familyDetails: [
    { label: "Father's Name", value: 'Shamrao' },
    { label: "Father's Occupation", value: 'Bakery Worker' },
    { label: "Mother's Name", value: 'Nanda' },
    { label: "Mother's Occupation", value: 'Housewife' },
    { label: 'Sisters', value: '1 married' },
    { label: 'Brothers', value: '1 younger brother' }
  ],
  contactDetails: [
    { label: 'Mobile Number', value: '8669485586' }
  ]
};

// Application State
let state = JSON.parse(JSON.stringify(defaultBiodata));

// Map Symbols
const symbolIcons = {
  ganesha: '🕉️',
  om: 'ॐ',
  swastik: '卐',
  kalash: '🏺',
  khanda: '☬',
  crescent: '☪️',
  buddha: '☸️',
  cross: '✝️',
  lotus: '🪷',
  none: ''
};

// DOM References
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeToggleIcon = document.getElementById('themeToggleIcon');
const themeToggleLabel = document.getElementById('themeToggleLabel');

const tabFormBtn = document.getElementById('tabFormBtn');
const tabPreviewBtn = document.getElementById('tabPreviewBtn');
const formColumn = document.getElementById('formColumn');
const previewColumn = document.getElementById('previewColumn');

const borderPresetSelect = document.getElementById('borderPreset');
const bgPresetSelect = document.getElementById('bgPreset');
const themeColorInput = document.getElementById('themeColor');
const themeColorHex = document.getElementById('themeColorHex');
const symbolPresetSelect = document.getElementById('symbolPreset');
const invocationInput = document.getElementById('invocationText');
const docTitleInput = document.getElementById('docTitle');
const photoPlacementSelect = document.getElementById('photoPlacement');
const photoInput = document.getElementById('photoInput');
const btnRemovePhoto = document.getElementById('btnRemovePhoto');

// Render Containers
const biodataPaper = document.getElementById('biodataPaper');
const renderSymbol = document.getElementById('renderSymbol');
const renderDocTitle = document.getElementById('renderDocTitle');
const renderInvocation = document.getElementById('renderInvocation');
const renderPersonalTable = document.getElementById('renderPersonalTable');
const renderFamilyTable = document.getElementById('renderFamilyTable');
const renderContactTable = document.getElementById('renderContactTable');
const renderCandidatePhoto = document.getElementById('renderCandidatePhoto');
const photoPlaceholder = document.getElementById('photoPlaceholder');
const renderPhotoContainer = document.getElementById('renderPhotoContainer');

// Action Buttons
const btnLoadSample = document.getElementById('btnLoadSample');
const btnPrint = document.getElementById('btnPrint');
const btnExportPNG = document.getElementById('btnExportPNG');
const exportModal = document.getElementById('exportModal');

/**
 * Initialize Application
 */
function init() {
  initThemeMode();
  initMobileTabs();
  bindFormInputs();
  bindActionButtons();
  renderFormFields();
  renderCanvas();
}

/**
 * Theme Mode Handler (Light default with localStorage memory)
 */
function initThemeMode() {
  const savedTheme = localStorage.getItem('biodata_theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('biodata_theme', newTheme);
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggleIcon.className = 'fa-solid fa-sun text-amber-400';
    if (themeToggleLabel) themeToggleLabel.textContent = 'Light';
  } else {
    document.documentElement.classList.remove('dark');
    themeToggleIcon.className = 'fa-solid fa-moon text-slate-700';
    if (themeToggleLabel) themeToggleLabel.textContent = 'Dark';
  }
}

/**
 * Mobile Tab Switcher (Form vs Preview on small screens)
 */
function initMobileTabs() {
  if (!tabFormBtn || !tabPreviewBtn) return;

  tabFormBtn.addEventListener('click', () => {
    formColumn.classList.remove('hidden');
    previewColumn.classList.add('hidden');
    previewColumn.classList.remove('flex');

    tabFormBtn.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-rose-700 text-white shadow-sm flex items-center justify-center gap-1.5';
    tabPreviewBtn.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-1.5';
  });

  tabPreviewBtn.addEventListener('click', () => {
    formColumn.classList.add('hidden');
    previewColumn.classList.remove('hidden');
    previewColumn.classList.add('flex');

    tabPreviewBtn.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-rose-700 text-white shadow-sm flex items-center justify-center gap-1.5';
    tabFormBtn.className = 'flex-1 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-1.5';
  });
}

/**
 * Render Form Field inputs
 */
function renderFormFields() {
  renderFieldGroup('personal', state.personalDetails);
  renderFieldGroup('family', state.familyDetails);
  renderFieldGroup('contact', state.contactDetails);
}

function renderFieldGroup(sectionKey, dataArray) {
  const container = document.getElementById(`fields-${sectionKey}`);
  container.innerHTML = '';

  dataArray.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-1.5 text-xs';
    row.innerHTML = `
      <input type="text" value="${item.label}" data-sec="${sectionKey}" data-idx="${index}" data-type="label" placeholder="Field" class="w-1/3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-600" />
      <input type="text" value="${item.value}" data-sec="${sectionKey}" data-idx="${index}" data-type="value" placeholder="Value" class="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-600" />
      <button type="button" data-sec="${sectionKey}" data-idx="${index}" class="btnDeleteField text-slate-400 hover:text-rose-600 p-1">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    container.appendChild(row);
  });

  container.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', handleFieldChange);
  });

  container.querySelectorAll('.btnDeleteField').forEach(btn => {
    btn.addEventListener('click', handleDeleteField);
  });
}

function handleFieldChange(e) {
  const sec = e.target.dataset.sec;
  const idx = parseInt(e.target.dataset.idx, 10);
  const type = e.target.dataset.type;

  const keyMap = {
    personal: 'personalDetails',
    family: 'familyDetails',
    contact: 'contactDetails'
  };

  state[keyMap[sec]][idx][type] = e.target.value;
  renderCanvas();
}

function handleDeleteField(e) {
  const btn = e.currentTarget;
  const sec = btn.dataset.sec;
  const idx = parseInt(btn.dataset.idx, 10);

  const keyMap = {
    personal: 'personalDetails',
    family: 'familyDetails',
    contact: 'contactDetails'
  };

  state[keyMap[sec]].splice(idx, 1);
  renderFormFields();
  renderCanvas();
}

/**
 * Bind Static Form Inputs
 */
function bindFormInputs() {
  themeColorInput.addEventListener('input', (e) => {
    state.themeColor = e.target.value;
    themeColorHex.textContent = e.target.value;
    renderCanvas();
  });

  borderPresetSelect.addEventListener('change', (e) => {
    state.borderPreset = e.target.value;
    renderCanvas();
  });

  bgPresetSelect.addEventListener('change', (e) => {
    state.bgPreset = e.target.value;
    renderCanvas();
  });

  symbolPresetSelect.addEventListener('change', (e) => {
    state.symbolPreset = e.target.value;
    renderCanvas();
  });

  invocationInput.addEventListener('input', (e) => {
    state.invocation = e.target.value;
    renderCanvas();
  });

  docTitleInput.addEventListener('input', (e) => {
    state.docTitle = e.target.value;
    renderCanvas();
  });

  photoPlacementSelect.addEventListener('change', (e) => {
    state.photoPlacement = e.target.value;
    renderCanvas();
  });

  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        state.photoUrl = uploadEvent.target.result;
        btnRemovePhoto.classList.remove('hidden');
        renderCanvas();
      };
      reader.readAsDataURL(file);
    }
  });

  btnRemovePhoto.addEventListener('click', () => {
    state.photoUrl = '';
    photoInput.value = '';
    btnRemovePhoto.classList.add('hidden');
    renderCanvas();
  });

  document.querySelectorAll('.btnAddField').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.section;
      const keyMap = {
        personal: 'personalDetails',
        family: 'familyDetails',
        contact: 'contactDetails'
      };
      state[keyMap[sec]].push({ label: 'Field', value: 'Value' });
      renderFormFields();
      renderCanvas();
    });
  });
}

/**
 * Bind Action Buttons
 */
function bindActionButtons() {
  btnLoadSample.addEventListener('click', () => {
    state = JSON.parse(JSON.stringify(defaultBiodata));
    themeColorInput.value = state.themeColor;
    themeColorHex.textContent = state.themeColor;
    borderPresetSelect.value = state.borderPreset;
    bgPresetSelect.value = state.bgPreset;
    symbolPresetSelect.value = state.symbolPreset;
    invocationInput.value = state.invocation;
    docTitleInput.value = state.docTitle;
    photoPlacementSelect.value = state.photoPlacement;
    photoInput.value = '';
    btnRemovePhoto.classList.add('hidden');
    renderFormFields();
    renderCanvas();
  });

  btnPrint.addEventListener('click', () => {
    window.print();
  });

  btnExportPNG.addEventListener('click', exportHighResPNG);
}

/**
 * Render the Live Preview Canvas
 */
function renderCanvas() {
  document.documentElement.style.setProperty('--theme-color', state.themeColor);
  biodataPaper.className = `biodata-paper relative text-slate-900 border-${state.borderPreset} bg-${state.bgPreset}`;

  renderDocTitle.textContent = state.docTitle || 'Biodata';
  renderInvocation.textContent = state.invocation || '';
  
  if (state.symbolPreset === 'none') {
    renderSymbol.textContent = '';
    renderSymbol.classList.add('hidden');
  } else {
    renderSymbol.textContent = symbolIcons[state.symbolPreset] || '🕉️';
    renderSymbol.classList.remove('hidden');
  }

  if (state.photoPlacement === 'hidden') {
    renderPhotoContainer.classList.add('hidden');
  } else {
    renderPhotoContainer.classList.remove('hidden');
    if (state.photoUrl) {
      renderCandidatePhoto.src = state.photoUrl;
      renderCandidatePhoto.classList.remove('hidden');
      photoPlaceholder.classList.add('hidden');
    } else {
      renderCandidatePhoto.src = '';
      renderCandidatePhoto.classList.add('hidden');
      photoPlaceholder.classList.remove('hidden');
    }
  }

  renderTable(renderPersonalTable, state.personalDetails);
  renderTable(renderFamilyTable, state.familyDetails);
  renderTable(renderContactTable, state.contactDetails);
}

function renderTable(container, data) {
  container.innerHTML = '';
  data.forEach(item => {
    if (!item.label && !item.value) return;
    const row = document.createElement('div');
    row.className = 'data-row';
    row.innerHTML = `
      <div class="data-label">${escapeHtml(item.label)}</div>
      <div class="data-colon">:</div>
      <div class="data-value">${escapeHtml(item.value)}</div>
    `;
    container.appendChild(row);
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

/**
 * Export 2.2x High-Resolution PNG
 */
async function exportHighResPNG() {
  exportModal.classList.remove('hidden');

  try {
    const targetElement = document.getElementById('biodataPaper');

    // Temporarily reset any mobile scale transform for accurate capture
    const originalTransform = targetElement.style.transform;
    targetElement.style.transform = 'none';

    const canvas = await html2canvas(targetElement, {
      scale: 2.2,
      useCORS: true,
      logging: false,
      backgroundColor: null,
      scrollX: 0,
      scrollY: 0
    });

    targetElement.style.transform = originalTransform;

    const link = document.createElement('a');
    const safeName = (state.personalDetails[0]?.value || 'Profile')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    link.download = `BioData_${safeName}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } catch (error) {
    console.error('Export failed:', error);
    alert('An error occurred during PNG generation.');
  } finally {
    exportModal.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', init);
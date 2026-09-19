/**
 * BioData Profile Maker Engine
 */

// Initial Data Structure
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
    { label: 'Full Name', value: 'Jay Ramesh Sharma' },
    { label: 'Date of Birth', value: '15/08/1997' },
    { label: 'Height', value: '5 ft 8 in (172 cm)' },
    { label: 'Place of Birth', value: 'Pune, Maharashtra' },
    { label: 'Religion / Caste', value: 'Hindu - Maratha (96 Kuli)' },
    { label: 'Gotra', value: 'Kashyap' },
    { label: 'Complexion', value: 'Fair' },
    { label: 'Higher Education', value: 'B.Tech in Computer Engineering' },
    { label: 'Occupation / Job', value: 'Senior Software Engineer' },
    { label: 'Annual Income', value: '18 LPA' }
  ],
  familyDetails: [
    { label: "Father's Name", value: 'Ramesh Balwant Sharma' },
    { label: "Father's Profession", value: 'Retired Central Govt. Officer' },
    { label: "Mother's Name", value: 'Sunita Ramesh Sharma' },
    { label: "Mother's Profession", value: 'Homemaker' },
    { label: 'Brothers', value: '1 Younger Brother (Pursuing MBA)' },
    { label: 'Sisters', value: '1 Elder Sister (Married)' },
    { label: 'Native Place', value: 'Satara, Maharashtra' }
  ],
  contactDetails: [
    { label: 'Contact Number', value: '+91 98765 43210' },
    { label: 'WhatsApp Number', value: '+91 98765 43210' },
    { label: 'Email Address', value: 'jay.sharma.contact@email.com' },
    { label: 'Residential Address', value: 'Flat 402, Shivneri Heights, Baner Road, Pune - 411045' }
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
  bindFormInputs();
  bindActionButtons();
  renderFormFields();
  renderCanvas();
}

/**
 * Render Dynamic Form Fields for Personal, Family & Contact
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
    row.className = 'flex items-center gap-2 text-xs';
    row.innerHTML = `
      <input type="text" value="${item.label}" data-sec="${sectionKey}" data-idx="${index}" data-type="label" placeholder="Field Name" class="w-1/3 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500" />
      <input type="text" value="${item.value}" data-sec="${sectionKey}" data-idx="${index}" data-type="value" placeholder="Field Value" class="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-amber-500" />
      <button type="button" data-sec="${sectionKey}" data-idx="${index}" class="btnDeleteField text-slate-500 hover:text-rose-400 p-1">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    container.appendChild(row);
  });

  // Attach event listeners to newly rendered input boxes
  container.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', handleFieldChange);
  });

  // Attach event listeners to delete buttons
  container.querySelectorAll('.btnDeleteField').forEach(btn => {
    btn.addEventListener('click', handleDeleteField);
  });
}

/**
 * Event Handlers for Field Updates
 */
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
  // Theme Color
  themeColorInput.addEventListener('input', (e) => {
    state.themeColor = e.target.value;
    themeColorHex.textContent = e.target.value;
    renderCanvas();
  });

  // Border Preset
  borderPresetSelect.addEventListener('change', (e) => {
    state.borderPreset = e.target.value;
    renderCanvas();
  });

  // Background Preset
  bgPresetSelect.addEventListener('change', (e) => {
    state.bgPreset = e.target.value;
    renderCanvas();
  });

  // Symbol Preset
  symbolPresetSelect.addEventListener('change', (e) => {
    state.symbolPreset = e.target.value;
    renderCanvas();
  });

  // Invocation & Title
  invocationInput.addEventListener('input', (e) => {
    state.invocation = e.target.value;
    renderCanvas();
  });

  docTitleInput.addEventListener('input', (e) => {
    state.docTitle = e.target.value;
    renderCanvas();
  });

  // Photo Placement
  photoPlacementSelect.addEventListener('change', (e) => {
    state.photoPlacement = e.target.value;
    renderCanvas();
  });

  // Image Upload Handling
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

  // Add Field Buttons
  document.querySelectorAll('.btnAddField').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = btn.dataset.section;
      const keyMap = {
        personal: 'personalDetails',
        family: 'familyDetails',
        contact: 'contactDetails'
      };
      state[keyMap[sec]].push({ label: 'New Field', value: 'Value' });
      renderFormFields();
      renderCanvas();
    });
  });
}

/**
 * Bind Action Buttons: Sample, Print, Export
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
  // 1. Apply Theme Color Variable
  document.documentElement.style.setProperty('--theme-color', state.themeColor);

  // 2. Apply Border Classes
  biodataPaper.className = `biodata-paper relative text-slate-900 border-${state.borderPreset} bg-${state.bgPreset}`;

  // 3. Render Header
  renderDocTitle.textContent = state.docTitle || 'Biodata';
  renderInvocation.textContent = state.invocation || '';
  
  if (state.symbolPreset === 'none') {
    renderSymbol.textContent = '';
    renderSymbol.classList.add('hidden');
  } else {
    renderSymbol.textContent = symbolIcons[state.symbolPreset] || '🕉️';
    renderSymbol.classList.remove('hidden');
  }

  // 4. Candidate Photo Rendering
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

  // 5. Render Detail Tables
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
 * Export 2x HD PNG via html2canvas
 */
async function exportHighResPNG() {
  exportModal.classList.remove('hidden');

  try {
    const targetElement = document.getElementById('biodataPaper');

    const canvas = await html2canvas(targetElement, {
      scale: 2.2, // 2.2x pixel ratio for sharp print-grade quality
      useCORS: true,
      logging: false,
      backgroundColor: null,
      scrollX: 0,
      scrollY: 0
    });

    const link = document.createElement('a');
    const safeName = (state.personalDetails[0]?.value || 'Matrimonial')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();
    link.download = `BioData_${safeName}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } catch (error) {
    console.error('Failed to generate PNG export:', error);
    alert('An error occurred during PNG generation. Check console for details.');
  } finally {
    exportModal.classList.add('hidden');
  }
}

// Start application on DOM Ready
document.addEventListener('DOMContentLoaded', init);
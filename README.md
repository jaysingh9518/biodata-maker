# BioData Forge - Matrimonial Bio-Data Profile Maker

An interactive, responsive single-page web application to create, customize, and export traditional and modern Indian matrimonial biodata profiles as high-resolution PNG images or print-ready PDFs.

![BioData Maker Preview](https://raw.githubusercontent.com/placeholder/preview.png)

## ✨ Features

- **Standard Indian Matrimonial Layout**: Complete with religious invocations, auspicious symbols, candidate photo frame, and dual-column aligned detail tables.
- **Predefined Ornate Borders**:
  - Royal Ornate Corner (Filigree corner vectors)
  - Double Gold & Filigree Frame
  - Paisley Ethnic Frame
  - Modern Geometric Frame
  - Classic Box Frame
- **Background & Watermark Presets**:
  - Centered Lord Ganesha Watermark
  - Centered Mandala Watermark
  - Parchment Texture, Ivory Cream, Pastel Peach, Soft Rosewater, and Minimal White
- **Dynamic Field Builder**: Add, edit, or remove custom fields for Personal, Family, and Contact details on the fly.
- **Photo Upload**: Client-side image upload and preview with placement toggles.
- **High-Definition PNG Export**: Generates 2.2x scale, print-quality PNG downloads using `html2canvas`.
- **Direct Print / PDF**: Dedicated `@media print` stylesheets configured for standard A4 paper size.
- **Zero Build Tools Required**: Pure HTML5, Tailwind CSS CDN, and vanilla ES6 JavaScript.

## 🚀 Quick Start (Local Run)

No `npm install` or bundler required.

1. Clone this repository:
   ```bash
   git clone [https://github.com/your-username/biodata-maker.git](https://github.com/your-username/biodata-maker.git)
   cd biodata-maker
   ```
2. Open `index.html` directly in any web browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

## 🌐 Deploy to GitHub Pages (1-Click)

1. Push this repository to GitHub.
2. Go to your repository **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## 🛠️ Tech Stack

- **Markup**: HTML5
- **Styling**: Tailwind CSS (CDN) + Custom CSS3 Borders
- **Icons & Typography**: Font Awesome 6, Google Fonts (Cinzel, Lora, Poppins)
- **Export Engine**: `html2canvas` 1.4.1

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
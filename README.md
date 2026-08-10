# 🎓 Academic Calculator

A modern, responsive **Academic Calculator** web application designed to help students quickly calculate their **12th Cut-off, SGPA, and CGPA** with a clean and user-friendly interface.

The application provides accurate academic calculations along with useful features such as calculation history, PDF export, result sharing, printing, performance indicators, and animated visualizations.

## 🚀 Features

### 📊 12th Cut-off Calculator

* Calculate 12th-standard engineering cut-off marks.
* Supports Mathematics, Physics, and Chemistry marks.
* Formula:

```text
Cut-off = Mathematics + (Physics / 2) + (Chemistry / 2)
```

* Displays:

  * Final Cut-off
  * Percentage
  * Subject-wise marks
  * Performance level
* Copy result
* Download result as PDF
* Share result
* Print result
* Calculation history
* Sample marks option
* Reset functionality

### 📚 SGPA Calculator

* Add multiple subjects dynamically.
* Enter:

  * Subject name
  * Credits
  * Grade Point
* Formula:

```text
SGPA = Σ(Credit × Grade Point) / Σ(Credits)
```

* Displays:

  * Final SGPA
  * Total Credits
  * Total Credit Points
  * Performance level
* Animated circular SGPA progress.
* Copy result.
* Download PDF.
* Share result.
* Print result.
* Calculation history.
* Add/remove subjects.
* Sample subject data.

### 🎯 CGPA Calculator

* Add multiple semesters dynamically.
* Enter semester name and SGPA.
* Calculates average CGPA.
* Displays:

  * Average CGPA
  * Percentage
  * Performance level
* Animated circular CGPA progress.
* Copy result.
* Download PDF.
* Share result.
* Print result.
* Calculation history.
* Add/remove semesters.
* Sample semester data.

## ✨ UI & User Experience

* Modern and clean interface.
* Responsive design for desktop, tablet, and mobile.
* Light and dark mode support.
* Animated components and transitions.
* Interactive buttons and cards.
* Toast notifications for user actions.
* Progress indicators.
* Easy-to-use navigation.
* Accessible and intuitive form inputs.

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **JavaScript**
* **HTML5**
* **Tailwind CSS**

### Libraries

* **React Router** – Application routing
* **Framer Motion** – Animations
* **React Icons** – Icons
* **React Hot Toast** – Notifications
* **html2canvas** – Capturing result sections
* **jsPDF** – PDF generation

### Build Tool

* **Vite**

The project uses React 19, Vite, Tailwind CSS, Framer Motion, React Router, jsPDF, html2canvas, and other frontend libraries.

## 📁 Project Structure

```text
Academic-Calculator/
│
├── src/
│   ├── components/
│   │   ├── Navbar
│   │   ├── Sidebar
│   │   ├── Footer
│   │   ├── ResultCard
│   │   ├── ProgressBar
│   │   ├── CircularProgress
│   │   └── CalculationHistory
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── CutoffCalculator
│   │   ├── SgpaCalculator
│   │   ├── CgpaCalculator
│   │   └── About
│   │
│   ├── utils/
│   │   ├── cutoffFormula
│   │   ├── sgpaFormula
│   │   ├── cgpaFormula
│   │   ├── validation
│   │   ├── performance
│   │   ├── pdfGenerator
│   │   └── calculationHistory
│   │
│   └── App.jsx
│
├── public/
├── package.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nathin78/Academic-Calculator.git
```

### 2. Navigate to the project

```bash
cd Academic-Calculator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown in your terminal.

## 🏗️ Build for Production

```bash
npm run build
```

## 👀 Preview Production Build

```bash
npm run preview
```

## 🧮 Calculation Examples

### 12th Cut-off

For:

```text
Mathematics = 90
Physics     = 85
Chemistry   = 88
```

Calculation:

```text
90 + (85 / 2) + (88 / 2)
= 176.50
```

### SGPA

Example:

```text
Mathematics → 4 Credits × 9 Grade Point
Physics     → 3 Credits × 8 Grade Point
Programming → 4 Credits × 10 Grade Point
```

The application calculates the weighted average based on credits.

### CGPA

Example:

```text
Semester 1 → 8.2
Semester 2 → 8.7
Semester 3 → 9.1
```

The application calculates the average SGPA to produce the CGPA.

## 💾 Calculation History

The application stores previous calculations locally in the browser, allowing users to view their previous:

* Cut-off calculations
* SGPA calculations
* CGPA calculations

Users can also clear their calculation history.

## 📄 Result Export

Users can manage their results through:

* 📋 Copy
* 📥 Download PDF
* 📤 Share
* 🖨️ Print

## 🎯 Project Purpose

The main goal of this project is to provide students with a **single, simple platform for common academic calculations**.

Instead of manually calculating marks, credits, SGPA, or CGPA, students can enter their academic information and receive instant results.

## 🔮 Future Enhancements

Possible future improvements include:

* [ ] GPA to percentage conversion options
* [ ] University-specific grading systems
* [ ] Semester-wise academic reports
* [ ] Student profile management
* [ ] Cloud-based calculation history
* [ ] User authentication
* [ ] College admission prediction
* [ ] Rank prediction
* [ ] More academic calculators
* [ ] Progressive Web App (PWA) support
* [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push the branch.

```bash
git push origin feature/new-feature
```

6. Create a Pull Request.

## 📜 License

This project is open-source and available for educational and personal use.
---

⭐ If you find this project useful, consider giving the repository a star!

**Academic Calculator — Making academic calculations simple, fast, and accessible.**

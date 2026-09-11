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

## 🏗️ Build for Production

```bash
npm run build
```

## 👀 Preview Production Build

```bash
npm run preview
```
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

## 📜 Licens

⭐ If you find this project useful, consider giving the repositor

**Academic Calculator — Making academic calculations simple, fast, and accessible.**

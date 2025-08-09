# 🛍️ MeeshoLite Personalizer

A lightweight, intelligent product feed engine that personalizes shopping experiences based on **language**, **region**, **budget**, and **user interests** — all without login or backend.

Built with **React + TypeScript + Zustand + Tailwind CSS**, this project simulates the kind of smart personalization used by leading Indian e-commerce platforms like **Meesho** and **Flipkart Lite**.

---

## 🚀 Features

- **🎯 Smart Feed Reranking**  
  Reorders products using a score-based logic:  
  - Region Match → +10  
  - Language Match → +8  
  - Liked Category → +2  
  - Budget-Friendly → +2  

- **🧠 State Management with Zustand**  
  Centralized session tracking for user preferences.

- **💾 Persistent LocalStorage**  
  Keeps preferences saved even after refresh or reload.

- **🖼️ Modern Responsive UI**  
  Built using **Tailwind CSS**, works seamlessly on mobile and desktop.

- **⚙️ Interactive Preferences Panel**  
  Choose language, region, and budget with live feed updates.

- **❤️ Like/Unlike Categories**  
  Boosts category relevance in the ranking.

- **🔍 Real-time Search Filtering**  
  Instantly filter products by name.

- **✅ No Login Required**  
  All personalization is handled in-browser.

---

## 🛠️ Tech Stack

**Frontend:**  
- React + TypeScript + Vite  
- Zustand (State Management)  
- Tailwind CSS (UI Styling)

**Data & Storage:**  
- localStorage (Persistence without Backend)

**Hosting & Deployment:**  
- GitHub (Version Control)  
- Vercel (Frontend Hosting)

---

## 📦 Installation & Setup

```bash
# Clone this repository
git clone https://github.com/Tamanna125/MeeshoLite-Personalizer.git

# Navigate into the project folder
cd MeeshoLite-Personalizer

# Install dependencies
npm install

# Start development server
npm run dev

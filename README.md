# 🛍️ MeeshoLite Personalizer

A lightweight, intelligent product feed engine that personalizes shopping experiences based on **language**, **region**, **budget**, and **user interests** — all without login or backend.

Built with **React + TypeScript + Zustand + Tailwind CSS**, this project simulates the kind of smart personalization used by leading Indian e-commerce platforms like **Meesho** and **Flipkart Lite**.

---

## ❓ Problem This App Solves

Indian e-commerce users often deal with:

- Irrelevant product suggestions
- Products in the wrong **language**
- Results far beyond their **budget**
- Lack of **hyperlocal relevance**

Most platforms rely on backend-powered recommendation engines and login-based tracking.

---

## ✅ How MeeshoLite Personalizer Solves It

**No login. No backend. Just smart UI logic.**

The app dynamically adapts the product feed based on:
- 🌐 **Region**
- 🗣️ **Language**
- 💸 **Budget**
- ❤️ **Liked Categories**
- 🔍 **Search Term**

Using a scoring algorithm, it reranks products instantly based on match strength — simulating personalized recommendations on the frontend.

> 🧠 “Login ki zarurat nahi — app ko turant samajh aa jaata hai aapko kya chahiye.”

---

## 🚀 Features

- 🎯 **Smart Feed Reranking**  
  Reorders products using a score-based logic:
  - Region Match → +10
  - Language Match → +8
  - Liked Category → +2
  - Budget-Friendly → +2

- 🧠 **State Management with Zustand**  
  Centralized session tracking for user preferences

- 💾 **Persistent LocalStorage**  
  Keeps preferences saved even after refresh or reload

- 🖼️ **Modern Responsive UI**  
  Built using **Tailwind CSS**, works seamlessly on mobile and desktop

- ⚙️ **Interactive Preferences Panel**  
  Choose language, region, and budget with live feed updates

- ❤️ **Like/Unlike Categories**  
  Boosts category relevance in the ranking

- 🔍 **Real-time Search Filtering**  
  Instantly filter products by name

- ✅ **No Login Required**  
  All personalization is handled in-browser

---

## 📦 Tech Stack

| Tech             | Purpose                       |
|------------------|-------------------------------|
| React            | Frontend Framework            |
| TypeScript       | Static Typing                 |
| Tailwind CSS     | Responsive Styling            |
| Zustand          | Lightweight State Management  |
| localStorage     | Persistence without Backend   |
| Vercel           | Deployment                    |

---

## 🧠 How Reranking Works

```ts
score += regionMatch ? 10 : 0;
score += languageMatch ? 8 : 0;
score += likedCategoryMatch ? 2 : 0;
score += withinBudget ? 2 : 0;


Installation & Setup
Follow these steps to run MeeshoLite Personalizer locally on your machine:

bash
Copy
Edit
# Clone this repository
git clone https://github.com/Tamanna125/MeeshoLite-Personalizer.git

# Navigate into the project folder
cd MeeshoLite-Personalizer

# Install dependencies
npm install

# Start development server
npm run dev
Once started, open http://localhost:5173 in your browser to view the app.

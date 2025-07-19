# 🛍️ MeeshoLite Personalizer

A smart, lightweight personalized shopping feed built with **React + TypeScript + Tailwind CSS**.  
Inspired by Meesho's hyperlocal strategy, this app personalizes product listings based on:

- 🌐 **Region**
- 🗣️ **Language**
- 💸 **Budget**
- ❤️ **Liked Categories**
- 🔍 **Search Queries**

---

## 🚀 Features

- 🎯 **Smart Feed Reranking**  
  Products are scored and ranked using:
  - Region match (+10)
  - Language match (+8)
  - Budget match (+2)
  - Liked categories (+2)

- 🧠 **Zustand Store** for real-time session data
- 🖼️ **Tailwind UI** — fully responsive, modern design
- 📊 **Dynamic Preferences Panel**  
  Instant updates to feed based on user selection
- 💬 **Search Bar** with live filtering
- 💾 **LocalStorage Sync** — preferences saved across sessions

---

## 📦 Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS**
- **Zustand** (state management)
- **localStorage** for persistence

---

## 🧠 How Personalization Works

Each product is scored based on the user’s preferences.  
A perfect match (region + language + budget) ranks highest.

```ts
score += regionMatch ? 10 : 0;
score += languageMatch ? 8 : 0;
score += likedCategoryMatch ? 2 : 0;
score += withinBudget ? 2 : 0;

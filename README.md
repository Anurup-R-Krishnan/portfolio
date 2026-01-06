# Anurup R Krishnan | Portfolio

A modern, high-performance developer portfolio built with React, Tailwind CSS, and Framer Motion. Designed with a "Sleek & Serious" aesthetic, it features fluid typography, a refined dark mode ("AMOLED" theme), and responsive layouts.

![Portfolio Home Desktop](/home/anuruprkris/.gemini/antigravity/brain/38dc44ce-4cfa-4c43-880f-b1a48a2666a4/desktop_view_final_1767683050340.png)

## Features

- **🎨 Modern Design**: Custom "Neo-Sleek" design system with glassmorphism and subtle animations.
- **🌗 Dark Mode**: Full dark mode support with an AMOLED-friendly color palette.
- **📱 Fully Responsive**: Fluid typography using `clamp()` ensures perfect scaling from mobile (320px) to desktop.
- **⚡ High Performance**: Built with Vite and local Tailwind CSS for lightning-fast loads.
- **📄 Resume Integration**: Direct PDF download functionality.
- **🔧 Mock Mode**: Built-in fallback to mock data if backend services (Firebase/EmailJS) are not configured.

## Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Services**: Firebase (optional), EmailJS (optional)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run local server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).

3. **Build for production**
   ```bash
   npm run build
   ```

## Environment Configuration (Optional)

The application runs in **Mock Mode** by default. To enable live data (Projects, Skills) and the Contact Form, configure the following environment variables:

- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_EMAILJS_PUBLIC_KEY`
- *(See `services/firebase.ts` for full list)*

## Screenshots

| Mobile View | About Page |
|:---:|:---:|
| <img src="/home/anuruprkris/.gemini/antigravity/brain/38dc44ce-4cfa-4c43-880f-b1a48a2666a4/home_mobile_1767678851141.png" width="300" /> | <img src="/home/anuruprkris/.gemini/antigravity/brain/38dc44ce-4cfa-4c43-880f-b1a48a2666a4/about_page_with_button_1767678902685.png" width="400" /> |

---
*Created by Anurup R Krishnan*

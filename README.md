# Laksh Mahajan — Personal Portfolio & Creative Universe

> **Aspiring AI Engineer • Creative Technologist • Music Producer (Raktaan) • Author (MJ World)**  
> Live Website: [https://laksh-mjn.github.io/LAKSH/](https://laksh-mjn.github.io/LAKSH/)

---

## ⚔️ Overview

This is the official personal portfolio and creative universe of **Laksh Mahajan**. Engineered with high-performance React 19, Vite, Tailwind CSS, Framer Motion, and hardware-accelerated Canvas rendering, the site delivers a cinematic 120fps storytelling journey combining technical engineering, literary fiction, verified industry certifications, and Spotify music production.

---

## ✨ Features & Architecture

- **Cinematic 3D Katana Scrubbing Engine**:
  - 300 sequential keyframes rendered via hardware-accelerated HTML5 Canvas with sub-pixel interpolation, smooth lerping, and dynamic camera panning.
  - Multi-depth floating cherry blossom petals and atmospheric mist particles.
  - 3-tier keyframe preloader for 0ms initial render latency and instant scrubbing.
- **Whole-Website Glassmorphism**:
  - Apple-grade frosted glass panels (`backdrop-filter: blur(28px) saturate(180%)`) with specular top borders and ambient katana luminescence showing through.
- **Dedicated Sub-Universe Explorations**:
  - **Certifications Vault (19 Verified Credentials)**: Filterable credential matrix covering Anthropic Claude 101, OpenAI AI Foundations, IBM (AI Agents, RAG, LLMs, Bob), and Microsoft Learning.
  - **MJ World (Novel Universe)**: Literary fiction portal featuring psychological thrillers (*Shadows of Tomorrow*, *Echoes of the Unspoken*, *The Silent Horizon*), interactive chapter excerpt readers, and manuscript submission interface.
  - **Raktaan World (Spotify Verified Artist)**: Discography showcase for 7 official single releases (*Panna*, *Jaan*, *Chuwaa*, *Paarwana*, *Khwaab*, *Motions*, *Midnight*), synced Spotify streaming players, and lyricism analysis.
- **Cross-Platform Mobile Performance**:
  - Adaptive DPR (Device Pixel Ratio) capping (`1.0` on mobile, `1.5` on desktop) preventing GPU throttling on 3x Retina displays.
  - Dynamic `100dvh` viewport calculations preventing layout shifts on mobile Safari / Chrome.
  - Touch-device physics bypass on CPU-intensive spring animations.
  - Full `prefers-reduced-motion` accessibility support.
- **Production Security Suite**:
  - Content Security Policy (CSP), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
  - Comprehensive input sanitization, XSS payload stripping, control character filtering, and RFC-compliant email validation.
  - Sandboxed Spotify iframes with `allow-scripts allow-same-origin`.
- **Search Engine Optimization (SEO)**:
  - Canonical links, OpenGraph metadata, Twitter Cards, `robots.txt`, `sitemap.xml`, and Google JSON-LD Person schema.

---

## 🛠️ Tech Stack

- **Core**: React 19, JavaScript (ESNext), Vite 8
- **Styling**: Tailwind CSS 4, Custom CSS Design System, Glassmorphism Engine
- **Animation & Motion**: Framer Motion 13, HTML5 Canvas 2D Engine
- **Icons**: Lucide React
- **Code Quality**: Oxlint
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### Installation

```bash
# Clone the repository
git clone https://github.com/Laksh-mjn/LAKSH.git

# Navigate into project directory
cd LAKSH

# Install dependencies
npm install
```

### Local Development

```bash
# Start Vite development server
npm run dev
```

The application will be accessible at `http://localhost:5173/LAKSH/`.

### Production Build & Linting

```bash
# Run Oxlint for code quality and hook rules
npm run lint

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Deployment to GitHub Pages

```bash
# Build and publish directly to gh-pages branch
npm run deploy
```

---

## 🔒 Security Audit & Best Practices

- **Zero Hardcoded Secrets**: Scanned and verified with zero API keys, tokens, or credentials in client bundles.
- **Safe Environment Templates**: Configured `.env.example` and locked `.gitignore`.
- **Protected Contact Pipeline**: Prepares and routes inquiries through mailto protocols without intermediate untrusted proxies.

---

## 📄 License & Attribution

Designed and created by **Laksh Mahajan**.  
All rights reserved © 2026.

# Retro-Meme Lunar New Year Card 🐍

A single-file React application with a brutalist **Windows 95 / MS Paint** aesthetic for Lunar New Year 2026.

## 🚀 Run the App

```bash
npm run dev
```

Visit: **http://localhost:5173/**

## 🎯 Features

### 1. Custom Messages via URL
- **Default**: `http://localhost:5173/`
- **For BCH**: `?id=bch`
- **For Crush**: `?id=crush`  
- **For Hội Ế**: `?id=hoie`

### 2. Fortune Card Game
- Click "BẮT ĐẦU CHƠI" to start
- Flip cards to reveal your fortune
- Get confetti celebration! 🎉

### 3. Brutalist Design
- ✅ Jarring neon colors (#FF0000, #FFFF00, #000000)
- ✅ Thick 4px black borders everywhere
- ✅ Hard shadows (no blur)
- ✅ Press Start 2P pixel font
- ✅ Giant emojis instead of icons
- ✅ "Bựa" (meme/ugly) aesthetic

## 📁 File Structure

```
src/
├── App.jsx          # All logic & data (single-file!)
├── App.css          # 3D card flip styles
└── index.css        # Tailwind + fonts
```

## 🎨 Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- canvas-confetti

## 💡 Tips

- Customize `WISHES` object in `App.jsx` to add more messages
- Modify `CARD_RESULTS` to change fortune outcomes
- All data and logic stays in one file as required!

---

**Made with MS Paint vibes 🎨**  
*windows95.exe has stopped working*

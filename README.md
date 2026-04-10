# Veronika Bobuska — Portfolio Page

Personal portfolio website for Veronika Bobuska, event organizer based in Hünenberg, Switzerland.

**Live URL:** https://i-bobusky.github.io/veronika/

## Deploy to GitHub Pages

1. Make sure you're in the `veronika` repo on GitHub under the `i-bobusky` account.
2. Push this folder's contents to the `main` (or `master`) branch:

```bash
git init
git add .
git commit -m "Initial portfolio page"
git remote add origin https://github.com/i-bobusky/veronika.git
git push -u origin main
```

3. Go to **Settings → Pages** in the repo, set source to `main` branch, root `/`.
4. The site will be live at `https://i-bobusky.github.io/veronika/` within a minute or two.

## Adding Images

Place the following images in the `images/` folder, then in `index.html`:

| File | Used in | Recommended aspect ratio |
|------|---------|--------------------------|
| `images/veronika.jpg` | Hero background + portrait | Portrait (3:4 or 2:3) |
| `images/halloween.jpg` | Gallery — left (large) | Landscape (4:3) |
| `images/ostern.jpg` | Gallery — right (small) | Portrait (3:4) |

For each image, find the corresponding `<!-- Replace with actual image -->` comment in the HTML, uncomment the `<img>` tag, and remove the placeholder `<div>` below it.

## Structure

```
veronika/
├── index.html       ← single-page site (all CSS/JS inline)
├── images/
│   ├── veronika.jpg
│   ├── halloween.jpg
│   └── ostern.jpg
└── README.md
```

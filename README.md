# eBike

A responsive, static landing page for the eBike web app. Built with plain HTML,
CSS, and JavaScript; no build tools or package installation are required.

## Run locally

Open `index.html` in a browser, or start a local server from this folder:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish on GitHub

Create an empty repository on GitHub, then run these commands from this folder
(replace the URL with your repository URL):

```sh
git init
git add .
git commit -m "Create eBike web app starter"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

To publish this static site with GitHub Pages, open the repository's **Settings
→ Pages** and choose the `main` branch and `/ (root)` as the source.

## Project files

- `index.html` — page content and metadata
- `styles.css` — responsive layout and visual styling
- `script.js` — mobile navigation and current-year footer
- `assets/ebike-hero.svg` — original bicycle illustration

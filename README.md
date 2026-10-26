# Rithvik Vadlamani, portfolio

Static site: plain HTML, CSS and a small JS file. No build step, no dependencies, fonts self-hosted.

## Preview locally

```bash
cd ~/portfolio
python3 -m http.server 8123
# open http://localhost:8123
```

## Edit content

- Everything lives in `index.html`. Each project is one `<article class="proj">`; to remove a project, delete its block.
- Start a project expanded by setting `aria-expanded="true"` on its `.proj-head` button.
- Resume PDFs are in `assets/resume/`. Replace the files (keep the names) to update the downloads.
- Colours, type and spacing tokens are at the top of `assets/style.css`. The site is dark only.

## Deploy free on GitHub Pages

1. Create a GitHub repo (public is required for Pages on a free account), e.g. `portfolio`, or `Rithvik-Vadlamani.github.io` for the root URL.
2. Push this folder:
   ```bash
   git remote add origin git@github.com:Rithvik-Vadlamani/portfolio.git
   git push -u origin main
   ```
3. Repo **Settings → Pages → Build and deployment**: Source "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. The site goes live at `https://rithvik-vadlamani.github.io/portfolio/` (or the root URL for a `.github.io` repo) within a minute or two. All asset paths are relative, so either works.

Everything committed to the repo is public. Local design notes (`PRODUCT.md`) are gitignored and never pushed.

## Notes

- Hardware figures (voltages, currents, impedances) are design targets and simulation results, as the project notes say. Keep that wording if you edit.
- Source of truth for experience, dates and metrics: the two resumes. No phone number or home address is on the site.

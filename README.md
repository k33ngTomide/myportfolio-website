# Portfolio: Sodiq Akintomide Muiliyu

Live: https://k33ngtomide.github.io/myportfolio-website/

Static HTML, CSS and JavaScript. No build step and no runtime dependencies.

## Structure

    index.html          Page content and SEO metadata
    404.html            GitHub Pages "not found" page
    css/styles.css      Theme tokens, components, layout, responsive rules
    js/theme.js         Applies the saved theme before first paint
    js/main.js          Theme toggle, mobile menu, navigation state, scroll reveal
    js/contact.js       Form validation and submission
    assets/             Fonts, images, icon sprite, favicons

## Run locally

    npm start           # then open http://localhost:5501

## Editing

- Text, projects and links are in `index.html`.
- Colours are CSS variables at the top of `css/styles.css`.
- To self-host the CV, add `assets/cv.pdf` and point the "Download CV" link to it.
- To remove the availability badge, delete the `.availability` paragraph in the hero.
- Icons are used as `assets/icons/sprite.svg#name`.

## Contact form

Messages go through [FormSubmit](https://formsubmit.co) to the address in the form.
The first submission from the live site sends an activation email to that address.
Click the link in it once, then submit again to confirm delivery.

## Deploy

GitHub Pages: Settings, Pages, "Deploy from a branch", `main`, `/ (root)`.
If the repository is renamed, update `/myportfolio-website/` in `404.html` and the
absolute URLs in `index.html` and `sitemap.xml`.

## Credits

Icons: Simple Icons, Font Awesome Free and Lucide. Fonts: Inter, Bricolage Grotesque
and JetBrains Mono (licences in `assets/fonts`).

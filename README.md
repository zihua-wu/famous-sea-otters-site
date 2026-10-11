# Famous Sea Otters

An interactive, responsive HTML/CSS/JS site celebrating sea otters, served with a small Express static server.

Originally Project 2 for INFO6150 (Web UI/UX Engineering).

## Pages

- `index.html` — home page with info panels (Holding Hands, Densest Fur on Earth, Tool-Using Mammals) and a responsive nav that collapses into a hamburger menu on small screens
- `cats.html` — "Famous Sea Otters" gallery (Kelp the Explorer, Aqua the Showstopper, Pip the Pup) with a `<dialog>`-based subscribe modal and JS-validated form (submits to `/subscribe`)

## Features

- Single shared `<dialog>` modal, opened from multiple "Subscribe" buttons
- JS-based form validation (no HTML `required`/`pattern`/`type="email"`)
- Adaptive breakpoint at 44rem; responsive at all other widths
- Skiplink, keyboard-navigable hamburger menu, accessible labels

## Running

```bash
npm install
node server.js
```

Then visit `http://localhost:3000/`.

## Credits

Image sources and licenses are listed in `licenses.txt`.

# LUNCHBOX™ Landing Page

A modern, mobile-first marketing landing page for the smart heated + cooled lunch box concept by **JK^2 Invesntions**.

## Structure

- `index.html` – Main landing page markup (includes updated branding: LUNCHBOX™ by JK^2 Invesntions).
- `assets/css/style.css` – Styles (mobile-first, responsive, glassy neo-tech aesthetic).
- `assets/js/main.js` – Interactive behavior (nav toggle, temperature simulation, form handling, modal).
- `assets/img/logo.svg` – Simple gradient logo.

## Features

- Mobile-first responsive layout.
- Sticky glass navigation with animated hamburger.
- Hero section with interactive heating/cooling simulation.
- Sections: How it Works, Technology, Specs, Early Access (lead capture form), Footer.
- Accessible focus states, ARIA attributes, semantic HTML.
- Progressive enhancement (modal <dialog>) with keyboard support.

## Customization

Search in code for TODO comments (add real video, connect form backend) if you expand functionality.

## Running Locally

Just open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari). No build step required.

Optional: to serve with a lightweight local server (avoids some browser restrictions & enables future expansion):

### PowerShell
```powershell
# Python 3 installed
python -m http.server 8000
# Then visit http://localhost:8000/
```

## Next Ideas

- Hook form to a backend (Netlify Forms, Firebase, Supabase, etc.).
- Add real product photography / 3D renders.
- Integrate email marketing (ConvertKit / Mailchimp API).
- Add analytics (privacy friendly: Plausible / Fathom).
- Dark/light theme toggle.
- Add PWA manifest + service worker for offline demo.

## License

You own the generated content. Attribution appreciated but not required. “LUNCHBOX” styling here uses the ™ symbol; replace with ® if/when a registered mark is secured. Company name rendered as `JK^2 Invesntions` (spoken “J K squared Invesntions”).

# PulseCare - Premium Frontend Healthcare Service Template

**PulseCare** is a responsive, highly accessible, and premium-quality website template designed for a **Mobile Flu Shot & Wellness Clinic Service**. Built with modern UI/UX principles, clean vanilla architecture, and zero external JS/CSS dependencies, it is fully optimized to serve as a high-fidelity template.

---

## 📂 Folder Structure

```
pulsecare-frontend/
│
├── index.html                  (Home Page 1: General Landing Page)
│
├── pages/                      (All sub-pages)
│   ├── home2.html              (Home Page 2: Corporate Wellness focus)
│   ├── about.html              (Narrative, Advisory Board, Milestones)
│   ├── services.html           (Filterable services directory grid)
│   ├── service-details.html    (Details pane focused on the Flu Vaccine)
│   ├── pricing.html            (Billing cycle pricing cards & comparative tables)
│   ├── faq.html                (Live searchable accordions)
│   ├── blog.html               (Blog feed layout + paginations)
│   ├── blog-details.html       (Typographic blog post and sidebar widgets)
│   ├── contact.html            (Emergency guidelines, contact sheets, and maps)
│   ├── login.html              (Auth floating forms & eye togglers)
│   ├── register.html           (Signup sheets & password strength bars)
│   ├── dashboard-user.html     (Patient Portal overview, tab selectors, superbills)
│   ├── dashboard-admin.html    (Console trackers, SVG line curves, CSS weekly bars)
│   ├── terms.html              (Standard Patient Agreement legal clauses)
│   ├── privacy.html            (HIPAA compliance parameters)
│   ├── 404.html                (Custom flatline healthcare-themed error page)
│   └── maintenance.html        (Live countdown construction screens)
│
└── assets/
    ├── css/
    │   ├── style.css           (Design tokens, typography tokens, resets, shared headers/footers)
    │   ├── responsive.css      (Media query boundaries for mobile/tablet)
    │   ├── animations.css      (Skeleton loaders, entry reveal hooks, spinners)
    │   ├── rtl.css             (Borders and spacing override mirror rules)
    │   └── dashboard.css       (Dashboard panels, metric charts, database tables)
    │
    └── js/
        ├── main.js             (Mobile sidebar triggers, accordions, pricing billing toggle)
        ├── theme.js            (Persisted Light/Dark mode trackers)
        ├── rtl.js              (Language mirror selectors)
        ├── validation.js       (Form floating selectors & regex tests)
        ├── dashboard.js        (Tab controllers & charts animations)
        └── loader.js           (Skeleton shimmer preloader hooks)
```

---

## 🎨 Design System & Colors

Powered entirely by standard CSS Custom Properties, fully persistent across page updates:

| Name | Variable | Light hex | Dark hex | Purpose |
|:---|:---|:---|:---|:---|
| **Primary** | `--primary` | `#2563eb` | `#2563eb` | Medical Brand blue / Core CTA |
| **Secondary**| `--secondary` | `#0f172a` | `#cbd5e1` | Deep text headings / Dark panels |
| **Accent** | `--accent` | `#14b8a6` | `#14b8a6` | Wellness turquoise highlights |
| **Background**| `--bg` | `#ffffff` | `#020617` | Global canvas color |
| **Surface** | `--surface` | `#f8fafc` | `#0b0f19` | Alternating section backgrounds |
| **Card** | `--surface-card` | `#ffffff` | `#0f172a` | Floating boxes canvas |
| **Text** | `--text` | `#1e293b` | `#e2e8f0` | Body typography |
| **Borders** | `--border` | `#cbd5e1` | `#1e293b` | Segment dividing lines |

---

## ⚙️ Interactive Functions

### ☀️ Light/Dark Mode
Toggled via standard buttons `.theme-toggle`.
- **System Preference Detection:** Standard matching checks: `window.matchMedia('(prefers-color-scheme: dark)')`.
- **Storage:** Persisted via `localStorage` values under key `theme: "dark"|"light"`.

### 🌍 Bidirectional Mirroring (`RTL` Arabic support)
Flip directions dynamically via `.lang-toggle` controls.
- Sets standard tag attribute `<html dir="rtl" lang="ar">`.
- Automatically adjusts margins, borders, and position coordinates symmetrical using layout overrides defined in `assets/css/rtl.css`.

### 🛡️ Client-Side Form Checks
Fully integrated validating fields under `.needs-validation` forms:
- **Floating Labels:** Form labels float upwards cleanly during input focus.
- **Strength indicators:** Calculates complexity levels for account signups.
- **Regular Expressions:** Active checks on:
  - Name: letters only, length checks.
  - Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
  - Tel: `/^\+?[0-9]{8,15}$/`

---

## ♿ Accessibility Compliance (WCAG 2.1 AA)

- **Semantic Layout:** Utilizing semantic HTML5 containers (`<header>`, `<main>`, `<section>`, `<footer>`, `<aside>`).
- **Tab Compliance:** Complete accessible outline focus rings visible during keyboards usage.
- **Visual Contrast:** High readability scores on color choices across dark and light canvases.

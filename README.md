# Workshop Registration System — Frontend

Frontend for **Project 3: Workshop Registration System** (Software Development Practice 2).
Members find workshops and register for them; admins manage workshops and every registration.

Built with Next.js 16 (App Router), NextAuth (credentials + JWT), Redux Toolkit + redux-persist,
MUI date picker and Tailwind CSS. It talks to the course backend
[PJ03-WorkshopRegist](https://github.com/SWDevPrac2-69-1/PJ03-WorkshopRegist).

## Features

| Area | What it does |
|---|---|
| Accounts | Register (name, email, tel, role, password), sign in, sign out |
| Workshops | Anyone can browse and search; admin can add, edit and delete |
| Registration cart | Member adds workshops to a cart (Redux), then confirms each one |
| My registrations | Member views, changes or deletes own registrations; admin sees and manages all |
| Profile & summary | Profile from `/auth/me` plus active registrations vs. the limit of 3 |
| Admin dashboard (extra) | `/dashboard`: upcoming workshops, active registrations, seats taken, full workshops, and a fill-rate table (registered / capacity, Open · Almost full · Full · Past) |
| Route protection | `/registrations`, `/cart`, `/dashboard` and the admin pages require sign-in (`src/proxy.ts`) |

The registration rules are enforced by the backend; the frontend shows its error message:

- workshop date cannot be before today (the date picker also disables past dates)
- registrations cannot exceed workshop capacity
- only one registration per workshop per member
- at most 3 active workshop registrations per member
- no registration after the workshop date

## Requirements

- Node.js 20 or later
- The backend running on `http://localhost:5000` with its own MongoDB connection

## Setup

### 1. Backend

```bash
git clone https://github.com/SWDevPrac2-69-1/PJ03-WorkshopRegist.git workshop-backend
cd workshop-backend
npm ci
```

Set `MONGO_URI` in `config/config.env` (the variable name must be exactly `MONGO_URI`) and make
sure your IP is allowed in MongoDB Atlas → Network Access. Then start it:

```bash
npm run dev
```

You should see `MongoDB Connected: ...`. API docs: http://localhost:5000/api-docs

### 2. Frontend

```bash
cd workshop-frontend
npm ci
cp .env.example .env.local   # then set NEXTAUTH_SECRET
npm run dev
```

Open http://localhost:3000

### First run

The database starts empty. Register an account with role **admin**, use **Add Workshop** to create
workshops, then register a second account with role **member** to try registering.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |

## Project structure

```text
interfaces.ts                 Shared types (WorkshopItem, RegistrationItem, CartItem)
src/
  app/
    page.tsx                  Home (Banner)
    (workshopinfo)/workshop/  Catalog + search, detail, new (admin), [wid]/edit (admin)
    registrations/            My registrations; manage/ uses @dashboard + @manage parallel routes
    cart/                     Registration cart
    signin/, signup/          Sign in / register pages
    api/auth/[...nextauth]/   NextAuth route
  components/                 Banner, TopMenu, ProductCard, WorkshopCatalog, WorkshopForm,
                              DateReserve, RegistrationCart, RegistrationList, ...
  libs/                       One function per backend call + authOptions + helpers (config.ts)
  redux/                      Store and cartSlice (persisted to localStorage)
  providers/                  NextAuth session provider and session types
  proxy.ts                    Sign-in guard for protected routes
public/img/                   Banner, card and logo images (SVG)
```

## Notes

- Workshop dates are stored as UTC midnight and shown as calendar dates in UTC.

## Deployments

- Frontend: https://sw-dev-prac-project-xi.vercel.app/
- Backend: https://swdevprac2-project-backend-two.vercel.app/
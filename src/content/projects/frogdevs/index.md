---
title: Frog Developers
description: A three-project delivery for my final course project. 
date: 2022-12-01
repoURL: https://github.com/FrogDevs
---

Frog Developers was my final course project at ETEC, delivered for a real business: Equilíbrio Natural. Instead of treating the project like a fictional assignment, we scoped it like a real product and shipped a small suite of projects that covered both internal operations and customer-facing needs.

The delivery included three projects:

- Cross-platform inventory control system (Windows, Linux, Android)  
- Customer website for business info and product availability  
- Team website presenting our identity, members, and delivered work  

> The story behind this project is in:  
> [Rebuilding after the pandemic — Part 2](/blog/rebuilding-after-the-pandemic-part-2)

## My role

Although this was a team project, I was responsible for all of the development.
  
## Projects

### Inventory Control

A multi-platform inventory system designed for daily internal operations: managing products, categories, and stores/units with a history log and expiration tracking.

#### Highlights
- Admin and visitor access modes
- CRUD for products + search
- Change history (audit-style log)
- Automatic expiration calculation
- Built to run on Windows, Linux, and Android

#### Stack
- Vue + Vite, TailwindCSS
- Vue Router, Pinia
- Firebase (Firestore)
- Electron + Capacitor (cross-platform packaging)

### Customer Website

A single-page website for customers with key business information, contact options, store lookup, and product availability.

#### Highlights
- Interactive sections/cards
- Email sending flow
- Store lookup + product availability
- Integration entry point to the app

#### Stack
- Vue + Vite, TailwindCSS
- Firebase (Firestore)
- Netlify (deployment)

### Team Website

The official Frog Developers website, focused on presenting the team and the work delivered during the project.

#### Highlights
- Light/dark themes
- Internationalization (multi-language)
- Modern landing layout

#### Stack
- Vue + Vite
- UnoCSS, VueUse
- Vue I18n

## Media

![[inventory-control-login.png]]
<p style="text-align: center;">Inventory control</p>

![[customer-website.png]]
<p style="text-align: center;">Customer website</p>

![[team-website.png]]
<p style="text-align: center;">Team website</p>

## What I learned

- Scope is everything: a smaller, well-defined product ships faster and better.
- A consistent design system improves both UX and dev speed.
- Performance comes from details (bundling, image formats, loading strategy).
- Presentation is part of the product—how you communicate the work matters.

---

### References

- [Inventory Control](https://github.com/FrogDevs/equilibrionatural-controle_estoque)
- [Customer Website](https://github.com/FrogDevs/equilibrionatural-website)
- [Team Website](https://github.com/FrogDevs/website/tree/b9a5b0ddc5e954f5d8b3883dc3914f463f95f11b)
# City Pharma and Diagnostic Centre

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- 6-page responsive medical website for CITY PHARMA AND DIAGNOSTIC CENTRE, Bundu, Jharkhand
- Page 1: Home/Landing — ECG heartbeat animation, floating medical icons, animated service cards, CTA buttons, contact strip
- Page 2: Medicine Services — floating capsule/strip animation, prescription upload form (name, mobile, prescription file, date, time, delivery timing, address)
- Page 3: Pathology Services — lab animation, full blood test rate list (70+ tests), urine/microbiology list, booking form with multi-select tests, home/visit option
- Page 4: Ultrasound Services — scan wave animation, 8 service prices, booking form
- Page 5: Doctor Consultant — ECG/silhouette animation, 10 doctors with specializations, appointment booking form
- Page 6: Contact Us — animated map pin/icons, address, phones, email, working hours
- Sticky navigation bar with smooth transitions between pages
- English / Hindi language toggle (bilingual content for key labels and headings)
- Color palette: Blue (#1e40af), Teal (#0d9488), Green (#16a34a), White, with Orange/Red (#f97316/#dc2626) highlights
- All booking forms are frontend-only (store submissions locally or show success confirmation)
- Animated backgrounds per page using CSS/SVG/Canvas animations
- Hover effects, card animations, smooth scroll

### Modify
- None (new project)

### Remove
- None

## Implementation Plan
1. Backend: Store booking form submissions (medicine orders, pathology bookings, ultrasound bookings, doctor appointments) with read capability for admin review
2. Frontend:
   - App shell with sticky nav, language context (EN/HI), page routing
   - HomePage: ECG SVG animation, floating icons, service cards, CTA buttons
   - MedicinePage: animated background, prescription form with file upload
   - PathologyPage: lab animation, searchable/filterable test rate table, booking form
   - UltrasoundPage: wave animation, pricing cards, booking form
   - DoctorsPage: doctor cards with specialization, appointment form
   - ContactPage: animated icons, address/hours, Google Maps embed area
   - Shared footer with contact info

## UX Notes
- Mobile-first layout; all forms must work on small screens
- Language toggle switches headings, labels, CTAs between English and Hindi
- Booking forms show a success toast/modal on submit (no backend email required)
- Pathology test list should be searchable with a filter input
- Service cards on home page animate on hover (lift + glow)
- ECG line animates continuously across the hero section
- Trust badges ("NABL Accredited", hygiene icons) where appropriate

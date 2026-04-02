# Copilot Instructions - Online Medical System

## Project Overview
A role-based virtual healthcare web application with four isolated workspaces: **Admin**, **Doctor**, **Patient**, and **Pharmacist**. Each role has unique permissions, dashboards, and workflows. Authentication is individual-user based (not role-based), enabling data isolation per person.

## Architecture Essentials

### State Management Pattern
- **Central state in `App.jsx`** using React hooks (`useState`, `useMemo`, `useEffect`)
- No external state library; state passed via props to feature components (leaf node prop drilling)
- **localStorage for persistence** via utility functions defined in App.jsx:
  - `getStoredValue(key, fallback)` - retrieves and parses JSON safely
  - `setStoredValue(key, value)` - serializes and persists to localStorage
  - `removeStoredValue(key)` - cleans up storage
- **STORAGE_KEYS object** defines all localStorage keys to avoid magic strings (e.g., `oms.currentUser`, `oms.appointments`)

### Authentication & Authorization
- **Login flow**: Email/password validated against `userCredentials` in [src/constants/data.jsx](src/constants/data.jsx)
- **Individual credentials** per staff member (not role-based shared accounts); see [CREDENTIALS.md](CREDENTIALS.md)
- **Critical fix**: On successful login, `handleLogin()` must save state to localStorage (see [DASHBOARD_ACCESS_FIX.md](DASHBOARD_ACCESS_FIX.md) for implementation details)
- **Route guards**: `withRoleGuard()` HOC checks localStorage for `activeRole` before rendering protected dashboards
- **Logout cleanup**: `handleLogout()` must remove auth keys from storage and reset `activeRole` to 'patient'

### Role Constants (App.jsx top-level)
- `ROLE_PATHS`: Map roles to their default dashboard routes (`/admin/dashboard`, `/doctor/dashboard`, etc.)
- `ROLE_COLORS`: Tailwind classes per role for consistent theming (purple for admin, blue for doctor, emerald for patient, amber for pharmacist)
- `ROLE_MENUS`: Quick links and section labels for role-specific navigation
- `ROLE_TITLES`: Display titles for dashboard headers
- Use these instead of hardcoding strings throughout components

### Data Models (defined in src/constants/data.jsx)
- **Users**: `id`, `name`, `role`, `status` (Active/Pending), `contact`
- **Appointments**: `id`, `patient`, `doctor`, `date`, `time`, `reason`, `status`, `meetingLink`, `consultationNote`
- **Prescriptions**: `id`, `patient`, `doctor`, `medications` (array), `issueDate`, `status`, etc.
- **Records/Labs**: `id`, `patient`, `type`, `date`, `status`, `url` (for uploads)
- **Platform Settings**: Centralized config for system behavior (stored in localStorage)

## Component Patterns

### Feature Components
Located in [src/features/](src/features/) - these are role-specific panels that receive state/handlers as props:
- `AdminPanel`, `DoctorPanel`, `PatientPanel`, `PharmacistPanel`
- Example: `PatientPanel` receives `patientAppointments`, `patientRecords`, `handleBookAppointment`, etc.
- Responsibility: UI rendering and local form state only; data mutations flow back to App.jsx via handler callbacks

### Reusable Components
Located in [src/components/](src/components/):
- `Section`: Wrapper for dashboard sections with title and optional right-side control (used extensively in feature panels)
- `StatusPill`: Badge displaying status with role-specific color coding (Approved/Pending/Active/Inactive)
- `WorkspaceSummary`: Displays role-based dashboard summary stats
- `BrandLogo`: Navigation branding element

### Page Components
Located in [src/pages/](src/pages/) - top-level routes:
- `LoginPage`: Authentication entry point
- `DashboardAccessPortal`: Role selection interface for accessing different workspaces
- Role-specific dashboard pages: `DoctorPanel`, `PatientPanel`, etc. (actually imported as features, but wrapped in pages)
- `HomePage`, `AboutPage`, `ContactPage`: Public-facing pages

## Critical Workflows

### Development
```bash
npm run dev          # Start Vite dev server (port 3000, auto-opens browser)
npm run build        # Production bundle to ./build directory (used by deployed build/)
npm test             # Run Vitest in watch mode
```

### Debugging State Issues
1. Check localStorage via browser DevTools → Application → Storage → Local Storage
2. Look for keys prefixed with `oms.` (see STORAGE_KEYS in App.jsx)
3. Verify `handleLogin` saves state to localStorage immediately (critical bug point)
4. Test route guards: authenticated routes use `withRoleGuard()` to check `activeRole` from storage

### Adding New Features
1. **Data**: Add to `initialAppointments`/`initialRecords`/etc. in [src/constants/data.jsx](src/constants/data.jsx)
2. **State**: Add handler function in App.jsx (e.g., `handleCreatePrescription`), ensure mutation saves to localStorage via `setStoredValue`
3. **UI**: Create or extend a feature component in [src/features/](src/features/), pass state and handlers as props
4. **Routes**: Add Route in App.jsx `<Routes>` section using role constants (ROLE_PATHS)

## Backend Integration Ready
**Current**: localStorage-backed simulation (full frontend experience with realistic workflows)
**Future**: Replace `setStoredValue`/`getStoredValue` calls with fetch/axios API calls (see README.md for planned endpoints)
- Component logic unchanged; only storage layer swapped
- Planned APIs: `/api/auth`, `/api/appointments`, `/api/prescriptions`, `/api/users`

## Styling Conventions
- **Tailwind CSS** (no CSS-in-JS, no external component libraries)
- **Color scheme**: Role-based Tailwind palette (role colors in ROLE_COLORS constant)
- **Dark mode**: Dark theme throughout (bg-slate-900, text-white, etc.)
- **Spacing**: Tailwind gap/px/py utilities; no hardcoded margins
- Example from PatientPanel: `className="grid gap-6 lg:grid-cols-2"` (2-col grid with gap)

## Testing Approach
- **Framework**: Vitest (configured in vite.config.js with jsdom environment)
- **Test files**: Colocated as `*.test.jsx` (e.g., `App.test.jsx`)
- **Setup**: Uses setupTests.jsx for test environment configuration
- Tests validate component rendering and state mutations (localStorage-backed workflows)

## Common Pitfalls to Avoid
1. **Forgetting localStorage persistence** - New handlers must call `setStoredValue()` or state is lost on refresh
2. **Hardcoding role/color/path strings** - Use ROLE_* constants instead
3. **Bypassing withRoleGuard** - Protected routes must validate activeRole from localStorage
4. **Prop-drilling too deep** - If passing >3 levels of props, consider state reorganization
5. **File upload URLs** - Currently use `URL.createObjectURL()`; will need backend API URLs post-integration

## Key Files to Reference
- [src/App.jsx](src/App.jsx) - Central state, routes, auth logic (1489 lines - major hub)
- [src/constants/data.jsx](src/constants/data.jsx) - All data models and seed data
- [src/features/PatientPanel.jsx](src/features/PatientPanel.jsx) - Example of a comprehensive feature component
- [vite.config.js](vite.config.js) - Build and dev server config
- [DASHBOARD_ACCESS_FIX.md](DASHBOARD_ACCESS_FIX.md) - Implementation details of auth bug fix

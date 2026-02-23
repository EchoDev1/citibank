# Citibank Branding Guide

## Official Citibank Colors

### Primary Colors
- **Citibank Blue**: `#056DAE` - Main brand color
- **Citibank Red**: `#D41F3D` - Accent color (the arc/umbrella)
- **Navy Blue**: `#003D6A` - Dark variant
- **Light Blue**: `#0077C8` - Lighter variant

### How to Use in Code

```tsx
// Tailwind CSS classes
className="bg-[#056DAE] text-white"
className="border-[#D41F3D]"

// Or use the custom colors defined in tailwind.config.ts
className="bg-citibank-blue"
className="text-citibank-red"
```

## Logo Usage

### Text Logo (Header & Auth)
```tsx
import { CitibankLogoText } from "@/components/layout/citibank-logo";

<CitibankLogoText />
```

### SVG Logo (Advanced)
```tsx
import { CitibankLogo } from "@/components/layout/citibank-logo";

<CitibankLogo className="h-8" />
```

## Typography

### Font Family
- **Primary**: Inter (already imported in layout)
- **Weights**:
  - Bold (700) for "Citi"
  - Light (300) for "bank"

### Example
```tsx
<span className="text-2xl font-bold text-[#056DAE]">Citi</span>
<span className="text-2xl font-light text-[#056DAE]">bank</span>
```

## Component Styling

### Buttons
- **Primary**: Blue background with white text
- **Secondary**: Red background with white text
- **Outline**: White background with blue text

```tsx
// Primary
<Button className="bg-[#056DAE] hover:bg-[#003D6A]">
  Click Me
</Button>

// Secondary/Destructive
<Button className="bg-[#D41F3D] hover:bg-[#B01830]">
  Delete
</Button>
```

### Cards
- White background with subtle blue border
- Blue header backgrounds for important cards

```tsx
<Card className="border-gray-200">
  <CardHeader className="bg-blue-50">
    <CardTitle className="text-[#056DAE]">Title</CardTitle>
  </CardHeader>
</Card>
```

### Navigation
- **Active**: Blue background (#056DAE) with white text
- **Hover**: Light blue background with blue text
- **Default**: Gray text

## Updated Files with Citibank Branding

✅ `src/app/globals.css` - Citibank color scheme
✅ `src/components/layout/header.tsx` - Blue header with red accent
✅ `src/components/layout/sidebar.tsx` - Blue active states
✅ `src/components/layout/citibank-logo.tsx` - Logo components
✅ `src/app/(auth)/layout.tsx` - Branded auth layout
✅ `tailwind.config.ts` - Citibank color definitions
✅ `src/app/layout.tsx` - Updated metadata

## Color Variables (CSS)

In `globals.css`:
```css
:root {
  --primary: 206 100% 34%;        /* #056DAE */
  --secondary: 353 72% 49%;       /* #D41F3D */
  --accent: 206 100% 34%;         /* #056DAE */
  --destructive: 353 72% 49%;     /* #D41F3D */
}
```

## Design Principles

1. **Clean & Professional**: Minimal clutter, clear hierarchy
2. **Trust & Security**: Blue conveys trust and stability
3. **Action & Urgency**: Red for important actions
4. **Accessibility**: High contrast ratios for readability

## Brand Elements

### The Arc (Red Umbrella)
The distinctive red arc is Citibank's signature:
- Appears in the logo as a curved line
- Symbolizes protection and global reach
- Always in Citibank Red (#D41F3D)

### Spacing
- Generous white space around elements
- Consistent padding (16px, 24px, 32px)
- Clear visual hierarchy

## Examples in the App

### Header
- Blue background (#056DAE)
- Red bottom border (4px)
- White "Citibank" text with red arc

### Sidebar
- Active items: Blue background with white text
- Hover: Light blue background
- Smooth transitions

### Buttons
- Primary actions: Blue
- Dangerous actions: Red
- All with proper hover states

## Favicon
- Simple "C" in white on blue background
- Located at: `public/favicon.ico`

---

**Note**: This is a replica for educational/demo purposes. Actual Citibank branding is trademarked and owned by Citigroup Inc.

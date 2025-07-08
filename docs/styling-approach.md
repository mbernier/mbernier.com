# Styling Approach for mbernier.com

## Overview

This project uses **Tailwind CSS** for all styling, combined with **class-variance-authority (CVA)** to manage component variants. We do **not** use custom CSS classes for UI components (e.g., `.btn-primary`, `.card`, etc.). All visual styling is handled via Tailwind utility classes, either directly in components or through CVA-based variant management.

---

## Key Principles

- **Utility-First**: All styling is done with Tailwind utility classes.
- **Component Variants**: We use [CVA](https://cva.style) to define variants (e.g., `primary`, `secondary`, `outline`) for components like Button, Card, Tag, etc.
- **No Custom CSS for Components**: We do not define or use custom CSS classes for UI elements. Only global utility classes (e.g., `.container-custom`, `.hero-gradient`) and CSS variables for colors are allowed.
- **Design Tokens**: Colors, spacing, and other design tokens are defined in `tailwind.config.js` and referenced via CSS variables.

---

## How It Works

### 1. **Tailwind Utility Classes**
- Used directly in JSX/TSX for layout, spacing, typography, etc.
- Example: `<div className="p-4 bg-primary-500 text-white">Hello</div>`

### 2. **CVA for Component Variants**
- Each reusable component (Button, Card, Tag, Badge, etc.) uses CVA to define its variants and sizes.
- Example (Button):
  ```ts
  const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-xl font-medium transition-all',
    {
      variants: {
        variant: {
          primary: 'bg-primary-500 text-white hover:bg-primary-600',
          secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
          outline: 'border-2 border-primary-500 text-primary-500',
        },
        size: {
          sm: 'h-9 px-4 text-xs',
          default: 'h-10 px-6 py-2',
          lg: 'h-12 px-8 py-3',
        },
      },
      defaultVariants: {
        variant: 'primary',
        size: 'default',
      },
    }
  );
  ```
- The component then applies these classes dynamically based on props.

### 3. **Safelist for Dynamic Classes**
- Because CVA generates class names dynamically, Tailwind's JIT engine may not see all possible classes in the codebase.
- We use the `safelist` option in `tailwind.config.js` to explicitly include all dynamic classes used in CVA configs.
- Example:
  ```js
  safelist: [
    'bg-primary-500', 'bg-primary-600', 'text-white', 'hover:bg-primary-600',
    'bg-secondary-500', 'bg-secondary-600', 'hover:bg-secondary-600',
    // ...and so on for all variants
  ],
  ```
- This ensures all required CSS is generated and available at runtime.

---

## Best Practices

- **Always use Tailwind utility classes or CVA for styling.**
- **Do not add custom CSS classes for UI components.**
- **Update the safelist** in `tailwind.config.js` if you add new variants or dynamic classes.
- **Use CVA for all reusable components** that have variants (Button, Card, Tag, Badge, Alert, etc.).
- **Document new component variants** in this file and in the component's docstring.

---

## Troubleshooting

### Problem: Components appear unstyled or only have browser default styles
- **Cause:** Tailwind did not generate the required CSS for dynamic classes.
- **Solution:**
  1. Make sure the class names are included in the `safelist` in `tailwind.config.js`.
  2. Restart the dev server after updating the safelist.
  3. Check that your component is using the CVA-generated className correctly.

### Problem: New variant or color is not showing up
- **Cause:** The new class is not in the safelist.
- **Solution:** Add the new class to the safelist and restart the dev server.

---

## Example Component Usage

```tsx
<Button variant="primary" size="lg">Click Me</Button>
<Card variant="elevated">...</Card>
<Tag variant="success">Active</Tag>
<Badge variant="warning">Beta</Badge>
```

---

## References
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
- [CVA Documentation](https://cva.style/docs)
- [Why use a safelist? (Tailwind Docs)](https://tailwindcss.com/docs/content-configuration#safelisting-classes)

---

**For any new UI component or variant, update this documentation and the safelist accordingly.** 
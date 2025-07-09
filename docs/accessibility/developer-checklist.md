# Accessibility Developer Checklist

## Pre-Development Checklist

### [ ] Design Review
- [ ] Color contrast ratios meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- [ ] Design doesn't rely solely on color to convey information
- [ ] Interactive elements have clear visual states (hover, focus, active, disabled)
- [ ] Text is readable at minimum 16px font size
- [ ] Touch targets are at least 44x44px for mobile

### [ ] Component Planning
- [ ] Identify all interactive elements
- [ ] Plan keyboard navigation flow
- [ ] Determine ARIA roles and attributes needed
- [ ] Plan focus management strategy
- [ ] Consider screen reader announcements

## Development Checklist

### [ ] Semantic HTML
- [ ] Use appropriate HTML elements (`<button>`, `<nav>`, `<main>`, etc.)
- [ ] Implement proper heading hierarchy (h1 → h2 → h3)
- [ ] Use landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`)
- [ ] Add `role` attributes where semantic HTML isn't sufficient

### [ ] Keyboard Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order follows logical visual flow
- [ ] Focus indicators are clearly visible
- [ ] Escape key closes modals/dropdowns
- [ ] Enter/Space keys activate buttons
- [ ] Arrow keys work for custom controls

### [ ] Screen Reader Support
- [ ] All images have appropriate `alt` text
- [ ] Decorative images have `alt=""` or `aria-hidden="true"`
- [ ] Form fields have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Dynamic content updates use `aria-live`
- [ ] Custom controls have proper ARIA attributes

### [ ] Form Accessibility
- [ ] All form fields have `<label>` elements
- [ ] Required fields are marked with `aria-required="true"`
- [ ] Error states use `aria-invalid="true"`
- [ ] Error messages are associated with fields via `aria-describedby`
- [ ] Form validation provides clear, specific feedback
- [ ] Submit buttons have descriptive text

### [ ] Color and Contrast
- [ ] Text meets minimum contrast ratios
- [ ] Focus indicators have sufficient contrast
- [ ] Information isn't conveyed by color alone
- [ ] High contrast mode is supported
- [ ] Color blind users can distinguish elements

### [ ] Motion and Animation
- [ ] Respect `prefers-reduced-motion` media query
- [ ] Animations don't cause seizures (no flashing)
- [ ] Moving content can be paused or stopped
- [ ] Auto-playing content can be controlled

### [ ] Responsive Design
- [ ] Content is readable at 200% zoom
- [ ] Touch targets are appropriately sized
- [ ] Layout works in portrait and landscape
- [ ] Text doesn't require horizontal scrolling

## Component-Specific Checklists

### [ ] Button Component
- [ ] Has descriptive text or `aria-label`
- [ ] Supports keyboard activation (Enter/Space)
- [ ] Shows loading state with `aria-busy`
- [ ] Toggle buttons use `aria-pressed`
- [ ] Disabled state is properly communicated

### [ ] Input Component
- [ ] Has associated label
- [ ] Supports `aria-describedby` for help text
- [ ] Shows error state with `aria-invalid`
- [ ] Required fields marked with `aria-required`
- [ ] Autocomplete attributes where appropriate

### [ ] Navigation Component
- [ ] Has `role="navigation"`
- [ ] Includes skip links for main content
- [ ] Mobile menu has proper ARIA attributes
- [ ] Current page is indicated
- [ ] External links are marked

### [ ] Modal/Dialog Component
- [ ] Uses `role="dialog"` or `role="alertdialog"`
- [ ] Has `aria-modal="true"`
- [ ] Focus is trapped within modal
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element
- [ ] Has descriptive `aria-label` or `aria-labelledby`

### [ ] Image Component
- [ ] Informative images have descriptive alt text
- [ ] Decorative images have `alt=""`
- [ ] Complex images have detailed descriptions
- [ ] Images scale appropriately
- [ ] Lazy loading doesn't break accessibility

## Testing Checklist

### [ ] Automated Testing
- [ ] Run axe-core tests
- [ ] Check Lighthouse accessibility score
- [ ] Validate HTML semantics
- [ ] Test color contrast ratios
- [ ] Check for ARIA violations

### [ ] Manual Testing
- [ ] Navigate with keyboard only (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test with high contrast mode enabled
- [ ] Test at 200% and 400% zoom
- [ ] Test with reduced motion preferences
- [ ] Test on mobile devices

### [ ] User Testing
- [ ] Test with users who have disabilities
- [ ] Gather feedback on accessibility features
- [ ] Test with various assistive technologies
- [ ] Document any issues found

## Common Issues to Avoid

### ❌ Don't Do This
```tsx
// Bad - No label association
<input type="email" />

// Bad - Non-descriptive link text
<a href="/contact">Click here</a>

// Bad - Missing alt text
<img src="chart.png" />

// Bad - Color-only indicators
<span style={{ color: 'red' }}>Error</span>

// Bad - No focus indicator
button:focus { outline: none; }
```

### ✅ Do This Instead
```tsx
// Good - Proper label association
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// Good - Descriptive link text
<a href="/contact">Contact us for support</a>

// Good - Descriptive alt text
<img src="chart.png" alt="Sales growth chart showing 25% increase" />

// Good - Multiple indicators
<span style={{ color: 'red' }}>⚠️ Error: Please check your input</span>

// Good - Clear focus indicator
button:focus { 
  outline: 2px solid #007acc;
  outline-offset: 2px;
}
```

## Quick Reference

### ARIA Attributes
- `aria-label` - Provides accessible name
- `aria-describedby` - Associates description
- `aria-labelledby` - Associates label
- `aria-required` - Marks required fields
- `aria-invalid` - Indicates error state
- `aria-pressed` - Toggle button state
- `aria-expanded` - Expandable content state
- `aria-live` - Dynamic content announcements

### Common Roles
- `role="button"` - Custom button
- `role="dialog"` - Modal dialog
- `role="navigation"` - Navigation menu
- `role="main"` - Main content area
- `role="complementary"` - Sidebar content
- `role="contentinfo"` - Footer content
- `role="alert"` - Error messages
- `role="status"` - Status updates

### Keyboard Shortcuts
- `Tab` - Navigate forward
- `Shift+Tab` - Navigate backward
- `Enter` - Activate buttons/links
- `Space` - Activate buttons/checkboxes
- `Arrow keys` - Navigate lists/menus
- `Escape` - Close modals/dropdowns

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe-core Testing](https://github.com/dequelabs/axe-core)
- [Screen Reader Testing Guide](https://www.nvaccess.org/about-nvda/)
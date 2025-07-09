# Accessibility Guidelines

## Overview

This document outlines the accessibility standards and implementation guidelines for the mbernier.com application. We follow WCAG 2.1 AA standards to ensure our application is accessible to users with disabilities.

## Standards Compliance

- **Primary Standard**: WCAG 2.1 AA
- **Additional Standards**: Section 508, EN 301 549
- **Target Level**: AA (Double-A) compliance

## Core Principles

### 1. Perceivable
- Information must be presentable to users in ways they can perceive
- Text alternatives for non-text content
- Captions and other alternatives for multimedia
- Content adaptable and distinguishable

### 2. Operable
- Interface components and navigation must be operable
- Keyboard accessibility
- Sufficient time to read and use content
- No content that could cause seizures
- Navigable content

### 3. Understandable
- Information and operation of user interface must be understandable
- Readable and predictable text content
- Input assistance when needed

### 4. Robust
- Content must be robust enough to be interpreted by assistive technologies
- Compatible with current and future user tools

## Implementation Standards

### Color and Contrast

#### Contrast Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text (18pt+ or 14pt+ bold)**: Minimum 3:1 contrast ratio
- **UI components and graphics**: Minimum 3:1 contrast ratio

#### Color Usage
- Never rely solely on color to convey information
- Provide additional visual indicators (icons, patterns, text)
- Test in grayscale to ensure information is not lost

#### Examples
```css
/* ✅ Good - High contrast */
.text-primary { color: #1a365d; } /* 7.5:1 ratio */

/* ❌ Bad - Low contrast */
.text-muted { color: #6b7280; } /* 2.8:1 ratio */
```

### Typography

#### Font Sizes
- **Minimum body text**: 16px (1rem)
- **Minimum captions**: 14px (0.875rem)
- **Line height**: Minimum 1.4 for body text, 1.2 for headings

#### Font Choices
- Use system fonts or web-safe fonts
- Ensure fonts render clearly at all sizes
- Provide fallback fonts

### Keyboard Navigation

#### Tab Order
- Logical tab order that follows visual layout
- Skip links for main content and navigation
- Focus indicators visible on all interactive elements

#### Keyboard Shortcuts
- Provide keyboard alternatives for mouse actions
- Avoid conflicts with browser and assistive technology shortcuts
- Document keyboard shortcuts in help section

#### Focus Management
```tsx
// ✅ Good - Proper focus management
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal();
    // Return focus to trigger element
    triggerRef.current?.focus();
  }
};
```

### Screen Reader Support

#### ARIA Labels and Descriptions
- Use `aria-label` for elements without visible text
- Use `aria-describedby` to associate descriptions
- Use `aria-labelledby` to associate labels

#### Landmark Roles
```tsx
// ✅ Good - Proper landmarks
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
```

#### Live Regions
- Use `aria-live` for dynamic content updates
- Use `aria-atomic` to control announcement scope
- Use `aria-relevant` to specify what changes to announce

### Form Accessibility

#### Labels and Associations
```tsx
// ✅ Good - Proper label association
<label htmlFor="email">Email Address</label>
<input 
  id="email" 
  type="email" 
  aria-required="true"
  aria-describedby="email-error"
/>
<div id="email-error" role="alert">Please enter a valid email</div>
```

#### Error Handling
- Associate error messages with form fields
- Use `aria-invalid` for invalid fields
- Provide clear, specific error messages
- Announce errors to screen readers

#### Required Fields
- Mark required fields with `aria-required="true"`
- Use visual indicators (asterisk) and text
- Provide clear indication of what's required

### Image Accessibility

#### Alt Text Guidelines
- **Informative images**: Describe the content and function
- **Decorative images**: Use `alt=""` or `aria-hidden="true"`
- **Complex images**: Provide detailed descriptions

#### Examples
```tsx
// ✅ Good - Informative image
<img 
  src="chart.png" 
  alt="Bar chart showing sales growth of 25% from Q1 to Q2 2023"
/>

// ✅ Good - Decorative image
<img 
  src="decorative-border.png" 
  alt="" 
  aria-hidden="true"
/>

// ✅ Good - Complex image with description
<img 
  src="complex-diagram.png" 
  alt="System architecture diagram"
  aria-describedby="diagram-description"
/>
<div id="diagram-description">
  Detailed description of the system architecture...
</div>
```

### Interactive Elements

#### Buttons
```tsx
// ✅ Good - Accessible button
<button
  type="button"
  aria-label="Close dialog"
  aria-pressed={isOpen}
  onClick={handleClick}
>
  <XIcon aria-hidden="true" />
</button>
```

#### Links
```tsx
// ✅ Good - Descriptive link text
<a href="/contact" aria-label="Contact us for more information">
  Get in touch
</a>

// ❌ Bad - Non-descriptive link
<a href="/contact">Click here</a>
```

#### Toggle Controls
```tsx
// ✅ Good - Toggle with proper ARIA
<button
  type="button"
  aria-pressed={isDarkMode}
  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  onClick={toggleTheme}
>
  {isDarkMode ? <SunIcon /> : <MoonIcon />}
</button>
```

## Testing Guidelines

### Automated Testing
- Run axe-core tests on all pages
- Use Lighthouse accessibility audits
- Check color contrast ratios
- Validate HTML semantics

### Manual Testing
- Test with keyboard only (no mouse)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test with high contrast mode
- Test with zoom (200% and 400%)
- Test with reduced motion preferences

### User Testing
- Include users with disabilities in testing
- Test with various assistive technologies
- Gather feedback on accessibility features
- Iterate based on user feedback

## Common Patterns

### Skip Links
```tsx
// Skip to main content link
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50"
>
  Skip to main content
</a>
```

### Focus Trap
```tsx
// Modal focus trap
useEffect(() => {
  const focusableElements = modalRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements?.length) {
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    firstElement.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }
}, []);
```

### Loading States
```tsx
// Loading state with screen reader support
<button 
  disabled={isLoading}
  aria-busy={isLoading}
  aria-live="polite"
>
  {isLoading ? (
    <>
      <Spinner aria-hidden="true" />
      <span>Loading...</span>
    </>
  ) : (
    'Submit'
  )}
</button>
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [axe-core Testing](https://github.com/dequelabs/axe-core)
- [Screen Reader Testing Guide](https://www.nvaccess.org/about-nvda/)
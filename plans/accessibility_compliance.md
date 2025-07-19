# AI Assistant Prompt: Accessibility Compliance Audit & Enforcement

## Overview

This prompt guides an AI assistant to perform a comprehensive accessibility compliance audit for a SaaS application. The assistant will analyze the codebase, generate a compliance plan, update documentation, and enforce future compliance through rule files.

---

## 🔍 Step 1: Audit for Accessibility Compliance

* Analyze the codebase, especially frontend components and interactive UI logic.
* Identify violations or risks relative to:

  * [WCAG 2.1 AA](https://www.w3.org/WAI/standards-guidelines/wcag/)
  * ARIA roles and landmarks
  * Keyboard navigability
  * Screen reader support
  * Text contrast, font sizing, color dependency
  * Proper use of form labels, error handling, focus states
* Audit both static code and runtime behavior if possible.
* Note affected files, components, and patterns for remediation.

---

## 📋 Step 2: Create a Compliance Plan

* Write a plan file at: `./plans/accessibility-compliance.md`
* Include:

  * Summary of accessibility gaps
  * Remediation priorities: Critical, High, Moderate, Low
  * Suggestions for component rewrites or reusable wrappers
  * Visual adjustments (color palette, typography)
  * Timeline or batch fixes if applicable

---

## 📘 Step 3: Document Accessibility Standards

* Update or create files in: `./docs/accessibility/`
* Documentation should include:

  * Accessibility guidelines the app conforms to (e.g., WCAG 2.1 AA)
  * Implementation standards for components
  * Custom accessibility helpers or exceptions
  * UI/UX examples (compliant vs. non-compliant)
  * Developer checklist for new UI components

---

## 🛑 Step 4: Write Cursor Rule Files

* Write `.cursor/rules/accessibility.mdc` with:

  * Enforced rules referencing the documentation
  * Warnings/errors for known violations (e.g., missing labels, bad contrast)
  * Prompts or fixes for non-compliant JSX/HTML elements
  * Links to `./docs/accessibility/*.md` for developer context
* Optional: split rules by pattern or severity (e.g., `.mdc/contrast.mdc`, `.mdc/forms.mdc`)

---

## 🧪 Step 5: Optional Enhancements

* Recommend or install:

  * `eslint-plugin-jsx-a11y`
  * `axe-core` or Lighthouse CI for automated testing
  * IDE plugins for real-time accessibility linting
* Add a CLI command like `yarn audit-accessibility`
* Set up CI to fail builds on critical a11y issues

---

## 🔁 Deliverables Summary

* `./plans/accessibility-compliance.md`: Audit findings and remediation plan
* `./docs/accessibility/*.md`: Documentation of accessibility systems
* `.cursor/rules/*.mdc`: Cursor rule files enforcing compliance
* Optional: CLI tools, linters, plugins, and test automation

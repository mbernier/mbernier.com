# Design Migration Plan: mbernier.com

## Overview
Systematic replacement of current design with the new design from `new_design/` directory while maintaining Next.js structure, database integration, and admin functionality.

## Key Differences Analysis

### Current Site (Next.js)
- Next.js 14+ app router with complex routing
- Custom CSS variables color system
- Database integration (Prisma)
- Admin functionality
- Complex component variants system
- SEO and metadata setup

### New Design (Vite/React)
- Clean React components with modern design
- Standard Tailwind classes
- Uses `class-variance-authority` for variants
- Uses `lucide-react` for icons
- Simpler component architecture
- Mock data instead of database

## Migration Strategy

### Phase 1: Dependencies & Infrastructure
- [ ] Install new dependencies from new design
- [ ] Update Tailwind configuration
- [ ] Migrate utility functions
- [ ] Create adapter layer for database integration

### Phase 2: Core UI Components
- [ ] Replace Button component
- [ ] Replace Card component
- [ ] Replace Badge/Tag component
- [ ] Replace Avatar component
- [ ] Add new Alert component
- [ ] Update component exports and indexes

### Phase 3: Layout Components
- [ ] Replace Header component
- [ ] Replace Footer component
- [ ] Update Layout wrapper
- [ ] Add mobile navigation improvements

### Phase 4: Page-Specific Components
- [ ] Replace HeroSection
- [ ] Migrate home page sections
- [ ] Update services page components
- [ ] Update articles page components
- [ ] Update projects page components
- [ ] Update contact page components

### Phase 5: Data Integration
- [ ] Connect new components to existing database
- [ ] Migrate from mock data to real data
- [ ] Ensure admin functionality works
- [ ] Test all API endpoints

### Phase 6: Styling & Polish
- [ ] Update global styles
- [ ] Ensure responsive design
- [ ] Test dark mode compatibility (if needed)
- [ ] Performance optimization

## Detailed Tasks

### 1. Dependencies & Infrastructure

#### 1.1 Install New Dependencies
```bash
npm install class-variance-authority clsx lucide-react tailwind-merge
```

#### 1.2 Update Tailwind Config
- Replace complex custom color system with simpler approach
- Keep essential customizations for Next.js
- Maintain plugin compatibility

#### 1.3 Create Utility Adapter
- Merge new `utils.ts` with existing utilities
- Maintain database functions
- Add new helper functions

### 2. Component Migration Matrix

| Component | Current Location | New Location | Status | Dependencies |
|-----------|------------------|--------------|--------|--------------|
| Button | `src/components/ui/Button/` | `new_design/src/components/ui/Button.tsx` | ⏳ | class-variance-authority |
| Card | `src/components/ui/Card/` | `new_design/src/components/ui/Card.tsx` | ⏳ | class-variance-authority |
| Badge | `src/components/ui/Badge.tsx` | `new_design/src/components/ui/Badge.tsx` | ⏳ | - |
| Avatar | `src/components/ui/Avatar.tsx` | `new_design/src/components/ui/Avatar.tsx` | ⏳ | - |
| Header | `src/components/layout/Header/` | `new_design/src/components/layout/Header.tsx` | ⏳ | lucide-react |
| Footer | `src/components/layout/Footer/` | `new_design/src/components/layout/Footer.tsx` | ⏳ | - |
| HeroSection | `src/components/HeroSection.tsx` | `new_design/src/components/home/HeroSection.tsx` | ⏳ | lucide-react |

### 3. Page Migration Priority

1. **Homepage** (`src/app/page.tsx`)
   - Replace HeroSection
   - Replace services preview section
   - Replace articles section
   - Replace projects section

2. **Services Page** (`src/app/services/page.tsx`)
   - Use new ServicesPage as reference
   - Maintain database integration

3. **Other Pages**
   - Articles, Projects, Contact, Links
   - Use new designs as templates
   - Connect to existing APIs

### 4. Data Integration Strategy

#### 4.1 Mock to Real Data Mapping
- `articles` mock data → Database queries
- `projects` mock data → Database queries  
- `services` mock data → Static/database content
- `resources` mock data → Database/static content

#### 4.2 API Compatibility
- Ensure new components work with existing API endpoints
- Maintain admin functionality
- Keep authentication flows intact

### 5. Testing Strategy

#### 5.1 Component Testing
- Test each migrated component in isolation
- Verify responsive behavior
- Check accessibility

#### 5.2 Integration Testing
- Test page layouts
- Verify database connectivity
- Test admin functionality

#### 5.3 E2E Testing
- Run existing Playwright tests
- Update tests for new UI elements
- Add tests for new functionality

### 6. Risk Mitigation

#### 6.1 Backup Strategy
- Create feature branch for migration
- Commit each phase separately
- Keep rollback points

#### 6.2 Staging Environment
- Test thoroughly in development
- Use staging environment for final testing
- Gradual rollout strategy

## Implementation Timeline

### Week 1: Infrastructure
- Dependencies and utilities setup
- Tailwind configuration update
- Initial component structure

### Week 2: Core Components
- UI component migration
- Layout component updates
- Basic functionality testing

### Week 3: Pages & Integration
- Page component migration
- Database integration
- API connectivity

### Week 4: Polish & Testing
- Final styling updates
- Comprehensive testing
- Performance optimization

## Success Criteria

- [ ] All pages load correctly with new design
- [ ] Database functionality intact
- [ ] Admin functionality working
- [ ] Responsive design on all devices
- [ ] Performance maintained or improved
- [ ] SEO and metadata preserved
- [ ] All existing features working

## Notes

- Maintain semantic HTML structure
- Preserve accessibility features
- Keep SEO optimizations
- Ensure backwards compatibility where needed
- Consider progressive enhancement approach

## Migration Commands

Each phase will be implemented as a separate feature branch:
```bash
git checkout -b feat/design-migration-phase-1
git checkout -b feat/design-migration-phase-2
# etc.
```

## Post-Migration Tasks

- [ ] Update documentation
- [ ] Clean up unused files
- [ ] Update component documentation
- [ ] Performance audit
- [ ] Accessibility audit 
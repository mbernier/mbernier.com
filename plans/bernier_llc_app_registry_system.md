# Bernier LLC Application Registry System

**Status:** Planning Phase  
**Created:** July 19, 2025  
**Owner:** Matt Bernier (mkbernier@gmail.com)  
**Priority:** High

---

## Overview

The Bernier LLC Application Registry System is a centralized platform that allows applications developed under the Bernier LLC umbrella to register themselves, enabling unified management, privacy policy generation, GitHub tracking, and administrative oversight through mbernier.com's admin interface.

---

## Core Objectives

1. **Unified Application Management** - Central registry for all Bernier LLC applications
2. **Automated Privacy Policy Generation** - App-specific privacy policies under Bernier LLC umbrella
3. **GitHub Integration** - Track commits and provide "since you last visited" notifications
4. **OAuth-Based Registration** - Secure, authorized registration process
5. **Admin Dashboard Integration** - Manage all registered applications from mbernier.com

---

## System Architecture

### 1. OAuth Registration Flow

```
Application Admin UI → OAuth Button → Google OAuth → mbernier.com → Registration Form → GitHub Integration → Privacy Policy Generation → Admin Dashboard
```

#### OAuth Implementation
- **Provider:** Google OAuth 2.0
- **Authorized Users:** Initially mkbernier@gmail.com (expandable)
- **Scope:** email, profile
- **Callback URL:** `https://mbernier.com/api/auth/google/callback`

#### Registration Process
1. **OAuth Authentication** - Verify authorized user
2. **Application Details Form** - Collect app information
3. **GitHub Repository Linking** - Connect to app's GitHub repo
4. **Privacy Policy Configuration** - Set app-specific parameters
5. **Registration Confirmation** - Generate app credentials

### 2. API Endpoints Structure

#### Authentication Endpoints
```
POST /api/auth/google/authorize
GET  /api/auth/google/callback
POST /api/auth/register-app
```

#### Application Management Endpoints
```
GET    /api/apps                    # List all registered apps
GET    /api/apps/{appId}           # Get specific app details
PUT    /api/apps/{appId}           # Update app configuration
DELETE /api/apps/{appId}           # Deactivate app
POST   /api/apps/{appId}/webhook   # GitHub webhook endpoint
```

#### Privacy Policy Endpoints
```
GET /api/privacy                   # Base privacy policy
GET /api/privacy/{appId}          # App-specific privacy policy
GET /api/privacy/{appId}/json     # JSON format for API consumption
POST /api/privacy/{appId}/update  # Update app-specific clauses
```

#### GitHub Integration Endpoints
```
GET /api/github/{appId}/commits   # Recent commits for app
GET /api/github/{appId}/activity  # Activity since last visit
POST /api/github/{appId}/webhook  # GitHub webhook receiver
```

---

## Database Schema

### Applications Table
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  github_repo VARCHAR(255),
  github_webhook_secret VARCHAR(255),
  privacy_policy_config JSONB,
  status VARCHAR(50) DEFAULT 'active',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Application Activity Table
```sql
CREATE TABLE application_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID REFERENCES applications(id),
  activity_type VARCHAR(50), -- 'commit', 'deployment', 'user_activity'
  activity_data JSONB,
  github_commit_hash VARCHAR(40),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Privacy Policy Templates Table
```sql
CREATE TABLE privacy_policy_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id UUID REFERENCES applications(id),
  template_name VARCHAR(100),
  content TEXT,
  variables JSONB, -- For dynamic content insertion
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Google OAuth integration
- [ ] Create application registration database schema
- [ ] Implement basic registration API endpoints
- [ ] Create registration form UI in mbernier.com admin
- [ ] Set up basic privacy policy generation system

### Phase 2: GitHub Integration (Week 3-4)
- [ ] Implement GitHub OAuth for repository access
- [ ] Create GitHub webhook endpoints
- [ ] Set up commit tracking and activity monitoring
- [ ] Implement "since you last visited" notification system
- [ ] Add GitHub integration to admin dashboard

### Phase 3: Privacy Policy System (Week 5-6)
- [ ] Enhance privacy policy API with app-specific customization
- [ ] Create privacy policy template system
- [ ] Implement dynamic content insertion
- [ ] Add privacy policy management to admin UI
- [ ] Create privacy policy preview and testing tools

### Phase 4: Admin Dashboard (Week 7-8)
- [ ] Build comprehensive admin dashboard
- [ ] Add application analytics and monitoring
- [ ] Implement user management and permissions
- [ ] Create notification system for app updates
- [ ] Add bulk operations and reporting

### Phase 5: Integration & Testing (Week 9-10)
- [ ] Integrate with existing mbernier.com systems
- [ ] Test OAuth flows and security
- [ ] Validate privacy policy generation
- [ ] Test GitHub webhook reliability
- [ ] Performance optimization and monitoring

---

## Privacy Policy Integration

### API Endpoint Specification

Based on the existing `privacy_api_spec_canvas.js`, the enhanced system will:

#### Base Privacy Policy Endpoint
```
GET /api/privacy?app={appId}&format=json|html&lang=en
```

#### App-Specific Customization
- **Base Policy:** Standard Bernier LLC privacy policy
- **App Overrides:** Custom clauses for specific applications
- **Dynamic Variables:** App name, contact info, data collection specifics
- **Format Options:** HTML for display, JSON for API consumption

#### Privacy Policy Generation Process
1. **Template Selection** - Choose base template for app type
2. **Variable Substitution** - Insert app-specific information
3. **Custom Clause Addition** - Add app-specific privacy clauses
4. **Format Rendering** - Generate HTML or JSON output
5. **Caching** - Cache generated policies for performance

### Privacy Policy Templates

#### Base Template Structure
```markdown
---
template_name: "bernier_llc_base"
version: "1.0"
variables:
  - app_name
  - app_description
  - data_collection_types
  - third_party_services
---

## Privacy Policy for {{app_name}}

**Effective Date:** {{effective_date}}  
**Applies To:** {{app_name}}, operated by Bernier LLC

### 1. Who We Are

{{app_name}} is a service operated by Bernier LLC, a Colorado-based business...

### 2. Information We Collect

{{app_name}} collects the following types of information:
{{#each data_collection_types}}
- {{this}}
{{/each}}

### 3. Third-Party Services

{{app_name}} uses the following third-party services:
{{#each third_party_services}}
- **{{name}}** ({{purpose}})
{{/each}}
```

---

## GitHub Integration Features

### Commit Tracking
- **Webhook Integration** - Real-time commit notifications
- **Activity Dashboard** - Visual commit history and trends
- **Last Visit Tracking** - Show changes since user's last visit
- **Cross-App Notifications** - Notify on mbernier.com about app updates

### GitHub API Integration
```javascript
// Example GitHub webhook payload processing
{
  "app_id": "uuid",
  "event_type": "push",
  "commits": [
    {
      "hash": "abc123",
      "message": "feat: add new feature",
      "author": "developer",
      "timestamp": "2025-07-19T10:00:00Z"
    }
  ],
  "repository": "username/repo-name"
}
```

### Activity Notifications
- **In-App Notifications** - Show in each app's admin interface
- **Central Dashboard** - Aggregate all app activity on mbernier.com
- **Email Notifications** - Optional email alerts for significant changes
- **Slack Integration** - Future: Slack notifications for team updates

---

## Admin Dashboard Features

### Application Management
- **Application Registry** - List and manage all registered apps
- **Status Monitoring** - Real-time status of all applications
- **Configuration Management** - Update app settings and privacy policies
- **User Management** - Manage authorized users and permissions

### Analytics & Reporting
- **Activity Dashboard** - Visual representation of app activity
- **Privacy Policy Analytics** - Track policy views and updates
- **GitHub Activity Reports** - Commit frequency and contributor analysis
- **System Health Monitoring** - API performance and error tracking

### Notification System
- **Real-time Updates** - Live notifications for app changes
- **Email Alerts** - Configurable email notifications
- **In-App Notifications** - Dashboard notifications for admins
- **Webhook Status** - Monitor GitHub webhook health

---

## Security Considerations

### OAuth Security
- **HTTPS Only** - All OAuth flows must use HTTPS
- **State Parameter** - CSRF protection for OAuth callbacks
- **Token Storage** - Secure storage of OAuth tokens
- **Scope Limitation** - Minimal required OAuth scopes

### API Security
- **Rate Limiting** - Prevent API abuse
- **Authentication** - JWT tokens for API access
- **Authorization** - Role-based access control
- **Input Validation** - Sanitize all API inputs

### Data Protection
- **Encryption** - Encrypt sensitive data at rest
- **Access Logging** - Log all admin actions
- **Audit Trail** - Track all system changes
- **Backup Strategy** - Regular encrypted backups

---

## Integration with Existing Systems

### mbernier.com Integration
- **Admin UI Extension** - Add to existing admin dashboard
- **User System** - Integrate with existing user authentication
- **Database** - Use existing PostgreSQL database
- **API Framework** - Leverage existing Next.js API routes

### External App Integration
- **OAuth Button** - Standard OAuth button for app admin interfaces
- **API Documentation** - Comprehensive API docs for app developers
- **SDK/Client Libraries** - JavaScript/TypeScript client libraries
- **Webhook Documentation** - GitHub webhook setup guides

---

## Success Metrics

### Registration Metrics
- **Time to Register** - < 5 minutes for new app registration
- **Registration Success Rate** - > 95% successful registrations
- **User Satisfaction** - > 4.5/5 rating for registration process

### Privacy Policy Metrics
- **Policy Generation Time** - < 30 seconds for policy generation
- **API Response Time** - < 200ms for policy retrieval
- **Policy Accuracy** - 100% compliance with legal requirements

### GitHub Integration Metrics
- **Webhook Reliability** - > 99.9% webhook delivery success
- **Activity Tracking** - Real-time commit tracking with < 1 minute delay
- **Notification Accuracy** - 100% accurate "since last visit" notifications

---

## Future Enhancements

### Phase 6: Advanced Features
- **Multi-language Support** - Privacy policies in multiple languages
- **Advanced Analytics** - Detailed app usage and performance analytics
- **Automated Compliance** - Automated GDPR/CCPA compliance checking
- **Integration Marketplace** - Third-party service integrations

### Phase 7: Scale & Performance
- **CDN Integration** - Global privacy policy distribution
- **Caching Optimization** - Advanced caching strategies
- **Load Balancing** - Horizontal scaling for high traffic
- **Monitoring & Alerting** - Advanced system monitoring

---

## Technical Requirements

### Backend Requirements
- **Node.js/Next.js** - API framework
- **PostgreSQL** - Database
- **Redis** - Caching and session storage
- **GitHub API** - GitHub integration
- **Google OAuth** - Authentication

### Frontend Requirements
- **React/Next.js** - Admin dashboard
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **React Hook Form** - Form handling

### Infrastructure Requirements
- **Vercel** - Hosting and deployment
- **Supabase** - Database and authentication
- **GitHub** - Source control and webhooks
- **Monitoring** - Error tracking and performance monitoring

---

## Contact & Support

**Primary Contact:** Matt Bernier (mkbernier@gmail.com)  
**Documentation:** [mbernier.com/docs/app-registry](https://mbernier.com/docs/app-registry)  
**API Documentation:** [mbernier.com/api/docs](https://mbernier.com/api/docs)  
**Support:** [mbernier.com/support](https://mbernier.com/support)

---

**Last Updated:** July 19, 2025  
**Next Review:** August 2, 2025 
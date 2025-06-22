---
title: "Is your Jira Cloud Ticket Hierarchy helping you?"
date: 2024-11-05T00:00:00.000Z
canonical_url: "https://mbernier.medium.com/is-your-jira-cloud-ticket-hierarchy-helping-you-d3476f8be59e"

# Enhanced SEO & Meta Fields
description: "Fix your messy Jira Cloud instance with proper ticket hierarchy design. Learn how to organize projects, epics, and initiatives for better team collaboration, clearer dependencies, and more accurate project estimates."
focus_keyword: "jira ticket hierarchy best practices"
secondary_keywords:
  [
    "jira cloud organization",
    "jira epic management",
    "jira initiative structure",
    "project management hierarchy",
    "jira configuration best practices",
  ]
meta_title: "Jira Ticket Hierarchy: Stop the Mess, Start Getting Results"

# Content Classification
categories:
  - Project Management
  - Productivity
  - Tools
tags:
  [
    "jira cloud",
    "ticket hierarchy",
    "project management",
    "team collaboration",
    "workflow design",
    "epic organization",
    "initiative planning",
    "agile methodology",
  ]
topic: "Project Management Tools"

# Media & Visual
image: ""
image_alt: "Jira ticket hierarchy diagram showing proper organization of initiatives, epics, and stories"
og_image: ""

# Article Metadata
author: "Matt Bernier"
reading_time: "8 min"
word_count: 1200
language: "en-US"
published: true

# Dates
created_date: "2024-11-05T00:00:00.000Z"
modified_date: "2024-11-05T00:00:00.000Z"
review_date: "2025-05-05"

# Social Media Optimization
social_title: "Your Jira Hierarchy is Broken - Here's How to Fix It"
social_description: "Stop doing more work for Jira than it does for you. This guide reveals the ticket hierarchy principles that transform chaotic instances into productivity machines."
twitter_card: "summary_large_image"
facebook_description: "Transform your messy Jira Cloud setup into an organized system that actually helps teams collaborate. Learn proper hierarchy design from someone who's seen it all."

# Schema.org Structured Data
schema_type: "Article"
schema_headline: "Jira Cloud Ticket Hierarchy Design for Better Team Productivity"
schema_keywords:
  [
    "jira hierarchy",
    "project management",
    "team productivity",
    "workflow organization",
    "agile tools",
  ]

# Content Features
table_of_contents: true
featured: true
newsletter_cta: true
tools_cta: true
comments_enabled: true

# Performance & Analytics
preload_image: false
amp_enabled: false
accelerated_mobile: false

# Content Status
status: "published"
visibility: "public"
content_quality: "high"

# External References
external_links:
  - title: "Original Medium Article"
    url: "https://mbernier.medium.com/is-your-jira-cloud-ticket-hierarchy-helping-you-d3476f8be59e"
    rel: "canonical"

# Technical SEO
robots: "index, follow"
sitemap_priority: 0.8
sitemap_changefreq: "monthly"

# Engagement Optimization
call_to_action: "Ready to redesign your Jira hierarchy for better team productivity?"
expected_engagement: "high"
target_audience: "product managers, engineering managers, scrum masters, jira administrators"

# Analytics & Tracking
google_analytics_event: "article_view"
conversion_goal: "newsletter_signup"
utm_campaign: "jira-optimization-content"
---

I have seen some messy Jira Cloud instances… like really messy. It is rare to get the opportunity to set up Jira from scratch, but I had just that opportunity once before and it solidified the importance of having a holistic view of the configuration. We got to see the impact on our teams of every configuration decision. We couldn't avoid every pothole. We learned as we went by making 2-way doors whenever possible. The result was that we created a configuration that worked way better than anything we had seen previously.

It is important to remember that just like tech debt, truly messy Jira instances were put in place with the best intentions by people who were doing their best. I have learned that most people set up Jira as a to-do list and then reactively adjusted it to solve new immediate problems.

I love iteration, but you have to have a wider goal. With any workflow or process, it's important to take a step back and look at the whole picture. Without this, you end up with conflicts and situations that are messy and hard to clean up. There are so many settings and options in Jira. The security and permissions structure alone can be mind-boggling.

If you have seen a messy Jira Cloud instance, you know exactly what I am talking about:

- **You do more work to use Jira than Jira does for you.**
- **There are too many ticket types and no one knows what to choose** — What's the difference between a Story and a Task anyways? (The funny thing here is story and task are both there by default)
- **Sub-tasks… just stop.** They goof up your sprint or kanban views. They are also way too easy to lose.
- **How do you track work across multiple teams?**
- **How do you make sure that work is done in the right order?**
- **How the hell do you estimate a project that involves multiple teams?**
- So many other problems…

For this article, I am focusing on ticket hierarchy. One of the problems with Jira is that everything affects everything else, so there are things I won't cover here. If I cover them in the future, I will link to them to avoid repeating myself too often. If there's something specific you want me to cover, let me know in the comments!

This is written with the best-case scenario in mind. You know your situation and team better than I do. As with anything Agile, you should take the theories and adjust accordingly so they work for your team and situation.

## My Principles for Configuring Jira

- Using Jira should make your job easier, not harder. If you're doing more for Jira than it is doing for you, your configuration needs to adjust
- Information should be intuitively discoverable. The configuration should allow information to be shared and discovered the same way, regardless of the project or team
- The hierarchy should support the information resolution needed at that level. Everyone involved in a project should be able to find what they need intuitively
- For context move up, for tactics go down — every level of the hierarchy has the information needed for that level based on the context provided at the level above.
- Items that live forever wear down a team's morale — everything must be completable
- Identifying Work In Progress and reducing it creates happier teammates, clarifies expectations, and creates better results for everyone

## Clarification for this article: Some quick definitions

I use specific words that may have different meanings in your world, so I want to clarify how I am using these words in this article.

**Project:** A bucket of tickets, usually built around a named feature or group of people.

**Ticket:** A hierarchical object in Jira representing some amount of work, tickets belong to projects.

**Task:** The smallest unit of work that an IC will work on. This usually correlates to a Story or Task Ticket Type in Jira.

**Set Up a Basic Hierarchy For IC Projects**
When I say Basic, I mean Basic AF:

- **Projects:** 1 project per team (often this is either a group of people or a feature/function that these people own)
- **Epics:** stack ranked buckets of related tasks to meet a specific milestone or goal, often defined by Acceptance Criteria
- **Stories** (or Tasks): individual work items that help you achieve the Epic's goals, with an Epic set as the parent.

The more stuff you shove into a project, the more likely the project is to create confusion and lose work.

## Projects are not just Epics!

Exactly.

It's rare that a single team's epic is all the work being done for a project. The result of this is often that a team does their work and surprises another team about the next steps with no heads up.

A good hierarchy and a little bit of planning can solve for this.

So far, we have only taken care of the work for a single team with their Epics and Stories. We need a way to link Epics from each team together, so we can see the wider project.

### Enter: Initiatives

The solution is to create a ticket type called anInitiative, not in the IC team's project, but in a separate planning or Product Team project. By making a new project specifically for Initiatives, you keep clutter out of the team's project and simultaneously create a central place for top-level management.

- **Initiative:** a collection of the milestones needed to be completed for a project.
  An epic can be a child of an Initiative, the same way a story can be a child of an Epic. Any ticket in Jira can have a parent in any project, which means that the Initiative in your planning project can have all the project epics as it's children.

Above, in the definition of an Epic I added the phrase **"…to meet a specific milestone or goal…"** Breaking up the work to follow the principle "everything must be completable," a project likely has multiple epics, and often different teams are responsible for them.

By linking all the Epics to a parent Initiative you can now see all the project work for all the involved teams in one place. You can also provide the context for all the Epics, regardless of team, at the Initiative level. This fulfills principles #2 and #3, above.

### Break up the Epics

Break up the buckets of dependent work into different epics — this is an iteration on the "milestones" concept I mentioned, but stick with me here. I'll give an example:

We want to create a user management interface, so each user can update their profile through the application. This will require work for Front End Engineering (FE), API team (API), and the Infra Team (Infra). The front end team relies on the API team to make the endpoints available, and API team relies on Infra so the endpoints are available in each development environment.

You can break the project up like this:

Initiative: User Profile

Due to Medium's Text editor, I will use indentation to show parallel and dependent efforts:

INFRA Epic: Deploy Profile API infra in Stage and Prod\*

API Epic: Create Endpoints for User Settings

FE Epic: Build User Settings Form

— API Epic: Deploy User Settings Endpoints Stage

— — FE Epic: Deploy and Test User Settings Form in Stage

— — — API Epic: Deploy User Settings Endpoints Prod

— — — — FE Epic: Milestone 1 Deploy and Test User Settings form in Prod

_\*makes an assumption that the infra is straightforward and can be deployed independently of the individual APIs being served._

## Why This works so well

This is visually more complicated than putting everyone's tickets into the same epic. However, you get quite a few benefits out of this:

Everyone can see the goal with Milestone 1, without digging into the individual tickets.
If there is a design document with the API contract and it is kept up to date, then each of the initial 3 Epics can be completed in parallel.
There are clear buckets of work for what needs to be done. Each one is small and clearly defined.
Using blocking links allows teams to see when their work is unblocked, it also shows teams who is next so they can notify them.
The smaller the epic, the more likely an estimate of the work is correct.

## Where this leads

There are so many things I want to mention here about ways to make this even better, but those will be future articles if people like what I am sharing. For example:

1. Notifying teams when their work is unblocked
2. Making it clear, without opening the epic or it's child tickets, that they are blocked
3. What to include in the Initiative Description to save everyone time and trouble
4. How to use this hierarchy to build reporting for Execs — helping them get what they need anytime they need it.
5. How this heirarchy works SO WELL with Advanced Roadmaps and all the wonderful benefits you get from the combination.

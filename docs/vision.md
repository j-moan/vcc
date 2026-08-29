# VCC Classroom Launcher

# Vision

## Purpose

The VCC Classroom Launcher exists to make classroom technology simple, visual, and teacher-centered.

It allows teachers to create and maintain engaging classroom experiences without requiring programming or web-development knowledge, while giving students a consistent, touch-friendly interface that keeps attention on learning rather than technology.

Teachers should think about teaching.

Students should think about learning.

The software should manage the technology behind the experience.

---

# Product Vision

The VCC Classroom Launcher is a visual classroom authoring and presentation platform.

It combines two complementary experiences:

- **Teacher Mode** — creates and maintains the classroom.
- **Student Mode** — presents the classroom to students.

Teachers work with familiar classroom concepts such as:

- Pages
- Sections
- Activities
- Images
- Videos
- Documents
- Websites
- Classroom organization

They should not need to understand:

- HTML
- CSS
- JavaScript
- JSON
- Git
- File paths
- Web servers
- Publishing infrastructure

Those implementation details belong to the software.

The product should feel like a classroom tool, not a web-development tool.

---

# Primary Users

## Students

Student Mode exists to provide direct access to classroom content.

Students should experience:

- Large visual navigation
- Simple and predictable layouts
- Consistent Home and Back navigation
- Fast response
- Touch-friendly interaction
- Clear visual organization
- Minimal distractions

The interface should make it obvious what students can select and how they can return to where they started.

Student Mode should remain focused on classroom interaction rather than editing or administration.

---

## Teachers

Teacher Mode exists to let teachers build and maintain the classroom.

Teachers should be able to:

- Create and organize classroom pages
- Add and arrange classroom activities and resources
- Organize content with sections
- Select classroom images, videos, and documents
- Preview changes before publishing
- Publish classroom updates deliberately
- Maintain the classroom without editing code or data files

The editor should encourage experimentation while protecting classroom structure and preserving working content.

---

# Core Experience

The intended teacher workflow is simple:

```text
Organize
   │
   ▼
Edit
   │
   ▼
Preview
   │
   ▼
Publish
```

The intended student workflow is even simpler:

```text
See
 │
 ▼
Touch
 │
 ▼
Learn
```

Complexity required to support these workflows should remain behind the interface.

---

# Design Principles

## Teacher First

The software should adapt to the teacher's classroom workflow.

Teachers should not need to learn the application's internal architecture in order to use it successfully.

Teacher-facing terminology should describe classroom actions rather than software objects.

---

## Student Simplicity

Students should interact with learning content, not application complexity.

Every Student screen should be visually consistent and immediately understandable.

Controls should be limited to those needed for the classroom experience.

---

## Visual Communication

Images should communicate before text whenever practical.

Large touch targets, recognizable images, clear grouping, and consistent placement are more important than maximizing information density.

The interface is designed for classroom displays and students who benefit from strong visual communication.

---

## Classroom Reliability

The classroom should continue to function predictably during normal use.

A teacher should be able to make changes without risking the currently published classroom.

Editing and publishing remain separate so changes can be reviewed before students receive them.

Public Student access should not depend on the classroom editing computer being continuously available.

---

## Hide Technical Complexity

Teachers and students should not need to understand how classroom content is stored, served, or published.

Storage, asset management, validation, rendering, and publishing are implementation responsibilities.

The user experience should expose classroom concepts rather than technical mechanisms.

---

## Preserve Working Behavior

New capabilities should extend the classroom without unnecessarily disrupting existing content.

Backward compatibility should be preserved whenever practical.

A new feature should not require teachers to rebuild working classroom pages simply because the implementation evolves.

---

## Build for Real Classroom Needs

Features should solve demonstrated classroom needs.

The product should not accumulate controls or options merely because they are technically possible.

A simpler tool that supports the actual classroom workflow is preferable to a more configurable tool that is harder to use.

---

# Classroom Content

The VCC Classroom Launcher should support the types of resources teachers commonly need to present to students.

Current classroom capabilities include:

- Navigation between classroom pages
- Visual sections
- YouTube videos
- Locally managed videos
- Websites
- PDFs
- Images
- Placeholder tiles for visual organization

These content types should share a consistent classroom experience even when their underlying technologies differ.

New content types should be added when they provide meaningful classroom value.

---

# Classroom Assets

Teachers should work with classroom resources as recognizable files and visual choices rather than storage paths.

Classroom assets may include:

- Images
- Videos
- PDFs
- Other supported classroom resources

Teacher Mode should make these resources available through simple libraries and selection interfaces.

Where those files physically reside should remain invisible to the teacher.

---

# Working and Published Classrooms

The product intentionally distinguishes between the classroom being edited and the classroom students currently see.

## Working Classroom

The Working Classroom is where the teacher makes changes.

It should support:

- Editing
- Asset updates
- Validation
- Preview

Changes to the Working Classroom should not automatically alter the public classroom.

---

## Published Classroom

The Published Classroom is the version intended for student use.

Publishing is an explicit teacher decision.

This separation allows a teacher to:

1. Make changes safely.
2. Preview those changes.
3. Publish when satisfied.

The implementation of publishing may evolve without changing this teacher workflow.

---

# Preview

Preview is an essential part of classroom authoring.

Teachers should be able to experience the Working Classroom through the same Student interface students use.

Preview should answer a simple question:

> Is this what I want my students to see?

Preview should not require publication and should not itself change the Published Classroom.

---

# Classroom Server

A dedicated classroom server supports Teacher Mode and the Working Classroom.

Its presence should be largely invisible to the teacher.

The server exists to provide capabilities such as:

- Persistent classroom editing
- Working project storage
- Classroom asset management
- Asset catalogs
- Publishing
- Future backup and restore

The teacher should interact with these capabilities through Teacher Mode rather than through server administration.

---

# Public Student Access

The Published Classroom is distributed independently of the classroom editing environment.

This provides an important product characteristic:

> Students can use the published classroom even when the classroom editing server is unavailable.

The publishing technology may change in the future, but this separation between authoring and public presentation should remain.

---

# Protection and Recovery

As the classroom becomes more valuable, protecting teacher work becomes increasingly important.

The product should support recovery without making backup management a technical task.

The intended direction is to provide:

- Automatic restore points associated with publishing
- Teacher-named restore points for important classroom states
- Restoration into the Working Classroom first
- Preview before republishing a restored classroom

Recovery should protect teacher work without automatically changing what students currently see.

---

# Growth Principles

The current system is intentionally focused on one classroom and a straightforward teacher/student workflow.

Future expansion may include capabilities such as:

- Multiple classroom projects
- Multiple teachers
- Authentication
- Classroom templates
- Shared asset libraries
- Import and export
- Cloud-hosted authoring
- District deployment
- Collaborative editing
- Other classroom services

These are possible directions, not requirements for the current product.

Future growth should preserve the core experience rather than force a redesign of it.

---

# Product Boundary

The VCC Classroom Launcher is not intended to become a general-purpose learning management system.

Its primary purpose is visual classroom access and classroom authoring.

Features should be evaluated by asking whether they improve the teacher's ability to organize and present classroom experiences or the student's ability to access them.

Capabilities outside that purpose should be added cautiously.

---

# Long-Term Goal

The VCC Classroom Launcher is more than a classroom website.

It is a classroom authoring and presentation platform designed around the people using it.

Its long-term value comes from making increasingly capable classroom technology feel increasingly simple.

Students should experience learning, not software.

Teachers should experience teaching, not technology.

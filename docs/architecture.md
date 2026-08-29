# VCC Classroom Launcher

# Architecture

## Purpose

This document defines the software architecture of the VCC Classroom Launcher.

It describes how the application is organized, how its major systems interact, and the architectural principles that guide future development.

Unlike implementation files, this document describes responsibilities rather than specific source files whenever practical. JavaScript modules may evolve over time, but the responsibilities defined here should remain stable.

This document focuses on _how_ the application is organized rather than _what_ it displays.

---

# Architectural Goals

The architecture is designed around several primary goals.

## Simplicity

The application should remain understandable and maintainable by a single developer.

Complexity should only be introduced when it provides measurable long-term value.

Whenever possible:

- One responsibility
- One implementation
- One location

is preferred over clever or highly abstract designs.

---

## Reliability

Student Mode should remain operational whenever practical.

Invalid classroom projects should be detected before rendering begins.

Missing assets should degrade gracefully rather than preventing classroom use.

Errors should be isolated whenever possible.

The published classroom should remain independent of Teacher Mode availability.

---

## Maintainability

The application should evolve by replacing or extending individual systems rather than redesigning the entire application.

Future enhancements should require modifying as few existing components as possible.

Backward compatibility should be preserved when practical, particularly for existing classroom project data.

---

## Modularity

Every major subsystem should have one primary responsibility.

Examples include:

- Loading
- Validation
- Rendering
- Editing
- Publishing
- Asset management
- Content actions

Subsystems should communicate through clearly defined interfaces rather than directly manipulating each other's internal implementation.

---

## Data Driven

Student Mode should never contain hard-coded classroom content.

Everything displayed to students originates from project data.

Teacher Mode exists to modify project data rather than modify the runtime.

Static application interface elements may exist in HTML, but classroom-specific content belongs in project data.

---

## Storage Independence

Project data should remain logically independent of where it is stored.

The application should not embed storage-specific paths inside project data.

Storage implementations may evolve between:

- Classroom server storage
- GitHub
- Cloud storage
- District storage
- Other project repositories

Asset helper and publishing systems isolate these storage differences from project data.

---

# Architectural Principles

## Single Responsibility

Every subsystem should perform one clearly defined job.

Examples include:

- Project Loader loads projects.
- Validators validate projects.
- Renderers create user interface.
- Actions launch classroom content.
- Teacher Mode edits projects.
- Publishing distributes projects.
- Asset Helpers resolve asset locations.

Responsibilities should not unnecessarily overlap.

---

## Separation of Concerns

The following concerns remain independent:

- Project editing
- Project storage
- Project loading
- Validation
- Rendering
- Asset management
- Publishing
- Content launching
- User interface

Each system should communicate through defined boundaries rather than depending on another system's implementation details.

---

## Composition Over Duplication

Information should exist in one location whenever practical.

For example:

Navigation Entries reference Containers.

Navigation labels are obtained from the referenced Container rather than unnecessarily duplicated inside Navigation Entries.

This minimizes synchronization problems and simplifies editing.

---

## Data Before Presentation

Project data defines classroom content.

Renderers determine how that content appears.

Changing presentation should not require changing project data.

Changing project data should not require changing presentation code.

---

## Implementation Hiding

Subsystems should expose simple interfaces while hiding implementation details.

Examples include:

Asset helper functions determine where assets are located.

Renderers do not need to know whether an asset is being loaded from the working library or the published site.

Teacher Mode does not need to know how individual Student content viewers are implemented.

Student Mode does not need to know how published data reached GitHub Pages.

---

## Graceful Degradation

Whenever practical, failures should produce usable behavior rather than application failure.

Examples include:

- Missing images display the default tile resource.
- Missing classroom pages are skipped or reported cleanly.
- Missing documents generate classroom-friendly messages.
- Invalid content targets generate understandable messages.
- Asset validation produces warnings where appropriate rather than unnecessarily preventing application startup.

---

## Evolution Without Rewrite

The architecture should allow individual systems to evolve independently.

Examples include:

- Supporting multiple teachers
- Adding authentication
- Adding automatic backups
- Replacing GitHub Pages with another public host
- Adding cloud publishing
- Adding additional content types

These enhancements should extend or replace individual architectural layers rather than require redesign of the application.

---

# Core Concepts

## Project

A Project represents an entire classroom.

A Project contains:

- Containers
- Layouts
- Layout Entries
- Classroom metadata
- Relationships
- Classroom settings

The Project contains the information required to present a classroom experience.

---

## Container

A Container represents one classroom page.

Containers define classroom hierarchy.

Each Container owns:

- Page information
- Layout
- Metadata
- Navigation relationships

Containers define navigation structure.

They do not define presentation implementation.

---

## Layout

Every Container owns a Layout.

A Layout is an ordered collection of Layout Entries.

Layouts define presentation order.

They do not define classroom hierarchy.

---

## Layout Entry

Every visible classroom item displayed within a page layout is represented by a Layout Entry.

Current actively supported classroom entry categories include:

- Navigation
- Section
- YouTube Video
- Local Video
- PDF
- Website
- Image
- Placeholder

The underlying project type names intentionally distinguish between the two video implementations:

```text
video       = YouTube video
localVideo  = locally stored video file
```

The existing `video` type remains the YouTube type for backward compatibility with previously created classroom data.

Additional entry types should be added without requiring architectural redesign.

Legacy project data may contain older entry types that are no longer exposed by the current Teacher interface. Compatibility with legacy data should be considered before removing runtime support.

---

# Student Mode

Student Mode presents an existing classroom.

Student Mode never edits project data.

Student Mode is responsible for:

- Loading classroom data
- Navigation
- Rendering
- Launching classroom content
- Viewer management
- Presenting messages
- Detecting published classroom updates

Student Mode operates in two environments:

1. Published Student Mode
2. Local Student Preview

Both use the same Student application and project structure.

---

# Teacher Mode

Teacher Mode creates and modifies classroom projects.

Teacher Mode operates against the authoritative working project and working asset library hosted on the classroom server.

Teachers should never need to edit JavaScript, JSON, asset catalogs, or filesystem paths directly.

---

# Project Model

The Project Model is the editable representation of a classroom.

Teacher Mode performs project modifications through the Project Model.

Typical operations include:

- Create Container
- Rename Container
- Delete Container
- Add Layout Entry
- Delete Layout Entry
- Move Layout Entry
- Modify Properties

The Project Model is responsible for maintaining project integrity while editing.

---

# System Architecture

The Student runtime follows this conceptual architecture:

```text
Project Source
      │
      ▼
Project Loader
      │
      ▼
Validation
      │
      ▼
Application Controller
      │
      ▼
Renderers
      │
      ▼
Content Actions
      │
      ▼
Browser / Viewer
```

Each layer performs a distinct responsibility.

Information should flow through defined interfaces.

Lower-level systems should not unnecessarily depend upon higher-level systems.

---

# Classroom Server Architecture

The classroom server is the authoritative editing environment.

The current classroom server is hosted on the VCC Beelink system.

It provides:

- Teacher Mode
- Local Student Preview
- Working classroom project data
- Master classroom assets
- Asset catalogs
- VCC server API
- Publishing services

The classroom server separates the editable classroom environment from the publicly published classroom.

---

# Working Project

The authoritative Working Project is stored on the classroom server as:

```text
/srv/vcc/assets/data/data.js
```

This file contains the classroom definition used by Teacher Mode and local Student Preview.

Teacher Mode reads and writes the Working Project through the classroom server API.

The browser is not the authoritative project storage location.

---

# Published Project

The public classroom uses:

```text
assets/data/data.js
```

inside the published GitHub repository.

This represents the classroom presented by the public Student Mode.

The Working Project and Published Project use the same classroom data structure.

Their difference is lifecycle:

```text
Working Project
      │
      │ Publish
      ▼
Published Project
```

Editing the Working Project does not immediately change the public classroom.

Publishing is an explicit operation.

---

# Project Loading

The Project Loader is responsible for obtaining a Project.

The Project Loader should know:

- Where the appropriate project originates
- How project data is obtained
- How project data becomes the runtime Project representation

The remainder of the application should not depend on the physical project storage location.

---

# Validation

Validation exists between project loading and runtime execution and also supports Teacher Mode editing.

Validation includes independent concerns such as:

- Structural validation
- Asset validation

Whenever practical:

- Structural problems prevent invalid projects from being published or rendered.
- Asset problems generate warnings when the classroom can otherwise remain usable.

Validation should protect project integrity without unnecessarily preventing classroom operation.

---

# Application Controller

The Student Application Controller coordinates runtime behavior.

Responsibilities include:

- Startup
- Navigation
- Runtime state
- Viewer coordination
- User messages
- Content launching
- Published-project refresh

The controller coordinates behavior rather than implementing presentation details.

---

# Rendering Architecture

Renderers transform project data into browser elements.

Renderers contain presentation logic.

They do not:

- Edit projects
- Store projects
- Publish projects
- Implement content-specific viewers

Current rendering responsibilities include:

- Layout rendering
- Navigation rendering
- Section rendering
- Content rendering
- Tile rendering

Additional renderers may be added without affecting existing systems.

---

# Tile Rendering

The Tile Renderer provides the reusable visual component used throughout Student Mode.

Every tile shares:

- Shape
- Layout
- Image handling
- Label styling
- Interaction behavior

Navigation tiles and content tiles should appear visually consistent.

Differences between tile types should come from their content, labels, and actions rather than entirely separate visual implementations.

---

# Navigation Architecture

Navigation is Container based.

Student Mode never navigates directly to Layout Entries.

Navigation follows:

```text
Current Container
        │
Navigation Entry Selected
        │
Referenced Child Container
        │
Render Child Container
```

The Home control returns to the root Container.

The Back control returns to the parent Container.

Browser page reloads should not occur during classroom navigation.

Navigation controls should remain optimized for the physical classroom environment and touch-screen use.

---

# Action Architecture

Content-specific behavior is isolated from layout rendering.

Examples include:

- YouTube video playback
- Local video playback
- PDF viewing
- Website launching
- Image viewing

Student Mode determines the content type and delegates the appropriate behavior.

Content actions own their content-specific lifecycle and cleanup.

This keeps content implementation separate from classroom navigation and rendering.

---

# Video Architecture

The application supports two distinct video sources.

## YouTube Video

Project type:

```text
video
```

The `video` type is retained for YouTube content because existing classroom project data already uses this type.

A YouTube entry stores a YouTube URL or compatible video identifier as its target.

The YouTube action is responsible for:

- Interpreting the YouTube target
- Opening the YouTube player
- Managing playback
- Closing the player
- Releasing player resources

---

## Local Video

Project type:

```text
localVideo
```

A Local Video entry references a filename from the teacher-managed Video Library.

Example:

```text
classroom-song.mp4
```

The project stores the filename rather than a physical path.

Asset Helpers resolve the filename into the correct working or published video location.

Local video playback uses the browser's HTML5 video player.

The Local Video viewer is responsible for:

- Opening the local video
- Starting playback when permitted by the browser
- Providing standard playback controls
- Closing the player
- Stopping playback
- Releasing the loaded video resource

---

## Video Compatibility Rule

The distinction between:

```text
video
```

and:

```text
localVideo
```

is intentional.

The existing `video` type must not be redefined as local video because doing so would invalidate existing YouTube classroom entries.

New content-type names should preserve existing project semantics whenever practical.

---

# Viewer Architecture

Large classroom resources open in dedicated viewers rather than replacing the classroom page.

Current viewer behavior includes:

- YouTube Video Viewer
- Local Video Viewer
- PDF Viewer
- Image Viewer

Other content types may launch through browser-native behavior where appropriate.

Each dedicated viewer should:

- Occupy most of the available screen
- Display the content title
- Provide an obvious Close control
- Return the student to the same classroom page
- Release active resources when closed

Viewer lifecycle belongs to the content action/controller responsible for that content.

---

# Message Architecture

Student Mode provides temporary user messages.

Messages should:

- Be brief
- Be classroom friendly
- Automatically disappear where appropriate
- Never expose unnecessary implementation details

Messages should be coordinated by the Student application rather than individual renderers independently creating their own messaging systems.

---

# Asset Architecture

Teacher-managed assets are intentionally separated from application resources.

Conceptually:

```text
resources/
    default-header.jpg
    default-tile.jpg

assets/
    data/
    images/
    videos/
    pdfs/
    powerpoints/
```

---

# Resources

Resources belong to the application itself.

Examples include:

- Default images
- Built-in graphics
- Static interface assets

Teachers do not manage application resources.

Resources do not appear in teacher-managed asset catalogs.

---

# Classroom Assets

Assets belong to classroom projects.

Examples include:

- Images
- Videos
- PDFs
- PowerPoint files retained in the asset structure

Teacher Mode manages supported classroom assets through catalogs and asset pickers.

Project data stores logical filenames.

Project data should not store environment-specific asset paths.

---

# Master Asset Library

The classroom server maintains the authoritative working asset library under:

```text
/srv/vcc/assets
```

This contains the working classroom data and teacher-managed classroom assets.

Conceptually:

```text
/srv/vcc/assets/
    data/
    images/
    videos/
    pdfs/
    powerpoints/
```

This working asset library is separate from the asset copy contained inside the published Git repository.

---

# Asset Helpers

Asset Helpers resolve logical filenames into environment-specific paths.

For example, project data may contain:

```text
alphabet.jpg
```

The Asset Helper determines whether the runtime should load it from the working asset library or the published asset library.

This isolates storage knowledge from:

- Project data
- Renderers
- Content actions

---

# Working and Published Asset Resolution

Teacher Mode and Student Preview operate against the master working assets.

Conceptually:

```text
Teacher Mode
Student Preview
      │
      ▼
/master-assets
```

Published Student Mode operates against the assets distributed with the public site:

```text
Published Student
      │
      ▼
assets
```

Asset Helpers own this distinction.

Project data remains identical in both environments.

---

# Student Preview

Student Preview uses the same Student application used by the published classroom.

Preview Mode is identified through the Student URL:

```text
student.html?preview=true
```

Preview resolves classroom assets from the working master asset library.

This allows a teacher to test unpublished classroom changes before publishing them.

The Preview environment should behave as closely as practical to Published Student Mode while using working data and assets.

---

# Asset Catalog Architecture

Teacher-managed assets are discovered through generated catalogs.

Current catalog categories include:

```text
images
pdfs
videos
powerpoints
```

Each asset directory may contain a generated:

```text
catalog.js
```

Catalogs provide:

- Filename discovery
- Search support
- Picker population

Catalogs expose logical filenames rather than physical storage paths.

---

# Update Library

Teacher Mode provides an Update Library operation.

Update Library asks the classroom server to rescan the master asset directories and regenerate the asset catalogs.

The updated catalog information is then made available to Teacher Mode.

This allows files placed into the master asset library to become available to teacher asset pickers without manually editing project data.

---

# Asset Picker Architecture

Teacher Mode selects supported assets through picker dialogs.

Current picker functionality includes:

- Image Picker
- PDF Picker
- Video Picker

Asset pickers:

- Load from asset catalogs
- Support selection of available files
- Return filenames only
- Never return environment-specific storage paths

The Project stores the selected filename.

Asset Helpers determine where that file is loaded from at runtime.

---

# Teacher Mode Architecture

Teacher Mode is a separate application built on the same Project structure used by Student Mode.

Student Mode presents Projects.

Teacher Mode modifies Projects.

Both operate on the same classroom definition.

Teacher Mode communicates with the classroom server for persistent project and asset operations.

---

# Teacher Mode Goals

Teacher Mode allows a non-technical teacher to build and maintain the classroom without editing source code.

Current Teacher Mode supports core operations including:

- Creating subpages
- Deleting pages
- Editing page/navigation properties
- Adding classroom tiles
- Adding sections
- Editing layout entries
- Deleting supported layout entries
- Reordering layout entries
- Updating the asset library
- Previewing classroom behavior
- Publishing the classroom

Teachers should not need to understand the underlying JSON or JavaScript representation.

---

# Teacher Workspace

The Teacher workspace is divided into three primary areas.

```text
Header

--------------------------------------------

Page Tree | Page Layout

--------------------------------------------

Editing Toolbar
```

The workspace separates:

- Classroom hierarchy
- Current page contents
- Editing commands

This organization allows the teacher to focus on one task at a time.

---

# Container Tree

The Container Tree represents classroom hierarchy.

The tree should:

- Display page titles
- Display hierarchy
- Support expand and collapse
- Indicate inactive pages
- Clearly identify the selected page

The tree represents navigation hierarchy.

It does not represent layout order.

---

# Page Layout Editor

The Page Layout panel displays the ordered contents of the selected page.

Current Teacher-created entries include:

- Sections
- Navigation
- YouTube Videos
- Local Videos
- PDFs
- Images
- Websites
- Placeholders

Each row should provide enough information for the teacher to identify the item being edited.

The layout editor represents presentation order rather than navigation hierarchy.

---

# Navigation Integrity

Navigation entries represent relationships to child Containers.

Navigation entries should not be independently deleted in a way that leaves orphaned Containers.

Deleting a page is responsible for removing the navigation relationship associated with that page.

Teacher Mode should protect these structural relationships rather than allowing edits that create inconsistent project hierarchy.

---

# Validation During Editing

Teacher Mode uses validation to protect project integrity.

Validation categories include:

## Structural Validation

Examples:

- Invalid hierarchy
- Circular references
- Missing Containers
- Invalid navigation
- Duplicate identifiers
- Unsupported entry structures

Structural problems should prevent invalid publication where appropriate.

---

## Asset Validation

Examples:

- Missing images
- Missing PDFs
- Missing videos

Asset problems should generate useful warnings whenever the classroom can otherwise remain operational.

---

# Server API

The classroom server provides a small application API used by Teacher Mode.

Its responsibilities include:

- Health/status communication
- Reading the Working Project
- Writing the Working Project
- Rebuilding asset catalogs
- Publishing the classroom

The server API forms the boundary between the browser-based Teacher application and server-side storage/publishing operations.

Teacher Mode should request these operations through the API rather than directly manipulating server files.

---

# Publishing Architecture

Publishing is intentionally separated from editing.

Teacher Mode modifies the Working Project.

Publishing distributes a validated snapshot of the working classroom to the public Student environment.

Conceptually:

```text
Working Classroom
       │
       ▼
Update Catalogs
       │
       ▼
Prepare Published Assets
       │
       ▼
Git Repository
       │
       ▼
GitHub
       │
       ▼
GitHub Pages
       │
       ▼
Published Student Mode
```

Publishing is an explicit teacher action.

Editing alone should never modify the public classroom.

---

# Current Publishing Pipeline

The classroom server currently performs the publication process.

The publishing operation:

1. Rebuilds the classroom asset catalogs.
2. Copies the working asset library into the repository's published `assets` structure.
3. Stages the published asset changes in Git.
4. Determines whether publishable asset changes exist.
5. Commits the changes when necessary.
6. Pushes the changes to GitHub.
7. GitHub Pages serves the updated public Student site.

If there are no publishable changes, Teacher Mode reports that the classroom is already up to date.

Publishing errors are reported to the teacher without silently claiming success.

---

# GitHub Deployment

GitHub provides two current architectural functions:

## Source Control

The VCC application source is maintained in Git.

## Public Classroom Hosting

GitHub Pages hosts the public Student application and its published classroom assets.

The public Student site does not depend on the classroom Beelink being available.

This is an important reliability boundary:

```text
Beelink
  = Editing and Publishing Environment

GitHub Pages
  = Public Student Environment
```

A classroom server outage therefore does not inherently remove the already-published Student classroom.

---

# Published Classroom Refresh

Published Student Mode periodically checks the published classroom data for changes.

The runtime checks:

```text
assets/data/data.js
```

without relying on a cached copy.

When the published project changes:

1. The new project data is detected.
2. Student Mode loads the updated classroom.
3. The current classroom interface is rerendered.
4. A classroom-friendly update message is displayed.

This allows an already-open Student classroom to receive newly published classroom content without requiring a manual browser reload.

Student Preview does not perform this published-project polling behavior.

---

# Runtime Pipeline

Published Student Mode conceptually performs:

```text
Published Project
       │
       ▼
Project Loading
       │
       ▼
Validation
       │
       ▼
Application Initialization
       │
       ▼
Container Rendering
       │
       ▼
User Interaction
       │
       ├── Navigation
       ├── Content Actions
       └── Published Project Refresh
```

Once initialized, normal classroom navigation operates in memory.

Navigation between Containers does not reload the browser.

---

# Current Deployment Architecture

The deployed architecture is:

```text
                 CLASSROOM SERVER
                     Beelink
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   Teacher Mode    Working Project   Master Assets
                        │                │
                        └───────┬────────┘
                                │
                                ▼
                         Student Preview
                                │
                                │ Publish
                                ▼
                         Publishing Service
                                │
                                ▼
                          Git Repository
                                │
                                ▼
                             GitHub
                                │
                                ▼
                          GitHub Pages
                                │
                                ▼
                     Published Student Mode
```

This separation provides:

- Safe editing
- Local preview
- Explicit publication
- Public availability independent of the classroom server
- Source-controlled published content

---

# Architectural Boundaries

Each major subsystem owns a primary responsibility.

| System | Responsibility |
| --- | --- |
| Project Loader | Obtain classroom Project |
| Validators | Verify Project integrity |
| Renderers | Create classroom interface |
| Content Actions | Launch and manage classroom content |
| Project Model | Maintain editable Project |
| Teacher Mode | Provide classroom editing interface |
| Server API | Provide persistent classroom operations |
| Publishing | Produce and distribute published classroom |
| Asset Helpers | Resolve environment-specific asset locations |
| Asset Catalogs | Describe available teacher-managed assets |

No subsystem should unnecessarily assume responsibility belonging to another.

---

# Future Systems

The current architecture intentionally leaves room for future expansion.

Possible future systems include:

- Automatic backups
- Restore points
- User authentication
- Multiple teachers
- Multiple classroom sites
- Classroom templates
- Expanded asset library management
- Version history
- Undo / Redo
- Shared classroom repositories
- District deployment
- Cloud synchronization
- Classroom analytics

These systems should extend existing architectural boundaries rather than bypass them.

---

# Backup Architecture Direction

Future backup functionality should protect the complete working classroom rather than project data alone.

The authoritative backup scope should include:

```text
/srv/vcc/assets
```

because classroom integrity depends on both:

- Project data
- Classroom assets

The planned backup model distinguishes between:

- Automatic restore points associated with publishing
- Manually named saved restore points

Restoring a backup should restore the Working Classroom first.

The teacher should then be able to:

1. Review the restored classroom.
2. Open Student Preview.
3. Explicitly Publish when satisfied.

Restore operations should not automatically change the public classroom.

---

# Architectural Rules

The following rules should guide future development.

## Project data stores logical information only.

Never store environment-specific asset paths inside project data.

---

## Resources belong to the application.

Assets belong to classroom projects.

Application resources should not appear inside teacher-managed asset catalogs.

---

## Working and Published environments remain separate.

Teacher Mode edits the Working Classroom.

Preview presents the Working Classroom.

Published Student Mode presents the Published Classroom.

---

## Editing and publishing remain independent.

Editing changes the Working Project.

Publishing distributes it.

Student Mode presents it.

---

## Publishing remains explicit.

A teacher edit should never automatically change the public classroom.

The teacher should be able to Preview before Publish.

---

## Storage should remain replaceable.

Changing storage or public hosting should not require redesign of:

- Project data
- Renderers
- Validators
- Content actions

Storage-specific knowledge belongs at defined architectural boundaries.

---

## Presentation and project data remain separate.

Changing how something looks should not require changing project data.

Changing project data should not require changing presentation logic.

---

## Preserve backward compatibility when practical.

Existing project data should not be invalidated merely to make naming or implementation cleaner.

The `video` / `localVideo` distinction is an example of this rule.

---

## New features should reuse existing systems.

New functionality should extend the architecture rather than duplicate it.

Whenever practical:

- Reuse dialogs
- Reuse renderers
- Reuse asset helpers
- Reuse pickers
- Reuse validation
- Reuse content-action patterns

before introducing new implementations.

---

## Classroom usability drives presentation decisions.

The application is designed for a large classroom touch display.

Presentation and control placement should therefore prioritize:

- Touch accessibility
- Large interaction targets
- Minimal classroom disruption
- Simple navigation
- Clear feedback

These are presentation concerns and should generally be implemented without changing the underlying Project structure.

---

# Summary

The VCC Classroom Launcher uses a deliberately separated working and published architecture.

The classroom server provides the authoring environment:

```text
Teacher Mode
Working Project
Master Assets
Student Preview
Publishing
```

GitHub Pages provides the public classroom environment:

```text
Published Project
Published Assets
Student Mode
```

Project data remains independent of these physical storage locations.

The architecture separates:

- Editing
- Storage
- Loading
- Validation
- Rendering
- Content actions
- Assets
- Publishing
- Presentation

This allows the application to evolve without requiring major architectural redesign.

The guiding architectural principle remains:

> **Projects define classrooms. Student Mode presents Projects. Teacher Mode creates Projects. Publishing distributes Projects.**

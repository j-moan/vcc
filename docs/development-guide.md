# VCC Classroom Launcher

# Development Guide

## Purpose

This document defines the development practices used by the VCC Classroom Launcher.

The Architecture document defines how the application is organized. This guide defines how the project should be changed, tested, documented, and maintained.

Its purpose is to keep development incremental, understandable, reliable, and consistent with the architecture while the application continues to evolve.

---

# Development Philosophy

The VCC Classroom Launcher is developed incrementally.

The preferred development cycle is:

1. Identify the problem or desired behavior.
2. Understand the existing implementation before changing it.
3. Agree on the simplest design that fits the architecture.
4. Make a small, focused change.
5. Test the change immediately.
6. Correct any problems before expanding the change.
7. Continue in small increments until the feature is complete.
8. Update durable documentation when the resulting design or architecture has changed.
9. Commit completed, working functionality.

Design discussion should occur before implementation when a choice has meaningful architectural consequences.

Documentation does not need to predict every implementation detail before experimentation. When implementation and testing clarify the correct design, the durable documentation should be updated to describe the resulting system accurately.

The code and documentation should agree before a significant feature is considered complete.

---

# Documentation Hierarchy

Each project document has a specific responsibility.

## Vision.md

Defines the long-term purpose and direction of the application.

---

## Architecture.md

Defines the software architecture.

Responsibilities include:

- System organization
- Runtime architecture
- Teacher Mode architecture
- Classroom server architecture
- Asset architecture
- Publishing architecture
- Deployment architecture

Architecture.md should describe the system that actually exists as well as durable architectural rules that guide future development.

---

## Domain-Model.md

Defines the logical classroom model.

Responsibilities include:

- Project
- Containers
- Layouts
- Layout Entries
- Assets
- Relationships
- Validation rules

Changes to the meaning or structure of project data should be reflected here.

---

## UI-Standards.md

Defines visual and interaction standards used throughout Student Mode and Teacher Mode.

Presentation decisions that affect classroom usability should be documented here rather than in Architecture.md unless they have architectural significance.

---

## Editor-Design.md

Defines the Teacher editing experience.

Changes to Teacher workflow, editing commands, dialogs, or interaction patterns should be reflected here when they represent durable behavior.

---

## Roadmap.md

Defines planned development work and future priorities.

Completed work should not remain described as future functionality.

---

## Architecture-Decision-Record.md

Records significant architectural decisions and the reasoning behind them when preserving that reasoning will be useful later.

Not every implementation change requires an architecture decision record.

---

# Development Principles

Every implementation should follow these principles.

## Preserve Separation of Responsibilities

Do not combine unrelated responsibilities into a single component merely because doing so is convenient for one change.

Examples of separate responsibilities include:

- Loading
- Validation
- Rendering
- Editing
- Project persistence
- Publishing
- Asset management
- Content actions

Each subsystem should remain focused on its primary responsibility.

---

## Prefer Extension Over Replacement

Whenever practical:

- Extend existing systems.
- Avoid duplicate implementations.
- Reuse existing dialogs.
- Reuse renderers.
- Reuse asset helpers.
- Reuse validation patterns.
- Reuse content-action patterns.

Large architectural rewrites should be rare.

A new feature should not trigger unrelated refactoring unless the existing design genuinely prevents a clean implementation.

---

## Make the Smallest Useful Change

Prefer focused changes that can be understood and tested independently.

During hands-on development:

- Change one logical behavior at a time.
- Test it.
- Confirm the result.
- Then proceed to the next behavior.

Several closely related edits may be made together when they form one testable change.

Avoid large batches of speculative changes that make failures difficult to isolate.

---

## Understand Before Refactoring

Working code should not be reorganized simply because another structure appears cleaner.

Before changing an existing implementation:

1. Determine what behavior it currently supports.
2. Determine whether existing project data depends on that behavior.
3. Identify backward-compatibility consequences.
4. Decide whether extension is safer than replacement.

The existing YouTube `video` type is an example of this principle. Local video support was added as `localVideo` rather than redefining `video` and breaking existing classroom data.

---

## Protect Existing Behavior

Working functionality should not regress while adding new functionality.

Whenever practical:

- Add the new behavior.
- Preserve existing behavior.
- Test both.

Refactoring should not change classroom behavior unless that change is intentional.

Backward compatibility should be preserved when its cost is reasonable.

---

# Student Mode Guidelines

Student Mode should remain focused on presenting classrooms.

Student Mode may:

- Load classroom project data.
- Validate runtime data.
- Render Containers and Layout Entries.
- Navigate between Containers.
- Launch classroom content.
- Manage content viewers.
- Present classroom-friendly messages.
- Detect updates to the published classroom.

Student Mode should never:

- Edit project data.
- Modify project structure.
- Publish classroom content.
- Depend on Teacher Mode.
- Contain server-side publishing logic.

Published Student Mode should remain usable independently of the classroom editing server.

---

# Teacher Mode Guidelines

Teacher Mode provides the classroom editing experience.

Teacher Mode should:

- Present the editable classroom structure.
- Modify the Project through the Project Model.
- Use the classroom server API for persistent project operations.
- Use asset catalogs and pickers rather than requiring filenames to be typed manually where practical.
- Allow the teacher to Preview before Publish.
- Protect project integrity during editing.

Teacher Mode should not:

- Require teachers to edit JSON or JavaScript.
- Embed server filesystem paths in project data.
- Directly implement Git operations in browser code.
- Bypass the server API for persistent server-side operations.

---

# Working Project Guidelines

The authoritative Working Project is maintained by the classroom server.

Current working project:

```text
/srv/vcc/assets/data/data.js
```

Teacher Mode reads and writes the Working Project through the server API.

The browser is not the authoritative storage location.

Changes to persistence should preserve the distinction between:

- The editable Working Project
- The publicly Published Project

Editing should not automatically modify the published classroom.

---

# Project Data Guidelines

Project data should contain logical classroom information only.

Never store environment-specific information such as:

- Server filesystem paths
- Published-site paths
- Deployment information
- Browser runtime state
- Git information

For classroom assets, project data should normally store the logical filename.

Example:

```text
alphabet.jpg
```

not:

```text
/srv/vcc/assets/images/alphabet.jpg
```

and not:

```text
assets/images/alphabet.jpg
```

Asset Helpers resolve physical or web paths at runtime.

---

# Asset Guidelines

Application resources and classroom assets serve different purposes.

## Resources

Resources belong to the application.

Examples include:

- Default tile image
- Default header image
- Static interface graphics

Resources are maintained as part of the application.

Teachers do not manage them through classroom asset catalogs.

---

## Classroom Assets

Classroom assets belong to classroom projects.

Examples include:

- Images
- Videos
- PDFs
- Other supported classroom files

The authoritative working asset library is maintained under:

```text
/srv/vcc/assets
```

Teacher Mode accesses supported assets through catalogs and pickers.

---

## Asset References

Project data stores logical filenames rather than storage-specific paths.

Asset Helpers determine whether an asset should resolve from:

```text
/master-assets
```

for Teacher Mode and Student Preview, or:

```text
assets
```

for Published Student Mode.

Code outside the asset helper layer should not duplicate this environment-selection logic.

---

# Asset Catalog Guidelines

Asset catalogs describe the teacher-managed files available in the working asset library.

Current catalog categories include:

- Images
- PDFs
- Videos
- PowerPoints retained in the asset structure

Catalogs should expose logical filenames only.

When asset discovery changes:

- Update the catalog-generation system rather than manually maintaining catalog contents.
- Keep picker behavior independent of physical filesystem paths.
- Ensure Publish refreshes catalogs before producing the published asset set.

Teacher Mode's Update Library function should be used to make newly added working assets available to the editor.

---

# Content Type Guidelines

Each Layout Entry type should have a clear and stable meaning.

Current actively supported content types include:

```text
video
localVideo
website
pdf
image
placeholder
```

along with structural entries such as:

```text
navigation
section
```

The current video meanings are:

```text
video       = YouTube video
localVideo  = locally stored video file
```

Do not change the meaning of an existing type without first evaluating existing project data.

When introducing a new content type:

1. Define its project-data meaning.
2. Add validation support.
3. Add rendering support.
4. Add Teacher editing support when applicable.
5. Add its content action or viewer behavior.
6. Test both Preview and Published Student behavior.
7. Update Domain Model and Architecture documentation when the type is durable.

---

# Validation Guidelines

Validation protects both project integrity and classroom reliability.

Every feature should be considered under valid and invalid conditions.

Examples include:

- Missing Containers
- Circular hierarchy
- Missing assets
- Invalid navigation
- Disabled Containers
- Unsupported Layout Entry types
- Missing content targets
- Invalid content targets

Structural failures that make the Project unsafe or ambiguous should prevent invalid publication or rendering where appropriate.

Missing or unusable classroom content should produce graceful, classroom-friendly behavior whenever practical.

Validation messages intended for teachers may be technical enough to support correction.

Messages presented in Student Mode should remain simple and classroom appropriate.

---

# Navigation Integrity

Navigation represents Container relationships and must preserve hierarchy.

A Navigation Entry should not be independently deleted if doing so would leave its child Container orphaned.

Deleting a page should be responsible for removing the associated navigation relationship.

When editing navigation behavior, test:

- Entering a child page
- Back navigation
- Home navigation
- Page deletion
- Navigation editing
- Hierarchy validation

Project integrity takes priority over making every visible item independently editable.

---

# Content Action Guidelines

Content-specific runtime behavior should remain isolated from rendering.

Examples include:

- YouTube playback
- Local video playback
- PDF viewing
- Image viewing
- Website launching

Renderers identify and display content.

Content actions implement what happens when that content is selected.

A content action should own its relevant lifecycle, including cleanup when a viewer closes.

Do not add content-specific playback or viewer logic directly to the Tile Renderer.

---

# Viewer Guidelines

Dedicated viewers should behave consistently.

Where applicable, a viewer should:

- Open without navigating away from the classroom.
- Clearly identify the content.
- Provide a large, obvious Close control.
- Return to the same classroom page.
- Stop or release active media when closed.

When adding a new viewer, verify both normal closing and resource cleanup.

---

# Classroom UI Guidelines

The primary Student interface runs on a large classroom touch display.

Implementation decisions should account for:

- Large touch targets
- Student accessibility
- Teacher position relative to the display
- Minimal unnecessary movement across the board
- Clear visual feedback
- Simple navigation
- Avoiding distracting startup transitions

UI changes that do not affect project structure should remain presentation concerns rather than creating new project-data properties.

---

# Server API Guidelines

Teacher Mode communicates with the classroom server through the VCC server API.

Current server responsibilities include:

- Reading the Working Project
- Writing the Working Project
- Rebuilding asset catalogs
- Publishing classroom content
- Providing basic service/status communication

When adding a persistent or server-side operation:

1. Decide whether the responsibility belongs on the server.
2. Add or extend a server API operation.
3. Keep filesystem and Git implementation details on the server side.
4. Return clear success or failure information to Teacher Mode.
5. Test failure behavior as well as success behavior.

Browser code should not directly reproduce server-side filesystem or publishing logic.

---

# Publishing Guidelines

Publishing is separate from editing.

The conceptual workflow is:

```text
Teacher Edit
    │
    ▼
Working Project
    │
    ▼
Preview
    │
    ▼
Publish
    │
    ▼
Published Classroom
```

Publish should operate on the authoritative working classroom.

The current publishing process:

1. Rebuilds asset catalogs.
2. Copies the working assets into the repository's published asset structure.
3. Stages publishable asset changes.
4. Determines whether changes exist.
5. Commits changes when required.
6. Pushes the published changes to GitHub.
7. Allows GitHub Pages to serve the updated classroom.

A successful edit is not the same as a successful publish.

A successful publish is not fully verified until the Published Student site behaves correctly when the change affects public runtime behavior.

---

# Testing Strategy

Testing should be proportional to the change.

The preferred approach is incremental testing immediately after each meaningful change.

## Teacher-Only Changes

For changes confined to Teacher Mode, verify:

- The intended editing behavior
- Selection state
- Dialog behavior
- Validation
- Persistence of the edit
- Error handling where applicable

---

## Student Runtime Changes

For Student behavior, verify:

- The expected classroom interaction
- Navigation state
- Viewer behavior
- Cleanup behavior
- Error handling
- Existing related content types

When adding a new behavior alongside an existing one, test both.

For example, after adding Local Video support, both Local Video and existing YouTube playback should be tested.

---

## Asset Changes

When changing asset handling, verify:

- Update Library
- Catalog contents
- Teacher picker behavior
- Working asset resolution
- Student Preview
- Published asset resolution when applicable

---

## Publishing or Public Runtime Changes

When a change affects publishing, asset resolution, or the public Student runtime, use the full workflow:

```text
Teacher Mode
    │
    ▼
Student Preview
    │
    ▼
Publish
    │
    ▼
Published Student Mode
```

Confirm the Published Student site separately rather than assuming successful Preview proves successful deployment.

Browser caching should be considered when testing newly published files.

---

# Failure Testing

Normal behavior alone is not sufficient for changes involving validation, assets, publishing, or viewers.

Where applicable, test conditions such as:

- Missing target
- Invalid target
- Missing asset
- No publishable changes
- Server/API failure
- Invalid project structure

The application should fail clearly and safely.

Teacher-facing errors should support correction.

Student-facing errors should avoid exposing implementation details.

---

# Refactoring Guidelines

Refactoring should improve implementation quality without casually changing architecture or behavior.

Before refactoring, ask:

- Is there an actual problem to solve?
- Is this responsibility already owned by another subsystem?
- Can the existing subsystem be extended?
- Does existing project data depend on the current behavior?
- Can the refactor be tested independently?
- Will this reduce long-term complexity?

Do not refactor working code solely for stylistic consistency during an unrelated feature.

When a refactor is necessary, separate it from behavioral changes when practical so each can be tested clearly.

---

# Source Control

Git serves two related but distinct purposes in the current system.

## Developer Source Control

Developer commits record changes to:

- Application source
- Server source
- Styles
- Documentation
- Development configuration

Developer commits should represent understandable, working units of functionality.

Whenever practical:

- Finish a logical change before committing it.
- Keep commits focused.
- Use descriptive commit messages.
- Avoid knowingly committing broken intermediate states.

---

## Classroom Publishing Commits

The Publish system also uses Git to distribute classroom data and assets to GitHub.

These commits are generated as part of the classroom publishing workflow.

They represent published classroom-content changes rather than developer source-code milestones.

Developer source-control practices and classroom publishing should remain conceptually distinct even though both use the same Git repository.

---

# Documentation Maintenance

Documentation should describe durable behavior, not every temporary experiment.

Update documentation when a completed change affects:

- Architecture
- Project-data meaning
- Teacher workflow
- Deployment
- Publishing
- Supported content types
- Durable UI standards
- Roadmap status

Small implementation details that do not change the design generally do not require documentation changes.

At natural stopping points, review the relevant documents and remove statements that describe already-completed functionality as future work.

Avoid allowing documentation to become a historical description of architectures that no longer exist.

Git history provides implementation history.

Current documentation should primarily describe the current system and its intended direction.

---

# Completion Criteria

A feature is complete when the applicable items below are true:

- The intended behavior works.
- Existing related behavior still works.
- Project integrity is preserved.
- Error behavior is acceptable.
- Teacher Mode has been tested when affected.
- Student Preview has been tested when affected.
- Published Student Mode has been tested when public behavior is affected.
- Publishing has been tested when affected.
- Relevant documentation reflects the completed design.
- The project is left in a working state.
- The completed work is committed when appropriate.

Not every feature requires every step, but completion should be based on the systems the change actually touches.

---

# Guiding Principles

Every contribution should reinforce the project's core goals.

- Keep the architecture understandable.
- Keep responsibilities separate.
- Make small, testable changes.
- Preserve working behavior.
- Preserve compatibility whenever practical.
- Keep classroom data portable.
- Keep Student Mode simple.
- Keep Teacher Mode approachable.
- Keep storage-specific logic behind defined boundaries.
- Preview before publishing.
- Verify the published classroom when public behavior changes.
- Prefer reuse over duplication.
- Document the system that actually exists.

When uncertain, choose the solution that reduces long-term complexity while preserving classroom reliability and the documented architecture.

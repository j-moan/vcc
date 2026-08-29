# VCC Classroom Launcher

# Project Domain Model

## Purpose

This document defines the logical Project Domain Model used by the VCC Classroom Launcher.

The Domain Model describes the classroom itself rather than how the classroom is stored, published, or rendered.

It defines:

- The objects that make up a classroom
- The relationships between those objects
- The meaning of supported classroom entry types
- The rules that govern those relationships

This document intentionally remains independent of:

- JavaScript implementation
- HTML and CSS
- Serialization format
- Storage mechanism
- Publishing mechanism
- Hosting environment

The same logical classroom model should remain valid whether a Project is persisted as a JavaScript data file, JSON, database records, or another future representation.

---

# Design Goals

## Simple

The classroom should be understandable without knowledge of the application's implementation.

The logical model should describe classrooms rather than software infrastructure.

---

## Stable

The logical model should remain stable when implementation details change.

Changing storage, hosting, or serialization should not require redesigning the classroom model.

---

## Portable

A classroom should exist independently of any specific computer or hosting environment.

Projects should be transferable between systems without changing their meaning.

---

## Extensible

New classroom capabilities should be introduced by extending the model rather than redesigning its hierarchy.

New content types should not require structural changes to Containers or Layouts.

---

## Implementation Independent

The Domain Model describes:

- What the classroom contains
- How classroom objects relate
- What each classroom object means

It does not describe:

- Rendering implementation
- Viewer implementation
- Server APIs
- Filesystem locations
- GitHub
- Publishing
- Browser behavior

---

## Backward Compatible

The meaning of an existing project-data type should remain stable whenever practical.

New capabilities should normally receive new types or properties rather than changing the meaning of existing data.

For example:

```text
video       = YouTube video
localVideo  = locally stored video
```

The existing `video` meaning was preserved when local video support was added.

---

# Core Concepts

A classroom is built around a small number of concepts.

```text
Project
    │
    └── Containers
          │
          └── Layout
                │
                └── Layout Entries
```

Layout Entries may reference classroom Assets or other Containers depending on their type.

---

# Project

A Project represents one complete classroom.

A Project owns the classroom structure required to present and edit that classroom.

A Project contains:

- A root Container reference
- Containers
- Classroom-level information or settings when defined

The Project is the root of the Domain Model.

---

## Root Container

Every Project has exactly one root Container.

The root Container represents the classroom Home page.

The root Container:

- Has no parent
- Is the starting point for Student navigation
- Is the destination of the Home navigation control

Every other Container descends from the root Container.

---

# Container

A Container represents one classroom page.

Containers define classroom hierarchy and navigation relationships.

Every Container owns one Layout.

---

## Container Hierarchy

Containers form a strict tree.

Example:

```text
Home
│
├── Reading
│   ├── Stories
│   └── Phonics
│
├── Math
│
└── Morning Meeting
```

Rules:

- Every Project has exactly one root Container.
- The root Container has no parent.
- Every other Container has exactly one parent.
- Containers may have zero or more child Containers.
- Circular relationships are never permitted.
- A Container cannot be its own ancestor or descendant.

Hierarchy defines navigation relationships.

Hierarchy does not define the visual order of items on a page.

---

## Container Properties

A Container may include properties such as:

- Identifier
- Title
- Subtitle or description
- Parent reference
- Active state
- Layout
- Page-specific settings

The exact serialized property names are an implementation concern rather than a Domain Model requirement.

---

## Container Identity

Each Container has an identifier that is unique within its Project.

References between classroom objects use Container identity rather than duplicating the Container itself.

Identifiers should remain stable unless there is a specific reason to change them.

Displayed titles may change without changing Container identity.

---

## Active State

Containers may be active or inactive.

An inactive Container:

- Remains part of the Project
- Remains editable
- Is not available through normal Student navigation

If a Container is unavailable to Student Mode, its descendants are also unavailable through that navigation path.

Disabling a Container does not delete classroom information.

---

# Layout

Every Container owns one Layout.

A Layout defines the ordered presentation of the visible objects on that Container's page.

A Layout is an ordered collection of Layout Entries.

Example:

```text
Navigation
Navigation
Section
YouTube Video
Website
Section
PDF
Local Video
```

Rendering follows Layout order.

Layouts do not define classroom hierarchy.

---

## Layout Properties

A Layout may contain page-specific presentation settings.

Examples include:

- Column count
- Future page-layout settings

These settings affect presentation of the Container but do not alter classroom hierarchy.

---

# Layout Entry

Every visible classroom object within a Container's Layout is represented by a Layout Entry.

A Layout Entry:

- Belongs to exactly one Layout
- Occupies one position in that Layout's order
- Does not own child Layout Entries
- Does not itself participate in the Container hierarchy

Layout Entry behavior depends on its type.

---

# Current Layout Entry Types

The actively supported Domain Model types are:

| Project Type | Meaning | Category |
| --- | --- | --- |
| `navigation` | Opens a child Container | Navigation |
| `section` | Visually separates or labels groups of entries | Presentation |
| `video` | Launches a YouTube video | Content |
| `localVideo` | Launches a locally managed video file | Content |
| `website` | Opens a website | Content |
| `pdf` | Opens a PDF resource | Content |
| `image` | Opens or displays an image resource | Content |
| `placeholder` | Reserves a classroom tile/location without launching content | Content |

Additional Layout Entry types may extend the model without changing the Container hierarchy.

Legacy serialized Projects may contain entry types from earlier development stages. Runtime compatibility with legacy data is an implementation concern, but obsolete types should not be described as current Teacher-created Domain Model types.

---

# Navigation Entries

Navigation Entries connect page presentation to the Container hierarchy.

A Navigation Entry references another Container rather than owning a separate copy of that page's information.

Conceptually:

```text
Parent Container
        │
        ▼
Navigation Entry
        │
        ▼
Child Container
```

The Navigation Entry exists in the parent's Layout.

The referenced Container exists in the Container hierarchy.

---

## Navigation Rules

A Navigation Entry:

- References exactly one Container
- References a direct child of the Container whose Layout contains it
- May appear at an appropriate position within that Layout
- Derives page identity and title information from the referenced child Container
- May contain presentation information needed specifically for the navigation tile, such as its image
- Does not own or duplicate the child Container

Teacher Mode manages navigation primarily through Container hierarchy operations rather than treating navigation relationships as unrelated content tiles.

---

## Navigation Integrity

Navigation Entries and Container relationships must remain consistent.

Creating a child page creates the corresponding navigation relationship.

Deleting a child page removes the corresponding navigation relationship.

A Navigation Entry should not be independently deleted if doing so would leave its referenced child Container orphaned from the intended hierarchy.

The Domain Model treats the Container relationship as authoritative.

---

# Sections

A Section is a presentation-only Layout Entry.

A Section may provide:

- A title
- Other presentation text if supported

Sections:

- Separate groups of related classroom entries
- Do not launch content
- Do not reference Containers
- Do not participate in hierarchy

A Section's position in the Layout determines where the visual separation occurs.

---

# Content Entries

Content Entries represent classroom activities or resources.

Current Content Entry types are:

```text
video
localVideo
website
pdf
image
placeholder
```

Content Entries own the logical information needed to identify and present their classroom content.

Typical properties may include:

- Label
- Image
- Target
- Active state
- Type-specific information

Each Content Entry belongs to exactly one Layout.

---

# Content Targets

A target identifies the content associated with a Content Entry.

The meaning of `target` depends on the entry type.

Examples:

| Type | Target Meaning |
| --- | --- |
| `video` | YouTube URL or supported YouTube identifier |
| `localVideo` | Logical filename of a video asset |
| `website` | Website URL |
| `pdf` | Logical PDF filename or supported PDF target |
| `image` | Logical image filename or supported image target |
| `placeholder` | No actionable target required |

A target describes the logical destination or resource.

It should not contain environment-specific server filesystem paths.

---

# YouTube Video Entries

Project type:

```text
video
```

A `video` entry represents YouTube content.

Its target contains a supported YouTube URL or identifier.

The `video` type retains this meaning for backward compatibility with existing Projects.

The Domain Model does not define how YouTube playback is implemented.

---

# Local Video Entries

Project type:

```text
localVideo
```

A `localVideo` entry represents a teacher-managed video asset.

Its target is the logical video filename.

Example:

```text
morning-song.mp4
```

The Domain Model does not contain the physical location of that file.

Storage and runtime systems resolve the filename to the appropriate working or published asset location.

---

# Website Entries

Project type:

```text
website
```

A Website Entry represents an external web resource.

Its target identifies the website URL.

The Domain Model defines the destination but not whether the browser opens it in a new tab, viewer, or another presentation mechanism.

---

# PDF Entries

Project type:

```text
pdf
```

A PDF Entry represents a classroom PDF resource.

Its target identifies the logical PDF resource.

The Domain Model does not define the PDF viewer implementation.

---

# Image Entries

Project type:

```text
image
```

An Image Entry represents a classroom image resource.

Its target identifies the logical image resource.

An Image Entry's content target is distinct from a tile thumbnail image used to visually represent another entry.

---

# Placeholder Entries

Project type:

```text
placeholder
```

A Placeholder reserves a visible classroom tile/location without launching classroom content.

A Placeholder may contain presentation information such as:

- Label
- Image

A Placeholder does not require an actionable target.

---

# Presentation Images

Layout Entries may use images as presentation information.

For example:

- A content tile may display a thumbnail.
- A Navigation Entry may display an image representing its child page.

These images are references to logical classroom assets.

They do not change the semantic meaning of the Layout Entry.

A Navigation Entry with a thumbnail remains a Navigation Entry.

A YouTube entry with a thumbnail remains a YouTube entry.

---

# Assets

Assets are teacher-managed classroom files that may be referenced by Project data.

Examples include:

- Images
- Videos
- PDFs

An asset is logically identified by its filename.

The Domain Model does not define:

- Where the asset is physically stored
- How it is cataloged
- How it is published
- Which URL is used to load it

Those responsibilities belong to other architectural systems.

---

# Asset References

Project data stores logical asset references rather than environment-specific paths.

Examples:

```text
alphabet.jpg
reading-centers.pdf
morning-video.mp4
```

Project data should not store paths such as:

```text
/srv/vcc/assets/images/alphabet.jpg
/master-assets/images/alphabet.jpg
assets/images/alphabet.jpg
```

Resolving logical references into physical or runtime locations is outside the Domain Model.

---

# Asset Reuse

The same classroom asset may be referenced by multiple Layout Entries.

For example, several entries may use the same thumbnail image.

Referencing an asset does not transfer ownership of the asset to the Layout Entry.

Deleting one Layout Entry does not logically imply deletion of the underlying asset.

---

# Project Model

Teacher Mode operates on an editable Project Model representing the classroom.

The Project Model provides operations that preserve Domain Model integrity.

Typical operations include:

- Create Container
- Delete Container
- Rename Container
- Add Layout Entry
- Delete Layout Entry
- Move Layout Entry
- Modify Layout Entry properties
- Modify Container properties

The Project Model should prevent or reject operations that would create invalid classroom relationships.

Persistence of the Project Model is an architectural implementation concern and is not part of the Domain Model.

---

# Domain Integrity

The Domain Model should remain internally consistent throughout editing.

Examples include:

- Container identifiers remain unique.
- Every non-root Container has a valid parent.
- Navigation relationships reference valid direct children.
- Deleting a Container does not leave invalid Navigation Entries.
- Layout Entries belong to valid Containers.
- Entry types retain their defined meanings.

Teacher Mode and validation systems enforce these rules.

---

# Validation Rules

Projects are expected to satisfy several categories of validation.

---

## Structural Validation

Structural validation verifies the integrity of the classroom model.

Examples include:

- Exactly one root Container
- Unique Container identifiers
- Valid parent relationships
- No circular hierarchy
- Valid Layout structures
- Supported Layout Entry types
- Valid Navigation references
- Navigation references correspond to appropriate child Containers

Structural failures that make the classroom model ambiguous or unsafe should prevent normal Student use or publication as appropriate.

---

## Content Validation

Content validation verifies that Content Entries contain the logical information required by their type.

Examples include:

- YouTube Video has a target
- Local Video has a target
- Website has a target
- PDF has a target
- Image has a target
- Placeholder does not require a target

Whether a particular external resource is reachable may be a runtime concern rather than a Domain Model concern.

---

## Asset Validation

Asset validation verifies that referenced teacher-managed assets exist where expected.

Examples include:

- Missing tile image
- Missing PDF
- Missing local video
- Missing image content

Missing assets should produce warnings or graceful runtime behavior whenever practical rather than invalidating an otherwise usable classroom.

Asset existence is validated by the application environment rather than encoded into the logical model.

---

# Active Entries

Where supported, Layout Entries may have an active state.

Inactive entries remain part of the Project but are not presented as active Student content.

Disabling an entry does not delete it or its referenced asset.

The exact editing controls for active state are a Teacher Mode concern rather than a Domain Model concern.

---

# Ordering

Layout Entry order is significant.

Changing the order of entries changes their presentation order within the Container.

Ordering does not change:

- Container hierarchy
- Asset identity
- Content target meaning

Sections participate in this same ordered Layout and therefore divide content based on their position.

---

# Serialization

Serialization exists to persist the Project.

The serialized representation is not itself the Domain Model.

Conceptually:

```text
Project Model
      │
      ▼
Serialized Project
```

Loading performs the reverse operation:

```text
Serialized Project
      │
      ▼
Project Model
```

Serialization may include implementation-specific property names and structures.

Those details may evolve without changing the logical meanings defined by this document.

---

# Domain Model Boundaries

The Domain Model defines classroom meaning.

It does not define how that meaning is implemented.

| Concern | Domain Model Responsibility |
| --- | --- |
| Container hierarchy | Defines relationships |
| Layout order | Defines presentation sequence |
| Entry type | Defines semantic meaning |
| Asset filename | Defines logical reference |
| HTML rendering | Outside Domain Model |
| Viewer implementation | Outside Domain Model |
| Filesystem location | Outside Domain Model |
| Server API | Outside Domain Model |
| Publishing | Outside Domain Model |
| Git/GitHub | Outside Domain Model |
| Asset catalogs | Outside Domain Model |

Keeping these boundaries clear allows implementation systems to evolve without changing classroom meaning.

---

# Extending the Domain Model

When adding a new classroom capability, first determine whether it requires:

- A new Layout Entry type
- A new property on an existing type
- A new relationship
- No Domain Model change at all

Presentation-only changes should generally not alter the Domain Model.

For example, moving navigation controls on the screen does not change the classroom model.

A genuinely new content semantic, such as locally managed video, may justify a new Layout Entry type.

Before changing the meaning of an existing type, evaluate backward compatibility with existing Projects.

---

# Guiding Principles

The Domain Model intentionally separates:

- Navigation
- Presentation
- Content
- Asset references

Containers define classroom hierarchy.

Layouts define presentation order.

Navigation Entries connect Layout presentation to child Containers.

Sections organize presentation.

Content Entries define classroom activities and resources.

Assets provide reusable classroom media.

The Project Model maintains classroom integrity during editing.

Student Mode presents the classroom.

Teacher Mode edits the classroom.

Storage and publishing systems persist and distribute the classroom without changing its logical meaning.

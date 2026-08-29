# VCC Classroom Launcher

# Editor Design

## Purpose

This document defines the user experience and interaction design of Teacher Mode.

Teacher Mode is the classroom authoring environment used to create and maintain classroom Projects.

The Architecture document defines how the software is organized. The Domain Model defines the logical classroom. This document defines how a teacher interacts with that classroom through the editor.

Its purpose is to keep Teacher Mode:

- Simple
- Predictable
- Touch friendly
- Difficult to misuse
- Focused on classroom authoring rather than software implementation

---

# Design Philosophy

Teacher Mode should allow teachers to think about classrooms rather than technology.

Teachers should work with concepts such as:

- Pages
- Sections
- Activities
- Resources
- Images
- Videos
- Classroom structure

Teachers should never need to understand:

- HTML
- JavaScript
- JSON
- Git
- Server paths
- Asset URLs
- Project serialization
- Publishing implementation

The editor translates teacher actions into valid Project changes and uses the classroom server for persistence and publishing.

---

# Primary Goals

Teacher Mode should be:

- Visual
- Touch friendly
- Easy to learn
- Fast for common tasks
- Consistent
- Forgiving
- Difficult to put into an invalid state

Most routine classroom changes should require only a few interactions.

The interface should favor obvious controls over compact or highly technical interfaces.

---

# Editing Workflow

The normal classroom-authoring workflow is:

```text
Open Teacher Mode
      │
      ▼
Select a Page
      │
      ▼
Add / Edit / Reorder Content
      │
      ▼
Preview
      │
      ▼
Publish
```

Editing changes the Working Classroom.

Preview allows the teacher to verify those changes before publication.

Publish is a separate, deliberate action that updates the public classroom.

---

# Working Classroom

Teacher Mode edits the Working Classroom hosted by the classroom server.

The teacher should experience this simply as "the classroom being edited."

Teacher Mode should not expose:

- The underlying data file
- Server filesystem locations
- Serialization
- Git operations

Changes made in Teacher Mode should persist to the Working Classroom without requiring the teacher to understand the storage mechanism.

The Working Classroom remains separate from the Published Classroom until Publish is selected.

---

# Workspace

Teacher Mode consists of three primary work areas.

```text
Header

------------------------------------------------

Page Tree | Page Layout

------------------------------------------------

Editing Toolbar
```

Each area has a distinct purpose.

- **Page Tree** — classroom hierarchy and page selection
- **Page Layout** — ordered contents of the selected page
- **Editing Toolbar** — actions available to the teacher

---

# Page Tree

The Page Tree represents classroom hierarchy.

It allows the teacher to:

- See classroom pages
- Understand parent/child relationships
- Expand and collapse hierarchy
- Select the page being edited

The tree represents navigation structure.

It does not represent the visual order of content within a page.

The selected page should always be clearly identifiable.

---

# Page Creation

Teachers create child pages using **Add Subpage**.

Creating a subpage should:

1. Ask for the page name.
2. Allow selection of the image used for its Navigation tile.
3. Create the child page.
4. Create the corresponding Navigation relationship.
5. Preserve a valid classroom hierarchy.

The teacher should think in terms of creating a page, not separately creating a Container and Navigation Entry.

---

# Page Editing

Page properties are edited through the Navigation item representing that page.

For a Navigation item, **Edit Item** should allow the teacher to modify appropriate page/navigation presentation information, including:

- Page name
- Navigation image

Internal Container identifiers should never be exposed.

Changing a page name should update the classroom consistently without requiring duplicate edits.

---

# Page Deletion

Teachers delete pages using **Delete Page**.

Deleting a page is a hierarchy operation.

The editor should remove the associated Navigation relationship as part of deleting the page.

A Navigation item should not be independently deletable when doing so would leave an orphaned child page.

If the teacher attempts to delete a Navigation item through **Delete Item**, Teacher Mode should explain that the page must be deleted using **Delete Page**.

This protects classroom structure while keeping the teacher's mental model simple.

---

# Page Layout

The Page Layout panel displays the ordered contents of the selected page.

Current entries presented in the editor include:

- Navigation
- Sections
- YouTube videos
- Local videos
- Websites
- PDFs
- Images
- Placeholders

Each row should provide enough information to identify the entry, such as:

- Thumbnail
- Entry-type indicator
- Entry name

The Page Layout represents presentation order.

It does not define classroom hierarchy.

---

# Selection Model

Teacher editing actions operate on the currently selected page or Layout Entry.

Selection should be visually obvious.

Actions that require an item selection should not silently operate on another item.

When an operation is unavailable for the selected item, Teacher Mode should either:

- Disable the inappropriate action, or
- Provide a clear explanation when the action is attempted

depending on which produces the simpler and clearer interface.

---

# Editing Toolbar

The current Teacher toolbar is organized as a fixed set of classroom-authoring actions.

Current controls are:

```text
Add Subpage
Delete Page

Add Tile
Add Section
Edit Item
Delete Item
Move Up
Move Down

Update Library
Publish
```

Visual spacing may separate related groups.

The toolbar should use classroom-oriented language rather than Domain Model terminology.

For example:

- **Add Subpage** rather than "Create Container"
- **Add Tile** rather than "Add Content Layout Entry"
- **Add Section** rather than "Insert Section Entry"

---

# Add Tile

**Add Tile** creates a classroom content tile on the selected page.

The teacher selects the content type and provides only the information relevant to that type.

Current Tile Type choices are:

```text
Placeholder
YouTube
Video
Website
PDF
Image
```

These teacher-facing names intentionally differ from some underlying Project type names.

The teacher should not need to know that:

```text
YouTube = video
Video   = localVideo
```

That distinction belongs to the application rather than the Teacher UI.

---

# Edit Item

**Edit Item** uses the selected Layout Entry to determine which properties can be changed.

The same overall editing interaction should be reused across compatible entry types rather than creating unnecessary separate editing systems.

The editor should show only properties relevant to the selected item.

Examples:

## Navigation

- Page name
- Navigation image

## Section

- Section title

## Content Tile

- Label
- Thumbnail image
- Destination or resource

The content type of an existing tile should not be casually changed when doing so could alter the semantic meaning of its existing target.

Where appropriate, type should remain fixed during Edit and a differently typed tile should be recreated instead.

---

# Add Section

**Add Section** inserts a visual separator into the selected page Layout.

The teacher provides the Section Title.

Sections organize the page visually.

They do not:

- Navigate
- Launch content
- Contain child entries

The section's position in the Layout determines which content appears visually beneath it.

---

# Reordering

Teachers reorder selected Layout Entries using:

- **Move Up**
- **Move Down**

Reordering changes presentation order only.

It should not change:

- Page hierarchy
- Navigation relationships
- Content type
- Asset references

Explicit Move controls are preferred over introducing drag-and-drop until drag-and-drop provides a clear usability advantage without reducing predictability.

---

# Delete Item

**Delete Item** removes an appropriate selected Layout Entry from the current page.

It may be used for entries such as:

- Sections
- Content tiles

Navigation items are protected because deleting them independently could invalidate page hierarchy.

Deleting a Layout Entry does not imply deletion of the underlying classroom asset.

---

# Asset Selection

Teacher Mode manages classroom media through asset pickers.

Current asset-selection interfaces include:

- Image Picker
- PDF Picker
- Video Picker

Asset pickers should:

- Display available classroom assets
- Allow searching where useful
- Clearly indicate the selected file
- Return the selected logical filename
- Hide storage paths from the teacher

The teacher should select classroom resources visually rather than manually entering server paths.

---

# Image Selection

Images may be used for:

- Tile thumbnails
- Navigation thumbnails
- Image content

The Image Picker should provide:

- Search
- File selection
- Image preview
- Clear selected state

The same image-selection behavior should be reused wherever practical.

---

# PDF Selection

PDF tiles should use the PDF Picker.

The picker should:

- Search available PDF filenames
- Allow selection
- Return the selected filename to the tile editor

Teachers should not need to type the PDF's storage location.

---

# Video Selection

Teacher Mode distinguishes between two video experiences using teacher-friendly names.

## YouTube

The teacher supplies a YouTube URL.

The editor stores it as the YouTube video content type.

## Video

The teacher selects a locally managed video from the Video Library.

The Video Picker should:

- Search available video filenames
- Allow selection
- Return the selected filename

The teacher should not need to understand the underlying `video` and `localVideo` Project type names.

---

# Update Library

**Update Library** refreshes the classroom asset catalogs.

The intended teacher workflow is:

1. Add or replace files in the classroom asset library.
2. Select **Update Library**.
3. Teacher Mode refreshes its available asset lists.
4. The new assets become available in the appropriate pickers.

The teacher should not need to:

- Edit catalog files
- Restart the application
- Know how catalogs are generated

Update Library should refresh all supported asset catalogs as one operation.

---

# Dialog Design

Teacher Mode uses dialogs for focused editing tasks.

Dialogs should:

- Ask only for information needed for the current operation
- Use teacher-friendly labels
- Provide clear primary and secondary actions
- Avoid implementation terminology
- Preserve entered work when practical
- Clearly identify invalid input

Where several operations share the same interaction pattern, dialogs and picker behavior should be reused.

---

# Validation

Teacher Mode should prevent invalid classroom states whenever practical.

Validation may occur:

- During editing
- When an operation is attempted
- Before Preview
- Before Publish

Teacher-facing validation should explain:

- What is wrong
- What the teacher needs to do

It should avoid exposing unnecessary implementation details.

Examples include:

- Preventing deletion of a Navigation item that represents a child page
- Preventing unsupported or incomplete tile destinations
- Detecting invalid classroom structure before publication

---

# Error Handling

Teacher Mode should preserve teacher work and recover gracefully whenever practical.

Errors should be presented in clear teacher-facing language.

Examples of useful outcomes include:

- **Publish Complete** — the classroom was published successfully.
- **Nothing to Publish** — the classroom is already up to date.
- **Publish Failed** — the classroom could not be published and should be tried again.

Technical diagnostics may exist for development purposes, but normal Teacher UI should not expose stack traces, server paths, Git commands, or raw exceptions.

---

# Preview

Teacher Mode provides access to Student Preview.

Preview uses the actual Student application rather than a separate simulation.

This is an important design rule:

> Preview should test the same classroom experience that Student Mode uses.

Preview presents the Working Classroom and working asset library.

It allows the teacher to verify unpublished changes before Publish.

Preview should be used to check:

- Page navigation
- Tile images
- Sections
- YouTube playback
- Local video playback
- PDFs
- Images
- Websites
- General classroom presentation

Preview should not itself publish changes.

---

# Published Student Verification

Preview verifies the Working Classroom.

It does not prove that publication and public asset delivery succeeded.

When a change affects publishing, public asset paths, or Student runtime behavior, development testing should also verify the Published Student site after Publish.

This is primarily a development responsibility rather than an additional burden placed on the teacher during routine classroom editing.

---

# Publishing

Publishing is a deliberate teacher action.

The teacher's mental model should remain simple:

```text
Edit
  │
  ▼
Preview
  │
  ▼
Publish
```

Teacher Mode requests publication from the classroom server.

Teacher Mode should not expose:

- Git staging
- Git commits
- Git pushes
- Repository paths
- Asset-copy operations

The teacher should receive a clear result:

- Published successfully
- Already up to date
- Publication failed

Editing should never automatically publish the classroom.

---

# Teacher and Student Separation

Teacher Mode and Student Mode serve different users and should remain visibly and behaviorally distinct.

Teacher Mode is an authoring application.

Student Mode is a classroom presentation application.

Teacher functionality should not clutter the normal Student experience.

Where Teacher access is available from the classroom environment, it should remain unobtrusive and should not interfere with normal Student navigation.

---

# Touch-Friendly Design

Teacher Mode may be used on classroom displays as well as conventional computers.

Controls should therefore provide:

- Adequate touch targets
- Clear spacing
- Obvious selected states
- Readable text
- Predictable dialogs
- Minimal precision-dependent interactions

Touch usability should be considered before adding interaction patterns such as small handles, hover-only controls, or complex drag-and-drop behavior.

---

# Consistency

Similar actions should behave similarly.

Examples:

- Asset pickers should share selection behavior.
- Dialogs should use consistent button placement.
- Selected items should use consistent visual treatment.
- Add and Edit interactions should use the same terminology.
- Error messages should use consistent language.

Consistency is preferred over adding unique interactions for individual content types.

---

# Avoiding Unnecessary Options

Teacher Mode should not expose options merely because the underlying technology supports them.

An option should be added when it solves a real classroom need.

For example, a technically possible video-loop option should not be added if teachers do not need videos to repeat.

Keeping unnecessary options out of the interface is an intentional part of the editor design.

---

# Future Capabilities

Teacher Mode is designed to accommodate future enhancements without changing its basic classroom-authoring model.

Potential future capabilities include:

- Automatic restore points
- Manually named restore points
- Undo / Redo
- Multiple classroom projects
- Multiple teachers
- Authentication
- Project templates
- Expanded asset management
- Shared asset libraries
- Cloud synchronization

Future features should extend the existing workflow rather than expose underlying technical systems.

---

# Backup and Restore Direction

Future backup functionality should protect the complete Working Classroom, including project data and classroom assets.

The planned Teacher experience should distinguish between:

- Recent automatic restore points
- Saved named restore points

Restore should affect the Working Classroom first.

The intended workflow is:

```text
Choose Restore Point
       │
       ▼
Restore Working Classroom
       │
       ▼
Preview
       │
       ▼
Publish when satisfied
```

Restoring should not automatically change the Published Classroom.

The teacher should remain in control of publication.

---

# Guiding Principles

Every Teacher Mode feature should reinforce these rules:

- Teachers organize classrooms, not software objects.
- Teachers never edit implementation details.
- Page hierarchy and page presentation remain distinct.
- The editor protects classroom structure.
- Asset selection uses catalogs and pickers.
- Teacher-facing terminology remains simple.
- Preview uses the real Student experience.
- Publishing is explicit.
- Editing does not automatically change the public classroom.
- Working functionality should remain predictable.
- New options should solve actual classroom needs.
- Classroom authoring should become simpler as the application grows, not more complicated.

The editor should hide implementation complexity while giving the teacher direct, understandable control over the classroom.

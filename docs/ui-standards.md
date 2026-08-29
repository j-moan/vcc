# VCC Classroom Launcher

# UI Standards

## Purpose

This document defines the visual and interaction standards for the VCC Classroom Launcher.

It applies to:

- Student Mode
- Teacher Mode
- Shared interface components
- Dialogs and messages
- Asset pickers
- Content viewers
- Touch interaction
- Responsive behavior
- Accessibility

Student Mode and Teacher Mode serve different purposes and should not be forced into identical interfaces.

**Student Mode** prioritizes visual communication, simplicity, touch interaction, and classroom presentation.

**Teacher Mode** prioritizes clarity, predictable editing, and efficient classroom maintenance.

---

# Shared Design Principles

All VCC interfaces should be:

- Predictable
- Consistent
- Touch-friendly
- Accessible
- Responsive
- Visually calm
- Easy to understand without extensive instructions

The interface should avoid:

- Unnecessary decoration
- Technical terminology
- Hidden behavior
- Small precision-dependent controls
- Options without a demonstrated classroom need

Common controls should look and behave consistently throughout the application.

---

# Visual Language

The application should use a restrained visual style.

Preferred characteristics include:

- Clear visual hierarchy
- Simple shapes
- Rounded corners where appropriate
- Light borders
- Moderate shadows
- Generous spacing
- Strong text contrast
- Limited use of color
- Consistent control sizes

Color and decorative effects should support understanding rather than compete with classroom content.

Classroom content should remain the visual focus.

---

# Touch-First Interaction

The primary classroom display is a large touch screen.

Controls intended for frequent classroom use should therefore:

- Be large enough to touch comfortably
- Have adequate spacing from neighboring controls
- Avoid hover-only interactions
- Provide obvious visual feedback
- Avoid requiring fine pointer precision
- Place frequent controls where they are practical to reach

Desktop mouse and keyboard use should remain supported, especially in Teacher Mode, but should not compromise touch usability.

---

# Shared Component Naming

Reusable CSS classes should describe appearance or shared behavior rather than the feature that first used them.

Preferred generic names include:

```text
app-dialog
dialog-form
dialog-title
dialog-input
dialog-actions
dialog-feedback
dialog-button
dialog-button-primary
dialog-button-secondary
```

Element IDs may remain purpose-specific.

Examples:

```text
addTileDialog
messageDialog
imagePickerDialog
pdfPickerDialog
videoPickerDialog
```

CSS classes describe what a component **is**.

Element IDs describe what a specific instance **does**.

Existing reusable styles may retain established names when renaming them would create unnecessary risk without improving the user experience.

---

# Application Resources

Built-in visual resources belong to the application and are distinct from teacher-managed classroom assets.

Examples include:

```text
resources/default-header.jpg
resources/default-tile.jpg
```

Application resources should:

- Be maintained with the application
- Be referenced through shared helpers where practical
- Remain outside teacher asset catalogs
- Provide graceful fallbacks when classroom assets are missing

Teachers should not need to manage built-in application resources.

---

# Student Mode

## Purpose

Student Mode presents classroom content.

It should provide a visual, touch-first environment with minimal controls and no classroom-editing complexity.

Students should interact with classroom activities rather than application configuration.

---

# Student Mode Principles

Student Mode should be:

- Visual
- Predictable
- Touch-first
- Low distraction
- Consistent
- Accessible
- Fast

Students should be able to understand the basic interaction model without instructions.

Every classroom page should follow the same general visual and navigation pattern.

---

# Student Mode Restrictions

Student Mode should not expose:

- Project structure
- Internal identifiers
- Storage paths
- Validation details
- Publishing controls
- Technical terminology
- Raw browser or server errors
- Teacher editing controls during normal student interaction

Student-facing messages should describe the classroom problem, not its technical cause.

---

# Student Page Structure

A Student page consists primarily of:

```text
Header
--------------------------------

Classroom Content

--------------------------------

Temporary Messages or Content Viewers
```

The structure should remain consistent between classroom pages.

---

# Student Header

The header provides page identity and navigation.

It contains:

- Page title
- Home and Back controls when applicable
- Teacher access on the root page when available

The header should remain visually distinct without consuming unnecessary classroom-content space.

---

## Page Title

The page title should:

- Be centered
- Be highly visible
- Be readable from several feet away
- Use strong contrast
- Appear only once
- Reflect the currently displayed classroom page

The initial HTML state should avoid displaying an obsolete or misleading classroom title while project data is loading.

The root classroom title currently presents:

```text
Visual Communication for the Classroom
```

---

# Student Navigation

Student navigation is intentionally limited.

## Home

Home returns to the root classroom page.

It is hidden while the root page is displayed.

---

## Back

Back returns to the current page's parent.

It is hidden when there is no applicable parent navigation.

---

## Navigation Position

Home and Back are positioned together on the **left side of the header**.

This placement reflects actual classroom use: the teacher and students commonly interact with the display from that side.

Navigation controls should remain:

- Large enough for touch
- Clearly separated
- Consistent in position
- Easy to identify

Reachability on the physical classroom display is more important than conventional desktop placement.

---

## Teacher Access

Teacher access is available from the root classroom page in the local classroom environment.

It should:

- Remain unobtrusive
- Not compete visually with student content
- Not appear as normal student navigation
- Require the intended Teacher access step before entering Teacher Mode

Because Home and Back are not needed on the root page, Teacher access may use the same general left-side control area without creating a normal-state conflict.

The current Teacher access mechanism should not be represented as high-security authentication.

---

# Student Classroom Layout

Student Mode displays one classroom page at a time.

The page Layout is an ordered combination of:

- Navigation tiles
- Content tiles
- Sections

Entries render in their stored order.

The visual layout should preserve that order as responsive column counts change.

---

# Columns

The classroom is designed to support **eight tiles across** on the primary large classroom display.

Pages may use an appropriate configured column count.

On smaller displays, responsive behavior may reduce the number of columns.

Responsive changes should preserve:

- Readable labels
- Useful image size
- Comfortable touch targets
- Entry order
- Clear section boundaries

The large classroom display remains the primary Student Mode design target.

---

# Tiles

Tiles are the primary Student interaction element.

Tiles should:

- Present a strong visual image
- Provide a readable label
- Have a large touch target
- Use consistent dimensions within a page
- Clearly appear actionable when they launch content
- Avoid unnecessary secondary controls

A tile's content type should not require the student to understand technical distinctions.

For example, YouTube and locally stored videos may use different implementations while presenting a consistent video experience.

---

# Tile Images

Tile images should communicate the activity or destination before text whenever practical.

If a classroom image is missing or unavailable, the interface should use an appropriate fallback rather than exposing a broken-image experience.

Images should preserve useful proportions without distorting classroom artwork.

---

# Navigation Tiles

Navigation tiles visually resemble classroom content tiles but open child pages.

They should:

- Use the child page's title
- Use the selected navigation image
- Behave consistently with the classroom hierarchy
- Avoid exposing the distinction between a Navigation Entry and a Container

To the student, a Navigation tile is simply a visual way to enter another classroom page.

---

# Sections

Sections visually organize groups of tiles.

The current Student section treatment uses:

- A centered Section Title
- Horizontal divider lines extending on both sides
- Full-page-width placement
- A restrained text treatment distinct from tile labels

Sections should:

- Clearly separate related groups
- Avoid appearing actionable
- Preserve the flow of the tile grid
- Remain visually subordinate to the classroom page title

Sections should not introduce unnecessary boxes, controls, or decoration.

---

# Student Messages

Temporary Student messages should:

- Be brief
- Use plain language
- Avoid implementation details
- Be easy to dismiss or disappear automatically when appropriate
- Not obscure classroom content longer than necessary

The published classroom update notification should be simple and nontechnical, such as:

```text
Classroom Updated
```

---

# Content Viewers

Content viewers allow classroom resources to open without unnecessarily leaving the classroom experience.

Where appropriate, viewers should:

- Clearly identify the content
- Use most of the available display area
- Provide an obvious Close control
- Return the student to the same classroom page
- Stop active media when closed

Viewer controls should be usable on the large touch display.

---

# Video Viewers

YouTube and local video are different content implementations but should feel consistent to the student.

Both should provide:

- A large viewing area
- Clear title/context
- An obvious Close control
- Return to the current classroom page

Local video playback should use normal video controls where useful.

Closing a local video should stop playback.

Closing YouTube playback should release or stop the active player.

Video looping is not a standard classroom option and should not be added without a demonstrated need.

---

# PDF and Image Viewing

PDF and image content should prioritize the resource itself.

Viewer chrome should remain minimal.

Controls should be:

- Large enough for touch
- Clearly labeled or universally recognizable
- Positioned consistently where practical

The student should always have an obvious way to return to the classroom.

---

# Website Content

Website tiles may open external web content.

The Student interface should clearly launch the intended destination without exposing implementation details.

External-site behavior may differ from integrated viewers because the destination is outside VCC's control.

---

# Teacher Mode

## Purpose

Teacher Mode is an authoring interface.

It should provide more information and controls than Student Mode while remaining approachable to a teacher who does not know the application's implementation.

Teacher Mode should feel like a classroom editing tool rather than an administrative console.

---

# Teacher Mode Principles

Teacher Mode should be:

- Organized
- Explicit
- Predictable
- Touch-capable
- Efficient with a mouse and keyboard
- Protective of classroom structure

Teacher controls may be denser than Student controls, but clarity should remain more important than compactness.

---

# Teacher Workspace

Teacher Mode visually separates:

- Page hierarchy
- Selected page contents
- Editing controls

The current conceptual layout is:

```text
Header

--------------------------------------------

Page Tree | Page Layout

--------------------------------------------

Editing Toolbar
```

The selected page and selected item should always be visually apparent.

---

# Teacher Toolbar

The current Teacher toolbar contains:

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

Spacing should visually separate related action groups.

Buttons should:

- Use teacher-friendly language
- Be large enough for reliable touch
- Maintain consistent sizing where practical
- Provide obvious enabled/disabled state
- Avoid exposing Domain Model terminology

---

# Selection

Selected Teacher items should have an obvious visual state.

Selection feedback should be strong enough to answer:

> What will Edit, Delete, Move Up, or Move Down act on?

Selection should not depend solely on subtle color differences.

---

# Dialogs

Teacher Mode uses dialogs for focused tasks such as:

- Adding a page
- Adding a tile
- Editing an item
- Selecting an asset
- Displaying messages
- Confirming actions

Dialogs should:

- Have a clear title
- Ask only for information needed for the task
- Use consistent field spacing
- Use teacher-friendly labels
- Provide obvious primary and secondary actions
- Focus the first useful control when opened
- Support keyboard use where practical
- Remain comfortable for touch

---

# Dialog Actions

Primary and secondary actions should be visually distinguishable.

Examples:

- Select / Cancel
- Save / Cancel
- Delete / Cancel
- OK

The primary action should represent the expected completion of the dialog.

Destructive actions should not be visually confused with ordinary confirmation.

---

# Form Fields

Form controls should:

- Have visible labels
- Use readable text
- Provide sufficient height for touch
- Clearly indicate disabled or read-only state
- Avoid requiring teachers to interpret raw technical values

Placeholder text may supplement a label but should not replace it.

---

# Tile Type Terminology

Teacher Mode uses classroom-friendly names.

Current Tile Type choices are:

```text
Placeholder
YouTube
Video
Website
PDF
Image
```

The UI intentionally hides underlying Project type terminology such as:

```text
video
localVideo
```

Teacher-facing labels should describe what the teacher is choosing, not how the software stores it.

---

# Asset Pickers

Asset pickers should share a common interaction pattern.

Current pickers include:

- Image Picker
- PDF Picker
- Video Picker

Common behavior should include:

- Search
- Visible available choices
- Clear selected state
- Select action
- Cancel action

Where useful, double-click may provide a faster desktop interaction, but single selection followed by **Select** must remain fully supported for touch use.

---

# Image Picker

The Image Picker should emphasize visual recognition.

Where practical, it should provide:

- Image thumbnails
- Filename or identifying text
- Search
- Clear selected state

The teacher should not need to type image filenames manually.

---

# PDF and Video Pickers

PDF and Video Pickers may use searchable filename lists when thumbnails provide little value.

Selected files should be clearly highlighted.

The Select button should not become active until a valid selection exists.

Teachers should not see server paths.

---

# Update Library Feedback

Update Library should behave as a single teacher action.

After a successful update, newly available assets should appear in the appropriate pickers without requiring the teacher to understand catalog generation.

Failures should be reported in teacher-friendly language.

---

# Publish Feedback

Publish should provide a clear result.

Current result concepts are:

## Publish Complete

```text
The classroom has been published successfully.
```

## Nothing to Publish

```text
The classroom is already up to date.
```

## Publish Failed

```text
The classroom could not be published. Please try again.
```

The Teacher UI should not expose Git commands, repository details, or server exceptions as the normal publish result.

---

# Validation and Error Messages

Teacher-facing messages should explain what action the teacher can take.

They may contain more detail than Student messages, but should still avoid unnecessary technical implementation information.

For example, when a Navigation tile cannot be independently deleted, the UI should explain that it will be removed when the page is deleted.

Raw stack traces and internal filesystem paths are development diagnostics, not normal Teacher UI.

---

# Responsive Behavior

Student Mode and Teacher Mode should remain usable on different screen sizes, but they have different primary environments.

## Student Mode

Primary target:

- Large classroom touch display

Secondary support:

- Desktop/laptop
- Tablet
- Smaller screens where practical

## Teacher Mode

Primary use may include:

- Classroom touch display
- Desktop/laptop editing

Responsive behavior should preserve usability rather than forcing identical layouts at every size.

---

# Accessibility

VCC should support accessible interaction wherever practical.

Standards include:

- Strong text/background contrast
- Visible focus indicators
- Semantic controls
- Meaningful labels
- Keyboard-operable dialogs and controls
- Touch targets large enough for reliable use
- Avoiding color as the only indicator of state
- Appropriate dialog semantics
- Useful alternative text where applicable

Accessibility improvements should preserve the visual simplicity of Student Mode.

---

# Focus and Keyboard Behavior

Keyboard interaction is especially important in Teacher Mode.

Dialogs should:

- Move focus to a useful control when opened
- Support expected Enter behavior where appropriate
- Support Escape/cancel behavior where safe
- Return focus sensibly when closed

Visible focus should not be removed merely for visual appearance.

Touch interaction must remain fully usable without a keyboard.

---

# Consistency Before Novelty

New interface components should reuse existing visual and interaction patterns whenever practical.

Before creating a new component, consider whether an existing:

- Dialog
- Button style
- Picker
- Message pattern
- Viewer
- Selection treatment

can be extended.

Consistency is more valuable than giving each feature a unique visual treatment.

---

# Avoiding Unnecessary UI

A feature should not add controls merely because the underlying implementation can support them.

Before adding an option, ask:

- Does a teacher or student need this?
- Will it be used often enough to justify permanent UI?
- Can the software choose the correct behavior automatically?
- Does the new option make common tasks harder to understand?

VCC should become more capable without becoming visually complicated.

---

# Startup and Transition Behavior

The interface should avoid visible intermediate states that contradict the classroom being loaded.

Examples include:

- Obsolete hardcoded page titles
- Broken-image flashes
- Technical loading text
- Controls appearing briefly in the wrong state

Where a default state is necessary before project data loads, it should be neutral or consistent with the expected classroom.

Transitions should be fast and unobtrusive.

---

# Guiding Principles

Every VCC interface should reinforce these standards:

- Classroom content is the visual priority.
- Student Mode remains simple.
- Teacher Mode remains understandable.
- Touch interaction is a first-class requirement.
- Frequently used controls should be physically practical to reach.
- Images communicate before text where practical.
- Technical implementation remains hidden.
- Similar interactions behave similarly.
- Errors are explained in user-appropriate language.
- Preview and Published Student should feel like the same classroom.
- New features should not create unnecessary interface complexity.
- Real classroom use should guide UI decisions.

The interface should make increasingly capable classroom technology feel increasingly simple.

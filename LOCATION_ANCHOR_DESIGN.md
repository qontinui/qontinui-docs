# Location and Anchor Design in Qontinui

## Overview

This document explains the design decisions behind Location and Anchor in Qontinui, their relationship, and when to use each. This is particularly important as the design differs from the original Brobot implementation.

## Core Concepts

### Location
A **Location** represents a specific point on the screen that can be used as a target for actions (click, type, hover, etc.). It is the primary positioning type for all actions.

### Anchor
An **Anchor** serves two distinct purposes:
1. **As a reference point**: A named position that can be referenced by other elements
2. **As a region component**: Part of the definition of a Region's boundaries

## The Key Design Decision

Unlike some implementations where Anchor contains Location or vice versa, in Qontinui:
- **Location** is for action targets
- **Anchor** is for defining spatial relationships and region boundaries

### When Defining a Region

When an Anchor is used as a component of a region definition, it must specify:
- **Which part of the region** it represents (corner, edge, or custom point)
- **The anchor type** (TOP_LEFT, BOTTOM_RIGHT, CENTER, etc.)
- **Its relationship** to other anchors defining the same region

Example:
```python
# Defining a region using two anchors
anchor1 = Anchor(name="top_left_button", anchor_type=AnchorType.TOP_LEFT)
anchor2 = Anchor(name="bottom_right_field", anchor_type=AnchorType.BOTTOM_RIGHT)
# The region spans from anchor1 to anchor2
```

## Absolute vs Relative Positioning

### Decision Logic

The system determines whether to use absolute or relative positioning based on:

1. **Presence of reference elements**:
   - If `Location.region` is set → Use relative positioning
   - If `Location.region` is None → Use absolute positioning

2. **Fixed flag**:
   - If `Location.fixed = True` → Always use absolute coordinates
   - If `Location.fixed = False` → Use relative if reference available

3. **Context availability**:
   - During state definition → Usually relative (to state elements)
   - During execution → Can be either, depending on match availability

### Resolution Order

When resolving a Location to actual screen coordinates:

```python
def resolve_location(location: Location) -> (int, int):
    # 1. Check if fixed positioning is forced
    if location.fixed:
        return (location.x, location.y)

    # 2. Check for relative positioning
    if location.region and location.position:
        # Calculate position within region
        x = location.region.x + (location.region.width * location.position.percent_w)
        y = location.region.y + (location.region.height * location.position.percent_h)
        return (x + location.offset_x, y + location.offset_y)

    # 3. Fall back to absolute
    return (location.x + location.offset_x, location.y + location.offset_y)
```

## Practical Guidelines

### Use Location when:
- Defining click targets
- Specifying where to type
- Setting mouse hover positions
- Any action that requires a point target

### Use Anchor when:
- Defining the boundaries of a region
- Creating reference points for relative positioning
- Building spatial relationships between elements
- Defining regions that adapt to different screen sizes

### Use Relative Positioning when:
- The element might appear in different positions
- Working with responsive UIs
- Creating resolution-independent automation
- The position is relative to a matched image

### Use Absolute Positioning when:
- The element is always at the same screen position
- Working with fixed-layout applications
- Performance is critical (no calculation needed)
- The position is independent of other elements

## State Context and Image Matching

### Important: Image-Relative vs State-Relative

Locations can be relative to:
1. **A specific StateImage match**: More precise, adapts to where the image was found
2. **A StateRegion**: Fixed area within a state
3. **The entire State**: Less precise, assumes state has fixed layout

Best practice: **Prefer image-relative positioning** because:
- Images move independently within states
- More robust to UI changes
- Works across different resolutions
- Handles dynamic content better

### Linking to Match Regions

When a Location's position depends on where an image was matched:

```python
location = Location(
    region=None,  # Will be set to match.region at runtime
    position=Position.CENTER,  # Position within the matched region
    reference_image_id="login_button_image"  # Links to specific StateImage
)
```

At execution time, the system:
1. Finds the image match
2. Sets location.region = match.region
3. Calculates final position within that region

## Common Patterns

### Pattern 1: Fixed Application Header
```python
# Always at same position - use absolute
file_menu = Location(x=50, y=30, fixed=True)
```

### Pattern 2: Button Relative to Label
```python
# Button appears to the right of a label
label_match = find_image("username_label")
button = Location(
    region=label_match.region,
    position=Position.MIDDLE_RIGHT,
    offset_x=100  # 100 pixels to the right of label
)
```

### Pattern 3: Dynamic Dialog Center
```python
# Click center of wherever dialog appears
dialog = Location(
    region=None,  # Set when dialog is found
    position=Position.CENTER,
    reference_image_id="dialog_title"
)
```

### Pattern 4: Region Defined by Anchors
```python
# Search area between two UI elements
top_anchor = Anchor(name="search_bar", anchor_type=AnchorType.BOTTOM_LEFT)
bottom_anchor = Anchor(name="status_bar", anchor_type=AnchorType.TOP_RIGHT)
search_region = Region.from_anchors(top_anchor, bottom_anchor)
```

## Migration Notes from Brobot

In Brobot, the relationship between Location and Anchor may be different. Key differences in Qontinui:

1. **Separation of concerns**: Location for actions, Anchor for relationships
2. **No circular dependencies**: Location doesn't contain Anchor, Anchor doesn't contain Location
3. **Match-based resolution**: Locations can dynamically resolve based on image matches
4. **Explicit fixed flag**: Clear indication of absolute vs relative intent

## Summary

The Location/Anchor design in Qontinui prioritizes:
- **Clarity**: Clear separation between action targets and spatial relationships
- **Flexibility**: Multiple ways to define positions based on context
- **Robustness**: Positions that adapt to UI changes
- **Performance**: Efficient resolution of positions when needed

Remember: When in doubt, use Location for "where to click/type" and Anchor for "how regions relate to each other."
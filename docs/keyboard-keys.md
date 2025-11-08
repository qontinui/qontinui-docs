# Keyboard Keys and Special Strings

Qontinui provides enums for special keyboard keys that cannot be typed directly as strings, similar to SikuliX's Key class. This allows for robust keyboard automation without requiring SikuliX as a dependency.

## Overview

The keyboard key system in Qontinui consists of three main components:

1. **`Key` enum** - Defines special keyboard keys
2. **`KeyCombo` class** - Creates key combinations
3. **`KeyCombos` constants** - Pre-defined common key combinations

## Key Enum

The `Key` enum provides string representations of special keyboard keys for use in automation.

### Basic Usage

```python
from qontinui.actions import Key

# Use special keys in automation
action.type_text("Hello")
action.key_press(Key.ENTER)
action.type_text("World")

# Keys have string values
print(Key.ENTER.value)  # "\n"
print(Key.TAB.value)    # "\t"
print(Key.ESCAPE.value) # "escape"
```

### Available Keys

#### Navigation Keys
- `ENTER` - "\n"
- `RETURN` - "\r"  
- `TAB` - "\t"
- `SPACE` - " "
- `BACKSPACE` - "\b"
- `DELETE` - "delete"

#### Arrow Keys
- `UP` - "up"
- `DOWN` - "down"
- `LEFT` - "left"
- `RIGHT` - "right"

#### Modifier Keys
- `SHIFT` - "shift"
- `CTRL` / `CONTROL` - "ctrl"
- `ALT` - "alt"
- `META` - "meta" (Windows/Command key)
- `WIN` - "win" (Windows key)
- `CMD` - "cmd" (Mac Command key)

#### Function Keys
- `F1` through `F15`

#### Navigation Cluster
- `HOME` - "home"
- `END` - "end"
- `PAGE_UP` - "pageup"
- `PAGE_DOWN` - "pagedown"
- `INSERT` - "insert"

#### Special Keys
- `ESC` / `ESCAPE` - "escape"
- `PRINT_SCREEN` - "printscreen"
- `SCROLL_LOCK` - "scrolllock"
- `PAUSE` - "pause"
- `BREAK` - "break"
- `CAPS_LOCK` - "capslock"
- `NUM_LOCK` - "numlock"

#### Numpad Keys
- `NUM0` through `NUM9`
- `NUM_MULTIPLY` - "multiply"
- `NUM_ADD` - "add"
- `NUM_SUBTRACT` - "subtract"
- `NUM_DECIMAL` - "decimal"
- `NUM_DIVIDE` - "divide"

#### Media Keys
- `VOLUME_UP`, `VOLUME_DOWN`, `VOLUME_MUTE`
- `MEDIA_PLAY_PAUSE`, `MEDIA_STOP`
- `MEDIA_NEXT_TRACK`, `MEDIA_PREV_TRACK`

#### Browser Control Keys
- `BROWSER_BACK`, `BROWSER_FORWARD`
- `BROWSER_REFRESH`, `BROWSER_STOP`
- `BROWSER_SEARCH`, `BROWSER_FAVORITES`, `BROWSER_HOME`

### Helper Methods

The `Key` enum provides several classification methods:

```python
from qontinui.actions import Key

# Check if a key is a modifier
Key.is_modifier(Key.SHIFT)  # True
Key.is_modifier(Key.ENTER)  # False

# Check if a key is a function key
Key.is_function_key(Key.F1)   # True
Key.is_function_key(Key.TAB)  # False

# Check if a key is a navigation key
Key.is_navigation_key(Key.UP)    # True
Key.is_navigation_key(Key.SPACE) # False

# Convert string to Key enum
key = Key.from_string("ENTER")   # Returns Key.ENTER
key = Key.from_string("escape")  # Returns Key.ESCAPE
```

## KeyCombo Class

The `KeyCombo` class helps create keyboard combinations (like Ctrl+C).

### Creating Combinations

```python
from qontinui.actions import Key, KeyCombo

# Create combinations manually
combo = KeyCombo(Key.CTRL, 'a')  # Ctrl+A
print(combo)  # "ctrl+a"

# Use convenience methods
select_all = KeyCombo.ctrl('a')
save = KeyCombo.ctrl('s')
alt_tab = KeyCombo.alt(Key.TAB)
cmd_q = KeyCombo.meta('q')  # Mac Command+Q

# Multiple modifiers
save_as = KeyCombo(Key.CTRL, Key.SHIFT, 's')  # Ctrl+Shift+S
```

### Using with Actions

```python
from qontinui.actions import Actions, Key, KeyCombo

actions = Actions()

# Select all text
combo = KeyCombo.ctrl('a')
actions.key_combo(combo)

# Or use the keys directly
actions.key_down(Key.CTRL)
actions.key_press('a')
actions.key_up(Key.CTRL)
```

## KeyCombos Constants

Pre-defined common keyboard combinations are available in the `KeyCombos` class:

```python
from qontinui.actions import KeyCombos

# Text editing combinations
KeyCombos.SELECT_ALL  # Ctrl+A
KeyCombos.COPY        # Ctrl+C
KeyCombos.CUT         # Ctrl+X
KeyCombos.PASTE       # Ctrl+V
KeyCombos.UNDO        # Ctrl+Z
KeyCombos.REDO        # Ctrl+Y
KeyCombos.FIND        # Ctrl+F
KeyCombos.REPLACE     # Ctrl+H
KeyCombos.SAVE        # Ctrl+S

# Navigation combinations
KeyCombos.NEXT_TAB    # Ctrl+Tab
KeyCombos.PREV_TAB    # Ctrl+Shift+Tab
KeyCombos.CLOSE_TAB   # Ctrl+W
KeyCombos.NEW_TAB     # Ctrl+T

# System combinations
KeyCombos.ALT_TAB     # Alt+Tab
KeyCombos.ALT_F4      # Alt+F4

# Mac-specific combinations
KeyCombos.MAC_COPY    # Cmd+C
KeyCombos.MAC_PASTE   # Cmd+V
KeyCombos.MAC_CUT     # Cmd+X
KeyCombos.MAC_QUIT    # Cmd+Q
```

## Practical Examples

### Example 1: Form Filling

```python
from qontinui.actions import Actions, Key

actions = Actions()

# Fill a form
actions.type_text("John Doe")
actions.key_press(Key.TAB)
actions.type_text("john.doe@example.com")
actions.key_press(Key.TAB)
actions.type_text("Password123")
actions.key_press(Key.ENTER)  # Submit form
```

### Example 2: Text Editing

```python
from qontinui.actions import Actions, Key, KeyCombos

actions = Actions()

# Select all and replace
actions.key_combo(KeyCombos.SELECT_ALL)
actions.type_text("New content")

# Save the file
actions.key_combo(KeyCombos.SAVE)
```

### Example 3: Navigation

```python
from qontinui.actions import Actions, Key

actions = Actions()

# Navigate through a menu
actions.key_press(Key.DOWN)
actions.key_press(Key.DOWN)
actions.key_press(Key.RIGHT)  # Open submenu
actions.key_press(Key.ENTER)   # Select item
```

### Example 4: Special String Usage

```python
from qontinui.actions import Actions, Key

actions = Actions()

# Type multi-line text
text = f"Line 1{Key.ENTER.value}Line 2{Key.ENTER.value}Line 3"
actions.type_text(text)

# Type tab-separated values
data = f"Name{Key.TAB.value}Age{Key.TAB.value}City"
actions.type_text(data)
```

## Compatibility with KeyModifier

The `Key` enum is fully compatible with the existing `KeyModifier` enum:

```python
from qontinui.actions import Key, KeyModifier, KeyCombo

# Both work interchangeably
combo1 = KeyCombo(Key.CTRL, 's')
combo2 = KeyCombo(KeyModifier.CTRL, 's')

# KeyModifier is automatically converted to Key
print(combo1)  # "ctrl+s"
print(combo2)  # "ctrl+s"
```

## Migration from SikuliX

If you're migrating from SikuliX/Brobot, the key mappings are designed to be familiar:

| SikuliX/Brobot | Qontinui |
|----------------|----------|
| `Key.ENTER` | `Key.ENTER` |
| `Key.TAB` | `Key.TAB` |
| `Key.ESC` | `Key.ESC` or `Key.ESCAPE` |
| `Key.F1` | `Key.F1` |
| `Key.CTRL` | `Key.CTRL` |
| `Key.ALT` | `Key.ALT` |
| `Key.SHIFT` | `Key.SHIFT` |

The main difference is that Qontinui's implementation doesn't require SikuliX as a dependency, making it lighter and more portable.

## Implementation Details

The Key enum implementation:
- Uses Python's built-in `enum.Enum`
- Provides string values that work with underlying automation libraries (pyautogui, pynput)
- Includes helper methods for key classification
- Supports conversion from string representations
- Handles circular import issues with KeyModifier gracefully

This design ensures that Qontinui can handle keyboard automation tasks without external dependencies while maintaining compatibility with the Brobot/SikuliX API patterns.
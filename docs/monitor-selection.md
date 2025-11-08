---
sidebar_label: 'Multi-Monitor Support'
sidebar_position: 3
---

# Multi-Monitor Support

Qontinui Runner provides comprehensive multi-monitor support, allowing you to run automations on any connected display. This document explains how monitor detection and selection works across the application stack.

## Overview

The monitor selection feature enables:
- **Dynamic detection** of all connected monitors
- **Selection** of which monitor to run automation on
- **Coordinate conversion** between monitor-relative and global coordinates
- **Fallback** to primary monitor when needed

## Architecture

Monitor functionality is implemented across three layers, each handling what it does best:

### 1. Tauri (Native Detection)

The Rust backend uses Tauri's native APIs to detect system monitors:

```rust
// src-tauri/src/commands.rs
#[tauri::command]
pub fn get_monitors(app_handle: AppHandle) -> Result<CommandResponse, String> {
    let monitors = app_handle
        .get_webview_window("main")?
        .available_monitors()?;

    let monitor_count = monitors.len();
    let monitor_indices: Vec<i32> = (0..monitor_count as i32).collect();

    Ok(CommandResponse {
        success: true,
        data: Some(json!({
            "count": monitor_count,
            "indices": monitor_indices,
        })),
    })
}
```

**Why Tauri?** It has direct access to OS-level monitor information across Windows, macOS, and Linux.

### 2. Qontinui Library (Coordinate Management)

The Python library handles coordinate conversion and monitor-specific operations:

```python
# qontinui/monitor/monitor_manager.py
class MonitorManager:
    def to_monitor_coordinates(self, global_x: int, global_y: int, monitor_index: int):
        """Convert global coordinates to monitor-relative coordinates."""

    def to_global_coordinates(self, monitor_x: int, monitor_y: int, monitor_index: int):
        """Convert monitor-relative coordinates to global coordinates."""
```

**Key Features:**
- Maintains monitor cache with position and size
- Converts between coordinate systems
- Handles negative coordinates for left-side monitors
- Detects primary monitor based on position

### 3. React Frontend (User Interface)

The UI provides monitor selection with dynamic detection:

```javascript
// src/App.tsx
const detectSystemMonitors = async () => {
    const result = await invoke("get_monitors");
    if (result.success && result.data) {
        setAvailableMonitors(result.data.indices);
        addLog("info", `Detected ${result.data.count} monitor(s)`);
    }
};
```

## User Experience

### Monitor Selection UI

The interface shows:
- **Monitor dropdown** with all detected monitors
- **Primary indicator** for Monitor 0
- **Count display** showing total monitors detected
- **Automatic detection** on app startup

```jsx
<label>Monitor (3 detected)</label>
<select>
    <option>Monitor 0 (Primary)</option>
    <option>Monitor 1</option>
    <option>Monitor 2</option>
</select>
```

### Execution Flow

1. **App Launch** → Detects available monitors
2. **User Selection** → Choose target monitor from dropdown
3. **Start Execution** → Monitor index passed to automation engine
4. **Coordinate Handling** → All actions execute on selected monitor

## Implementation Details

### Monitor Index Parameter Flow

The selected monitor index flows through the entire stack:

```
Frontend (selectedMonitor: 0)
    ↓ invoke("start_execution", { monitorIndex: 0 })
Tauri Command
    ↓ params.insert("monitor_index", 0)
Python Bridge
    ↓ monitor_index = params.get("monitor_index", 0)
JSONRunner
    ↓ runner.run(mode=mode, monitor_index=0)
MonitorManager
    → Sets primary_monitor_index = 0
```

### Coordinate System Handling

Different monitors can have different positions in the global coordinate space:

```
Monitor Layout Example:
[Monitor 1]  [Monitor 0 (Primary)]  [Monitor 2]
(-1920,0)    (0,0)                  (1920,0)
```

The MonitorManager handles conversions:
- **Global → Monitor**: Subtract monitor's top-left position
- **Monitor → Global**: Add monitor's top-left position

### Default Behavior

- **Primary Monitor**: Always index 0
- **Fallback**: If selected monitor unavailable, uses primary
- **Headless Mode**: Creates virtual 1920x1080 monitor

## Configuration

### Python Side (JSONRunner)

```python
# Initialize with monitor selection
runner = JSONRunner()
runner.run(mode="process", monitor_index=1)  # Run on Monitor 1
```

### Monitor Manager Configuration

```python
# The monitor manager automatically configures based on index
def _configure_monitor(self, monitor_index: int):
    self.monitor_manager.primary_monitor_index = monitor_index
    monitor_info = self.monitor_manager.get_monitor_info(monitor_index)
    if monitor_info:
        print(f"Using Monitor {monitor_index}: {monitor_info.width}x{monitor_info.height}")
```

## Troubleshooting

### Common Issues

1. **Wrong Monitor Count**
   - Ensure all monitors are connected before launching
   - Check display settings in your OS
   - Restart the application after connecting new monitors

2. **Coordinates Off**
   - Verify monitor arrangement in OS display settings
   - Check that monitor scales are set correctly (100% recommended)
   - Ensure DPI settings are consistent

3. **Monitor Not Available**
   - Application automatically falls back to primary monitor
   - Check logs for "Monitor X not found" messages
   - Verify monitor index is within available range

### Debug Information

Enable debug logging to see monitor detection details:

```javascript
console.log("Detected monitors:", availableMonitors);
console.log("Selected monitor:", selectedMonitor);
```

## Platform Considerations

### Windows
- Full multi-monitor support
- Handles different DPI scales per monitor
- Negative coordinates for left-side monitors

### macOS
- Supports Retina displays
- Menu bar affects coordinate calculations
- Spaces/Mission Control may interfere

### Linux
- Requires X11 or Wayland
- DISPLAY environment variable must be set
- Virtual desktops treated as single monitor

## Future Enhancements

Planned improvements for monitor support:

1. **Enhanced Detection**
   - Monitor names/models
   - Resolution and refresh rate info
   - DPI/scaling information

2. **Smart Selection**
   - Remember last used monitor
   - Auto-select based on window position
   - Monitor profiles for different setups

3. **Coordinate Improvements**
   - Handle monitor disconnection gracefully
   - Support for monitor rotation
   - Better DPI scaling support

## API Reference

### Tauri Commands

```typescript
// Get available monitors
invoke("get_monitors"): Promise<{
    success: boolean;
    data: {
        count: number;
        indices: number[];
    };
}>

// Start execution with monitor
invoke("start_execution", {
    mode: string;
    monitorIndex: number;
    processId?: string;
}): Promise<CommandResponse>
```

### Python Bridge

```python
# Handle monitor query
def _handle_get_monitors() -> dict:
    return {
        "success": True,
        "count": monitor_count,
        "indices": monitor_indices
    }

# Start with monitor selection
def _handle_start(params: dict) -> dict:
    monitor_index = params.get("monitor_index", 0)
    runner.run(mode=mode, monitor_index=monitor_index)
```

### MonitorManager Methods

```python
class MonitorManager:
    def get_monitor_count() -> int
    def get_monitor_info(index: int) -> MonitorInfo
    def get_all_monitor_info() -> list[MonitorInfo]
    def to_monitor_coordinates(global_x, global_y, monitor_index) -> tuple
    def to_global_coordinates(monitor_x, monitor_y, monitor_index) -> tuple
    def get_monitor_at_point(x, y) -> int
```

## Best Practices

1. **Always detect monitors dynamically** - Don't hardcode monitor counts
2. **Handle fallback gracefully** - Always have a default monitor (0)
3. **Log monitor selection** - Help users debug coordinate issues
4. **Test multi-monitor setups** - Verify on different configurations
5. **Consider DPI scaling** - Test with different scale factors

## Summary

The multi-monitor support in Qontinui Runner provides a robust solution for running automations on any connected display. By leveraging Tauri's native detection, Qontinui's coordinate management, and React's dynamic UI, users can reliably target specific monitors for their automation needs.
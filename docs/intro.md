---
sidebar_position: 1
---

# Welcome to Qontinui

Qontinui is a next-generation GUI automation framework that combines model-based testing with AI-enhanced perception for robust and intelligent automation.

## What is Qontinui?

Qontinui is a Python-based framework designed to revolutionize GUI automation by:

- **AI-Enhanced Perception**: Using state-of-the-art models like SAM (Segment Anything Model) and CLIP for intelligent UI element detection
- **Hybrid State Management**: Combining deterministic and probabilistic approaches for robust state tracking
- **Semantic Matching**: Vector-based element matching that understands UI semantics beyond pixel-perfect matching
- **DSL Support**: A domain-specific language for writing readable and maintainable automation scripts
- **Migration Tools**: Seamless migration path from existing Brobot applications

## Key Features

### 🤖 Intelligent Element Detection
- Automatic UI segmentation using computer vision
- Semantic understanding of UI elements
- Robust to UI changes and variations

### 🎯 Smart State Management
- Hybrid state machine with probabilistic activation
- Multi-state awareness
- Automatic state discovery

### 📝 Declarative DSL
- Human-readable automation scripts
- State and transition definitions
- Built-in assertions and control flow

### 🔄 Easy Migration
- Convert existing Brobot applications
- Preserve test assets and patterns
- Gradual migration path

## Architecture Overview

```
Qontinui Ecosystem
├── Core Library (OSS)
│   ├── State Management
│   ├── Perception Pipeline
│   ├── Action Execution
│   └── DSL Parser
├── Web Builder (Private)
│   ├── Visual Configuration
│   └── Project Management
├── Desktop Runner (OSS)
│   ├── Script Execution
│   └── Real-time Monitoring
└── MCP Server (OSS)
    └── AI Agent Integration
```

## Getting Started

### Installation

```bash
pip install qontinui
```

### Quick Example

```python
from qontinui import QontinuiStateManager, State, Element
from qontinui.perception import ScreenSegmenter
from qontinui.actions import BasicActions

# Initialize components
manager = QontinuiStateManager()
segmenter = ScreenSegmenter(use_sam=True)
actions = BasicActions()

# Define a state
login_state = State(
    name="login",
    elements=[
        Element(id="username", bbox=(100, 200, 200, 50)),
        Element(id="password", bbox=(100, 260, 200, 50)),
        Element(id="submit", bbox=(150, 330, 100, 40))
    ],
    min_elements=3
)

# Add to manager
manager.add_state(login_state)

# Detect and interact
screenshot = actions.screenshot()
segments = segmenter.segment_screen(screenshot)
# ... automation logic
```

## Why Qontinui?

### Problems with Traditional Automation

Traditional GUI automation tools suffer from:
- **Brittleness**: Small UI changes break tests
- **Maintenance Burden**: Constant updates needed
- **Limited Intelligence**: No understanding of UI semantics
- **Poor Scalability**: Hard to manage large test suites

### The Qontinui Solution

Qontinui addresses these challenges through:
- **Semantic Understanding**: AI models understand UI meaning
- **Adaptive Detection**: Robust to visual changes
- **Smart State Management**: Automatic state tracking
- **Maintainable Scripts**: Declarative DSL reduces complexity

## Use Cases

- **Test Automation**: Robust end-to-end testing
- **RPA (Robotic Process Automation)**: Business process automation
- **UI Monitoring**: Continuous UI validation
- **Migration Testing**: Validating application migrations
- **Accessibility Testing**: Automated accessibility checks

## Next Steps

- [Installation Guide](getting-started/installation) - Set up Qontinui
- [Quick Start Tutorial](getting-started/quick-start) - Your first automation
- [Core Concepts](concepts/states) - Understand the fundamentals
- [DSL Documentation](dsl/DSL_TUTORIAL) - Learn the Domain-Specific Language
- [API Reference](api/state-management) - Detailed API documentation

## DSL (Domain-Specific Language)

Qontinui provides a powerful JSON-based DSL for defining automation workflows declaratively:

- **[DSL Tutorial](dsl/DSL_TUTORIAL)** - Beginner-friendly guide with examples
- **[DSL Specification](dsl/DSL_SPECIFICATION)** - Complete language reference
- **[DSL Examples](dsl/DSL_EXAMPLES)** - Real-world automation scenarios

The DSL allows you to:
- Write automation without Python code
- Define reusable functions with parameters
- Use control flow (if/else, loops)
- Perform complex expressions and calculations
- Build maintainable automation workflows

## Community and Support

- **GitHub**: [github.com/qontinui](https://github.com/qontinui)
- **Discord**: [Join our community](https://discord.gg/qontinui)
- **Stack Overflow**: Tag your questions with `qontinui`

## License

Qontinui Core is open source under the MIT License. The Web Builder is proprietary software.
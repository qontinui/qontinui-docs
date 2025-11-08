# Qontinui DSL Documentation

Complete documentation for the Qontinui Domain-Specific Language (DSL).

## Overview

The Qontinui DSL is a JSON-based declarative language for defining automation workflows. It enables users to create sophisticated automation scripts without writing Python code, making automation accessible to non-programmers while maintaining the power and flexibility needed for complex scenarios.

## Documentation Structure

### Core Documentation

1. **[DSL_TUTORIAL.md](DSL_TUTORIAL.md)** (29KB)
   - Beginner-friendly introduction to the DSL
   - Step-by-step examples from simple to advanced
   - Best practices and common patterns
   - Troubleshooting guide
   - **Start here if you're new to the DSL**

2. **[DSL_SPECIFICATION.md](DSL_SPECIFICATION.md)** (20KB)
   - Complete formal specification
   - Grammar and syntax rules
   - All statement and expression types
   - Type system details
   - Control flow semantics
   - Scoping rules
   - Error handling
   - **Reference documentation for experienced users**

3. **[DSL_EXAMPLES.md](DSL_EXAMPLES.md)** (29KB)
   - Complete working examples
   - Real-world automation scenarios
   - Detailed explanations
   - Performance tips
   - **Learn by example**

### Example Files

The `examples/` directory contains working JSON files you can run:

1. **[simple_if_else.json](examples/simple_if_else.json)** (2.6KB)
   - Basic conditional logic
   - Simple if/else statement
   - Age validation example

2. **[for_each_loop.json](examples/for_each_loop.json)** (4.3KB)
   - Array iteration
   - Loop with conditional logic
   - Counter pattern

3. **[nested_control_flow.json](examples/nested_control_flow.json)** (8.5KB)
   - Complex nested if/else and loops
   - Filtering and processing
   - Multiple counters

4. **[variable_manipulation.json](examples/variable_manipulation.json)** (9.3KB)
   - Variable declarations and assignments
   - Statistical calculations
   - Builder pattern usage

5. **[complex_automation.json](examples/complex_automation.json)** (14KB)
   - Complete login workflow
   - Input validation
   - Error handling
   - Multi-step process

## Quick Start

### 1. Choose Your Learning Path

**Path A: Tutorial First (Recommended for Beginners)**
```
DSL_TUTORIAL.md → Run examples/ → DSL_EXAMPLES.md → DSL_SPECIFICATION.md
```

**Path B: Examples First (For Experienced Developers)**
```
DSL_EXAMPLES.md → examples/ → DSL_SPECIFICATION.md → DSL_TUTORIAL.md
```

**Path C: Specification First (For Language Designers)**
```
DSL_SPECIFICATION.md → DSL_EXAMPLES.md → examples/ → DSL_TUTORIAL.md
```

### 2. Run Your First Example

```python
from qontinui.dsl import DSLExecutor

# Load and execute a simple example
executor = DSLExecutor()
executor.load_file("examples/simple_if_else.json")
result = executor.execute("checkAge", [25])
print(result)  # Output: "adult"
```

### 3. Explore and Modify

- Copy an example file
- Modify parameters or logic
- Run it to see the changes
- Experiment and learn!

## Key Concepts

### Automation Functions

Functions are the building blocks of DSL scripts:

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "myFunction",
      "description": "What this function does",
      "return_type": "void",
      "parameters": [],
      "statements": []
    }
  ]
}
```

### Statement Types

Control the flow of execution:

- **variableDeclaration** - Declare variables
- **assignment** - Update variable values
- **if** - Conditional execution
- **forEach** - Loop over collections
- **return** - Return from function
- **methodCall** - Invoke methods

### Expression Types

Compute values:

- **literal** - Constant values
- **variable** - Variable references
- **methodCall** - Function calls
- **binaryOperation** - Arithmetic/logical operations
- **builder** - Fluent object construction

## Common Use Cases

### 1. Form Automation
See: `examples/complex_automation.json`
- Input validation
- Field filling
- Form submission
- Error checking

### 2. Data Processing
See: `examples/variable_manipulation.json`
- Statistical calculations
- Data transformation
- Aggregation

### 3. Conditional Logic
See: `examples/nested_control_flow.json`
- Filtering
- Branching logic
- Complex decisions

### 4. Iteration
See: `examples/for_each_loop.json`
- List processing
- Batch operations
- Counting and accumulation

## Language Features

### Type System
- `boolean`, `string`, `integer`, `double`
- `void` (for functions)
- `object`, `array` (for complex data)

### Operators
- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`

### Control Flow
- If/else statements
- ForEach loops
- Early return
- Nested scoping

### Advanced Features
- Builder pattern for complex objects
- Method chaining
- Variable scoping
- Short-circuit evaluation

## Best Practices

### 1. Naming
- Use `camelCase` for functions and variables
- Choose descriptive names
- Avoid abbreviations

### 2. Organization
- One function per logical task
- Small, focused functions
- Clear parameter names

### 3. Documentation
- Always include descriptions
- Explain complex logic
- Document return values

### 4. Error Handling
- Validate inputs early
- Check for null/empty values
- Return meaningful error states

### 5. Performance
- Minimize operations in loops
- Use short-circuit evaluation
- Cache expensive computations

## File Structure

```
docs/dsl/
├── README.md (this file)
├── DSL_TUTORIAL.md (beginner guide)
├── DSL_SPECIFICATION.md (formal spec)
├── DSL_EXAMPLES.md (working examples)
└── examples/
    ├── simple_if_else.json
    ├── for_each_loop.json
    ├── nested_control_flow.json
    ├── variable_manipulation.json
    └── complex_automation.json
```

## Integration with Qontinui

The DSL integrates seamlessly with Qontinui's automation framework:

```python
from qontinui.dsl import DSLExecutor
from qontinui import QontinuiStateManager

# Initialize
executor = DSLExecutor()
manager = QontinuiStateManager()

# Load DSL script
executor.load_file("my_automation.json")

# Execute with state context
result = executor.execute("automateWorkflow",
                         context={"state": manager})
```

## Contributing Examples

Want to contribute your own examples?

1. Create a well-documented JSON file
2. Add comments explaining the logic
3. Include expected input/output
4. Test thoroughly
5. Submit a pull request

## Additional Resources

- [Main Qontinui Documentation](../intro.md)
- [GitHub Repository](https://github.com/jspinak/qontinui)
- [API Reference](../intro.md)
- [Community Discord](https://discord.gg/qontinui)

## Troubleshooting

### Common Issues

1. **JSON Syntax Errors**
   - Use a JSON validator
   - Check for missing commas
   - Ensure quotes are matched

2. **Type Errors**
   - Verify variable types match
   - Check parameter types
   - Validate return types

3. **Variable Not Found**
   - Declare before use
   - Check spelling
   - Verify scope

4. **Invalid Expression**
   - Confirm expression type
   - Check operator compatibility
   - Validate operand types

## Version Information

- **DSL Version**: 1.0
- **Documentation Date**: October 2024
- **Qontinui Version**: Compatible with 0.1.0+

## License

This documentation is part of the Qontinui project and is licensed under the MIT License.

---

**Need Help?**

- Read the [Tutorial](DSL_TUTORIAL.md) for step-by-step guidance
- Check the [Specification](DSL_SPECIFICATION.md) for details
- Browse [Examples](DSL_EXAMPLES.md) for inspiration
- Ask questions on [Discord](https://discord.gg/qontinui)

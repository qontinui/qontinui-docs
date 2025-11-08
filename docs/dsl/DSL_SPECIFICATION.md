# Qontinui DSL Specification

## Overview

The Qontinui Domain-Specific Language (DSL) is a JSON-based declarative language for defining automation workflows. It allows users to create reusable automation functions that can perform UI interactions, control flow operations, and data manipulation without writing Python code.

### Purpose and Capabilities

The DSL enables:
- **Declarative automation**: Define what should happen, not how to implement it
- **Reusable functions**: Create modular automation units that can be called and composed
- **Type safety**: Static type checking for parameters and return values
- **Control flow**: Conditional logic (if/else) and iteration (forEach loops)
- **Expression evaluation**: Complex expressions with variables, method calls, and operations
- **Builder patterns**: Fluent API-style object construction

### Design Principles

1. **JSON-based**: Easy to parse, generate, and integrate with other tools
2. **Type-safe**: All values have explicit types for validation
3. **Composable**: Functions can call other functions
4. **Readable**: Clear structure that maps to familiar programming concepts
5. **Extensible**: Easy to add new statement and expression types

## Architecture

```
InstructionSet (Root)
└── automation_functions: List[BusinessTask]
    └── BusinessTask (Function)
        ├── id: int
        ├── name: string
        ├── description: string
        ├── return_type: string
        ├── parameters: List[Parameter]
        └── statements: List[Statement]
            ├── VariableDeclarationStatement
            ├── AssignmentStatement
            ├── IfStatement
            ├── ForEachStatement
            ├── ReturnStatement
            └── MethodCallStatement
                └── arguments: List[Expression]
                    ├── LiteralExpression
                    ├── VariableExpression
                    ├── MethodCallExpression
                    ├── BinaryOperationExpression
                    └── BuilderExpression
```

## Complete Grammar Specification

### Root Structure

```json
{
  "automation_functions": [
    {
      "id": <integer>,
      "name": <string>,
      "description": <string>,
      "return_type": <type_name>,
      "parameters": [<Parameter>, ...],
      "statements": [<Statement>, ...]
    }
  ]
}
```

### Type System

The DSL supports the following primitive types:

| Type | Description | Example Values |
|------|-------------|----------------|
| `boolean` | True/false values | `true`, `false` |
| `string` | Text data | `"hello"`, `""` |
| `integer` | Whole numbers | `42`, `-10`, `0` |
| `double` | Floating-point numbers | `3.14`, `-0.5` |
| `void` | No return value | (used for functions) |
| `object` | Complex objects | (implementation-specific) |
| `array` | Collections | (implementation-specific) |

### Parameters

Parameters define the inputs to automation functions:

```json
{
  "name": <string>,
  "type": <type_name>
}
```

**Fields:**
- `name` (required): Parameter identifier, used within the function body
- `type` (required): One of the supported types

**Example:**
```json
{
  "parameters": [
    {"name": "elementId", "type": "string"},
    {"name": "timeout", "type": "integer"},
    {"name": "retry", "type": "boolean"}
  ]
}
```

## Statement Types

Statements are executable instructions that form the body of functions. All statements have a `statementType` discriminator field.

### Variable Declaration Statement

Declares a new variable in the current scope, optionally with an initial value.

```json
{
  "statementType": "variableDeclaration",
  "variableName": <string>,
  "variableType": <type_name>,
  "initialValue": <Expression> (optional)
}
```

**Fields:**
- `variableName` (required): Unique identifier for the variable
- `variableType` (required): Type of the variable
- `initialValue` (optional): Expression to initialize the variable

**Semantics:**
- Creates a new variable in the current scope
- Variable names must be unique within their scope
- If `initialValue` is provided, it must match `variableType`
- Variables without initial values have undefined values until assigned

**Example:**
```json
{
  "statementType": "variableDeclaration",
  "variableName": "count",
  "variableType": "integer",
  "initialValue": {
    "expressionType": "literal",
    "valueType": "integer",
    "value": 0
  }
}
```

### Assignment Statement

Assigns a value to an existing variable.

```json
{
  "statementType": "assignment",
  "variableName": <string>,
  "value": <Expression>
}
```

**Fields:**
- `variableName` (required): Name of the variable to assign to
- `value` (required): Expression to evaluate and assign

**Semantics:**
- Variable must already exist in the current or parent scope
- Value type must match the variable's declared type
- Evaluates the expression and stores the result in the variable

**Example:**
```json
{
  "statementType": "assignment",
  "variableName": "count",
  "value": {
    "expressionType": "binaryOperation",
    "operator": "+",
    "left": {"expressionType": "variable", "name": "count"},
    "right": {"expressionType": "literal", "valueType": "integer", "value": 1}
  }
}
```

### If Statement

Conditional execution based on a boolean expression.

```json
{
  "statementType": "if",
  "condition": <Expression>,
  "thenStatements": [<Statement>, ...],
  "elseStatements": [<Statement>, ...] (optional)
}
```

**Fields:**
- `condition` (required): Boolean expression to evaluate
- `thenStatements` (required): Statements to execute if condition is true
- `elseStatements` (optional): Statements to execute if condition is false

**Semantics:**
- Evaluates `condition` to a boolean value
- If true, executes all statements in `thenStatements` sequentially
- If false and `elseStatements` exists, executes those statements
- Variables declared in branches are scoped to that branch

**Example:**
```json
{
  "statementType": "if",
  "condition": {
    "expressionType": "binaryOperation",
    "operator": ">",
    "left": {"expressionType": "variable", "name": "count"},
    "right": {"expressionType": "literal", "valueType": "integer", "value": 0}
  },
  "thenStatements": [
    {
      "statementType": "methodCall",
      "object": "logger",
      "method": "info",
      "arguments": [
        {"expressionType": "literal", "valueType": "string", "value": "Count is positive"}
      ]
    }
  ],
  "elseStatements": [
    {
      "statementType": "methodCall",
      "object": "logger",
      "method": "info",
      "arguments": [
        {"expressionType": "literal", "valueType": "string", "value": "Count is zero or negative"}
      ]
    }
  ]
}
```

### ForEach Statement

Iterates over a collection, executing statements for each element.

```json
{
  "statementType": "forEach",
  "variableName": <string>,
  "collection": <Expression>,
  "statements": [<Statement>, ...]
}
```

**Fields:**
- `variableName` (required): Loop variable name (receives each element)
- `collection` (required): Expression that evaluates to an array
- `statements` (required): Statements to execute for each element

**Semantics:**
- Evaluates `collection` to get an iterable
- For each element in the collection:
  - Creates a new scope
  - Binds the element to `variableName`
  - Executes all statements in order
  - Destroys the scope
- Loop variable is only visible within the loop body
- If collection is empty, statements never execute

**Example:**
```json
{
  "statementType": "forEach",
  "variableName": "item",
  "collection": {"expressionType": "variable", "name": "items"},
  "statements": [
    {
      "statementType": "methodCall",
      "object": "processor",
      "method": "process",
      "arguments": [
        {"expressionType": "variable", "name": "item"}
      ]
    }
  ]
}
```

### Return Statement

Returns a value from a function and terminates execution.

```json
{
  "statementType": "return",
  "value": <Expression> (optional)
}
```

**Fields:**
- `value` (optional): Expression to evaluate and return

**Semantics:**
- Immediately terminates function execution
- If `value` is provided, evaluates it and returns the result
- Return value type must match function's `return_type`
- Functions with `return_type: "void"` should not have a `value`
- If no return statement is reached, void functions return implicitly

**Example:**
```json
{
  "statementType": "return",
  "value": {
    "expressionType": "variable",
    "name": "result"
  }
}
```

### Method Call Statement

Invokes a method for its side effects (return value is discarded).

```json
{
  "statementType": "methodCall",
  "object": <string> (optional),
  "method": <string>,
  "arguments": [<Expression>, ...]
}
```

**Fields:**
- `object` (optional): Variable name to invoke method on
- `method` (required): Method name to invoke
- `arguments` (optional): List of argument expressions

**Semantics:**
- Evaluates all argument expressions left-to-right
- If `object` is specified, calls method on that object
- If `object` is null, calls global function or static method
- Return value (if any) is discarded
- Used for side effects (logging, UI actions, etc.)

**Example:**
```json
{
  "statementType": "methodCall",
  "object": "browser",
  "method": "click",
  "arguments": [
    {"expressionType": "literal", "valueType": "string", "value": "#submit-button"}
  ]
}
```

## Expression Types

Expressions produce values and can be used in statements. All expressions have an `expressionType` discriminator field.

### Literal Expression

A constant value.

```json
{
  "expressionType": "literal",
  "valueType": <type_name>,
  "value": <JSON_value>
}
```

**Fields:**
- `valueType` (required): Type of the literal
- `value` (required): The actual value

**Evaluation:**
- Returns `value` directly
- No computation or side effects

**Examples:**
```json
{"expressionType": "literal", "valueType": "string", "value": "Hello"}
{"expressionType": "literal", "valueType": "integer", "value": 42}
{"expressionType": "literal", "valueType": "boolean", "value": true}
{"expressionType": "literal", "valueType": "double", "value": 3.14}
```

### Variable Expression

References a variable's value.

```json
{
  "expressionType": "variable",
  "name": <string>
}
```

**Fields:**
- `name` (required): Name of the variable to reference

**Evaluation:**
- Looks up `name` in the current scope
- Returns the variable's current value
- Throws error if variable not found

**Example:**
```json
{"expressionType": "variable", "name": "userName"}
```

### Method Call Expression

Invokes a method and returns its result.

```json
{
  "expressionType": "methodCall",
  "object": <string> (optional),
  "method": <string>,
  "arguments": [<Expression>, ...]
}
```

**Fields:**
- `object` (optional): Variable name to invoke method on
- `method` (required): Method name
- `arguments` (optional): Argument expressions

**Evaluation:**
- Evaluates all argument expressions left-to-right
- Invokes the method with the evaluated arguments
- Returns the method's return value

**Example:**
```json
{
  "expressionType": "methodCall",
  "object": "calculator",
  "method": "add",
  "arguments": [
    {"expressionType": "literal", "valueType": "integer", "value": 5},
    {"expressionType": "literal", "valueType": "integer", "value": 3}
  ]
}
```

### Binary Operation Expression

Performs an operation on two operands.

```json
{
  "expressionType": "binaryOperation",
  "operator": <string>,
  "left": <Expression>,
  "right": <Expression>
}
```

**Fields:**
- `operator` (required): Operation to perform
- `left` (required): Left operand
- `right` (required): Right operand

**Supported Operators:**

**Arithmetic:**
- `+` : Addition
- `-` : Subtraction
- `*` : Multiplication
- `/` : Division
- `%` : Modulo

**Comparison:**
- `==` : Equality
- `!=` : Inequality
- `<` : Less than
- `>` : Greater than
- `<=` : Less than or equal
- `>=` : Greater than or equal

**Logical:**
- `&&` : Logical AND
- `||` : Logical OR

**Evaluation:**
- Evaluates `left` expression
- Evaluates `right` expression
- Applies the operator to both values
- Returns the result

**Type Rules:**
- Arithmetic operators require numeric operands
- Comparison operators work on comparable types
- Logical operators require boolean operands

**Example:**
```json
{
  "expressionType": "binaryOperation",
  "operator": "&&",
  "left": {
    "expressionType": "binaryOperation",
    "operator": ">",
    "left": {"expressionType": "variable", "name": "count"},
    "right": {"expressionType": "literal", "valueType": "integer", "value": 0}
  },
  "right": {
    "expressionType": "variable",
    "name": "isActive"
  }
}
```

### Builder Expression

Constructs objects using the builder pattern with method chaining.

```json
{
  "expressionType": "builder",
  "builderType": <string>,
  "methodCalls": [
    {
      "method": <string>,
      "arguments": [<Expression>, ...]
    },
    ...
  ]
}
```

**Fields:**
- `builderType` (required): The builder class name
- `methodCalls` (required): Sequence of method calls to chain

**Each method call:**
- `method` (required): Method name to call
- `arguments` (optional): Arguments to pass

**Evaluation:**
- Creates an instance of the builder
- Calls each method in sequence
- Each method returns the builder for chaining
- Final method (typically `build()`) returns the constructed object

**Example:**
```json
{
  "expressionType": "builder",
  "builderType": "ObjectCollection.Builder",
  "methodCalls": [
    {
      "method": "withImages",
      "arguments": [{"expressionType": "variable", "name": "targetImage"}]
    },
    {
      "method": "withSearchRegions",
      "arguments": [{"expressionType": "variable", "name": "searchArea"}]
    },
    {
      "method": "build",
      "arguments": []
    }
  ]
}
```

## Control Flow Semantics

### Execution Order

Statements execute sequentially from top to bottom within a block, unless:
- A `return` statement is encountered (terminates function)
- An error occurs (terminates with exception)

### Scoping Rules

**Function Scope:**
- Each function has its own scope
- Parameters are visible throughout the function
- Variables declared at function level are visible throughout

**Block Scope:**
- `if` branches create new scopes
- `forEach` loops create new scopes per iteration
- Variables declared in a block are not visible outside it
- Nested blocks can access parent scope variables

**Scope Lookup:**
1. Check current scope
2. Check parent scope (if any)
3. Check function parameters
4. Throw error if not found

**Example Scoping:**
```json
{
  "statements": [
    {
      "statementType": "variableDeclaration",
      "variableName": "x",
      "variableType": "integer",
      "initialValue": {"expressionType": "literal", "valueType": "integer", "value": 10}
    },
    {
      "statementType": "if",
      "condition": {"expressionType": "literal", "valueType": "boolean", "value": true},
      "thenStatements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "y",
          "variableType": "integer",
          "initialValue": {"expressionType": "variable", "name": "x"}
        }
      ]
    }
    // y is NOT visible here (out of scope)
    // x IS visible here
  ]
}
```

### Short-Circuit Evaluation

Logical operators use short-circuit evaluation:

**AND (`&&`):**
- If left operand is false, right operand is not evaluated
- Result is false

**OR (`||`):**
- If left operand is true, right operand is not evaluated
- Result is true

This is useful for avoiding errors:
```json
{
  "expressionType": "binaryOperation",
  "operator": "&&",
  "left": {
    "expressionType": "binaryOperation",
    "operator": "!=",
    "left": {"expressionType": "variable", "name": "user"},
    "right": {"expressionType": "literal", "valueType": "null", "value": null}
  },
  "right": {
    "expressionType": "methodCall",
    "object": "user",
    "method": "isActive",
    "arguments": []
  }
}
```

## JSON Format Specification

### Serialization Rules

1. **Required Fields:** All required fields must be present
2. **Type Safety:** Values must match declared types
3. **Unicode Support:** Strings support full Unicode
4. **Numeric Precision:** Numbers follow JSON numeric rules
5. **Null Handling:** Use `null` for optional fields

### Pretty Printing

For readability, use indentation:
```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "exampleFunction",
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "result",
          "variableType": "string"
        }
      ]
    }
  ]
}
```

### Comments

JSON does not support comments natively. For documentation:
- Use a `description` field in functions
- Create separate documentation files
- Use naming conventions for clarity

## Error Handling

### Compile-Time Errors

Errors detected during parsing:
- **Syntax Error:** Invalid JSON structure
- **Type Error:** Type mismatch (e.g., assigning string to integer)
- **Reference Error:** Unknown variable or function reference
- **Duplicate Error:** Variable declared twice in same scope

### Runtime Errors

Errors during execution:
- **Undefined Variable:** Variable used before declaration
- **Type Cast Error:** Cannot convert between types
- **Division by Zero:** Arithmetic error
- **Null Reference:** Accessing null object
- **Method Not Found:** Unknown method name

### Error Propagation

- Errors propagate up the call stack
- No try/catch mechanism currently (future enhancement)
- Errors terminate the current function
- Caller receives error information

## Best Practices

### Naming Conventions

- **Functions:** `camelCase` (e.g., `loginUser`, `processData`)
- **Variables:** `camelCase` (e.g., `userName`, `itemCount`)
- **Constants:** All caps with underscores (e.g., `MAX_RETRY`)
- **Types:** Lowercase (e.g., `string`, `integer`)

### Code Organization

1. **Declare before use:** Declare variables at the start of scope
2. **Single responsibility:** Each function should do one thing
3. **Parameter validation:** Check inputs at function start
4. **Clear naming:** Use descriptive names for variables and functions
5. **Comments via descriptions:** Use `description` fields liberally

### Type Safety

1. **Explicit types:** Always specify types for variables and parameters
2. **Type consistency:** Don't mix types in expressions
3. **Return types:** Match function return type
4. **Array homogeneity:** Keep arrays of same type

### Performance

1. **Minimize nesting:** Deep nesting is hard to read and maintain
2. **Short-circuit logic:** Use `&&` and `||` efficiently
3. **Avoid redundant expressions:** Don't re-evaluate same expression
4. **Limit loop operations:** Keep loop bodies simple

## Future Enhancements

Planned features for future versions:

1. **Exception Handling:** Try/catch/finally blocks
2. **Advanced Types:** Custom types, generics, unions
3. **Pattern Matching:** Match expressions
4. **Async/Await:** Asynchronous operation support
5. **Imports:** Include external definitions
6. **Macros:** Code generation and templates
7. **Debugging:** Breakpoints and inspection
8. **Optimization:** Compile-time optimizations

## Related Documentation

- [DSL Tutorial](./DSL_TUTORIAL.md) - Learn by example
- [DSL Examples](./DSL_EXAMPLES.md) - Complete working examples
- [Qontinui API Reference](../intro.md) - Python API documentation

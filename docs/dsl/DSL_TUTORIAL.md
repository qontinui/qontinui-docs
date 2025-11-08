# Qontinui DSL Tutorial

## Introduction

Welcome to the Qontinui DSL tutorial! This guide will teach you how to write automation workflows using the Qontinui Domain-Specific Language. By the end of this tutorial, you'll be able to create complex automation functions using JSON.

### What is the DSL?

The Qontinui DSL is a JSON-based language that lets you define automation workflows declaratively. Instead of writing Python code, you describe what you want to happen in a structured JSON format that Qontinui can execute.

### Why Use the DSL?

- **No Programming Required:** Create automation without Python knowledge
- **Portable:** Share automation definitions across systems
- **Versionable:** Track changes in Git
- **Readable:** Clear structure that non-programmers can understand
- **Type-Safe:** Catch errors before execution

### Prerequisites

- Basic understanding of JSON syntax
- Familiarity with programming concepts (variables, functions, loops)
- Qontinui installed and configured

## Getting Started

### Your First DSL Script: Hello World

Let's start with the simplest possible automation - one that just logs a message.

**hello_world.json:**
```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "helloWorld",
      "description": "Prints a hello world message",
      "return_type": "void",
      "parameters": [],
      "statements": [
        {
          "statementType": "methodCall",
          "object": "logger",
          "method": "info",
          "arguments": [
            {
              "expressionType": "literal",
              "valueType": "string",
              "value": "Hello, World!"
            }
          ]
        }
      ]
    }
  ]
}
```

**Breaking It Down:**

1. **Root Object:** Every DSL file starts with `automation_functions` array
2. **Function Definition:** Each function has:
   - `id`: Unique identifier
   - `name`: Function name for calling it
   - `description`: Human-readable explanation
   - `return_type`: What the function returns (`void` = nothing)
   - `parameters`: Input parameters (empty here)
   - `statements`: The actual code
3. **Method Call:** We call `logger.info()` to print the message
4. **Literal Expression:** The string `"Hello, World!"` is a literal value

### Running Your Script

```python
from qontinui.dsl import DSLExecutor

executor = DSLExecutor()
executor.load_file("hello_world.json")
executor.execute("helloWorld")
```

## Basic Concepts

### Variables and Types

Variables store data. Every variable has a type.

**example_variables.json:**
```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "variableDemo",
      "description": "Demonstrates variable declaration and usage",
      "return_type": "void",
      "parameters": [],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "userName",
          "variableType": "string",
          "initialValue": {
            "expressionType": "literal",
            "valueType": "string",
            "value": "Alice"
          }
        },
        {
          "statementType": "variableDeclaration",
          "variableName": "age",
          "variableType": "integer",
          "initialValue": {
            "expressionType": "literal",
            "valueType": "integer",
            "value": 30
          }
        },
        {
          "statementType": "variableDeclaration",
          "variableName": "isActive",
          "variableType": "boolean",
          "initialValue": {
            "expressionType": "literal",
            "valueType": "boolean",
            "value": true
          }
        },
        {
          "statementType": "methodCall",
          "object": "logger",
          "method": "info",
          "arguments": [
            {
              "expressionType": "variable",
              "name": "userName"
            }
          ]
        }
      ]
    }
  ]
}
```

**Key Points:**
- Declare variables with `variableDeclaration`
- Specify the type: `string`, `integer`, `boolean`, `double`
- Optionally provide an initial value
- Reference variables with `variable` expressions

### Expressions: Computing Values

Expressions calculate values. Let's do some math!

```json
{
  "statementType": "variableDeclaration",
  "variableName": "total",
  "variableType": "integer",
  "initialValue": {
    "expressionType": "binaryOperation",
    "operator": "+",
    "left": {
      "expressionType": "literal",
      "valueType": "integer",
      "value": 10
    },
    "right": {
      "expressionType": "literal",
      "valueType": "integer",
      "value": 20
    }
  }
}
```

This creates a variable `total` with value `30` (10 + 20).

**Supported Operators:**
- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&` (AND), `||` (OR)

### Assignments: Changing Values

Once a variable is declared, you can change its value:

```json
{
  "statementType": "assignment",
  "variableName": "count",
  "value": {
    "expressionType": "binaryOperation",
    "operator": "+",
    "left": {
      "expressionType": "variable",
      "name": "count"
    },
    "right": {
      "expressionType": "literal",
      "valueType": "integer",
      "value": 1
    }
  }
}
```

This increments `count` by 1 (equivalent to `count = count + 1`).

## Conditional Logic

### Simple If Statement

Execute code only when a condition is true:

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "checkAge",
      "description": "Checks if user is an adult",
      "return_type": "void",
      "parameters": [
        {
          "name": "age",
          "type": "integer"
        }
      ],
      "statements": [
        {
          "statementType": "if",
          "condition": {
            "expressionType": "binaryOperation",
            "operator": ">=",
            "left": {
              "expressionType": "variable",
              "name": "age"
            },
            "right": {
              "expressionType": "literal",
              "valueType": "integer",
              "value": 18
            }
          },
          "thenStatements": [
            {
              "statementType": "methodCall",
              "object": "logger",
              "method": "info",
              "arguments": [
                {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "User is an adult"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### If-Else Statement

Handle both true and false cases:

```json
{
  "statementType": "if",
  "condition": {
    "expressionType": "binaryOperation",
    "operator": ">",
    "left": {
      "expressionType": "variable",
      "name": "score"
    },
    "right": {
      "expressionType": "literal",
      "valueType": "integer",
      "value": 50
    }
  },
  "thenStatements": [
    {
      "statementType": "methodCall",
      "object": "logger",
      "method": "info",
      "arguments": [
        {
          "expressionType": "literal",
          "valueType": "string",
          "value": "Passed!"
        }
      ]
    }
  ],
  "elseStatements": [
    {
      "statementType": "methodCall",
      "object": "logger",
      "method": "info",
      "arguments": [
        {
          "expressionType": "literal",
          "valueType": "string",
          "value": "Failed!"
        }
      ]
    }
  ]
}
```

### Complex Conditions

Combine multiple conditions with `&&` (AND) and `||` (OR):

```json
{
  "condition": {
    "expressionType": "binaryOperation",
    "operator": "&&",
    "left": {
      "expressionType": "binaryOperation",
      "operator": ">=",
      "left": {
        "expressionType": "variable",
        "name": "age"
      },
      "right": {
        "expressionType": "literal",
        "valueType": "integer",
        "value": 18
      }
    },
    "right": {
      "expressionType": "variable",
      "name": "hasLicense"
    }
  }
}
```

This checks if `age >= 18 AND hasLicense == true`.

## Loops and Iteration

### ForEach Loop

Iterate over a collection of items:

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "processItems",
      "description": "Processes each item in a list",
      "return_type": "void",
      "parameters": [
        {
          "name": "items",
          "type": "array"
        }
      ],
      "statements": [
        {
          "statementType": "forEach",
          "variableName": "item",
          "collection": {
            "expressionType": "variable",
            "name": "items"
          },
          "statements": [
            {
              "statementType": "methodCall",
              "object": "processor",
              "method": "handle",
              "arguments": [
                {
                  "expressionType": "variable",
                  "name": "item"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**How It Works:**
1. Takes each element from `items`
2. Assigns it to loop variable `item`
3. Executes the statements in the loop body
4. Repeats for each element

### Nested Loops

You can nest loops inside loops:

```json
{
  "statementType": "forEach",
  "variableName": "row",
  "collection": {
    "expressionType": "variable",
    "name": "grid"
  },
  "statements": [
    {
      "statementType": "forEach",
      "variableName": "cell",
      "collection": {
        "expressionType": "variable",
        "name": "row"
      },
      "statements": [
        {
          "statementType": "methodCall",
          "object": "logger",
          "method": "info",
          "arguments": [
            {
              "expressionType": "variable",
              "name": "cell"
            }
          ]
        }
      ]
    }
  ]
}
```

## Functions and Parameters

### Functions with Parameters

Functions can accept inputs (parameters):

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "greet",
      "description": "Greets a user by name",
      "return_type": "void",
      "parameters": [
        {
          "name": "userName",
          "type": "string"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "message",
          "variableType": "string",
          "initialValue": {
            "expressionType": "binaryOperation",
            "operator": "+",
            "left": {
              "expressionType": "literal",
              "valueType": "string",
              "value": "Hello, "
            },
            "right": {
              "expressionType": "variable",
              "name": "userName"
            }
          }
        },
        {
          "statementType": "methodCall",
          "object": "logger",
          "method": "info",
          "arguments": [
            {
              "expressionType": "variable",
              "name": "message"
            }
          ]
        }
      ]
    }
  ]
}
```

### Functions with Return Values

Functions can return values:

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "add",
      "description": "Adds two numbers",
      "return_type": "integer",
      "parameters": [
        {
          "name": "a",
          "type": "integer"
        },
        {
          "name": "b",
          "type": "integer"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "sum",
          "variableType": "integer",
          "initialValue": {
            "expressionType": "binaryOperation",
            "operator": "+",
            "left": {
              "expressionType": "variable",
              "name": "a"
            },
            "right": {
              "expressionType": "variable",
              "name": "b"
            }
          }
        },
        {
          "statementType": "return",
          "value": {
            "expressionType": "variable",
            "name": "sum"
          }
        }
      ]
    }
  ]
}
```

### Calling Other Functions

Functions can call other functions:

```json
{
  "statementType": "variableDeclaration",
  "variableName": "result",
  "variableType": "integer",
  "initialValue": {
    "expressionType": "methodCall",
    "object": null,
    "method": "add",
    "arguments": [
      {
        "expressionType": "literal",
        "valueType": "integer",
        "value": 5
      },
      {
        "expressionType": "literal",
        "valueType": "integer",
        "value": 3
      }
    ]
  }
}
```

## Intermediate Examples

### Example 1: Login Automation

A complete login function with validation:

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "login",
      "description": "Logs in a user with credentials",
      "return_type": "boolean",
      "parameters": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "password",
          "type": "string"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "isValid",
          "variableType": "boolean",
          "initialValue": {
            "expressionType": "binaryOperation",
            "operator": "&&",
            "left": {
              "expressionType": "binaryOperation",
              "operator": "!=",
              "left": {
                "expressionType": "variable",
                "name": "username"
              },
              "right": {
                "expressionType": "literal",
                "valueType": "string",
                "value": ""
              }
            },
            "right": {
              "expressionType": "binaryOperation",
              "operator": "!=",
              "left": {
                "expressionType": "variable",
                "name": "password"
              },
              "right": {
                "expressionType": "literal",
                "valueType": "string",
                "value": ""
              }
            }
          }
        },
        {
          "statementType": "if",
          "condition": {
            "expressionType": "variable",
            "name": "isValid"
          },
          "thenStatements": [
            {
              "statementType": "methodCall",
              "object": "browser",
              "method": "type",
              "arguments": [
                {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "#username"
                },
                {
                  "expressionType": "variable",
                  "name": "username"
                }
              ]
            },
            {
              "statementType": "methodCall",
              "object": "browser",
              "method": "type",
              "arguments": [
                {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "#password"
                },
                {
                  "expressionType": "variable",
                  "name": "password"
                }
              ]
            },
            {
              "statementType": "methodCall",
              "object": "browser",
              "method": "click",
              "arguments": [
                {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "#login-button"
                }
              ]
            },
            {
              "statementType": "return",
              "value": {
                "expressionType": "literal",
                "valueType": "boolean",
                "value": true
              }
            }
          ],
          "elseStatements": [
            {
              "statementType": "methodCall",
              "object": "logger",
              "method": "error",
              "arguments": [
                {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "Invalid credentials"
                }
              ]
            },
            {
              "statementType": "return",
              "value": {
                "expressionType": "literal",
                "valueType": "boolean",
                "value": false
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Example 2: Data Processing with Loop

Process multiple items with error handling:

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "processOrders",
      "description": "Processes a list of orders",
      "return_type": "integer",
      "parameters": [
        {
          "name": "orders",
          "type": "array"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "successCount",
          "variableType": "integer",
          "initialValue": {
            "expressionType": "literal",
            "valueType": "integer",
            "value": 0
          }
        },
        {
          "statementType": "forEach",
          "variableName": "order",
          "collection": {
            "expressionType": "variable",
            "name": "orders"
          },
          "statements": [
            {
              "statementType": "variableDeclaration",
              "variableName": "success",
              "variableType": "boolean",
              "initialValue": {
                "expressionType": "methodCall",
                "object": "orderProcessor",
                "method": "process",
                "arguments": [
                  {
                    "expressionType": "variable",
                    "name": "order"
                  }
                ]
              }
            },
            {
              "statementType": "if",
              "condition": {
                "expressionType": "variable",
                "name": "success"
              },
              "thenStatements": [
                {
                  "statementType": "assignment",
                  "variableName": "successCount",
                  "value": {
                    "expressionType": "binaryOperation",
                    "operator": "+",
                    "left": {
                      "expressionType": "variable",
                      "name": "successCount"
                    },
                    "right": {
                      "expressionType": "literal",
                      "valueType": "integer",
                      "value": 1
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          "statementType": "return",
          "value": {
            "expressionType": "variable",
            "name": "successCount"
          }
        }
      ]
    }
  ]
}
```

## Advanced Topics

### Nested Control Flow

Combine conditionals and loops:

```json
{
  "statementType": "forEach",
  "variableName": "user",
  "collection": {
    "expressionType": "variable",
    "name": "users"
  },
  "statements": [
    {
      "statementType": "if",
      "condition": {
        "expressionType": "methodCall",
        "object": "user",
        "method": "isActive",
        "arguments": []
      },
      "thenStatements": [
        {
          "statementType": "forEach",
          "variableName": "permission",
          "collection": {
            "expressionType": "methodCall",
            "object": "user",
            "method": "getPermissions",
            "arguments": []
          },
          "statements": [
            {
              "statementType": "methodCall",
              "object": "accessControl",
              "method": "grant",
              "arguments": [
                {
                  "expressionType": "variable",
                  "name": "user"
                },
                {
                  "expressionType": "variable",
                  "name": "permission"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Builder Pattern

Construct complex objects fluently:

```json
{
  "statementType": "variableDeclaration",
  "variableName": "searchConfig",
  "variableType": "object",
  "initialValue": {
    "expressionType": "builder",
    "builderType": "SearchConfig.Builder",
    "methodCalls": [
      {
        "method": "withRegion",
        "arguments": [
          {
            "expressionType": "variable",
            "name": "targetRegion"
          }
        ]
      },
      {
        "method": "withTimeout",
        "arguments": [
          {
            "expressionType": "literal",
            "valueType": "integer",
            "value": 5000
          }
        ]
      },
      {
        "method": "withSimilarity",
        "arguments": [
          {
            "expressionType": "literal",
            "valueType": "double",
            "value": 0.95
          }
        ]
      },
      {
        "method": "build",
        "arguments": []
      }
    ]
  }
}
```

## Best Practices

### 1. Use Descriptive Names

**Bad:**
```json
{
  "variableName": "x",
  "variableType": "string"
}
```

**Good:**
```json
{
  "variableName": "userName",
  "variableType": "string"
}
```

### 2. Add Descriptions

Always include descriptions for functions:

```json
{
  "name": "validateEmail",
  "description": "Validates email format using regex and checks domain existence",
  "return_type": "boolean"
}
```

### 3. Validate Inputs Early

Check parameters at the start of functions:

```json
{
  "statements": [
    {
      "statementType": "if",
      "condition": {
        "expressionType": "binaryOperation",
        "operator": "==",
        "left": {
          "expressionType": "variable",
          "name": "email"
        },
        "right": {
          "expressionType": "literal",
          "valueType": "string",
          "value": ""
        }
      },
      "thenStatements": [
        {
          "statementType": "return",
          "value": {
            "expressionType": "literal",
            "valueType": "boolean",
            "value": false
          }
        }
      ]
    }
  ]
}
```

### 4. Keep Functions Small

Break large functions into smaller, reusable ones:

```json
{
  "automation_functions": [
    {
      "name": "login",
      "statements": [
        {
          "statementType": "methodCall",
          "method": "fillCredentials",
          "arguments": []
        },
        {
          "statementType": "methodCall",
          "method": "submitForm",
          "arguments": []
        },
        {
          "statementType": "methodCall",
          "method": "waitForDashboard",
          "arguments": []
        }
      ]
    }
  ]
}
```

### 5. Use Consistent Formatting

Indent properly and align brackets:

```json
{
  "statements": [
    {
      "statementType": "if",
      "condition": { ... },
      "thenStatements": [
        { ... }
      ]
    }
  ]
}
```

## Common Patterns

### Pattern 1: Counter

```json
{
  "statements": [
    {
      "statementType": "variableDeclaration",
      "variableName": "count",
      "variableType": "integer",
      "initialValue": {
        "expressionType": "literal",
        "valueType": "integer",
        "value": 0
      }
    },
    {
      "statementType": "forEach",
      "variableName": "item",
      "collection": { ... },
      "statements": [
        {
          "statementType": "assignment",
          "variableName": "count",
          "value": {
            "expressionType": "binaryOperation",
            "operator": "+",
            "left": {
              "expressionType": "variable",
              "name": "count"
            },
            "right": {
              "expressionType": "literal",
              "valueType": "integer",
              "value": 1
            }
          }
        }
      ]
    }
  ]
}
```

### Pattern 2: Accumulator

```json
{
  "statements": [
    {
      "statementType": "variableDeclaration",
      "variableName": "total",
      "variableType": "integer",
      "initialValue": {
        "expressionType": "literal",
        "valueType": "integer",
        "value": 0
      }
    },
    {
      "statementType": "forEach",
      "variableName": "number",
      "collection": {
        "expressionType": "variable",
        "name": "numbers"
      },
      "statements": [
        {
          "statementType": "assignment",
          "variableName": "total",
          "value": {
            "expressionType": "binaryOperation",
            "operator": "+",
            "left": {
              "expressionType": "variable",
              "name": "total"
            },
            "right": {
              "expressionType": "variable",
              "name": "number"
            }
          }
        }
      ]
    }
  ]
}
```

### Pattern 3: Guard Clauses

```json
{
  "statements": [
    {
      "statementType": "if",
      "condition": {
        "expressionType": "binaryOperation",
        "operator": "==",
        "left": {
          "expressionType": "variable",
          "name": "input"
        },
        "right": {
          "expressionType": "literal",
          "valueType": "string",
          "value": ""
        }
      },
      "thenStatements": [
        {
          "statementType": "return"
        }
      ]
    }
  ]
}
```

## Troubleshooting

### Problem: Variable Not Found

**Error:** `Variable 'userName' not found in context`

**Solution:** Make sure you declare the variable before using it:

```json
{
  "statements": [
    {
      "statementType": "variableDeclaration",
      "variableName": "userName",
      "variableType": "string",
      "initialValue": { ... }
    },
    {
      "statementType": "methodCall",
      "arguments": [
        {
          "expressionType": "variable",
          "name": "userName"
        }
      ]
    }
  ]
}
```

### Problem: Type Mismatch

**Error:** `Cannot assign string to integer variable`

**Solution:** Ensure types match:

```json
{
  "variableName": "count",
  "variableType": "integer",
  "initialValue": {
    "expressionType": "literal",
    "valueType": "integer",
    "value": 42
  }
}
```

### Problem: Invalid JSON

**Error:** `Unexpected token at position 123`

**Solution:** Validate your JSON:
- Check for missing commas
- Ensure all brackets are closed
- Use a JSON validator tool

### Problem: Missing Required Field

**Error:** `Missing required field: statementType`

**Solution:** Include all required fields:

```json
{
  "statementType": "variableDeclaration",
  "variableName": "x",
  "variableType": "integer"
}
```

## Next Steps

Now that you've learned the basics, here's what to explore next:

1. **Read the Specification:** Dive deeper into [DSL_SPECIFICATION.md](./DSL_SPECIFICATION.md)
2. **Study Examples:** Check out [DSL_EXAMPLES.md](./DSL_EXAMPLES.md) for real-world scenarios
3. **Explore Examples:** Look at JSON files in `examples/` directory
4. **Build Something:** Create your own automation workflow
5. **Join the Community:** Share your creations and get help

## Additional Resources

- [DSL Specification](./DSL_SPECIFICATION.md) - Complete language reference
- [DSL Examples](./DSL_EXAMPLES.md) - Working examples with explanations
- [Qontinui Documentation](../intro.md) - Main documentation
- [GitHub Repository](https://github.com/jspinak/qontinui) - Source code and issues

## Quick Reference

### Statement Types
- `variableDeclaration` - Declare a variable
- `assignment` - Assign to a variable
- `if` - Conditional execution
- `forEach` - Loop over collection
- `return` - Return from function
- `methodCall` - Call a method

### Expression Types
- `literal` - Constant value
- `variable` - Variable reference
- `methodCall` - Method invocation
- `binaryOperation` - Two-operand operation
- `builder` - Builder pattern

### Types
- `boolean` - true/false
- `string` - Text
- `integer` - Whole numbers
- `double` - Decimals
- `void` - No return
- `object` - Complex objects
- `array` - Collections

### Operators
- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Logical: `&&`, `||`

Happy automating!

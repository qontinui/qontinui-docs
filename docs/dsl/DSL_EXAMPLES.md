# Qontinui DSL Examples

This document contains complete, working examples of Qontinui DSL scripts for various automation scenarios. Each example includes the full JSON, explanation, and expected output.

## Table of Contents

1. [Simple Examples](#simple-examples)
   - Hello World
   - Basic Calculator
   - Simple Validation
2. [Control Flow Examples](#control-flow-examples)
   - Grade Calculator
   - User Authentication
   - Temperature Converter
3. [Loop Examples](#loop-examples)
   - List Processing
   - Search and Count
   - Matrix Operations
4. [Real-World Automation](#real-world-automation)
   - Form Filling
   - Data Extraction
   - Multi-Step Workflow
5. [Advanced Examples](#advanced-examples)
   - Complex Business Logic
   - Error Handling Pattern
   - State Machine

## Simple Examples

### Example 1: Hello World

The simplest possible DSL script that prints a greeting.

**File:** `examples/hello_world.json`

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "helloWorld",
      "description": "Prints a hello world message to the console",
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

**Explanation:**
- Creates a function named `helloWorld` with no parameters
- Uses `methodCall` to invoke `logger.info()`
- Passes a string literal as the message
- Returns nothing (`void` return type)

**Expected Output:**
```
INFO: Hello, World!
```

### Example 2: Basic Calculator

Performs arithmetic operations and returns the result.

**File:** `examples/calculator.json`

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "add",
      "description": "Adds two numbers and returns the sum",
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
          "variableName": "result",
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
          "statementType": "methodCall",
          "object": "logger",
          "method": "info",
          "arguments": [
            {
              "expressionType": "binaryOperation",
              "operator": "+",
              "left": {
                "expressionType": "binaryOperation",
                "operator": "+",
                "left": {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "Sum: "
                },
                "right": {
                  "expressionType": "variable",
                  "name": "result"
                }
              },
              "right": {
                "expressionType": "literal",
                "valueType": "string",
                "value": ""
              }
            }
          ]
        },
        {
          "statementType": "return",
          "value": {
            "expressionType": "variable",
            "name": "result"
          }
        }
      ]
    }
  ]
}
```

**Explanation:**
- Takes two integer parameters `a` and `b`
- Declares a variable `result` and initializes it with `a + b`
- Logs the result
- Returns the sum as an integer

**Usage:**
```python
result = executor.execute("add", [5, 3])
# result = 8
```

**Expected Output:**
```
INFO: Sum: 8
```

### Example 3: Simple Validation

Validates input and returns a boolean result.

**File:** `examples/validate_email.json`

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "isValidEmail",
      "description": "Checks if an email address is valid (basic check)",
      "return_type": "boolean",
      "parameters": [
        {
          "name": "email",
          "type": "string"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "isNotEmpty",
          "variableType": "boolean",
          "initialValue": {
            "expressionType": "binaryOperation",
            "operator": "!=",
            "left": {
              "expressionType": "variable",
              "name": "email"
            },
            "right": {
              "expressionType": "literal",
              "valueType": "string",
              "value": ""
            }
          }
        },
        {
          "statementType": "variableDeclaration",
          "variableName": "hasAtSymbol",
          "variableType": "boolean",
          "initialValue": {
            "expressionType": "methodCall",
            "object": "email",
            "method": "contains",
            "arguments": [
              {
                "expressionType": "literal",
                "valueType": "string",
                "value": "@"
              }
            ]
          }
        },
        {
          "statementType": "variableDeclaration",
          "variableName": "isValid",
          "variableType": "boolean",
          "initialValue": {
            "expressionType": "binaryOperation",
            "operator": "&&",
            "left": {
              "expressionType": "variable",
              "name": "isNotEmpty"
            },
            "right": {
              "expressionType": "variable",
              "name": "hasAtSymbol"
            }
          }
        },
        {
          "statementType": "return",
          "value": {
            "expressionType": "variable",
            "name": "isValid"
          }
        }
      ]
    }
  ]
}
```

**Explanation:**
- Checks if email is not empty
- Checks if email contains "@" symbol
- Returns true only if both conditions are met
- Uses logical AND (`&&`) to combine conditions

**Usage:**
```python
valid = executor.execute("isValidEmail", ["user@example.com"])
# valid = True

invalid = executor.execute("isValidEmail", ["invalid"])
# invalid = False
```

## Control Flow Examples

### Example 4: Grade Calculator

Uses if/else statements to determine letter grades.

**File:** `examples/grade_calculator.json`

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "calculateGrade",
      "description": "Converts numeric score to letter grade",
      "return_type": "string",
      "parameters": [
        {
          "name": "score",
          "type": "integer"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "grade",
          "variableType": "string",
          "initialValue": {
            "expressionType": "literal",
            "valueType": "string",
            "value": "F"
          }
        },
        {
          "statementType": "if",
          "condition": {
            "expressionType": "binaryOperation",
            "operator": ">=",
            "left": {
              "expressionType": "variable",
              "name": "score"
            },
            "right": {
              "expressionType": "literal",
              "valueType": "integer",
              "value": 90
            }
          },
          "thenStatements": [
            {
              "statementType": "assignment",
              "variableName": "grade",
              "value": {
                "expressionType": "literal",
                "valueType": "string",
                "value": "A"
              }
            }
          ],
          "elseStatements": [
            {
              "statementType": "if",
              "condition": {
                "expressionType": "binaryOperation",
                "operator": ">=",
                "left": {
                  "expressionType": "variable",
                  "name": "score"
                },
                "right": {
                  "expressionType": "literal",
                  "valueType": "integer",
                  "value": 80
                }
              },
              "thenStatements": [
                {
                  "statementType": "assignment",
                  "variableName": "grade",
                  "value": {
                    "expressionType": "literal",
                    "valueType": "string",
                    "value": "B"
                  }
                }
              ],
              "elseStatements": [
                {
                  "statementType": "if",
                  "condition": {
                    "expressionType": "binaryOperation",
                    "operator": ">=",
                    "left": {
                      "expressionType": "variable",
                      "name": "score"
                    },
                    "right": {
                      "expressionType": "literal",
                      "valueType": "integer",
                      "value": 70
                    }
                  },
                  "thenStatements": [
                    {
                      "statementType": "assignment",
                      "variableName": "grade",
                      "value": {
                        "expressionType": "literal",
                        "valueType": "string",
                        "value": "C"
                      }
                    }
                  ],
                  "elseStatements": [
                    {
                      "statementType": "if",
                      "condition": {
                        "expressionType": "binaryOperation",
                        "operator": ">=",
                        "left": {
                          "expressionType": "variable",
                          "name": "score"
                        },
                        "right": {
                          "expressionType": "literal",
                          "valueType": "integer",
                          "value": 60
                        }
                      },
                      "thenStatements": [
                        {
                          "statementType": "assignment",
                          "variableName": "grade",
                          "value": {
                            "expressionType": "literal",
                            "valueType": "string",
                            "value": "D"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "statementType": "return",
          "value": {
            "expressionType": "variable",
            "name": "grade"
          }
        }
      ]
    }
  ]
}
```

**Explanation:**
- Initializes grade to "F" (default)
- Uses nested if-else to check score ranges
- Assigns appropriate letter grade
- Returns the grade string

**Usage:**
```python
grade = executor.execute("calculateGrade", [85])
# grade = "B"
```

### Example 5: User Authentication

Simulates a login process with validation.

**File:** `examples/user_auth.json`

See: [examples/user_auth.json](examples/user_auth.json)

**Explanation:**
- Validates username and password are not empty
- Checks credentials against expected values
- Logs success or failure
- Returns boolean indicating authentication result

## Loop Examples

### Example 6: List Processing

Processes a list of numbers and calculates statistics.

**File:** `examples/list_stats.json`

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "calculateSum",
      "description": "Calculates the sum of a list of integers",
      "return_type": "integer",
      "parameters": [
        {
          "name": "numbers",
          "type": "array"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "sum",
          "variableType": "integer",
          "initialValue": {
            "expressionType": "literal",
            "valueType": "integer",
            "value": 0
          }
        },
        {
          "statementType": "forEach",
          "variableName": "num",
          "collection": {
            "expressionType": "variable",
            "name": "numbers"
          },
          "statements": [
            {
              "statementType": "assignment",
              "variableName": "sum",
              "value": {
                "expressionType": "binaryOperation",
                "operator": "+",
                "left": {
                  "expressionType": "variable",
                  "name": "sum"
                },
                "right": {
                  "expressionType": "variable",
                  "name": "num"
                }
              }
            }
          ]
        },
        {
          "statementType": "methodCall",
          "object": "logger",
          "method": "info",
          "arguments": [
            {
              "expressionType": "binaryOperation",
              "operator": "+",
              "left": {
                "expressionType": "literal",
                "valueType": "string",
                "value": "Sum: "
              },
              "right": {
                "expressionType": "variable",
                "name": "sum"
              }
            }
          ]
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

**Explanation:**
- Initializes sum to 0
- Iterates over each number in the list
- Adds each number to the running sum
- Logs and returns the total

**Usage:**
```python
total = executor.execute("calculateSum", [[1, 2, 3, 4, 5]])
# total = 15
```

**Expected Output:**
```
INFO: Sum: 15
```

### Example 7: Search and Count

Counts how many items match a condition.

**File:** `examples/count_matches.json`

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "countPositive",
      "description": "Counts how many positive numbers are in the list",
      "return_type": "integer",
      "parameters": [
        {
          "name": "numbers",
          "type": "array"
        }
      ],
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
          "variableName": "num",
          "collection": {
            "expressionType": "variable",
            "name": "numbers"
          },
          "statements": [
            {
              "statementType": "if",
              "condition": {
                "expressionType": "binaryOperation",
                "operator": ">",
                "left": {
                  "expressionType": "variable",
                  "name": "num"
                },
                "right": {
                  "expressionType": "literal",
                  "valueType": "integer",
                  "value": 0
                }
              },
              "thenStatements": [
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
        },
        {
          "statementType": "return",
          "value": {
            "expressionType": "variable",
            "name": "count"
          }
        }
      ]
    }
  ]
}
```

**Explanation:**
- Initializes counter to 0
- Loops through each number
- If number is positive, increments counter
- Returns the final count

**Usage:**
```python
positive_count = executor.execute("countPositive", [[-3, 5, -1, 8, 0, 2]])
# positive_count = 3
```

## Real-World Automation

### Example 8: Form Filling

Automates filling out a web form with validation.

**File:** `examples/form_filling.json`

See: [examples/form_filling.json](examples/form_filling.json)

**Explanation:**
- Validates all required fields are provided
- Fills each form field sequentially
- Submits the form
- Returns success/failure status

**Usage:**
```python
data = {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234"
}
success = executor.execute("fillContactForm", [data])
```

### Example 9: Data Extraction

Extracts data from multiple elements on a page.

**File:** `examples/data_extraction.json`

See: [examples/data_extraction.json](examples/data_extraction.json)

**Explanation:**
- Iterates over a list of product elements
- Extracts name and price from each
- Stores in a results array
- Returns the collected data

### Example 10: Multi-Step Workflow

A complete workflow with multiple stages.

**File:** `examples/workflow.json`

See: [examples/workflow.json](examples/workflow.json)

**Explanation:**
- Performs login
- Navigates to specific page
- Performs actions
- Logs out
- Returns workflow status

## Advanced Examples

### Example 11: Complex Business Logic

Implements complex decision-making logic.

**File:** `examples/complex_logic.json`

```json
{
  "automation_functions": [
    {
      "id": 1,
      "name": "processOrder",
      "description": "Processes an order with business rules",
      "return_type": "string",
      "parameters": [
        {
          "name": "orderAmount",
          "type": "double"
        },
        {
          "name": "customerType",
          "type": "string"
        },
        {
          "name": "hasDiscount",
          "type": "boolean"
        }
      ],
      "statements": [
        {
          "statementType": "variableDeclaration",
          "variableName": "finalAmount",
          "variableType": "double",
          "initialValue": {
            "expressionType": "variable",
            "name": "orderAmount"
          }
        },
        {
          "statementType": "variableDeclaration",
          "variableName": "status",
          "variableType": "string",
          "initialValue": {
            "expressionType": "literal",
            "valueType": "string",
            "value": "pending"
          }
        },
        {
          "statementType": "if",
          "condition": {
            "expressionType": "binaryOperation",
            "operator": "==",
            "left": {
              "expressionType": "variable",
              "name": "customerType"
            },
            "right": {
              "expressionType": "literal",
              "valueType": "string",
              "value": "premium"
            }
          },
          "thenStatements": [
            {
              "statementType": "assignment",
              "variableName": "finalAmount",
              "value": {
                "expressionType": "binaryOperation",
                "operator": "*",
                "left": {
                  "expressionType": "variable",
                  "name": "finalAmount"
                },
                "right": {
                  "expressionType": "literal",
                  "valueType": "double",
                  "value": 0.9
                }
              }
            },
            {
              "statementType": "methodCall",
              "object": "logger",
              "method": "info",
              "arguments": [
                {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "Applied 10% premium discount"
                }
              ]
            }
          ]
        },
        {
          "statementType": "if",
          "condition": {
            "expressionType": "binaryOperation",
            "operator": "&&",
            "left": {
              "expressionType": "variable",
              "name": "hasDiscount"
            },
            "right": {
              "expressionType": "binaryOperation",
              "operator": ">",
              "left": {
                "expressionType": "variable",
                "name": "finalAmount"
              },
              "right": {
                "expressionType": "literal",
                "valueType": "double",
                "value": 100.0
              }
            }
          },
          "thenStatements": [
            {
              "statementType": "assignment",
              "variableName": "finalAmount",
              "value": {
                "expressionType": "binaryOperation",
                "operator": "-",
                "left": {
                  "expressionType": "variable",
                  "name": "finalAmount"
                },
                "right": {
                  "expressionType": "literal",
                  "valueType": "double",
                  "value": 20.0
                }
              }
            },
            {
              "statementType": "methodCall",
              "object": "logger",
              "method": "info",
              "arguments": [
                {
                  "expressionType": "literal",
                  "valueType": "string",
                  "value": "Applied $20 discount"
                }
              ]
            }
          ]
        },
        {
          "statementType": "if",
          "condition": {
            "expressionType": "binaryOperation",
            "operator": ">",
            "left": {
              "expressionType": "variable",
              "name": "finalAmount"
            },
            "right": {
              "expressionType": "literal",
              "valueType": "double",
              "value": 0.0
            }
          },
          "thenStatements": [
            {
              "statementType": "assignment",
              "variableName": "status",
              "value": {
                "expressionType": "literal",
                "valueType": "string",
                "value": "approved"
              }
            }
          ],
          "elseStatements": [
            {
              "statementType": "assignment",
              "variableName": "status",
              "value": {
                "expressionType": "literal",
                "valueType": "string",
                "value": "rejected"
              }
            }
          ]
        },
        {
          "statementType": "return",
          "value": {
            "expressionType": "variable",
            "name": "status"
          }
        }
      ]
    }
  ]
}
```

**Explanation:**
- Applies different discount rules based on customer type
- Applies additional discount if conditions are met
- Validates final amount is positive
- Returns order status

**Usage:**
```python
status = executor.execute("processOrder", [150.0, "premium", True])
# status = "approved"
# Final amount: 150 * 0.9 - 20 = 115
```

## Tips for Writing DSL Scripts

### 1. Start Simple

Begin with a simple version and add complexity incrementally:

```json
// Version 1: Just log
{"statementType": "methodCall", "object": "logger", "method": "info", ...}

// Version 2: Add validation
{"statementType": "if", "condition": {...}, "thenStatements": [...]}

// Version 3: Add loop
{"statementType": "forEach", ...}
```

### 2. Test Each Part

Test functions individually before combining them:

```python
# Test validation function first
is_valid = executor.execute("validateInput", [data])

# Then test processing function
result = executor.execute("processData", [data])

# Finally test complete workflow
final = executor.execute("completeWorkflow", [data])
```

### 3. Use Helper Functions

Break complex logic into smaller functions:

```json
{
  "automation_functions": [
    {"name": "validateData", ...},
    {"name": "processData", ...},
    {"name": "saveResult", ...},
    {
      "name": "mainWorkflow",
      "statements": [
        {"statementType": "methodCall", "method": "validateData", ...},
        {"statementType": "methodCall", "method": "processData", ...},
        {"statementType": "methodCall", "method": "saveResult", ...}
      ]
    }
  ]
}
```

### 4. Add Logging

Log key steps for debugging:

```json
{
  "statements": [
    {"statementType": "methodCall", "object": "logger", "method": "info",
     "arguments": [{"expressionType": "literal", "valueType": "string",
                   "value": "Starting process..."}]},
    // ... do work ...
    {"statementType": "methodCall", "object": "logger", "method": "info",
     "arguments": [{"expressionType": "literal", "valueType": "string",
                   "value": "Process complete"}]}
  ]
}
```

### 5. Handle Edge Cases

Consider boundary conditions:

```json
{
  "statements": [
    {
      "statementType": "if",
      "condition": {
        "expressionType": "binaryOperation",
        "operator": "==",
        "left": {"expressionType": "methodCall", "object": "list", "method": "size", "arguments": []},
        "right": {"expressionType": "literal", "valueType": "integer", "value": 0}
      },
      "thenStatements": [
        {"statementType": "return", "value": {"expressionType": "literal", "valueType": "string", "value": "empty"}}
      ]
    }
  ]
}
```

## Performance Considerations

### Minimize Method Calls in Loops

**Less Efficient:**
```json
{
  "statementType": "forEach",
  "variableName": "item",
  "collection": {...},
  "statements": [
    {"statementType": "methodCall", "object": "expensiveService", "method": "call", ...}
  ]
}
```

**More Efficient:**
```json
{
  "statements": [
    {"statementType": "variableDeclaration", "variableName": "cached", ...},
    {"statementType": "forEach", "variableName": "item", "collection": {...},
     "statements": [
       // Use cached value instead of calling service
     ]}
  ]
}
```

### Short-Circuit Evaluation

Use `&&` and `||` effectively:

```json
{
  "expressionType": "binaryOperation",
  "operator": "&&",
  "left": {
    "expressionType": "binaryOperation",
    "operator": "!=",
    "left": {"expressionType": "variable", "name": "obj"},
    "right": {"expressionType": "literal", "valueType": "null", "value": null}
  },
  "right": {
    // This won't execute if obj is null
    "expressionType": "methodCall",
    "object": "obj",
    "method": "expensiveOperation",
    "arguments": []
  }
}
```

## Next Steps

- Review [DSL_SPECIFICATION.md](./DSL_SPECIFICATION.md) for complete language reference
- Read [DSL_TUTORIAL.md](./DSL_TUTORIAL.md) for step-by-step learning
- Explore the `examples/` directory for more JSON files
- Create your own automation workflows
- Share your examples with the community

## Additional Resources

- [Qontinui Documentation](../intro.md)
- [GitHub Repository](https://github.com/jspinak/qontinui)
- [API Reference](../intro.md)

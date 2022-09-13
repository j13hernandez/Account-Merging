# Account-Merging

TypeScript Application that takes in an account file, parses the data and
combines any duplicates using emails.

## Preq

    Have Node installed on Machine

# Procedures

1. Clone Repo
2. Run 'node index.ts'

## Alternative Data

Change data in accounts.json must follow this format

```
Input
[
 {
     application: "x",
     emails: ["a", "b", "c"],
     name: "Person 1"
 },
 {
     application: "y",
     emails: ["c", "d"],
     name: "Person 1"
 }
]
```

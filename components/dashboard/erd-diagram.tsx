"use client"

import { useEffect } from "react"
import mermaid from "mermaid"

export function ERDDiagram() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "neutral",
      securityLevel: "loose",
    })
    mermaid.run()
  }, [])

  return (
    <div className="w-full overflow-auto bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Entity Relationship Diagram</h2>
      <div className="mermaid">
        {`
erDiagram
    CUSTOMER {
        string id PK
        string name
        string gender
        int age
        decimal income
        string divisionID FK
        string maritalStatusID FK
    }
    
    DIVISION {
        string id PK
        string name
        string region
    }
    
    MARITAL_STATUS {
        string id PK
        string status
        string description
    }
    
    INCOME_CATEGORY {
        string id PK
        string range
        decimal minValue
        decimal maxValue
    }
    
    AGE_GROUP {
        string id PK
        string range
        int minAge
        int maxAge
    }
    
    CUSTOMER ||--o{ DIVISION : "lives in"
    CUSTOMER ||--o{ MARITAL_STATUS : "has"
    CUSTOMER ||--o{ INCOME_CATEGORY : "falls under"
    CUSTOMER ||--o{ AGE_GROUP : "belongs to"
        `}
      </div>
    </div>
  )
}

import Image from "next/image"

export function StaticERD() {
  return (
    <div className="w-full bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Entity Relationship Diagram</h2>
      <div className="flex justify-center">
        <Image
          src="/images/customer-erd.png"
          alt="Customer Database ERD"
          width={800}
          height={600}
          className="max-w-full h-auto"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        This diagram shows the relationships between Customers, Divisions, Marital Status, and other entities in the
        analytics database.
      </p>
    </div>
  )
}

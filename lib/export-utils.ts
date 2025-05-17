import { jsPDF } from "jspdf"
import * as XLSX from "xlsx"
import html2canvas from "html2canvas"

// Type for Excel export data - can be any object with string keys
export type ExcelExportData = Record<string, string | number | boolean>

// Type for customer data prepared for Excel export - simplified to match actual Customer properties
interface CustomerExcelData extends ExcelExportData {
  ID: string
  Name: string
  Gender: string
  Age: number
  Division: string
  "Marital Status": string
  Income: number
}

// Import the Customer type from the data library instead of defining our own
import { type Customer } from "@/lib/data"

// Function to export the current view as PDF
export async function exportToPDF(elementId: string, filename = "report.pdf"): Promise<boolean> {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`)
    }

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Temporarily remove the print:hidden class from parent elements
    const printHiddenElements = element.querySelectorAll(".print\\:hidden")
    printHiddenElements.forEach((el) => {
      el.classList.add("temp-visible")
      el.classList.remove("print:hidden")
    })

    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    // Restore the print:hidden class
    printHiddenElements.forEach((el) => {
      el.classList.remove("temp-visible")
      el.classList.add("print:hidden")
    })

    // Calculate the ratio to fit the canvas to the PDF
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Add the canvas as an image to the PDF
    const imgData = canvas.toDataURL("image/png")

    // If the content is too tall for one page, split it across multiple pages
    if (imgHeight > pdfHeight) {
      let heightLeft = imgHeight
      let position = 0
      let page = 1

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      // Add subsequent pages if needed
      while (heightLeft > 0) {
        position = -pdfHeight * page
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
        page++
      }
    } else {
      // Content fits on one page
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
    }

    // Save the PDF
    pdf.save(filename)
    return true
  } catch (error) {
    console.error("Error exporting to PDF:", error)
    return false
  }
}

// Function to export data to Excel
export function exportToExcel(data: ExcelExportData[], filename = "report.xlsx"): boolean {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report")

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, filename)
    return true
  } catch (error) {
    console.error("Error exporting to Excel:", error)
    return false
  }
}

// Function to prepare customer data for Excel export
export function prepareCustomerDataForExcel(customers: Customer[]): CustomerExcelData[] {
  return customers.map((customer): CustomerExcelData => ({
    ID: customer.id,
    Name: customer.name,
    Gender: customer.gender === "M" ? "Male" : "Female",
    Age: customer.age,
    Division: customer.division,
    "Marital Status": customer.maritalStatus,
    Income: customer.income,
  }))
}

// Function to share report via email
export function shareViaEmail(subject: string, body: string, recipients: string[] = []): boolean {
  try {
    const mailtoLink = `mailto:${recipients.join(",")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, "_blank")
    return true
  } catch (error) {
    console.error("Error sharing via email:", error)
    return false
  }
}

// Function to copy a shareable link to clipboard
export async function copyShareableLink(): Promise<boolean> {
  try {
    // Get the current URL
    const url = window.location.href

    // Add a token or parameter to make it a "shareable" link
    // In a real app, you would generate a unique token and save it in your database
    const shareableUrl = `${url}${url.includes("?") ? "&" : "?"}share=true`

    // Copy to clipboard
    await navigator.clipboard.writeText(shareableUrl)
    return true
  } catch (error) {
    console.error("Error copying shareable link:", error)
    return false
  }
}
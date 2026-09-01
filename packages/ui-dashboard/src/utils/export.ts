/**
 * @file export.ts
 * Utilities for exporting dashboard and widget data
 */

import { ExportConfig } from "../types";

/**
 * Export dashboard as PNG
 */
export const exportDashboardAsPNG = async (
  _element: HTMLElement,
  _fileName: string = "dashboard.png"
): Promise<void> => {
  try {
    // Note: This is a placeholder. In production, use html2canvas library
    // import html2canvas from 'html2canvas';
    // const canvas = await html2canvas(element);
    // const link = document.createElement('a');
    // link.href = canvas.toDataURL();
    // link.download = fileName;
    // link.click();

    console.warn("Export to PNG requires html2canvas library");
  } catch (error) {
    console.error("Failed to export as PNG:", error);
    throw error;
  }
};

/**
 * Export dashboard as PDF
 */
export const exportDashboardAsPDF = async (
  _element: HTMLElement,
  _fileName: string = "dashboard.pdf"
): Promise<void> => {
  try {
    // Note: This is a placeholder. In production, use jspdf library
    // import jsPDF from 'jspdf';
    // import html2canvas from 'html2canvas';
    // const canvas = await html2canvas(element);
    // const pdf = new jsPDF();
    // pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0);
    // pdf.save(fileName);

    console.warn("Export to PDF requires jspdf and html2canvas libraries");
  } catch (error) {
    console.error("Failed to export as PDF:", error);
    throw error;
  }
};

/**
 * Export data as CSV
 */
export const exportDataAsCSV = (
  data: Array<Record<string, any>>,
  fileName: string = "data.csv"
): void => {
  try {
    if (data.length === 0) {
      console.warn("No data to export");
      return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape quotes and wrap in quotes if contains comma
            const escaped =
              typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
            return escaped;
          })
          .join(",")
      ),
    ].join("\n");

    // Download
    downloadFile(csvContent, fileName, "text/csv");
  } catch (error) {
    console.error("Failed to export as CSV:", error);
    throw error;
  }
};

/**
 * Export data as Excel
 */
export const exportDataAsExcel = async (
  _data: Array<Record<string, any>>,
  _fileName: string = "data.xlsx"
): Promise<void> => {
  try {
    // Note: This is a placeholder. In production, use xlsx library
    // import xlsx from 'xlsx';
    // const ws = xlsx.utils.json_to_sheet(data);
    // const wb = xlsx.utils.book_new();
    // xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    // xlsx.writeFile(wb, fileName);

    console.warn("Export to Excel requires xlsx library");
  } catch (error) {
    console.error("Failed to export as Excel:", error);
    throw error;
  }
};

/**
 * Print dashboard
 */
export const printDashboard = (element: HTMLElement): void => {
  try {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      throw new Error("Failed to open print window");
    }

    printWindow.document.write(element.outerHTML);
    printWindow.document.close();
    printWindow.print();
  } catch (error) {
    console.error("Failed to print dashboard:", error);
    throw error;
  }
};

/**
 * Download file
 */
const downloadFile = (content: string, fileName: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export dashboard with specified format
 */
export const exportDashboard = async (
  element: HTMLElement,
  config: ExportConfig
): Promise<void> => {
  const fileName =
    config.fileName ||
    `dashboard-${config.includeTimestamp ? new Date().toISOString() : "export"}`;

  const formats = config.formats || ["png"];

  for (const format of formats) {
    switch (format) {
      case "png":
        await exportDashboardAsPNG(element, `${fileName}.png`);
        break;
      case "pdf":
        await exportDashboardAsPDF(element, `${fileName}.pdf`);
        break;
      case "print":
        printDashboard(element);
        break;
      default:
        console.warn(`Unsupported export format: ${format}`);
    }
  }
};

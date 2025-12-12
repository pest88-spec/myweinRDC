import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Sanitize a string for use in filenames
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeFilename(str) {
    return str
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special chars
        .trim()
        .replace(/\s+/g, '_'); // Replace spaces with underscores
}

/**
 * Format a date string to Month_Year format
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date like "Dec_2025"
 */
function formatPayPeriod(dateStr) {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]}_${date.getFullYear()}`;
}

/**
 * Generate a descriptive filename for the payslip
 * @param {object} state - Application state with employee and meta info
 * @returns {string} - Filename like "Payslip_John_Doe_Dec_2025.pdf"
 */
export function generatePayslipFilename(state) {
    const employeeName = sanitizeFilename(state.employee?.name || 'Employee');
    const payPeriod = formatPayPeriod(state.meta?.payDate);
    return `Payslip_${employeeName}_${payPeriod}.pdf`;
}

/**
 * Export the payslip to PDF with a descriptive filename
 * @param {object} state - Application state
 */
export async function exportPayslipToPdf(state) {
    const payslipElement = document.querySelector('.payslip-container');

    if (!payslipElement) {
        alert('Payslip preview not found!');
        return;
    }

    try {
        // Capture the payslip as a canvas
        const canvas = await html2canvas(payslipElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            scale: 2, // High quality
        });

        // Create PDF - A4 portrait
        const pdf = new jsPDF('portrait', 'mm', 'a4');

        // Calculate dimensions to fit A4
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const margin = 10;

        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Center vertically if image is shorter than page
        const yPos = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : margin;

        pdf.addImage(
            canvas.toDataURL('image/png'),
            'PNG',
            margin,
            yPos,
            imgWidth,
            imgHeight
        );

        // Save with descriptive filename
        const filename = generatePayslipFilename(state);
        pdf.save(filename);

    } catch (error) {
        console.error('PDF export failed:', error);
        alert('Failed to export PDF. Please try again.');
    }
}

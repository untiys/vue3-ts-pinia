import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'


export const exportExcelWithHeader = (tHead, content, fileName = 'export.xlsx') => {

    const worksheet = XLSX.utils.aoa_to_sheet([tHead, ...content])
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, fileName)
}
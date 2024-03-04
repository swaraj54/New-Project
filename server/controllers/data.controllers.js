import ExcelJS from 'exceljs';

export const displayData = async (req, res) => {
    try {
        const workBook = new ExcelJS.Workbook();
        await workBook.xlsx.readFile('./public/data.xlsx');
        const sheet = workBook.worksheets[0];
        const finalData = []
        sheet.eachRow((row) => {
            const rowdata = [];
            row.eachCell((cell) => {
                rowdata.push(cell.value)
            })
            finalData.push(rowdata)
        })
        const slicedData = finalData.slice(1);
        const months = [];
        const primaryData = [];
        const secondaryData = [];
        slicedData.forEach(array => {
            months.push(array[0])
            primaryData.push(array[1])
            secondaryData.push(array[2])
        })
        return res.status(200).json({ success: true, data: { months, primaryData, secondaryData } })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).json({ error, success: false })
    }
}
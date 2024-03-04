import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ExcelJS from 'exceljs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState({});
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'CHART TITLE',
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };
  const tempData = {
    labels: data?.months,
    datasets: [
      {
        label: 'Primary Product',
        data: data?.primaryData,
        backgroundColor: 'rgb(21,96,130)',
      },
      {
        label: 'Secondary Product',
        data: data?.secondaryData,
        backgroundColor: 'rgb(233,113,50)',
      },
    ],
  };
  const downloadExcel = async () => {
    if (data && Object.keys(data).length > 0) {
      const workBook = new ExcelJS.Workbook();
      const workSheet = workBook.addWorksheet('Data');
      workSheet.addRow(['Months', "Primary Data", "Secondary Data"])
      data.months.forEach((month, index) => {
        workSheet.addRow([month, data.primaryData[index], data.secondaryData[index]])
      })
      workBook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
      })
    }
    alert("Excel file downloading Started..")
  }
  useEffect(() => {
    async function getChartData() {
      try {
        const { data } = await axios.get('http://localhost:8081/get-data');
        if (data?.success) {
          setData(data.data)
        }
      } catch (error) {
        console.log(error?.response?.data?.error)
      }
    }
    getChartData()
  }, [])
  return (
    <div className="App">
      {data.months ?
        <div>
          <div>
            <button onClick={downloadExcel}>Download Excel</button>
          </div>
          <div>
            <Bar options={options} data={tempData} />
          </div>
        </div> :
        <div>Loading..</div>}
    </div>
  );
}

export default App;
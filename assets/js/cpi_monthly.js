const rootFolder = window.location.origin;
const filePath = '/AllStuffData/data/dashboard_data/cpi_monthly.csv';
const fileUrl = rootFolder + filePath;


const xhr = new XMLHttpRequest();
xhr.open('GET', fileUrl, true);
xhr.responseType = 'blob';
xhr.onload = function() {
  if (xhr.status === 200) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const csvData = event.target.result;
      const parsedData = Papa.parse(csvData, { header: true }).data;
      const df = {
        date: [],
        'monthly percent change, annualized': []
      };
      parsedData.forEach(row => {
        df.date.push(new Date(row.date));
        df['monthly percent change, annualized'].push(+row.ALL_S);
      });
      const originalData = [...df['monthly percent change, annualized']].map((val, i) => [df.date[i].getTime(), val]);
        var start= moment().subtract(3, 'years');
        var end = moment();
        const chartData = originalData.filter((dataPoint) => {
            return dataPoint[0] >= start.valueOf() && dataPoint[0] <= end.valueOf();
        });
        
        const cpi_monthly = Highcharts.chart('cpi_monthly_chart', {
        chart: {
            type: 'column',
            style: {
              fontFamily: 'Rockwell'
          },
          backgroundColor: '#edf2ff', // set the background color
        },
        title: {
            text: 'CPI One-Month Change',
            align: 'left'
        },
        xAxis: {
            type: 'datetime',
            title: {
            text: ''
            }
        },
        yAxis: {
            title: {
            text: ''
            }
        },
        legend: {
            enabled: false
          },
        series: [{
            name: 'Monthly Percent Change, Annualized',
            data: chartData,
            color: '#4ea5e0',
            tooltip: {
                valueDecimals: 2,
                valueSuffix: '%'
            }
        }],
        credits: {
            text: 'Source: Bureau of Labor Statistics, AllStuffData',
            position: {
              align: 'right',
              x: -10,
              verticalAlign: 'bottom',
              y: -5
            }
        },
        rangeSelector: {
            enabled: true
        },
        subtitle: {
            text: 'Monthly Percent Change, Annualized',
            align: 'left'
        }
        });
        $('#daterange_cpim').daterangepicker({
            startDate: moment().subtract(3, 'years'),
            endDate: end,
            ranges: {
                'Last 12 Months': [moment().subtract(1, 'years'), end],
                'Last 3 Years': [moment().subtract(3, 'years'), end],
                'Last 5 Years': [moment().subtract(5, 'years'), end],
                'Last 10 Years': [moment().subtract(10, 'years'), end],
                'Since 1990': [moment('1990-01-01'), end],
             },
              showDropdowns: true,
              showWeekNumbers: false,
              showISOWeekNumbers: false
        }, function(start, end, label) {
            const filteredData = originalData.filter((dataPoint) => {
                return dataPoint[0] >= start.valueOf() && dataPoint[0] <= end.valueOf();
            });
            cpi_monthly.series[0].setData(filteredData);
        });
    };
    reader.readAsText(xhr.response);
  }
};
xhr.send();
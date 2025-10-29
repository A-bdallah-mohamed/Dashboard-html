const xValues = ["SEPT","","OCT","","NOV","","DEC","","JAN","","FEB",""];
const ctx = document.getElementById('Dashboard').getContext('2d');

// ✅ Proper per-line shadow plugin
const shadowPlugin = {
  id: 'perDatasetShadow',
  beforeDatasetDraw(chart, args) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[args.index];
    const shadow = dataset.customShadow || {};

    // Apply per-line shadow
    ctx.save();
    ctx.shadowColor = shadow.color || 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = shadow.blur || 10;
    ctx.shadowOffsetX = shadow.offsetX || 0;
    ctx.shadowOffsetY = shadow.offsetY || 5;
  },
  afterDatasetDraw(chart, args) {
    // Restore after each dataset
    chart.ctx.restore();
  }
};

new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      { 
        data: [5000,5450,4850,4000,3500,5000,4500,2000,5000,4500,4000,4300],
        borderColor: "#4017fd",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        customShadow: {
          color: 'rgba(65, 23, 253, 0.42)',
          blur: 25,
          offsetY: 8
        }
      },
      { 
        data: [3000,3650,3250,1500,1500,3000,2500,0,3000,2800,2900,3100],
        borderColor: "#6ad2ffff",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
        customShadow: {
          color: 'rgba(106, 210, 255, 0.46)',
          blur: 20,
          offsetY: -5
        }
      },
      { 
        data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
        borderColor: "#ff660001",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
        customShadow: {
          color: 'rgba(255, 102, 0, 0)',
          blur: 15,
          offsetY: 5
        }
      }
    ]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: { 
      x: { grid: { display: false }, border: { display: false } },
      y: { grid: { display: false }, ticks: { display: false }, border: { display: false } }
    },
    elements: {
      line: { borderJoinStyle: 'round', borderCapStyle: 'round' }
    }
  },
  plugins: [shadowPlugin]
});

const navitems = document.querySelectorAll(".navv li")
let currentpage = "Dashboard"
const sections = document.querySelectorAll(".section")

navitems.forEach(navitem => {
    navitem.addEventListener("click", ()=>{
        navitems.forEach(item => item.classList.remove("active"))
        navitem.classList.add("active")
        currentpage = navitem.textContent.replace(/\s+/g, '')
        console.log("current item: ",navitem.textContent, ", current page: ",currentpage)
           sections.forEach(section => {
            console.log(section)
            section.classList.remove("active")
if(section.classList.contains(currentpage)){
section.classList.add("active")
}
    });
    })
})



  const ctxweekly = document.getElementById('weeklyRevenue').getContext('2d');

    const weeklyRevenueChart = new Chart(ctxweekly, {
      type: 'bar',
      data: {
        labels: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
        datasets: [
          {
            label: 'Base',
            data: [30, 35, 33, 32, 34, 31, 30, 32, 33],
            backgroundColor: '#6D28D9',
            borderRadius: 10,
            barThickness: 15,
            stack: 'Stack 0',
          },
          {
            label: 'Middle',
            data: [20, 18, 22, 19, 20, 18, 19, 20, 19],
            backgroundColor: '#38BDF8',
            borderRadius: 10,
            barThickness: 15,
            stack: 'Stack 0',
          },
          {
            label: 'Top',
            data: [10, 12, 11, 10, 9, 10, 11, 9, 10],
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            borderRadius: 10,
            barThickness: 15,
            stack: 'Stack 0',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
     
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' },
            stacked: true,
          },
          y: {
            grid: { display: false },
            ticks: { display: false },
            stacked: true,
          },
        },
      },
    });
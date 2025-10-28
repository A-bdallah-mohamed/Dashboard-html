
const xValues = ["SEPT","","OCT","","NOV","","DEC","","JAN","","FEB",""];

const ctx = document.getElementById('Dashboard');

new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: [5000,5400,3300,5060,5100,3000,5330,6000,5100,5000],
      borderColor: "#4017fd",
      pointRadius: 2,
      tension: 0.4,
      pointRadius: 0
    }, { 
      data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
      borderColor: "green",
      pointRadius: 2,
      tension: 0.4,
      fill: false,
      hidden: true
    }, { 
      data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
      borderColor: "blue",
      pointRadius: 2,
      tension: 0.4,
            hidden: true

    }]
  },
  options: {
    plugins: {
      legend: { display: false },

    },
          scales: { 
      x : { grid: {display:false},border : {display:false}},
      y : { grid: {display:false},ticks: { display: false },border : {display:false} }
      }
  }
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
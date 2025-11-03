const xValues = ["SEPT","","OCT","","NOV","","DEC","","JAN","","FEB",""];
const ctx = document.getElementById('Dashboard').getContext('2d');

const shadowPlugin = {
  id: 'perDatasetShadow',
  beforeDatasetDraw(chart, args) {
    const { ctx } = chart;
    const dataset = chart.data.datasets[args.index];
    const shadow = dataset.customShadow || {};

    ctx.save();
    ctx.shadowColor = shadow.color || 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = shadow.blur || 10;
    ctx.shadowOffsetX = shadow.offsetX || 0;
    ctx.shadowOffsetY = shadow.offsetY || 5;
  },
  afterDatasetDraw(chart, args) {
    chart.ctx.restore();
  }
};
const highlightPlugin = {
  id: 'highlightPoint',
  afterDatasetsDraw(chart, args, options) {
    const { ctx, scales: { x, y } } = chart;
    const datasetIndex = 0; 
    const pointIndex = 5;    

    const dataset = chart.data.datasets[datasetIndex];
    const value = dataset.data[pointIndex];
    const xPos = x.getPixelForValue(pointIndex);
    const yPos = y.getPixelForValue(value);

    const text = "$108.00";  
    const paddingX = 10;
    const paddingY = 5;

    ctx.font = 'bold 12px Poppins, sans-serif';
    const textWidth = ctx.measureText(text).width;
    const boxWidth = textWidth + paddingX * 2;
    const boxHeight = 24;

    ctx.fillStyle = '#4017fd';
    ctx.beginPath();
    ctx.roundRect(xPos - boxWidth / 2, yPos - 40, boxWidth, boxHeight, 6); 
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, xPos, yPos - 40 + boxHeight / 2);

    ctx.beginPath();
    ctx.arc(xPos, yPos, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#4017fd';
    ctx.fill();
  }
};

new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      { 
        data: [5000,5850,5650,5000,3500,5000,4500,2000,5000,4500,4000,4300],
        borderColor: "#4017fd",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
      },
      { 
        data: [3000,3650,3250,1500,1500,3000,2500,0,3000,2800,2900,3100],
        borderColor: "#6ad2ff",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
      },
          { 
        data: [8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000],
        borderColor: "#6ad2ff02",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  },
  options: {
    animation: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: { 
      x: { grid: { display: false }, border: { display: false } },
      y: { grid: { display: false }, ticks: { display: false }, border: { display: false } }
    },
  },
  plugins: [highlightPlugin]
});

const navitems = document.querySelectorAll(".navv li")
let currentpage = "Dashboard"
const sections = document.querySelectorAll(".section")
const profileicons = document.querySelectorAll('.profileicon')


profileicons.forEach(icon => {
  icon.addEventListener('click', () => {
    currentpage = 'Profile';
    console.log("current page:", currentpage);

    sections.forEach(section => {
      section.classList.remove("active");
      if(section.classList.contains(currentpage)){
        section.classList.add("active");
      }
    });

    navitems.forEach(n => {
      n.classList.remove('active');
      if(n.textContent.trim().toLowerCase() === currentpage.toLowerCase()){
        n.classList.add('active');
      }
    });
  });
});


navitems.forEach(navitem => {
    navitem.addEventListener("click", ()=>{
        navitems.forEach(item => item.classList.remove("active"))
        navitem.classList.add("active")
        currentpage = navitem.textContent.replace(/\s+/g, '')
        console.log("current item: ",navitem.textContent, ", current page: ",currentpage)




           sections.forEach(section => {
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
            data: [20, 25, 40, 15, 35, 31, 20, 20, 10],
            backgroundColor: '#6D28D9',
            borderRadius: 10,
            barThickness: 15,
            stack: 'Stack 0',
          },
          {
            label: 'Middle',
            data: [20, 25, 40, 15, 35, 30, 10, 20, 10],
            backgroundColor: '#38BDF8',
            borderRadius: 10,
            barThickness: 15,
            stack: 'Stack 0',
          },
          {
            label: 'Top',
            data: [20, 25, 40, 15, 35, 30, 5, 50, 30],
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            borderRadius: 10,
            barThickness: 15,
            stack: 'Stack 0',
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          legend: { display: false },
     
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' },
            stacked: true,
            border : {display : false}
          },
          y: {
            grid: { display: false },
            ticks: { display: false },
            stacked: true,
            border : {display : false}
          },
        },
      },
    });


    
  const ctxdaily = document.getElementById('Dailytraffic').getContext('2d');
const gradient = ctxdaily.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#4318ff'); 
gradient.addColorStop(1, '#cabeff0e');   

    const Dailytrafficchart = new Chart(ctxdaily, {
      type: 'bar',
      data: {
        labels: ['00', '04', '08', '12', '14', '16', '18'],
        datasets: [
          {
            label: 'Base',
            data: [20, 25, 40, 15, 35, 31, 20, 20, 10],
            backgroundColor: gradient,
            borderRadius: 10,
            barThickness: 15,
            stack: 'Stack 0',
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          legend: { display: false },
     
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' },
            stacked: true,
            border: {display : false}
          },
          y: {
            grid: { display: false },
            ticks: { display: false },
            stacked: true,
            border: {display : false}
          },
        },
      },
    });


const piectx = document.getElementById('myPieChart');

new Chart(piectx, {
  type: 'pie',
  data: {
    labels: ['System', 'Your files', 'Other'],
    datasets: [{
      data: [63, 25, 25],
      backgroundColor: [
        '#4318ff',
        '#6ad2ff',
        '#eff4fb'
      ],
      borderColor: '#eff4fb',
      borderWidth: 0
    }]
  },
  options: {
    animation: false,
    plugins: {
      legend: {
        display: false 
      }
    }
  }
});


const switches = document.querySelectorAll(".switch")

switches.forEach(switchtoggle => {
  switchtoggle.addEventListener('click', () => {
    switchtoggle.classList.toggle("active")
  })
})

  const calendar = new VanillaCalendar('#calendar', {
        settings: {
            selection: {
                day: 'single',
            },
        },
    });
    calendar.init();


    const filters = document.querySelectorAll('.filter') 
    filters.forEach(filter => {
filter.addEventListener('click', ()=> {
filters.forEach(f => f.classList.remove('active'))
  filter.classList.add('active')
})
    })

    const favs = document.querySelectorAll('.fav')
    favs.forEach(fav => {
      fav.addEventListener('click' , () => {
              fav.classList.toggle('active')

      })
    })
document.querySelectorAll('.sortable').forEach(table => {
  const sortDirections = {}; 

  table.querySelectorAll('thead td').forEach((headerCell, colIndex) => {
    headerCell.addEventListener('click', () => {
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      sortDirections[colIndex] = !sortDirections[colIndex];
      const asc = sortDirections[colIndex];

      table.querySelectorAll('thead i').forEach(icon => icon.classList.remove('rotate'));
      if (!asc) headerCell.querySelector('i').classList.add('rotate');

      rows.sort((a, b) => {
        const aText = a.children[colIndex].textContent.trim().toLowerCase();
        const bText = b.children[colIndex].textContent.trim().toLowerCase();

        const dateRegex = /^\d{1,2}\.[a-z]{3}\.\d{4}$/i;
        if (dateRegex.test(aText) && dateRegex.test(bText)) {
          const dateA = new Date(aText.replace(/\./g, " "));
          const dateB = new Date(bText.replace(/\./g, " "));
          return asc ? dateA - dateB : dateB - dateA;
        }

        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return asc ? aNum - bNum : bNum - aNum;
        }

        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      });

      rows.forEach(r => tbody.appendChild(r));
    });
  });
});


const clickables = document.querySelectorAll('.clickable');

clickables.forEach(clickable => {
  clickable.addEventListener('click', (e) => {
    const existing = document.querySelector('.floating-list');
    if (existing) existing.remove();

    const ul = document.createElement('ul');
    ul.classList.add('floating-list');

    const items = ['Option 1', 'Option 2', 'Option 3'];
    items.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);

      li.addEventListener('click', () => {
        alert(`Clicked: ${text}`);
        ul.remove();
      });
    });

    document.body.appendChild(ul);

    ul.style.left = e.pageX + 'px';
    ul.style.top = e.pageY + 'px';

    const moveHandler = (ev) => {
      ul.style.left = ev.pageX + 'px';
      ul.style.top = ev.pageY + 'px';
    };
    document.addEventListener('mousemove', moveHandler);

    const clickAway = (ev) => {
      if (!ul.contains(ev.target) && !clickable.contains(ev.target)) {
        ul.remove();
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('click', clickAway);
      }
    };

    setTimeout(() => {
      document.addEventListener('click', clickAway);
    }, 0);

    e.stopPropagation(); 
  });
});

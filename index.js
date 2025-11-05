
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
const canvas = document.getElementById('Dashboard');
if (canvas) {
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["SEPT", "", "OCT", "", "NOV", "", "DEC", "", "JAN", "", "FEB", ""],
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
}
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





const weeklyCanvas = document.getElementById('weeklyRevenue');
if (weeklyCanvas) {
  const ctxweekly = weeklyCanvas.getContext('2d');

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
          border: { display: false },
        },
        y: {
          grid: { display: false },
          ticks: { display: false },
          stacked: true,
          border: { display: false },
        },
      },
    },
  });
}

    const dailyCanvas = document.getElementById('Dailytraffic');

if (dailyCanvas) {
  const ctxdaily = dailyCanvas.getContext('2d');

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
          border: { display: false }
        },
        y: {
          grid: { display: false },
          ticks: { display: false },
          stacked: true,
          border: { display: false }
        },
      },
    },
  });
}


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




const settingbuttons = document.querySelectorAll('.setting');

settingbuttons.forEach(setting => {
  const settingbtn = setting.querySelector('i')
  settingbtn.addEventListener('click', (e) => {
    e.stopPropagation(); 

    const existingMenu = setting.querySelector('.settingmenu');
    const isOpen = existingMenu && existingMenu.classList.contains('active');

    document.querySelectorAll('.settingmenu').forEach(s => s.classList.remove('active'));

    if (isOpen) return;

    if (!existingMenu) {
      setting.insertAdjacentHTML('beforeend', `
        <div class="settingmenu">
          <ul class="text-black">
            <li>setting option</li>
            <li>setting option</li>
            <li>setting option</li>
          </ul>
        </div>
      `);
    }

    requestAnimationFrame(() => {
      setting.querySelector('.settingmenu').classList.add('active');
    });
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.settingmenu').forEach(s => s.classList.remove('active'));
});


window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  console.log(savedTheme)
  if (savedTheme) {
document.documentElement.dataset.theme = savedTheme
  console.log(savedTheme)

  }
  else{
     document.documentElement.dataset.theme = 'light'
  console.log(savedTheme)
  }
   if(savedTheme === 'dark'){
      darkbuttons.forEach(button => button.className = 'bi bi-brightness-high-fill darkbutton')
       img.src = './Assets/Logo (2).png';
avatar3.forEach(av => {
  av.src = './Assets/Avatar 3 (3).png'
})






profilepageicon.forEach(av => {
  av.src = './Assets/Avatar (1).png'
})





avatar2.forEach(av => {
  av.src = './Assets/Avatar 2.png'
})

avatar1.forEach(av => {
  av.className = 'avatar1'
  av.src = './Assets/Avatar 3 (5).png'
})

headereth.forEach(av => {
  av.src = './Assets/Icon (2).png'
})

Eth.forEach(Eth => {
  Eth.src = './Assets/Icon (3).png'
})
    }
    else{
            darkbuttons.forEach(button => button.className = 'bi bi-moon-fill darkbutton')
             img.src = './Assets/Logo.png';

avatar3.forEach(av => {
  av.src = './Assets/Avatar 3.png'
})
profilepageicon.forEach(av => {
  av.src = './Assets/Avatar.png'
})


avatar2.forEach(av => {
  av.src = './Assets/Avatar 2 (1).png'
})
avatar1.forEach(av => {
  av.className = 'avatar1'
    av.src = './Assets/Avatar 3 (2).png'
})
headereth.forEach(av => {
  av.src = './Assets/Icon.png'
})

Eth.forEach(Eth => {
  Eth.src = './Assets/Icon (1).png'
})
    }
});


const darkbuttons =  document.querySelectorAll('.darkbutton')
const img = document.getElementById('logo');
const avatar3 = document.querySelectorAll('.avatar3')
const avatar2 = document.querySelectorAll('.avatar2')
const avatar1 = document.querySelectorAll('.avatar1')
const headereth = document.querySelectorAll('.headereth')
const Eth = document.querySelectorAll('.ETH')
const profilepageicon = document.querySelectorAll('.profilepageicon')

darkbuttons.forEach(dark => {
  dark.addEventListener('click', ()=> {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'

    console.log(document.documentElement.dataset.theme)
localStorage.setItem('theme',document.documentElement.dataset.theme)
    if(document.documentElement.dataset.theme === 'dark'){
      darkbuttons.forEach(button => button.className = 'bi bi-brightness-high-fill darkbutton')
       img.src = './Assets/Logo (2).png';
avatar3.forEach(av => {
  av.src = './Assets/Avatar 3 (3).png'
})






profilepageicon.forEach(av => {
  av.src = './Assets/Avatar (1).png'
})





avatar2.forEach(av => {
  av.src = './Assets/Avatar 2.png'
})

avatar1.forEach(av => {
  av.className = 'avatar1'
  av.src = './Assets/Avatar 3 (5).png'
})

headereth.forEach(av => {
  av.src = './Assets/Icon (2).png'
})

Eth.forEach(Eth => {
  Eth.src = './Assets/Icon (3).png'
})
    }
    else{
            darkbuttons.forEach(button => button.className = 'bi bi-moon-fill darkbutton')
             img.src = './Assets/Logo.png';

avatar3.forEach(av => {
  av.src = './Assets/Avatar 3.png'
})
profilepageicon.forEach(av => {
  av.src = './Assets/Avatar.png'
})


avatar2.forEach(av => {
  av.src = './Assets/Avatar 2 (1).png'
})
avatar1.forEach(av => {
  av.className = 'avatar1'
    av.src = './Assets/Avatar 3 (2).png'
})
headereth.forEach(av => {
  av.src = './Assets/Icon.png'
})

Eth.forEach(Eth => {
  Eth.src = './Assets/Icon (1).png'
})
    }
  })
})
  const sidebar = document.querySelector('.sidebar')

const mobilemenutoggle = document.getElementById('mobilemenutoggle')
mobilemenutoggle.addEventListener('click', ()=> {
  sidebar.classList.toggle('active')
  document.addEventListener('click', (e)=> {
})
})

document.addEventListener('click',(e)=> {
  if(!sidebar.contains(e.target)  && !mobilemenutoggle.contains(e.target)){
      sidebar.classList.remove('active')
  }
 
})

navitems.forEach(navitem => {
    navitem.addEventListener("click", ()=>{
        navitems.forEach(item => item.classList.remove("active"))
        navitem.classList.add("active")
        currentpage = navitem.textContent.replace(/\s+/g, '')
        console.log("current item: ",navitem.textContent, ", current page: ",currentpage)

      sidebar.classList.remove('active')



           sections.forEach(section => {
            section.classList.remove("active")
if(section.classList.contains(currentpage)){
section.classList.add("active")
}
    });
    })
})

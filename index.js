const highlightPlugin = {
  id: 'highlightPoint',
  afterDatasetsDraw(chart) {
    if (window.innerWidth <= 576) return;

    const {
      ctx,
      scales: {
        x,
        y
      }
    } = chart;
    const datasetIndex = 0;
    const pointIndex = 5;

    const dataset = chart.data.datasets[datasetIndex];
    if (!dataset || !Array.isArray(dataset.data) || !dataset.data.length) return;

    const value = dataset.data[pointIndex];
    if (value == null || isNaN(value)) return; // ✅ safety check

    const xPos = x.getPixelForTick(pointIndex);
    const yPos = y.getPixelForValue(value);
    const text = `${Number(value).toLocaleString()}`; // safer conversion
    const paddingX = 10;
    const paddingY = 5;

    ctx.save();
    ctx.font = 'bold 12px Poppins, sans-serif';
    const textWidth = ctx.measureText(text).width;
    const boxWidth = textWidth + paddingX * 2;
    const boxHeight = 24;

    ctx.fillStyle = '#4017fd';
    ctx.beginPath();
    const radius = 6;
    const xBox = xPos - boxWidth / 2;
    const yBox = yPos - 40;
    ctx.moveTo(xBox + radius, yBox);
    ctx.lineTo(xBox + boxWidth - radius, yBox);
    ctx.quadraticCurveTo(xBox + boxWidth, yBox, xBox + boxWidth, yBox + radius);
    ctx.lineTo(xBox + boxWidth, yBox + boxHeight - radius);
    ctx.quadraticCurveTo(xBox + boxWidth, yBox + boxHeight, xBox + boxWidth - radius, yBox + boxHeight);
    ctx.lineTo(xBox + radius, yBox + boxHeight);
    ctx.quadraticCurveTo(xBox, yBox + boxHeight, xBox, yBox + boxHeight - radius);
    ctx.lineTo(xBox, yBox + radius);
    ctx.quadraticCurveTo(xBox, yBox, xBox + radius, yBox);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, xPos, yBox + boxHeight / 2);

    ctx.beginPath();
    ctx.arc(xPos, yPos, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#4017fd';
    ctx.fill();

    ctx.restore();
  },
};

function generateRandomData(min = 1000, max = 6000) {
  return Array.from({
      length: 12
    }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

const years = [2024, 2025];
const graphs = [];

years.forEach((year) => {
  const yearData = [];

  for (let month = 0; month < 12; month++) {
    yearData.push(generateRandomData());
  }

  graphs.push({
    [year]: yearData
  });
});

console.log(graphs);

function getMonthData(year, monthIndex) {
  const yearObj = graphs.find(g => g[year] !== undefined);
  if (!yearObj) return null;
  return yearObj[year][monthIndex];
}


let currentyear = 2025
let currentmonthindex = 9

const currentmonth = getMonthData(currentyear, currentmonthindex);
const lastmonth = getMonthData(currentyear, currentmonthindex - 1);
const canvas = document.getElementById('Dashboard');
let dashboardChart; // store chart globally

if (canvas) {
  const ctx = canvas.getContext('2d');

  dashboardChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["SEPT", "", "OCT", "", "NOV", "", "DEC", "", "JAN", "", "FEB", ""],
      datasets: [{
          data: getMonthData(2025, 10),
          borderColor: "#4017fd",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          data: [10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000],
          borderColor: "#ffffff03",
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 0,
        },
      ]
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          border: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          border: {
            display: false
          }
        }
      },
    },
    plugins: [highlightPlugin]
  });
}


function updateDashboardChart(newYear, newMonth) {
  if (!dashboardChart) return;

  // Update the first dataset dynamically
  dashboardChart.data.datasets[0].data = getMonthData(newYear, newMonth);

  // Optionally update labels too
  dashboardChart.data.labels = ["JAN", "", "FEB", "", "MAR", "", "APR", "", "MAY", "", "JUN", ""];

  // Redraw chart
  dashboardChart.update();
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
      if (section.classList.contains(currentpage)) {
        section.classList.add("active");
      }
    });

    navitems.forEach(n => {
      n.classList.remove('active');
      if (n.textContent.trim().toLowerCase() === currentpage.toLowerCase()) {
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
      datasets: [{
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
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b'
          },
          stacked: true,
          border: {
            display: false
          },
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          stacked: true,
          border: {
            display: false
          },
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
      datasets: [{
        label: 'Base',
        data: [20, 25, 40, 15, 35, 31, 20, 20, 10],
        backgroundColor: gradient,
        borderRadius: 10,
        barThickness: 15,
        stack: 'Stack 0',
      }, ],
    },
    options: {
      animation: false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b'
          },
          stacked: true,
          border: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          stacked: true,
          border: {
            display: false
          }
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


const filters = document.querySelectorAll('.filter')
filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'))
    filter.classList.add('active')
  })
})

const favs = document.querySelectorAll('.fav')
favs.forEach(fav => {
  fav.addEventListener('click', () => {
    fav.classList.toggle('active')

  })
})


document.addEventListener('click', () => {
  document.querySelectorAll('.settingmenu').forEach(s => s.classList.remove('active'));
});


window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  console.log(savedTheme)
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme
    console.log(savedTheme)

  } else {
    document.documentElement.dataset.theme = 'light'
    console.log(savedTheme)
  }
  if (savedTheme === 'dark') {
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
  } else {
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


const darkbuttons = document.querySelectorAll('.darkbutton')
const img = document.getElementById('logo');
const avatar3 = document.querySelectorAll('.avatar3')
const avatar2 = document.querySelectorAll('.avatar2')
const avatar1 = document.querySelectorAll('.avatar1')
const headereth = document.querySelectorAll('.headereth')
const Eth = document.querySelectorAll('.ETH')
const profilepageicon = document.querySelectorAll('.profilepageicon')

darkbuttons.forEach(dark => {
  dark.addEventListener('click', () => {
    console.log("clicked")
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'

    console.log(document.documentElement.dataset.theme)
    localStorage.setItem('theme', document.documentElement.dataset.theme)
    if (document.documentElement.dataset.theme === 'dark') {
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
    } else {
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
mobilemenutoggle.addEventListener('click', () => {
  sidebar.classList.toggle('active')

})


navitems.forEach(navitem => {
  navitem.addEventListener("click", () => {
    navitems.forEach(item => item.classList.remove("active"))
    navitem.classList.add("active")
    currentpage = navitem.textContent.replace(/\s+/g, '')
    console.log("current item: ", navitem.textContent, ", current page: ", currentpage)

    sidebar.classList.remove('active')



    sections.forEach(section => {
      section.classList.remove("active")
      if (section.classList.contains(currentpage)) {
        section.classList.add("active")
      }
    });
  })
})


const notificationtoggles = document.querySelectorAll('#notificationtoggle')
const notificationbarcontainer = document.querySelector('.notificationbarcontainer')
const closenotificationsidebar = document.querySelector('.close')
notificationtoggles.forEach(button => {
  button.addEventListener('click', () => {
    notificationbarcontainer.classList.add('active')
  })
})

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !mobilemenutoggle.contains(e.target)) {
    sidebar.classList.remove('active')
  }

  const clickedInsideToggle = Array.from(notificationtoggles).some(toggle =>
    toggle.contains(e.target)
  );

  if (!notificationbarcontainer.contains(e.target) && !clickedInsideToggle || closenotificationsidebar.contains(e.target)) {
    notificationbarcontainer.classList.remove('active')

  }
})

const notifications = document.querySelectorAll('.notification');

notifications.forEach(notification => {
  const closebtn = notification.querySelector('.bi-x-lg');
  if (!closebtn) return;
  closebtn.addEventListener('click', () => {
    notification.classList.add('hiding');
    setTimeout(() => {
      notification.classList.add('d-none');
    }, 300);
  });
});



// JS
$('#calendar').datepicker({
  format: 'mm/dd/yyyy',
  todayHighlight: true,
  autoclose: false,
  multidate: true
});

$('#calendar').on('changeDate', function () {
  let dates = $('#calendar').datepicker('getDates');

  // Only keep max 2 dates
  if (dates.length > 2) {
    dates = dates.slice(-2);
    $('#calendar').datepicker('setDates', dates);
  }

  // Wait a moment to ensure datepicker DOM has rendered
  setTimeout(() => {
    const cells = Array.from(document.querySelectorAll('.datepicker-days td.day'));

    // Only visible cells (ignore old/new)
    const visibleCells = cells.filter(cell =>
      !cell.classList.contains('old') &&
      !cell.classList.contains('new')
    );

    // Find active cells (the selected dates)
    const activeCells = visibleCells.filter(cell => cell.classList.contains('active'));

    if (activeCells.length >= 1) {
      console.log('Start date DOM element:', activeCells[0]);
    }

    if (activeCells.length === 2) {
      const startIndex = visibleCells.indexOf(activeCells[0]);
      const endIndex = visibleCells.indexOf(activeCells[1]);

      const [from, to] = startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];

      const rangeCells = visibleCells.slice(from, to + 1);
      console.log('Cells between active dates:', rangeCells);

      // Highlight range and insert <p> inside each cell
      rangeCells.forEach((cell, index) => {
        const dayNumber = cell.textContent.trim(); // save number first

        // Clear previous content
        cell.innerHTML = '';

        // Create <p> with day number
        const p = document.createElement('p');
        p.textContent = dayNumber;
        p.style.textAlign = 'center';
        cell.appendChild(p);

        // Highlight colors
        if (index === 0) {
          cell.classList.add('start')
        } else if (index === rangeCells.length - 1) {
                  cell.classList.add('end')

        } else {
          cell.style.backgroundColor = '#d7e3ff'; // in-between
          cell.style.borderRadius = '0';
          cell.style.color= '#4318ff'
          cell.classList.add('inbetween')
        }

      
        cell.style.position = 'relative';
        cell.style.zIndex = '2';
      });
    }
  }, 10);
});

const monthButton = document.getElementById('monthselector');
const monthDiv = document.getElementById('monthcalendar');
const buttontext = monthButton.querySelector('p');
let unclickablebuttons = 0;

const monthCalendar = new VanillaCalendar('#monthcalendar', {
  type: 'month',
  settings: {
    selection: {
      month: 'single'
    },
    visibility: {
      // Define allowed months AND years
      years: {
        min: 2024,
        max: new Date().getFullYear(),
      },
      months: {
        min: '2024-01',
        max: new Date().toISOString().slice(0, 7),
      },
    },
  },
});

monthCalendar.init();




const now = new Date();
const nowyear = now.getFullYear()
const nowmonth = now.getMonth();


monthButton.addEventListener('click', (e) => {
  e.stopPropagation();
  monthDiv.style.display = monthDiv.style.display === 'none' ? 'block' : 'none';
  const allmonths = monthDiv.querySelectorAll('.vanilla-calendar-months__month')
  allmonths.forEach((month, index) => {
    console.log(month.textContent, index)
    if (index > nowmonth) {
      month.style.pointerEvents = 'none';
      month.style.opacity = '0.5';
    }
  })
});

monthDiv.addEventListener('click', (e) => {
  unclickablebuttons = monthDiv.querySelectorAll('.vanilla-calendar-header__content button')
  const btn = e.target.closest('.vanilla-calendar-months__month');

  // Example output: Mon Nov 11 2025 10:15:30 GMT+0200 (Eastern European Standard Time)

  const allyears = monthDiv.querySelectorAll('.vanilla-calendar-years__year')
  allyears.forEach(yearEl => {
    if (yearEl.textContent < 2024) {

      yearEl.style.pointerEvents = 'none';
      yearEl.style.opacity = '0.5';
    } else if (yearEl.textContent > nowyear) {
      yearEl.style.pointerEvents = 'none';
      yearEl.style.opacity = '0.5';
    }
  });
  const zyearBtn = monthDiv.querySelector('.vanilla-calendar-year');
  // const allmonths = monthDiv.querySelectorAll('.vanilla-calendar-months__month')
  console.log(zyearBtn.textContent)
  if (parseInt(zyearBtn.textContent, 10) === 2025) {
    const allmonths = monthDiv.querySelectorAll('.vanilla-calendar-months__month')
    allmonths.forEach((month, index) => {
      console.log(month.textContent, index)
      if (index > nowmonth) {
        month.style.pointerEvents = 'none';
        month.style.opacity = '0.5';
      }
    })
  }

  // const selectedyear = parseInt(e.target.closest('.vanilla-calendar-years__year').textContent,10)
  // console.log(selectedyear)

  if (!btn) return;

  const monthName = btn.textContent;
  const monthIndex = btn.getAttribute('data-calendar-month'); // get the index
  const yearBtn = monthDiv.querySelector('.vanilla-calendar-year');
  // const allmonths = monthDiv.querySelectorAll('.vanilla-calendar-months__month')
  console.log(yearBtn)
  const year = yearBtn ? yearBtn.textContent : '';
  // console.log(btn.textContent,yearBtn.textContent,)
  if (yearBtn.textContent == 2025) {}

  console.log(`Clicked month: ${monthName}, Index: ${monthIndex}, Year: ${year}`);
  currentyear = year
  currentmonthindex = monthIndex
  updateDashboardChart(year, monthIndex)
  buttontext.textContent = `${monthName}/${year}`;

  monthDiv.style.display = 'none';
});

document.addEventListener('click', (e) => {

  if (!monthDiv.contains(e.target) && !monthButton.contains(e.target) && !unclickablebuttons.contains(e.target)) {
    monthDiv.style.display = 'none';
  }
});



/*Dropdown Menu*/
$('.datedropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.datedropdown-menu').slideToggle(300);
    });
    $('.datedropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.datedropdown-menu').slideUp(300);
    });
    $('.datedropdown .datedropdown-menu li').click(function () {
        $(this).parents('.datedropdown').find('span').text($(this).text());
        $(this).parents('.datedropdown').find('input').attr('value', $(this).attr('id'));
    });


$('.datedropdown-menu li').click(function () {
  var input = '<strong>' + $(this).parents('.datedropdown').find('input').val() + '</strong>',
      msg = '<span class="msg">Hidden input value: ';
  $('.msg').html(msg + input + '</span>');
}); 

var aSelect = new SlimSelect({
  select: '#aselectElement',
  showSearch: false
})

document.querySelector('#aform').addEventListener('reset', (e) => {
  aSelect.setSelected(
    Array.from(e.target.elements.select.selectedOptions).map((option) => option.value),
    false
  )
})

var bSelect = new SlimSelect({
  select: '#bselectElement',
  showSearch: false 
})

document.querySelector('#bform').addEventListener('reset', (e) => {
  bSelect.setSelected(
    Array.from(e.target.elements.select.selectedOptions).map((option) => option.value),
    false
  )
})



$('#aselectElement').on('change' ,function () {
const month = this.value
const year = $('#bselectElement').val()
const newdate = new Date(year,month,1)
console.log(newdate)
  $('#calendar').datepicker('update', newdate);

})


$('#bselectElement').on('change' ,function () {
const year = this.value
const month = $('#aselectElement').val()
const newdate = new Date(year,month,1)
console.log(newdate)
  $('#calendar').datepicker('update', newdate);

})

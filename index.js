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
const notificationbar = document.querySelector('.notificationbar')
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

  if (!notificationbar.contains(e.target) && !clickedInsideToggle || closenotificationsidebar.contains(e.target)) {
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



let zyearBtn
const now = new Date();
const nowyear = now.getFullYear()
const nowmonth = now.getMonth();


monthButton.addEventListener('click', (e) => {
  zyearBtn = monthDiv.querySelector('.vanilla-calendar-year');

  if (parseInt(zyearBtn.textContent, 10) === nowyear) {
    const allmonths = Array.from(monthDiv.querySelectorAll('.vanilla-calendar-months__month'))
    allmonths.forEach((monthdiv, index) => {
      console.log('current month ', nowmonth, ' this month', index)
      if (nowmonth < index) {
        monthdiv.style.pointerEvents = 'none';
        monthdiv.style.opacity = '0.5';
      }
    })

  }
  console.log(zyearBtn)

  zyearBtn.addEventListener('click', () => {
    console.log('clicked')
    console.log(monthDiv.querySelectorAll('.vanilla-calendar-years__year'))



  })





  e.stopPropagation();
  monthDiv.style.display = monthDiv.style.display === 'none' ? 'block' : 'none';
  console.log(parseInt(zyearBtn.textContent, 10) === nowyear)
  console.log(parseInt(zyearBtn.textContent, 10) === nowyear)

});

monthDiv.addEventListener('click', (e) => {
  zyearBtn = monthDiv.querySelector('.vanilla-calendar-year');

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
  // const allmonths = monthDiv.querySelectorAll('.vanilla-calendar-months__month')
  if (parseInt(zyearBtn.textContent, 10) === 2025) {
    const allmonths = monthDiv.querySelectorAll('.vanilla-calendar-months__month')
    allmonths.forEach((month, index) => {
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
  if (yearBtn.textContent == 2025) {
    
  }

  console.log(`Clicked month: ${monthName}, Index: ${monthIndex}, Year: ${year}`);
  currentyear = year
  currentmonthindex = monthIndex
  updateDashboardChart(year, monthIndex)
  buttontext.textContent = `${monthName}/${year}`;

  monthDiv.style.display = 'none';
});

document.addEventListener('click', (e) => {


});



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



$('#aselectElement').on('change', function () {
  const month = this.value
  const year = $('#bselectElement').val()
  const newdate = new Date(year, month, 1)
  console.log(newdate)
  $('#calendar').datepicker('update', newdate);

})


$('#bselectElement').on('change', function () {
  const year = this.value
  const month = $('#aselectElement').val()
  const newdate = new Date(year, month, 1)
  console.log(newdate)
  $('#calendar').datepicker('update', newdate);

})

$('.notification').each(function () {
  $(this).find('.notificationview').on('click', function () {
    const body = $(this).closest('.notification').find('.notificationbody');
    const notification = $(this).closest('.notification');

    // Toggle the "open" class
    body.toggleClass('open');
    notification.toggleClass('open')
    // If it's open, add content; if it's closed, remove it
    if (body.hasClass('open')) {
      body.prepend('<p class="mb-2">Dear, team</p>');
    } else {
      body.find('.mb-2, .mt-2').remove();
    }
  });
});
$('.notificationtabs ul li').each(function () {
  $(this).on('click', function () {
    $('.notificationtabs ul li').removeClass('active')
    $(this).toggleClass('active')
    if (this.textContent === "All Notifications") {
      $('.notification').each(function () {
        $(this).removeClass('d-none')
      });
    } else if (this.textContent === "Reminders") {
      $('.notification').each(function () {
        if ($(this).hasClass('all')) {
          $(this).addClass('d-none')
          console.log('is reminder', this)
        } else if ($(this).hasClass('reminder')) {
          $(this).removeClass('d-none')
          console.log('is all', this)
        }
      });
    } else if (this.textContent === "Updates") {
      $('.notification').each(function () {
        if ($(this).hasClass('reminder')) {
          $(this).addClass('d-none')
          console.log('is reminder', this)
        } else if ($(this).hasClass('all')) {
          $(this).removeClass('d-none')
          console.log('is all', this)
        }
      });
    }


  })
})


const target = document.querySelector('.profile');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const timers = document.querySelectorAll('.timer');

      timers.forEach(timer => {
        const fullText = timer.textContent.trim();

        const letter = fullText.replace(/[\d.,\s]/g, '');
        const numberStr = fullText.replace(/[^\d.,]/g, '')
        const number = parseFloat(numberStr);

        const isDecimal = numberStr.includes('.')

        const duration = 1000;
        const steps = 100;
        const stepTime = duration / steps;
        const increment = number / steps;

        let current = 0;
        const interval = setInterval(() => {
          current += increment;

          if (current >= number) {
            timer.textContent = (isDecimal ? number.toFixed(1) : Math.round(number)) + letter;
            clearInterval(interval);
          } else {
            timer.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + letter;
          }
        }, stepTime);
      });
      observer.unobserve(entry.target);

    }
  });
}, {
  threshold: 0.1
});
observer.observe(target);

const inputcontainer = document.querySelectorAll('.inputcontainer')
inputcontainer.forEach(input => {
  input.addEventListener('click', () => {
    const searchcontainer = document.querySelector('.searchmobilecontainer')
    searchcontainer.classList.add('active')
    searchcontainer.addEventListener('click', (e) => {
      const searchcomponent = searchcontainer.querySelector('.searchmobile')
      if (!searchcomponent.contains(e.target)) {
        searchcontainer.classList.remove('active')
      }
    })
  })
})



const chatscontainer = document.getElementById("chatscontainer");
const activechathead = document.getElementById("activechathead")
const ExpandedChat = document.getElementById("ExpandedChat")
const chatmedia = document.getElementById("chatmedia")
const chattextcontainer = document.getElementById("textcontainer")

let activechat

let chats = [];


function renderonlineswiper(chats) {
const onlinecontainer = document.getElementById("onlinecontainer");
  let onlinepeople = "";

chats.forEach((chat,index) => {
  
    if (chat.online) {
      onlinepeople += `
      <div class="swiper-slide">
        <button class="online" onclick="openChat(${index})">
          <img src="${chat.img}" alt="">
          <div class="onlineicon"></div>
        </button>
         </div>
      `;
      
    }

})
  onlinecontainer.innerHTML = onlinepeople;

}

function render() {
  let chatheads = "";


  if (activechat) {

const chatspagecomponent = document.getElementById("chatspagecomponent")
const activechatcomponent = document.getElementById("activechatcomponent")
const mediacomponent = document.getElementById("mediacomponent")

chatspagecomponent.classList.remove("active")
activechatcomponent.classList.add('active')

const chatpagebtn = document.getElementById("chatpagebtn")
chatpagebtn.addEventListener("click" , () => {
  activechat = null
})

    chatmedia.innerHTML =
      `
      <div class="d-flex align-items-center justify-content-start w-100 done d-md-none"> <i class="bi bi-arrow-left fs-4" id="done"></i></div>
<div class="d-flex flex-column gap-1 align-items-center w-100 profilehead ">
        <img src="${activechat.img}" alt="">
<h3 class="m-0">Bankaii</h3>
${activechat.online ? '<p class="m-0">Online</p>' : '<p class="m-0">Offline</p>'}

    </div>




    <div class="w-100 d-flex flex-column gap-3">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <h4 class="m-0 d-flex align-items-center ">Media <p class="textgray m-0">${activechat.media.length}</p></h4>
            <p class="m-0 textgray">View All <i class="bi bi-chevron-right"></i></p>
        </div>
        <div class=" mediacontainer images">
       <div class="row">
${activechat.media.slice(0, 3).map((media, index) => `
  <div class="col-4">
    <a href="${media.src}" class="glightbox h-100 position-relative d-flex rounded-3 overflow-hidden" data-gallery="chat-group">

      ${index === 2 && activechat.media.length > 3
        ? `
          <div class="h-100 position-absolute top-0 start-0 w-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50 text-white">
              +${activechat.media.length - 3}
          </div>
        `
        : ''
      }

      <img src="${media.src}" class="w-100 h-100 object-fit-cover"/>
    </a>
  </div>
`).join('')}

<!-- Hidden links for remaining images -->
${activechat.media.slice(3).map(media => `
  <a href="${media.src}" class="glightbox d-none" data-gallery="chat-group"></a>
`).join('')}
</div>
+
 
        </div>
    </div>


        <div class="w-100 d-flex flex-column gap-3">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <h4 class="m-0 d-flex align-items-center ">Links <p class="textgray m-0">14</p></h4>
            <p class="m-0 textgray">View All <i class="bi bi-chevron-right"></i></p>
        </div>
        <div class="row mediacontainer">
            <div class="col-12 link">
                <div class="d-flex gap-3 head">
                <img src="./Assets/Background 5.4.png" alt="" class="img-fluid">
                <p class="m-0">http://127.0.0.1:5501/Assets/Background%205.4.png</p>
            </div>
            <button class="foot">
                <p class="m-0">View messages</p>
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
        </div>
    </div>

        <div class="w-100 d-flex flex-column gap-3">
        <div class="d-flex w-100 align-items-center justify-content-between">
            <h4 class="m-0 d-flex align-items-center ">Files <p class="textgray m-0">10</p></h4>
            <p class="m-0 textgray">View All <i class="bi bi-chevron-right"></i></p>
        </div>
        <div class="row mediacontainer mb-2">
            <div class="col-12 p-0">
                <div class="d-flex gap-3">
<i class="bi bi-file-earmark-text doc"></i>
<div class="d-flex flex-column">
    <p class="fw-bold m-0">Schedile VCT ApAC.pdf</p>
    <div class="d-flex gap-5">
        <p class="m-0 textgray">490 KB</p>
        <p class="m-0 textgray">27 jan 2025</p>
    </div>
</div>
                </div>
            </div>
                        <div class="col-12 p-0">     <div class="d-flex gap-3">
<i class="bi bi-file-earmark-text doc"></i>
<div class="d-flex flex-column">
    <p class="fw-bold m-0">Schedile VCT ApAC.pdf</p>
    <div class="d-flex gap-5">
        <p class="m-0 textgray">490 KB</p>
        <p class="m-0 textgray">27 jan 2025</p>
    </div>
</div>
                </div>
            </div>

                                    <div class="col-12 p-0">     <div class="d-flex gap-3">
<i class="bi bi-file-earmark-text doc"></i>
<div class="d-flex flex-column">
    <p class="fw-bold m-0">Schedile VCT ApAC.pdf</p>
    <div class="d-flex gap-5">
        <p class="m-0 textgray">490 KB</p>
        <p class="m-0 textgray">27 jan 2025</p>
    </div>
</div>
                </div>
            </div>

        </div>
    </div>
`
let lightbox = GLightbox({
    selector: '.glightbox'
});

function refreshLightbox() {
    if (lightbox) lightbox.destroy(); // remove old instance
    lightbox = GLightbox({ selector: '.glightbox' });
}

    ExpandedChat.innerHTML =
      `
 <div class="head sticky-top" id="activechathead">
 <button id="closeexpandedchat">
 <i class="bi bi-arrow-left" ></i>
 </button>

    <img src="${activechat.img}" alt="">
    <div class="d-flex w-100 justify-content-between">
    <div class="d-flex flex-column  ">
  <h5 class="m-0">  ${activechat.name}</h5>
  <p class="m-0 textgray">${activechat.online ? activechat.typing ? "Typing ..." : "Online" : "Offline"}</p>
  </div>
  <div class="d-flex align-items-center gap-3 fs-5">
  
  ${activechat.online ? '<div class="onlinestate"></div>' : ''} 
      <button>
  <i class="bi bi-camera-video"></i>
  </button>

    <button>
<i class="bi bi-telephone"></i>
</button>

<button>
<i class="bi bi-three-dots-vertical" id="openmediacomponent"></i>
</button>
  </div>
  </div>
</div>
<div class="body hide-scrollbar scrollable" id="textcontainer">


  ${activechat.chat.map((chattext,index) => `
  <div class="message">

${
  activechat.chat[index + 1] && activechat.chat[index].side === activechat.chat[index + 1].side
        ?(activechat.chat[index - 1] && activechat.chat[index].side === activechat.chat[index - 1].side
        ? (chattext.side === "recived"
        ?`<img src="${activechat.img}" class="imginchat opacity-0 pe-none"><div class="messagecontent 1 ${chattext.side} sub">${chattext.text}</div>`
        :`<div class="messagecontent 2 ${chattext.side} sub">${chattext.text}</div>`)
        : (chattext.side === "recived" ? `<img src="${activechat.img}" class="imginchat"><div class="messagecontent 3 ${chattext.side} sub">${chattext.text}</div>`
        :`<div class="messagecontent 4 ${chattext.side}">${chattext.text}</div>`))
        : (chattext.side === "recived" ? (activechat.chat[index - 1] && activechat.chat[index].side === activechat.chat[index - 1].side
        ?`<img src="${activechat.img}" class="imginchat opacity-0 pe-none"><div class="messagecontent sub ${chattext.side} mb-3">${chattext.text}</div>`
        :`<img src="${activechat.img}" class="imginchat"><div class="messagecontent 5 ${chattext.side} sub mb-3">${chattext.text}</div>`
        ):`<div class="messagecontent sub ${chattext.side} mb-3">${chattext.text}</div>`)}
  </div>
`).join('')}



</div>
<form class="submit sticky-bottom" onsubmit="readonchange(event)">
    <button>
<i class="bi bi-image"></i>
</button>
<button>
<i class="bi bi-emoji-smile"></i>
</button>
<div class="linegap"></div>
<input type="text" placeholder="Write a message ...">
<button class="send" type="submit">
<i class="bi bi-send"></i>
</button>
</form>
 `
const closeexpandedchat = document.getElementById("closeexpandedchat")
closeexpandedchat.addEventListener('click', ()=> {
  
chatspagecomponent.classList.add("active")
activechatcomponent.classList.remove('active')
mediacomponent.classList.remove('active')

})

const done = document.getElementById("done")
done.addEventListener('click',()=>{
  mediacomponent.classList.remove('active')
activechatcomponent.classList.add('active')

})

const openmediacomponent = document.getElementById("openmediacomponent")
openmediacomponent.addEventListener('click', ()=> {
chatspagecomponent.classList.remove("active")
mediacomponent.classList.toggle('active')
})
    const textContainer = document.getElementById("textcontainer")
    if (activechat.chat.length > 2) {
      textContainer.scrollTop = textContainer.scrollHeight;
    } else {
      textContainer.scrollTop = 0;
    }
  }

  chats.forEach((chat, index) => {
let lastrecivedcount = 0;

for (let i = chat.chat.length - 1; i >= 0; i--) {
  if (chat.chat[i].side === "recived") {
    lastrecivedcount++;
  } else {
    break; 
  }
}

console.log(lastrecivedcount);
const date = new Date(chat.chat[chat.chat.length - 1].time)
const time = date.toLocaleTimeString([],{
  hour: "2-digit",minute:"2-digit"
})
chatheads += `
      <div class="chat  d-flex ${chat.active ? 'active' : ''}" onclick="openChat(${index})">
        <div class="online">
          <img src="${chat.img}" alt="">
          ${chat.online ? "<div class='onlineicon'></div>" : ""}
        </div>
        <div class="w-100 d-flex flex-column" style="min-width: 0;">
          <div class="w-100 d-flex justify-content-between py-1 px-3 head">
            <h6 class="m-0">${chat.name}</h6>
            <p class="m-0">${time}</p>
          </div>
          <div class="w-100 d-flex justify-content-between py-1 px-3 body gap-2">
          
            ${chat.chat[chat.chat.length - 1].side === "sent" ? `  <h6 class="m-0 textgray"><i class="bi bi-check2-all"></i>  ${chat.chat[chat.chat.length - 1].text}   </h6>` : 
            
            `  <h6>  ${chat.chat[chat.chat.length - 1].text}  </h6> <p class="m-0">${lastrecivedcount}</p>`}
          
          </div>
        </div>
      </div>
    `;

  });

  chatscontainer.innerHTML = chatheads;
    
const myswiper = new Swiper(".mySwiper", {
  // loop: true,
  slidesPerView: 'auto',

  spaceBetween: 15,


  // breakpoints: {
  //   1200: {
  //     slidesPerView: 'auto',
  //     spaceBetween: 0,
  //   },
   
  // },
});

}

function openChat(i) {
  chats.forEach(chat => chat.active = false);
  chats[i].active = true;
  activechat = chats[i]
  render();
  refreshLightbox();

}

function readonchange(event) {
  event.preventDefault(); 
  if (!activechat) return;

  const form = event.target;
  const input = form.querySelector('input');
  const text = input.value.trim();
  if (!text) return;

  
  activechat.chat.push({
    text: text,
    side: 'sent',
    time: new Date().toISOString()
  });

 
  const selectionStart = input.selectionStart;
  const selectionEnd = input.selectionEnd;

  input.value = '';

  render(); 

  const newInput = document.querySelector('.submit input');
  if (newInput) {
    newInput.focus();
    newInput.setSelectionRange(selectionStart, selectionEnd);
  }
}

fetch("chats.json")
  .then(response => response.json())
  .then(data => {
    chats = data;
    render();
    renderonlineswiper(chats);
  })
  .catch(error => console.log(error));





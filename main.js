let data;
async function loadData() {
  const res = await fetch('./data.json')
  const dt = await res.json();
  data = dt
}

function changeDataAccTp(tp, str) {
  const allHrs = document.querySelectorAll('.duration > .hrs')
  const allLast = document.querySelectorAll('.duration > .last')

  for(let i=0; i<data.length; i++) {
    let selector = data[i].title.toLowerCase()
    if(data[i].title === 'Self Care') selector = 'self-care'

    const hrs = document.querySelector(`.${selector} span.hrs`) 
    const last = document.querySelector(`.${selector} span.last `)

    hrs.textContent = `${data[i]['timeframes'][tp]['current']}hrs`
    last.textContent = `${str} - ${data[i]['timeframes'][tp]['previous']}hrs`
  }

}

function changeTimePeriod(e) {
  for(const tp of timePeriods) {
    tp.classList.remove('active')
    if(e.target === tp) {
      e.target.classList.toggle('active')
    }
  }

  if(e.target.textContent === 'Daily') {
    changeDataAccTp('daily', 'Yesterday')
  }
  else if(e.target.textContent === 'Weekly') {
    changeDataAccTp('weekly', 'Last Week')
  }
  else {
    changeDataAccTp('monthly', 'Last Month')
  }
}

const timePeriods = document.querySelectorAll('.frequency-container > span')
for(const tp of timePeriods) {
  tp.addEventListener('click', changeTimePeriod)
}

async function initializeApp() {
  await loadData()
}

initializeApp()

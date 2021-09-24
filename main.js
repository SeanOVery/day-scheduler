const currentDayEl = $('#currentDay'),
      listGroupUl = $('.list-group');
let   scheduleStorageArr = ['', '', '', '', '', '', '', '', ''];
// Global variable declaration.

setInterval(function() {
    currentDayEl.text(moment().format('MMM Do, YYYY [at] h:mm:ss a'))
},1000)// Interval to show time live on page updating every second.

function init() {
    let storedItems = JSON.parse(localStorage.getItem('schedule'));

    if (storedItems !== null) {
        scheduleStorageArr = storedItems
    }

    displaySchedule();
    setColor();
} // Function pulls schedule from local storage(if it exists) and displays it.

function displaySchedule() {
    for (i = 0; i < 9; i++) {
        
        let newLi = $('<li>'),
            newSpan = $('<span>'),
            newInput = $('<input>'),
            newBtn = $('<button>');

        newLi.attr('class', 'list-group-item d-flex justify-content-between align-items-center')
        newSpan.attr('class', 'inline-time').text(`${moment().startOf('day').add((i + 9), 'h').format('h:mm A')}`)
        newInput.attr('class', 'schedule-item').attr('type', 'text').attr('data-index', i).val(scheduleStorageArr[i])
        newBtn.attr('class', 'set-btn').text('Save').on('click', saveItem)
        newLi.append(newSpan, newInput, newBtn)
        listGroupUl.append(newLi)
    }
} // Function to display schedule including previously stored items and also set things like the data index on input for easier access later and event listeners on save btns.

function setColor() {
    for (i = 0; i < 9; i++) {
        
        let targetSpanEl = listGroupUl.children('li').eq(i).children('span').eq(0).text(),
            targetInputEl = listGroupUl.children('li').eq(i).children('input')
            targetElSpanMoment = moment(targetSpanEl, 'h:mm A');

        if (targetElSpanMoment.diff(moment().startOf('hour')) < 0) {
            targetInputEl.addClass('past')
        } else if (targetElSpanMoment.diff(moment().startOf('hour')) === 0) {
            targetInputEl.addClass('present')
        } else {
            targetInputEl.addClass('future')
        }
    }
} // Function to set color on input boxes. Sets red input is within current hour, gray if in the past, and green if in the future.

function saveItem(ev) {
    let index = $(ev.target).siblings().eq(-1).attr('data-index'),
        value = $(ev.target).siblings().eq(-1).val();
    scheduleStorageArr.splice(index, 1, value)
    localStorage.setItem('schedule', JSON.stringify(scheduleStorageArr))
} // Function updates local storage and page with new item added 

init(); // Run on page open
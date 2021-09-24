const currentDayEl = $('#currentDay'),
      listGroupUl = $('.list-group');
let   scheduleStorageArr = ['', '', '', '', '', '', '', '', ''];


setInterval(function() {
    currentDayEl.text(moment().format('MMM Do, YYYY [at] h:mm:ss a'))
},1000)

function init() {
    let storedItems = JSON.parse(localStorage.getItem('schedule'))
    if (storedItems !== null) {
        scheduleStorageArr = storedItems
    }
    console.log(scheduleStorageArr)
    displaySchedule();
    setColor();
}

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
}

function setColor() {
    for (i = 0; i < 9; i++) {
        
        let targetElSpan = listGroupUl.children('li').eq(i).children('span').eq(0).text(),
            targetElLi = listGroupUl.children('li').eq(i).children('input')
            targetElSpanMoment = moment(targetElSpan, 'h:mm A');

        if (targetElSpanMoment.diff(moment().startOf('hour')) < 0) {
            targetElLi.addClass('past')
        } else if (targetElSpanMoment.diff(moment().startOf('hour')) === 0) {
            targetElLi.addClass('present')
        } else {
            targetElLi.addClass('future')
        }
    }
}

function saveItem(ev) {
    let index = $(ev.target).siblings().eq(-1).attr('data-index'),
        value = $(ev.target).siblings().eq(-1).val()
    scheduleStorageArr.splice(index, 1, value)
    localStorage.setItem('schedule', JSON.stringify(scheduleStorageArr))
    console.log(index)
    console.log(value)
    console.log(scheduleStorageArr)

}

init();
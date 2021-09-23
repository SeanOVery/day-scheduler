const currentDayEl = $('#currentDay'),
      listGroupUl = $('.list-group');
let   now = moment();


setInterval(function() {
    currentDayEl.text(moment().format('MMM Do, YYYY [at] h:mm:ss a'))
},1000)

function displaySchedule() {
    for (i = 0; i < 9; i++) {
        
        let newLi = $('<li>'),
            newSpan = $('<span>'),
            newInput = $('<input>'),
            newBtn = $('<button>');

        newLi.attr('class', 'list-group-item d-flex justify-content-between align-items-center')
        newSpan.attr('class', 'inline-time').text(`${moment().startOf('day').add((i + 9), 'h').format('h:mm A')}`)
        newInput.attr('class', 'schedule-item').attr('type', 'text').text('Placeholder')
        newBtn.attr('class', 'set-btn').text('Save')
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

displaySchedule();
setColor();
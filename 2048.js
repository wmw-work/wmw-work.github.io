const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

// 随机产生数字2或4, 2的概率为90%, 4的概率为10%
const random_number = () => {
    let num = Math.random() * 10
    if (num < 9) {
        num = 2
    } else {
        num = 4
    }
    return num
}

// 随机选择一个格子
const choose = () => {
    let a = Math.random() * 100
    let b = Math.floor(a)
    let c = b % 16
    return c
}

// 插入值
const input_value = (cell) => {
    let value = random_number()
    let add_class = 'number' + value
    let t = `<span class="span_number">${value}</span>`
    appendHtml(cell, t)
    cell.classList.add(add_class)
}

// 选择两个格子插入值
const number_random = (cells, num1, num2) => {
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        if (i === num1) {
            input_value(cell)
        }
        if (i === num2) {
            input_value(cell)
        }
    }
}

// 点击开始后, 随机选择两个格子插入值
const number_begin_2048 = () => {
    let cells = es('.cell-2048')
    let num1 = choose()
    let num2 = choose()

    while (true) {
        if (num1 === num2) {
            num1 = choose()
            num2 = choose()
        } else {
            break
        }
    }
    number_random(cells, num1, num2)
}

// 随机选择两个没有插入值的格子插入值
const choose2 = () => {
    let cells = es('.cell-2048')

    let num1 = choose()
    let num2 = choose()
    let num = 0
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        let len = cell.children.length
        if (len === 0) {
            num += 1
        }
    }
    if (num < 2) {
        return false
    }
    while (true) {
        if (num1 === num2 || cells[num1].children.length !== 0 || cells[num2].children.length !==0) {
            // log('num1', num1, num2)
            num1 = choose()
            num2 = choose()
            // log('num2', num1, num2)

        } else {
            break
        }
    }
    number_random(cells, num1, num2)
}

// 判断页面是否只剩一个没有值的格子, 当页面只剩一个格子时，给这个格子插入值
const last_one = () => {
    let cells = es('.cell-2048')
    let num = 0
    let index = []
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        let len = cell.children.length
        if (len === 0) {
            index.push(i)
            num += 1
        }
    }
    if (num === 1) {
        index = Number(index)
        let cell = cells[index]
        input_value(cell)
    }
}

// 判断页面是否都有值
const number_full = () => {
    let cells = es('.cell-2048')
    let num = 0
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        let len = cell.children.length
        if (len === 0) {
            num += 1
        }
    }
    if (num === 0) {
        return true
    }
    return false
}

// 计时
const playTime_2048 = () => {
    let play_time = e('.time-2048')
    let interval = 1000
    let clock = setInterval(function() {
        play_time.value = Number(play_time.value) + 1
    }, interval)
    return clock
}

// 计算分数
const max_number = (spans) => {
    let result = 0
    for (let i = 0; i < spans.length; i++) {
        let span = spans[i]
        let value = Number(span.innerHTML)
        if (result < value) {
            result = value
        }
    }
    // log('result', result)
    return result
}
const playScore_2048 = () => {
    let score = e('.score-2048')
    let spans = es('.span_number')
    let value = max_number(spans)
    // log('value', value)
    score.value = value
}

// 点击开始按钮, 随机出现2或4, 计时开始, 分数计算开始
const bindClick_2048 = () => {
    let begin = e('.begin-2048')
    begin.addEventListener('click', () => {
        number_begin_2048()
        playTime_2048()
        playScore_2048()
    })
}

// 判断能否上移及相加
const judge_up = (cell, x, y) => {
    let up_x = x - 1
    if (up_x >= 0) {
        // log('if')
        let span = cell.querySelector('.span_number')
        let value = span.innerText
        // log('span', value)
        let cell_class = 'number' + value
        let id = '#id-' + up_x + y
        let cell_up = e(id)
        if (cell_up.children.length === 0) {
            // log('if = 0')
            let t = `<span class="span_number">${value}</span>`
            appendHtml(cell_up, t)
            span.remove()
            cell.classList.remove(cell_class)
            cell_up.classList.add(cell_class)
            judge_up(cell_up, up_x, y)
            return true
        } else if (cell_up.children.length !== 0) {
            // log('if != 0')
            let span_up = cell_up.querySelector('.span_number')
            let span_up_value = span_up.innerText
            if (value === span_up_value) {
                span_up_value = span_up_value * 2
                let t = `<span class="span_number">${span_up_value}</span>`
                appendHtml(cell_up, t)
                let cell_up_class = 'number' + span_up_value
                span.remove()
                span_up.remove()
                cell.classList.remove(cell_class)
                cell_up.classList.remove(cell_class)
                cell_up.classList.add(cell_up_class)
                judge_up(cell_up, up_x, y)
                return true
            }
        }
        return false
    }
}

// 判断能否下移及相加
const judge_down = (cell, x, y) => {
    let down_x = x + 1
    if (down_x <= 3) {
        let span = cell.querySelector('.span_number')
        let value = span.innerText

        let cell_class = 'number' + value
        let id = '#id-' + down_x + y
        let cell_down = e(id)
        if (cell_down.children.length === 0) {
            let t = `<span class="span_number">${value}</span>`
            appendHtml(cell_down, t)
            span.remove()
            cell.classList.remove(cell_class)
            cell_down.classList.add(cell_class)
            judge_down(cell_down, down_x, y)
            return true

        } else if (cell_down.children.length !== 0) {
            // log('if != 0')
            let span_down = cell_down.querySelector('.span_number')
            let span_down_value = span_down.innerText
            if (value === span_down_value) {
                span_down_value = span_down_value * 2
                let t = `<span class="span_number">${span_down_value}</span>`
                appendHtml(cell_down, t)
                let cell_up_class = 'number' + span_down_value
                span.remove()
                span_down.remove()
                cell.classList.remove(cell_class)
                cell_down.classList.remove(cell_class)
                cell_down.classList.add(cell_up_class)
                judge_down(cell_down, down_x, y)
                return true

            }
        }
        return false
    }
}

// 判断能否右移及相加
const judge_right = (cell, x, y) => {
    let right_y = y + 1
    if (right_y <= 3) {
        let span = cell.querySelector('.span_number')
        let value = span.innerText
        // log('span', value)
        let cell_class = 'number' + value
        let id = '#id-' + x + right_y
        let cell_right = e(id)
        if (cell_right.children.length === 0) {
            // log('if = 0')
            let t = `<span class="span_number">${value}</span>`
            appendHtml(cell_right, t)
            span.remove()
            cell.classList.remove(cell_class)
            cell_right.classList.add(cell_class)
            judge_right(cell_right, x, right_y)
            return true

        } else if (cell_right.children.length !== 0) {
            // log('if != 0')
            let span_right = cell_right.querySelector('.span_number')
            let span_right_value = span_right.innerText
            if (value === span_right_value) {
                span_right_value = span_right_value * 2
                let t = `<span class="span_number">${span_right_value}</span>`
                appendHtml(cell_right, t)
                let cell_up_class = 'number' + span_right_value
                span.remove()
                span_right.remove()
                cell.classList.remove(cell_class)
                cell_right.classList.remove(cell_class)
                cell_right.classList.add(cell_up_class)
                judge_right(cell_right, x, right_y)
                return true

            }
        }
        return false
    }
}

// 判断能否左移及相加
const judge_left = (cell, x, y) => {
    let left_y = y - 1
    if (left_y >= 0) {
        let span = cell.querySelector('.span_number')
        let value = span.innerText
        // log('span', value)
        let cell_class = 'number' + value
        let id = '#id-' + x + left_y
        let cell_left = e(id)
        if (cell_left.children.length === 0) {
            // log('if = 0')
            let t = `<span class="span_number">${value}</span>`
            appendHtml(cell_left, t)
            span.remove()
            cell.classList.remove(cell_class)
            cell_left.classList.add(cell_class)
            judge_left(cell_left, x, left_y)
            return true

        } else if (cell_left.children.length !== 0) {
            // log('if != 0')
            let span_left = cell_left.querySelector('.span_number')
            let span_left_value = span_left.innerText
            if (value === span_left_value) {
                span_left_value = span_left_value * 2
                let t = `<span class="span_number">${span_left_value}</span>`
                appendHtml(cell_left, t)
                let cell_left_class = 'number' + span_left_value
                span.remove()
                span_left.remove()
                cell.classList.remove(cell_class)
                cell_left.classList.remove(cell_class)
                cell_left.classList.add(cell_left_class)
                judge_left(cell_left, x, left_y)
                return true

            }
        }
        return false
    }
}

// 上移
const remove_up = () => {
    let cells = es('.cell-2048')
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        let len = cell.children.length
        let cell_x = Number(cell.dataset.x)
        let cell_y = Number(cell.dataset.y)
        if (len !== 0) {
            judge_up(cell, cell_x, cell_y)
        }
    }
}

// 下移
const remove_down = () => {
    let cells = es('.cell-2048')
    for (let i = cells.length - 1; i >= 0 ; i--) {
        let cell = cells[i]
        let len = cell.children.length
        let cell_x = Number(cell.dataset.x)
        let cell_y = Number(cell.dataset.y)
        if (len !== 0) {
            judge_down(cell, cell_x, cell_y)
        }
    }
}

// 右移
const remove_right = () => {
    let cells = es('.cell-2048')
    for (let i = cells.length - 1; i >= 0; i--) {
        let cell = cells[i]
        let len = cell.children.length
        let cell_x = Number(cell.dataset.x)
        let cell_y = Number(cell.dataset.y)
        if (len !== 0) {
            judge_right(cell, cell_x, cell_y)
        }
    }
}

// 左移
const remove_left = () => {
    let cells = es('.cell-2048')
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]
        let len = cell.children.length
        let cell_x = Number(cell.dataset.x)
        let cell_y = Number(cell.dataset.y)
        if (len !== 0) {
            judge_left(cell, cell_x, cell_y)
        }
    }
}

// 给所有按键清除 active class
const remove_active = () => {
    let arrows = es('.arrow_span')
    for (let i = 0; i <arrows.length; i++) {
        let arrow = arrows[i]
        if (arrow.classList.contains('active-2048')) {
            arrow.classList.remove('active-2048')
        }
    }
}

// 设置字体样式
const font_size = () => {
    let spans = es('.span_number')
    for (let i = 0; i < spans.length; i++) {
        let span = spans[i]
        let value = Number(span.innerText)
        if (value > 1000) {
            span.classList.add('font_small2')
        } else if (value > 100) {
            span.classList.add('font_small1')
        }
    }
}

// 监听上移事件, 随机出现2个值, 值为2或4
const bindKeyup = () => {
    let body = e('body')
    body.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            let arrow_up = e('.arrow_up')
            remove_active()
            arrow_up.classList.add('active-2048')
            remove_up()
            choose2()
            playScore_2048()
            font_size()
            last_one()
        }
    })
}

// 监听下移事件, 随机出现2个值, 值为2或4
const bindKeydown = () => {
    let body = e('body')
    body.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            let arrow_down = e('.arrow_down')
            remove_active()
            arrow_down.classList.add('active-2048')
            remove_down()
            choose2()
            playScore_2048()
            font_size()
            last_one()
        }
    })
}

// 监听右移事件, 随机出现2个值, 值为2或4
const bindKeyright = () => {
    let body = e('body')
    body.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            let arrow_right = e('.arrow_right')
            remove_active()
            arrow_right.classList.add('active-2048')
            remove_right()
            choose2()
            playScore_2048()
            font_size()
            last_one()
        }
    })

}

// 监听左移事件, 随机出现2个值, 值为2或4
const bindKeyleft = () => {
    let body = e('body')
    body.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            let arrow_left = e('.arrow_left')
            remove_active()
            arrow_left.classList.add('active-2048')
            remove_left()
            choose2()
            playScore_2048()
            font_size()
            last_one()
        }
    })

}

const bindEvent_2048 = () => {
    bindClick_2048()
    bindKeyup()
    bindKeydown()
    bindKeyright()
    bindKeyleft()
}

const __main_2048 = () => {
    bindEvent_2048()
}

__main_2048()

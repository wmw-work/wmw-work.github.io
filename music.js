const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const bindAll = function(elements, eventName, callback) {
    for (let i = 0; i < elements.length; i++) {
        let tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}

const play_list = function() {
    let n = e('.list__link')
    bindEvent(n, 'mouseover', function() {
        let display = e('.audios')
        display.classList.add('active')
    })
    bindEvent(n, 'mouseout', function() {
        let display = e('.audios')
        display.classList.remove('active')
    })

}

const bindList = function() {
    let audios = es('.audio')
    bindAll(audios, 'mouseover', function(event) {
        let target = event.target
        for (let i = 0; i < audios.length; i++) {
            let audio = audios[i]
            if (audio.classList.contains('highlight-music')) {
                audio.classList.remove('highlight-music')
            }
        }
        target.classList.add('highlight-music')
    })
}

const voice_number = function(audio) {
    let first = e('.first-music')
    let second = e('.second')
    let third = e('.third')
    let a_v = audio.volume
    if (a_v === 0) {
        first.classList.add('circle_opacity')
        second.classList.add('circle_opacity')
        third.classList.add('circle_opacity')
    } else if (a_v > 0 && a_v <= 0.3) {
        first.classList.remove('circle_opacity')
        second.classList.add('circle_opacity')
        third.classList.add('circle_opacity')
    } else if (a_v > 0.3 && a_v <= 0.7) {
        first.classList.remove('circle_opacity')
        second.classList.remove('circle_opacity')
        third.classList.add('circle_opacity')
    } else if (a_v > 0.7 && a_v <= 1) {
        first.classList.remove('circle_opacity')
        second.classList.remove('circle_opacity')
        third.classList.remove('circle_opacity')
    }

}

const bindVoice = function(audio) {
    audio.volume = 0.3
    let voice = e('.voice')
    voice.addEventListener('mouseover', function() {
        voice.classList.add('voice_opacity')
    })
    voice.addEventListener('mouseout', function() {
        voice.classList.remove('voice_opacity')
    })

    let inner_voice = e('.inner_voice')
    let outer_voice = e('.outer_voice')

    let dot_voice = e('.dot_voice')

    let max = outer_voice.offsetWidth
    let moving = false

    let offset = 0
    inner_voice.style.width = '30%'
    dot_voice.addEventListener('mousedown', (event) => {
        offset = event.clientX - dot_voice.offsetLeft
        moving = true
    })

    document.addEventListener('mouseup', (event) => {
        moving = false
    })

    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            audio.volume = x / max
            inner_voice.style.width = String(width) + '%'
            voice_number(audio)
        }
    })
    outer_voice.addEventListener('click', (event) => {
        // 离浏览器左侧窗口当前距离减去父元素距离浏览器左侧窗口距离就是
        // dot 移动的距离
        let x = event.clientX - offset
        // dot 距离有一个范围, 即 0 < x < max
        if (x > max) {
            x = max
        }
        if (x < 0) {
            x = 0
        }
        let width = (x / max) * 100
        audio.volume = x / max
        inner_voice.style.width = String(width) + '%'
        voice_number(audio)
    })

}

const bindEvents = (audio) => {
    let inner = e('.inner')
    let outer = e('.outer')
    let dot = e('.dot')

    let max = outer.offsetWidth
    let moving = false

    let offset = 0
    let interval = 1000
    setInterval(function() {
        let t_all = Math.floor(audio.duration)
        let t_now = Math.floor(audio.currentTime)
        let width = (t_now / t_all) * 100
        inner.style.width = String(width) + '%'

    }, interval)

    dot.addEventListener('mousedown', (event) => {
        offset = event.clientX - dot.offsetLeft
        moving = true
    })

    document.addEventListener('mouseup', (event) => {
        moving = false
    })

    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            audio.currentTime = x
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            inner.style.width = String(width) + '%'
        }
    })
    outer.addEventListener('click', (event) => {
        let x = event.clientX - offset
        audio.currentTime = x
        if (x > max) {
            x = max
        }
        if (x < 0) {
            x = 0
        }
        let width = (x / max) * 100
        inner.style.width = String(width) + '%'
    })

}

const transform = function(time) {
    let re = Math.floor(time / 60)
    let r = Math.floor(time % 60)
    let result = ''
    if (time < 10) {
        result = '0:' + '0' + time
        return result
    } else if (time < 60) {
        result = '0:' + time
        return result
    } else if (time >= 60 && r >= 10) {
        result = String(re) + ':' + String(r)
        return result
    } else if (time >= 60 && r < 10) {
        result = String(re) + ':' + '0' + String(r)
        return result

    }
}

const bindEventCanplay = function(audio) {
    audio.addEventListener('canplay', function() {
        let interval = 1000
        setInterval(function() {
            let t_all = Math.floor(audio.duration)
            let t_now = Math.floor(audio.currentTime)
            let t1 = e('.time2')
            let t2 = e('.time1')
            t1.value = transform(t_all)
            t2.value = transform(t_now)

        }, interval)
    })
}

const changeName = function() {
    let audios_id = e('#id-audios')
    let play_sing = Number(audios_id.dataset.active) + 1
    let sings = es('.sing')
    let new_name = '.sing' + String(play_sing)
    let appear_name = e(new_name)
    for (let i = 0; i < sings.length; i++) {
        sings[i].classList.remove('active')
    }
    appear_name.classList.add('active')
}

const changeImg = function() {
    let audios_id = e('#id-audios')
    let play_sing = Number(audios_id.dataset.active) + 1
    let imgAll = es('.background_img')
    let new_img = '.img' + String(play_sing)
    let appear_name = e(new_img)
    for (let i = 0; i < imgAll.length; i++) {
        imgAll[i].classList.remove('active')
    }
    appear_name.classList.add('active')
}

const bindEventChoose = function(audio) {
    let audios = es('.audio')
    let audios_id = e('#id-audios')
    bindAll(audios, 'click', function(event) {
        let target = event.target
        let src = target.dataset.path
        audio.src = src
        audios_id.dataset.active = String(src[0] - 1)

        for (let i = 0; i < audios.length; i++) {
            audios[i].classList.remove('play_now')
        }

        target.classList.add('play_now')
        changeName()
        changeImg()
    })
}

const bindNext = function(audio) {
    let musics = [
        '1.mp3',
        '2.mp3',
        '3.mp3',
    ]
    let next_song = e('.fa-step-forward')
    let audios = es('.audio')
    let audios_id = e('#id-audios')
    next_song.addEventListener('click', function() {
        let num = Number(audios_id.dataset.audios)
        let index = Number(audios_id.dataset.active)
        let next_index
        if (index === num - 1) {
            next_index = 0
        } else {
            next_index = index + 1
        }
        audios_id.dataset.active = String(next_index)
        audio.src = musics[next_index]
        for (let i = 0; i < audios.length; i++) {
            audios[i].classList.remove('play_now')
        }
        for (let i = 0; i < audios.length; i++) {
            if (audios[i].dataset.path === musics[next_index])
                audios[i].classList.add('play_now')
        }
        let pause = e('.pause')
        let play = e('.fa-play')
        if (pause.classList.contains('pause_play')) {
            audio.play()
        }
        if (play.classList.contains('pause_play')) {
            audio.pause()
        }
        changeName()
        changeImg()
    })
}

const bindBefore = function(audio) {
    let musics = [
        '1.mp3',
        '2.mp3',
        '3.mp3',
    ]
    let next_song = e('.fa-step-backward')
    let audios = es('.audio')
    let audios_id = e('#id-audios')
    next_song.addEventListener('click', function() {
        let num = Number(audios_id.dataset.audios)
        let index = Number(audios_id.dataset.active)
        let next_index
        if (index === 0) {
            next_index = num - 1
        } else {
            next_index = index - 1
        }
        audios_id.dataset.active = String(next_index)
        audio.src = musics[next_index]
        for (let i = 0; i < audios.length; i++) {
            audios[i].classList.remove('play_now')
        }
        for (let i = 0; i < audios.length; i++) {
            if (audios[i].dataset.path === musics[next_index])
                audios[i].classList.add('play_now')
        }
        let pause = e('.pause')
        let play = e('.fa-play')
        if (pause.classList.contains('pause_play')) {
            audio.play()
        }
        if (play.classList.contains('pause_play')) {
            audio.pause()
        }
        changeName()
        changeImg()
    })
}

const bindEventPause = function(audio) {
    let stop_play = e('.pause')
    let continue_play = e('.fa-play')
    stop_play.addEventListener('click', function() {
        audio.pause()
        stop_play.classList.remove('pause_play')
        continue_play.classList.add('pause_play')
    })
}

const bindEventPlay = function(audio) {
    let continue_play = e('.fa-play')
    let stop_play = e('.pause')
    continue_play.addEventListener('click', function() {
        audio.play()
        continue_play.classList.remove('pause_play')
        stop_play.classList.add('pause_play')

    })
}

const choice = function(array) {
    let a = Math.random()
    let num = Math.floor(a * 10) % array.length
    return array[num]
}

const bindEventNext = function(audio) {
    let musics = [
        '1.mp3',
        '2.mp3',
        '3.mp3',
    ]
    let audios = e('#id-audios')

    let random = e('.fa-random')
    random.addEventListener('click', function() {
        audios.dataset.mode = '2'
    })

    let button_again = e('.fa-undo')
    button_again.addEventListener('click', function() {
        audios.dataset.mode = '3'
    })

    audio.addEventListener('ended', function() {
        if (audios.dataset.mode === '1') {
            let num = Number(audios.dataset.audios)
            let index = Number(audios.dataset.active)
            let next_index
            if (index === num - 1) {
                next_index = 0
            } else {
                next_index = index + 1
            }
            audios.dataset.active = String(next_index)
            audio.src = musics[next_index]

            let pause = e('.pause')
            let play = e('.fa-play')
            if (pause.classList.contains('pause_play')) {
                audio.play()
            }
            if (play.classList.contains('pause_play')) {
                audio.pause()
            }
            changeName()
            changeImg()
        }
        if (audios.dataset.mode === '2') {
            let c = choice(musics)
            let temp = c[0]
            audio.src = c
            audios.dataset.active = String(temp - 1)
            let pause = e('.pause')
            let play = e('.fa-play')
            if (pause.classList.contains('pause_play')) {
                audio.play()
            }
            if (play.classList.contains('pause_play')) {
                audio.pause()
            }
            changeName()
            changeImg()

        }
        if (audios.dataset.mode === '3') {
            let pause = e('.pause')
            let play = e('.fa-play')
            if (pause.classList.contains('pause_play')) {
                audio.play()
            }
            if (play.classList.contains('pause_play')) {
                audio.pause()
            }
            changeName()
            changeImg()
        }
    })

}


const __mainMusic = function() {
    let music = e('.wrapper')
    music.classList.add('active')
    let audio = e('#id-audio-player')
    play_list()
    bindList()
    bindEventCanplay(audio)
    bindEventChoose(audio)
    bindEventPause(audio)
    bindEventPlay(audio)
    bindEventNext(audio)
    bindNext(audio)
    bindBefore(audio)
    bindEvents(audio)
    bindVoice(audio)
    music.classList.remove('active')

}

__mainMusic()

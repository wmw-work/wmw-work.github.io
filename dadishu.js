$(function() {
    // 时间每秒减少函数
    const time = () => {
        let time_now = e('.time_span-dadishu')
        let value = time_now.innerText
        let start_less = setInterval(function() {
            value -= 1
            time_now.innerText = value
            show_picture()

            // 时间为 0, 游戏结束
            if (value === 0) {
                clearInterval(start_less)
                $('.mask-dadishu').stop().fadeIn(100)
                $('.picture-dadishu').remove()

            }
        }, 1000)
    }
    // 出现动画函数
    const show_picture = () => {
        let arrPos = [
            {left: '25px', top: '15px'},
            {left: '188px', top: '0px'},
            {left: '337px', top: '33px'},
            {left: '478px', top: '43px'},
            {left: '465px', top: '145px'},
            {left: '302px', top: '170px'},
            {left: '28px', top: '165px'},
        ]
        let index = Math.floor(Math.random() * 14) % 7

        let dishuImage = '<img src="地鼠.png" class="dishu-dadishu">'
        $('.picture-dadishu').css({
            left: arrPos[index].left,
            top: arrPos[index].top,
        })
        $('.picture-dadishu').empty()
        $('.picture-dadishu').append(dishuImage)
        $('.dishu-dadishu').slideDown(200).delay(500).slideUp(100)

        let number = e('.number-dadishu')
        let score = Number(number.innerText)
        $('.dishu-dadishu').one('click', function() {
            $('.dishu-dadishu').stop()
            score += 10
            number.innerText = score
        })
    }

    // 监听开始按钮
    $('.start-dadishu').click(function() {
        $(this).stop().fadeOut(100)
        time()
    })

    // 监听重新开始按钮
    $('.again-dadishu').click(function() {
        window.location.reload()
    })
})
(function (document, $) {
    function copyToClipboard(str, elementWrap) {
        var TempText = document.createElement("input");
        TempText.value = str;
        document.getElementById(elementWrap).appendChild(TempText);
        TempText.select();
        document.execCommand("copy");
        document.getElementById(elementWrap).removeChild(TempText);
        toastr.options.progressBar = true;
        toastr.options.closeButton = true;
        toastr.success('Copied to Clipboad!')
    }
    function formatNumber(num) {
        if (!num)
            return '';

        let arrNum = num.toString().split('.');
        num = arrNum.shift().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        arrNum.unshift(num);
        return arrNum.join('.');
    }

    function exchangeCoin(type, num = null)
    {
        const BNB = {
            'default': 0.01,
            'exchange': 3e9
        };
        const WBTC = {
            'default': 1e7,
            'exchange': 25
        };
        const val = parseInt(type);
        let exchange = {
            a: '',
            b: ''
        };
        if (num !== null)
            num = num.replaceAll(/,/ig, '');
        switch (val) {
            case 1:
                exchange.b = formatNumber(WBTC.default * WBTC.exchange);
                exchange.a = formatNumber(WBTC.default);
                
                if (num !== null) {
                    exchange.b = formatNumber(num * WBTC.exchange);
                    exchange.a = formatNumber(num);
                }
                break;
            case 2:
                exchange.b = formatNumber(BNB.default * BNB.exchange);
                exchange.a = formatNumber(BNB.default);
                if (num !== null) {
                    exchange.b = formatNumber(num * BNB.exchange);
                    exchange.a = formatNumber(num);
                }
                break;
        }
        return exchange;
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        var timeEnd = new Date("2021-08-30").setHours(0, 0, 0, 0);
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        var initDate = new Date(timeEnd);
        var countDownDate = initDate.getTime();
        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (hours < 10)
                hours = "0" + hours;
            if (minutes < 10)
                minutes = "0" + minutes;
            if (seconds < 10)
                seconds = "0" + seconds;
            document.getElementById('days').innerText = days;
            document.getElementById('hours').innerText = hours;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('seconds').innerText = seconds;
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "EXPIRED";
            }
        }, 1000);
    
    });


        var animation = bodymovin.loadAnimation({
            container: document.getElementById('getStartAnimation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: "/assets/animation/data.json",
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            },
            loop: true,
            autoplay: true
        });
        var animation2 = bodymovin.loadAnimation({
            container: document.getElementById('howToBuyAnimation'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: "/assets/animation/data2.json",
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            },
            loop: true,
            autoplay: true
        });

        $('.select-box__current').click(function () {
            $(this).closest('.airdrop__exchange--form--group').find('.select-box__icon:first').toggleClass('select-box__icon--rotate');
            $(this).closest('.airdrop__exchange--form--group').find('.select-box__list:first').toggleClass('show-select-box-list')
        });

        $(document).mouseup(function(e) 
        {
            var container = $(".select-box__list");

            if (!container.is(e.target) && container.has(e.target).length === 0) 
            {
                container.removeClass('show-select-box-list');
                $('.select-box__icon').removeClass('select-box__icon--rotate');
            }
        });
        $(function () {
            const type = $('input[name=coin_a]:checked').val();
            let coinA = $('#coinA').val();

            $('input[name=coin_a]').change(function () {
                const type = $(this).val();
                const exchange = exchangeCoin(type);
                $('#coinA').val(exchange.a);
                $('#coinB').val(exchange.b);

                if (type == 1) {
                    $('#btnBNB').addClass('d-none');
                    $('#btnwBTC').removeClass('d-none');
                }
                else {
                    $('#btnBNB').removeClass('d-none');
                    $('#btnwBTC').addClass('d-none');
                }
            });
            $('#coinA').keyup(function () {
                const num = $(this).val();
                let caret_pos = $(this).prop("selectionStart");
            
                const type = $('input[name=coin_a]:checked').val();
                const exchange = exchangeCoin(type, num);
                $('#coinA').val(exchange.a);
                $('#coinB').val(exchange.b);

                caret_pos = exchange.a.length - num.length + caret_pos;
                $(this)[0].setSelectionRange(caret_pos, caret_pos);
                
            });
            
            if (coinA !== '') {
                const exchange = exchangeCoin(type, coinA);
                $('#coinA').val(exchange.a);
                $('#coinB').val(exchange.b);
            }

            $('#btnInfo').click(function () {
                $('#airdropExchangeModalCountdown').modal('show');
            })
        });

})(document, $);

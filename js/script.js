$(document).ready(function () {
    const TOKEN = '7058894489:AAFKXggIfBq6DgpRXlvJFN267PB09Ub4ImU';
    const CHAT_ID = '-1002220557768';
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    $('#submit').click(function (event) {
        event.preventDefault(); // Отмена стандартного поведения кнопки

        let loader = $('.loader');
        let product = $('#product');
        let name = $('#name');
        let phone = $('#phone');
        let hasError = false;

        $('.error-input').hide();

        if (!product.val()) {
            product.next().show()
            product.css('border-color', 'red');
            hasError = true;
        } else product.css('border-color', 'rgb(130, 19, 40)');

        if (!name.val()) {
            name.next().show()
            name.css('border-color', 'red');
            hasError = true;
        } else name.css('border-color', 'rgb(130, 19, 40)');

        if (!phone.val()) {
            phone.next().show()
            phone.css('border-color', 'red');
            hasError = true;
        } else phone.css('border-color', 'rgb(130, 19, 40)');

        if (!hasError) {
            loader.css('display', 'flex');
            let message = `<b>Заявка с сайта</b>\n`;
            message += `<b>Продукт:</b> ${product.val()}\n`;
            message += `<b>Имя отправителя:</b> ${name.val()}\n`;
            message += `<b>Телефон:</b> ${phone.val()}`;

            axios.post(URI_API, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'html'
            }).then(response => {
                loader.hide();
                if (response.data.ok) {
                    $('#orderTitle').fadeOut();
                    $('#orderDescription').fadeOut();
                    $('#orderTitleSuccess').fadeIn();
                    $('#form')[0].reset();
                    $('#form').fadeOut();
                    setTimeout(() => {
                        $('#orderTitle').fadeIn();
                        $('#orderDescription').fadeIn();
                        $('#orderTitleSuccess').fadeOut();
                        $('#form').fadeIn();
                    }, 3000);
                } else {
                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!");
                    $('#form')[0].reset();
                }
            }).catch(error => {
                console.error(error);
                alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!");
                $('#form')[0].reset();
            });
        }
    });

    // Скроллы из блока меню к нужным блокам
    $('#macaroons').click(function () {
        $('html, body').animate({
            scrollTop: $('.products').offset().top
        }, 1000);
    });

    $('#choice-macaroons').click(function () {
        $('html, body').animate({
            scrollTop: $('.products').offset().top
        }, 1000);
    });

    $('#about').click(function () {
        $('html, body').animate({
            scrollTop: $('.advantages').offset().top
        }, 1000);
    });

    $('#order').click(function () {
        $('html, body').animate({
            scrollTop: $('.order').offset().top
        }, 1000);
    });

    // При нажатии на кнопку "Заказать", название заказанного товара будет подставляться в форму заказа и плавно скролить вниз к форме заказа
    $('.button.button-product').click((e) => {
        $('#product').val($(e.target).parents('.products-items-info').find('.products-item-title').text().toUpperCase());
        $('html, body').animate({
            scrollTop: $('.order').offset().top
        }, 1000);
    });

    // Инпут с телефоном с маской
    $('#phone').inputmask({"mask": "+7 (999) 999-9999"});

    // Меню Бюргер на адаптиве
    if ($(document).width() <= 375) {
        $('#burger').click(function () {
            $('#menu').fadeIn();
        });

        $('.close').click(function () {
            $('#menu').fadeOut();
        });

        $('#menu *').click(() => {
            $('#menu').fadeOut();
        });
    }
});

// hide form by click the button
document
    .querySelector('header button')
    .addEventListener("click", function () {
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })

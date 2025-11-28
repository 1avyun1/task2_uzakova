$(document).ready(function() {
    let currentSlide = 1;
    const slides = $('.slide');
    const createText = $('.create');
    const totalSlides = slides.length;
    
    const slideTitles = [
        "Мебель для гостиной",
        "Создание мебели для кухни", 
        "Спальня из натурального дерева",
        "Офисная мебель"
    ];
    
    function updateSlider() {
        if (window.innerWidth <= 375) {
            slides.hide().removeClass('active main small-left small-right right-1 right-2');
            slides.eq(currentSlide).show().addClass('main active');
        } else {
            slides.show().removeClass('active main small-left small-right right-1 right-2');
            
            const order = [
                (currentSlide - 1 + totalSlides) % totalSlides,
                currentSlide,
                (currentSlide + 1) % totalSlides,
                (currentSlide + 2) % totalSlides
            ];
            
            
            slides.each(function() {
                const slide = $(this);
                const slideIndex = parseInt(slide.data('index'));
                const positionIndex = order.indexOf(slideIndex);
                
                if (positionIndex === 0) slide.addClass('small-left');
                else if (positionIndex === 1) slide.addClass('main active');
                else if (positionIndex === 2) slide.addClass('small-right right-1');
                else if (positionIndex === 3) slide.addClass('small-right right-2');
            });
        }
        
        createText.text(slideTitles[currentSlide]);
    }
    
    $('.next-btn').click(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    $('.prev-btn').click(function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    const modalOverlay = $('#modalOverlay');
    const modalClose = $('#modalClose');
    
    $('#mobileSubmit, #desktopSubmit, #contactsSubmit').click(function() {
        modalOverlay.css('display', 'flex');
    });
    
    modalClose.click(function() {
        modalOverlay.hide();
    });
    
    $(window).click(function(event) {
        if ($(event.target).is(modalOverlay)) {
            modalOverlay.hide();
        }
    });
    
    $('.modal-form').submit(function(e) {
        e.preventDefault();
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
        modalOverlay.hide();
    });
    
    $(window).resize(updateSlider);
    updateSlider();
});
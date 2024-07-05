class HomePage {
  constructor() {}

  ngAfterViewInit() {
    this.initSlider();
    this.addLinks();
  }

  addLinks() {
    const navLinks = document.querySelector('.nav-links');

    if (!navLinks) return;

    navLinks.addEventListener('click', (e) => {
      e.preventDefault();

      const target = e.target;
      const anchor = target.closest('a');

      if (anchor && anchor.classList.contains('nav-link')) {
        const href = anchor.getAttribute('href');

        if (href) {
          const section = document.querySelector(href); // final target element

          if (section) {
            this.scrollTo(section);
          }
        }
      }
    });
  }

  scrollTo(target) {
    console.log(target)
    if(target.id != 'section--2') {
        target.scrollIntoView({ behavior: 'smooth', block: "center", inline: "nearest" });
    } else {
        target.scrollIntoView({ behavior: 'smooth'});

    }
  }

  initSlider() {
    const slider = () => {
      const slides = document.querySelectorAll('.slide');
      const slider = document.querySelector('.slider');
      const btnLeft = document.querySelector('.slider__btn--left');
      const btnRight = document.querySelector('.slider__btn--right');
      const dotContainer = document.querySelector('.dots');

      // Ensure necessary elements are present
      if (!slides.length || !slider || !btnLeft || !btnRight || !dotContainer) {
        console.error('Slider initialization failed: Missing elements.');
        return;
      }

      let curSlide = 0;
      const maxSlide = slides.length - 1;
      const minSlide = 0;

      const createDots = () => {
        slides.forEach((_, i) => {
          dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button id="btn${i}" data-slide="${i}" class="dots__dot"></button>`
          );

          const el = document.getElementById(`btn${i}`);
          if (el) {
            el.style.background = "#b9b9b9";
            el.style.opacity = '0.5';
            el.style.borderRadius = '50%';
            el.style.width = '1rem';
            el.style.height = '1rem';
          }
        });
      };

      const activeDot = (slide) => {
        // Ensure dotContainer exists
        if (!dotContainer) return;

        // Find the active dot based on the current slide
        const activeDot = dotContainer.querySelector(
          `.dots__dot[data-slide="${slide}"]`
        );

        // Remove the active class and set opacity for all dots
        dotContainer.querySelectorAll('.dots__dot').forEach((dot) => {
          dot.style.opacity = '0.5';
          dot.style.width = '1.25rem';
          dot.style.height = '1.25rem';
          dot.classList.remove('dots__dot--active');
        });

        // Ensure activeDot is not null before modifying it
        if (activeDot) {
          activeDot.style.transition = '0.3s';
          activeDot.style.opacity = '1';
          activeDot.style.width = '1.5rem';
          activeDot.style.height = '1.5rem';
          activeDot.classList.add('dots__dot--active');
        }
      };

      const goToSlide = (slide) => {
        slides.forEach((s, i) => {
          s.style.transform = `translateX(${(i - slide) * 100}%)`;
        });
      };

      const init = () => {
        createDots();
        goToSlide(0);
        activeDot(0);
      };
      init();

      const nextSlide = () => {
        curSlide = curSlide === maxSlide ? 0 : curSlide + 1;
        goToSlide(curSlide);
        activeDot(curSlide);
      };

      const previousSlide = () => {
        curSlide = curSlide === minSlide ? maxSlide : curSlide - 1;
        goToSlide(curSlide);
        activeDot(curSlide);
      };

      btnRight.addEventListener('click', nextSlide);
      btnLeft.addEventListener('click', previousSlide);

      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') previousSlide();
        else if (e.key === 'ArrowRight') nextSlide();
      });

      dotContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('dots__dot')) {
          const slide = target.dataset['slide'];
          if (slide) {
            const slideIndex = parseInt(slide);
            goToSlide(slideIndex);
            activeDot(slideIndex);
            curSlide = slideIndex;
          }
        }
      });
    };

    slider();

    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');
    if (btnScrollTo && section1) {
      btnScrollTo.addEventListener('click', () => {
        section1.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }
}

// Initializing the HomePage class and calling ngAfterViewInit
const homePage = new HomePage();
homePage.ngAfterViewInit();

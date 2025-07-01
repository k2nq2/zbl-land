document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", () => {
        const accordionItem = button.parentElement;
        
        // Закрываем все остальные
        document.querySelectorAll(".accordion-item").forEach(item => {
            if (item !== accordionItem) {
                item.classList.remove("active");
            }
        });

        // Переключаем текущий
        accordionItem.classList.toggle("active");
    });
});

function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
    const slides = wrapper.querySelector('.slides');
    const slide = wrapper.querySelectorAll('.slide');
    const indicatorsContainer = wrapper.querySelector('.indicators');
    const nextBtn = wrapper.querySelector('.next');
    const prevBtn = wrapper.querySelector('.prev');
    let index = 0;

  
    const slideCount = slide.length;
    slides.style.width = `${slideCount * 100}%`;
    slide.forEach(sl => {
        sl.style.width = `${100 / slideCount}%`;
    });

 
    slide.forEach((_, i) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            index = i;
            updateSlide();
        });
        indicatorsContainer.appendChild(indicator);
    });

   
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slide.length;
        updateSlide();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slide.length) % slide.length;
        updateSlide();
    });

   
    function updateSlide() {
        slides.style.transform = `translateX(${-index * (100 / slideCount)}%)`;
        wrapper.querySelectorAll('.indicator').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

  
    let startX = 0;
    let endX = 0;

    slides.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slides.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slides.addEventListener('touchend', () => {
        const diffX = endX - startX;

        if (Math.abs(diffX) > 50) {
            if (diffX < 0) {
                index = (index + 1) % slide.length;
            } else {
                index = (index - 1 + slide.length) % slide.length;
            }
            updateSlide();
        }

        startX = 0;
        endX = 0;
    });
});

const items = document.querySelectorAll('.c2-num-item');
const section = document.querySelector('.c2-num-wrapper');

const remToPx = rem => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
const mobileOffset = remToPx(40);  // 10rem

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  let animationStarted = false;

  const tryAnimate = () => {
    if (animationStarted) return;

    const rect = section.getBoundingClientRect();
    if (rect.top <= mobileOffset) {
      animationStarted = true;
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 300);
      });
      window.removeEventListener('scroll', tryAnimate);
      observerMobile.unobserve(section);
    }
  };

  const observerMobile = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tryAnimate();
      }
    });
  }, { threshold: 0 });

  observerMobile.observe(section);

  window.addEventListener('scroll', tryAnimate);
} else {
  const observerDesktop = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 300);
        });
        observerDesktop.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
  });

  observerDesktop.observe(section);
}



const observerUp = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerUp.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const aboutBlock = document.querySelector('.c3-section');
observerUp.observe(aboutBlock);


const anotherItems = document.querySelectorAll('.anim');

const anotherObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anotherItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 300); // Задержка между айтемами 300мс
      });
      anotherObserver.unobserve(entry.target); // Останавливаем наблюдение после показа
    }
  });
}, {
  threshold: 0.3
});

const anotherSection = document.querySelector('.c5-wrapper');
anotherObserver.observe(anotherSection);


const counters = document.querySelectorAll('.counter');
const countersSection = document.querySelector('.circle');

const targets = Array.from(counters).map(counter => +counter.textContent.trim());

function animateCounter(counter, target) {
  return new Promise((resolve) => {
    let current = 0;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / target));

    counter.textContent = '0';

    const timer = setInterval(() => {
      current++;
      counter.textContent = current;
      if (current >= target) {
        clearInterval(timer);
        counter.textContent = target;
        resolve();
      }
    }, stepTime);
  });
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      for (let i = 0; i < counters.length; i++) {
        // Сбрасываем в 0 только те, которые идут после текущего
        for (let j = i + 1; j < counters.length; j++) {
          counters[j].textContent = '0';
        }

        await animateCounter(counters[i], targets[i]);
      }
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterObserver.observe(countersSection);


const svgElement = document.querySelector('svg.arrow');
let animationStarted = false;

const svgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationStarted) {
      animationStarted = true;
      for (let i = 1; i <= 4; i++) {
        const anim = document.getElementById(`anim${i}`);
        if (anim) {
          anim.beginElement();
        }
      }
      svgObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

svgObserver.observe(svgElement);



document.querySelectorAll('.c4-item').forEach(wrapper => {
  const video = wrapper.querySelector('.hover-video');
  wrapper.addEventListener('mouseenter', () => video.play());
  wrapper.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});
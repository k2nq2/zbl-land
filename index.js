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
const mobileOffset = remToPx(150);

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const animateItems = () => {
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 300);
  });
};

const resetItems = () => {
  items.forEach(item => {
    item.classList.remove('visible');
  });
};

if (isMobile) {
  const observerMobile = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const rect = section.getBoundingClientRect();
      const isAboveOffset = rect.top <= mobileOffset;

      if (entry.isIntersecting && isAboveOffset) {
        animateItems();
      } else {
        resetItems();
      }
    });
  }, { threshold: 0 });

  observerMobile.observe(section);

} else {
  const observerDesktop = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateItems();
      } else {
        resetItems();
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
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { 
  threshold: 0.3,
  rootMargin: '0px 0px -10% 0px'
});

const aboutBlock = document.querySelector('.c3-section');
observerUp.observe(aboutBlock);


const anotherItems = document.querySelectorAll('.anim');

const anotherObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anotherItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 300); // Задержка между элементами
      });
    } else {
      anotherItems.forEach(item => {
        item.classList.remove('visible');
      });
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
    const duration = 500;
    const stepTime = Math.max(Math.floor(duration / target), 20); // Защита от слишком маленьких интервалов

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
        await animateCounter(counters[i], targets[i]);
      }
    } else {
      // Сброс значений при выходе
      counters.forEach(counter => {
        counter.textContent = '0';
      });
    }
  });
}, { threshold: 0.5 });

counterObserver.observe(countersSection);


const svgElement = document.querySelector('svg.arrow');

const svgObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      for (let i = 1; i <= 4; i++) {
        const anim = document.getElementById(`anim${i}`);
        if (anim) {
          anim.beginElement();
        }
      }
    }
  });
}, { threshold: 0.3 });

svgObserver.observe(svgElement);


document.querySelectorAll('.c4-item').forEach(wrapper => {
  const video = wrapper.querySelector('.hover-video');

  // Запретить клик по самому видео
  video.style.pointerEvents = 'none';

  const isMobile = window.matchMedia("(hover: none)").matches;

  if (isMobile) {
    // На мобилках: всегда запускать заново по тапу
    wrapper.addEventListener('click', () => {
      video.currentTime = 0;
      video.play();
    });
  } else {
    // На десктопе: запуск по ховеру
    wrapper.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      video.play();
    });

    wrapper.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

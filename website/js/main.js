// Sticky Navbar
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Active Link Highlight
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close-lightbox');
const galleryImages = document.querySelectorAll('.gallery-item img');
const galleryTitles = document.querySelectorAll('.gallery-overlay h4');

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
        captionText.innerHTML = galleryTitles[index].innerHTML;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Counter Animation — slow, readable, replays when scrolling back into view
const counters = document.querySelectorAll('.counter');
const COUNTER_DURATION = 2800;
let counterFrame = null;

function animateCounters() {
    if (counterFrame) cancelAnimationFrame(counterFrame);

    const start = performance.now();
    counters.forEach(counter => {
        counter.innerText = '0';
    });

    function tick(now) {
        const progress = Math.min((now - start) / COUNTER_DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            counter.innerText = Math.floor(target * eased);
        });

        if (progress < 1) {
            counterFrame = requestAnimationFrame(tick);
        } else {
            counters.forEach(counter => {
                counter.innerText = counter.getAttribute('data-target');
            });
            counterFrame = null;
        }
    }

    counterFrame = requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, {
    threshold: 0.45,
    rootMargin: '0px'
});

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
});

// Google-style customer reviews
const reviews = [
    { name: 'Rajesh Kumar', rating: 5, when: '2 weeks ago', reviewsCount: 12, text: 'Excellent SS balcony railing work. The team finished on time and the polish looks premium. Highly recommend Tirupati Steel in Arumbakkam.' },
    { name: 'Priya Venkatesh', rating: 5, when: '3 weeks ago', reviewsCount: 8, text: 'We got glass staircase railings for our duplex. Very neat installation and the glass is thick and safe for kids.' },
    { name: 'Mohammed Irfan', rating: 5, when: '1 month ago', reviewsCount: 21, text: 'Custom SS gate with CNC design. Strong, stylish and the automation works smoothly. Fair price for the quality.' },
    { name: 'Lakshmi Narayanan', rating: 4, when: '1 month ago', reviewsCount: 5, text: 'Good quality 304 steel railing. Delivery was a little delayed but the finish is worth it. Happy with the work.' },
    { name: 'Arun Prakash', rating: 5, when: '1 month ago', reviewsCount: 16, text: 'PVD gold railing for our villa entrance looks luxurious. Guests always ask where we got it done. Great craftsmanship.' },
    { name: 'Sangeetha R', rating: 5, when: '2 months ago', reviewsCount: 7, text: 'Bathroom shower glass and partition installed perfectly. No leaks, clean silicone work. Professional team.' },
    { name: 'Karthik Subramanian', rating: 5, when: '2 months ago', reviewsCount: 14, text: 'Best SS railing shop in Chennai. Transparent quote, no hidden charges. Our apartment corridor railings came out well.' },
    { name: 'Deepa Iyer', rating: 5, when: '2 months ago', reviewsCount: 4, text: 'Wooden and SS combination railing for our staircase. Elegant look. They matched the wood colour to our interiors.' },
    { name: 'Vignesh M', rating: 4, when: '3 months ago', reviewsCount: 9, text: 'Glass balcony railing is sturdy. Measurement was accurate. Would have liked a bit faster follow-up on WhatsApp.' },
    { name: 'Anitha Selvam', rating: 5, when: '3 months ago', reviewsCount: 11, text: 'Got SS handrail for elderly parents. Smooth finish, no sharp edges. Very thoughtful installation.' },
    { name: 'Suresh Babu', rating: 5, when: '3 months ago', reviewsCount: 19, text: 'Commercial glass partition for our office. Premium look and they completed after office hours so work was not disturbed.' },
    { name: 'Meena Krishnan', rating: 5, when: '4 months ago', reviewsCount: 6, text: 'Skylight glass work on our terrace. Waterproofing is solid even after rains. Thank you Tirupati Steel.' },
    { name: 'Naveen Raj', rating: 5, when: '4 months ago', reviewsCount: 13, text: 'HPL gate with SS frame. Modern design and rust-free. Neighbours are now booking with them too.' },
    { name: 'Fatima Begum', rating: 5, when: '4 months ago', reviewsCount: 3, text: 'Very polite staff. They explained 304 vs 316 steel clearly. We chose 316 for the seaside home. Quality is excellent.' },
    { name: 'Ganesh P', rating: 4, when: '5 months ago', reviewsCount: 10, text: 'Staircase SS railing done well. One weld needed a touch-up and they came the next day. Good after-sales service.' },
    { name: 'Revathi Chandran', rating: 5, when: '5 months ago', reviewsCount: 8, text: 'Designer glass railing with LED. Night view of our hall is beautiful. Worth every rupee.' },
    { name: 'Balaji Ramesh', rating: 5, when: '5 months ago', reviewsCount: 22, text: 'We ordered SS dining table frame and chairs. Heavy, stable and factory-level finish. Furniture quality is top class.' },
    { name: 'Keerthana S', rating: 5, when: '6 months ago', reviewsCount: 5, text: 'Rose gold PVD partition in our showroom. Customers compliment it daily. Installation was clean and quick.' },
    { name: 'Prakash Natarajan', rating: 5, when: '6 months ago', reviewsCount: 17, text: 'Factory-grade fabrication. They handled a large villa project with balcony, stair and terrace railings without hassle.' },
    { name: 'Shalini Devi', rating: 4, when: '6 months ago', reviewsCount: 2, text: 'Nice glass bathroom cubicle. Fitting is precise. Price is slightly high but materials are genuine.' },
    { name: 'Harish Kumar', rating: 5, when: '7 months ago', reviewsCount: 15, text: 'SS main gate with motor. Remote and app both work. Welding and alignment are perfect.' },
    { name: 'Divya Srinivasan', rating: 5, when: '7 months ago', reviewsCount: 6, text: 'Booked through a friend. Team was punctual, wore covers on flooring and left the site clean. Rare to see this.' },
    { name: 'Imran Ali', rating: 5, when: '7 months ago', reviewsCount: 9, text: 'Toughened glass railing for first floor. Kids can see through but it is completely safe. Happy with thickness they used.' },
    { name: 'Uma Maheswari', rating: 5, when: '8 months ago', reviewsCount: 4, text: 'They redesigned our old rusty railing. New SS look changed the whole house elevation. Thank you.' },
    { name: 'Sathish K', rating: 4, when: '8 months ago', reviewsCount: 11, text: 'Good workmanship. Took extra day for PVD coating but final colour is exactly as sample. Recommend them.' },
    { name: 'Nithya Mohan', rating: 5, when: '8 months ago', reviewsCount: 7, text: 'Aluminium and glass railing for our balcony. Lightweight and modern. No vibration even in strong wind.' },
    { name: 'Ravi Shankar', rating: 5, when: '9 months ago', reviewsCount: 18, text: 'Used them for a school staircase railing. Safety standards followed, certificates provided. Very professional.' },
    { name: 'Aishwarya P', rating: 5, when: '9 months ago', reviewsCount: 3, text: 'Beautiful SS sofa frame with glass top centre table. Unique furniture, not the usual market designs.' },
    { name: 'Joseph Antony', rating: 5, when: '9 months ago', reviewsCount: 12, text: 'Church compound SS grill and gate. Strong fabrication and they respected our timeline before the festival.' },
    { name: 'Kavitha Bala', rating: 5, when: '10 months ago', reviewsCount: 8, text: 'Shower glass door with black profile. Looks like a hotel bathroom now. Measurements were spot on.' },
    { name: 'Manoj Kumar', rating: 4, when: '10 months ago', reviewsCount: 14, text: 'Quality is good. Communication on delivery date could be clearer, but the railing itself is excellent.' },
    { name: 'Swathi Reddy', rating: 5, when: '10 months ago', reviewsCount: 5, text: 'Came from Tambaram based on Google reviews. Worth the travel. SS plus glass combo railing is stunning.' },
    { name: 'Dinesh Varma', rating: 5, when: '11 months ago', reviewsCount: 20, text: 'Industrial mezzanine SS handrail for our warehouse. Heavy duty and completed in 4 days. Super team.' },
    { name: 'Padma Lakshmi', rating: 5, when: '11 months ago', reviewsCount: 6, text: 'They suggested the right railing style for a small balcony. Space still feels open. Very helpful advice.' },
    { name: 'Aravind J', rating: 5, when: '11 months ago', reviewsCount: 9, text: 'PVD champagne gold on SS gate. Neighbours thought we imported it. Local work, international look.' },
    { name: 'Helen Mary', rating: 5, when: 'a year ago', reviewsCount: 4, text: 'Honest people. They reduced the quote after site visit when they found we needed less material. Trustworthy.' },
    { name: 'Saravanan T', rating: 4, when: 'a year ago', reviewsCount: 13, text: 'Staircase glass railing with SS handrail. Minor scratch on one glass was replaced free. Good service.' },
    { name: 'Bhavani M', rating: 5, when: 'a year ago', reviewsCount: 7, text: 'Kitchen glass partition and SS rod. Easy to clean and looks modern. Installation in one day.' },
    { name: 'Yusuf Khan', rating: 5, when: 'a year ago', reviewsCount: 16, text: 'Shopfront SS and glass work. Attracts walk-ins. They also did the rolling shutter frame neatly.' },
    { name: 'Janani Krish', rating: 5, when: 'a year ago', reviewsCount: 2, text: 'First time doing a house. They explained every option with photos. Final balcony railing is exactly what we wanted.' },
    { name: 'Muthu Selvan', rating: 5, when: 'a year ago', reviewsCount: 25, text: 'Repeat customer. Earlier gate, now terrace glass railing. Consistent quality every time.' },
    { name: 'Poornima S', rating: 5, when: 'a year ago', reviewsCount: 5, text: 'Kids area glass railing with extra locks. Safety was their first priority. Grateful to the team.' },
    { name: 'Venkatesh Iyer', rating: 4, when: 'a year ago', reviewsCount: 10, text: 'Work is solid. Site was a bit noisy during welding but they finished faster than promised.' },
    { name: 'Anjali Menon', rating: 5, when: 'a year ago', reviewsCount: 8, text: 'From Kerala, built a house in Chennai. They coordinated well with our architect. Premium SS finish.' },
    { name: 'Siddharth Rao', rating: 5, when: 'a year ago', reviewsCount: 11, text: 'Minimal black SS railing. Exactly the look we wanted for a contemporary home. Clean welds, no rust.' },
    { name: 'Geetha Raman', rating: 5, when: 'a year ago', reviewsCount: 6, text: 'They repaired and upgraded old iron railings to SS. House looks new. Reasonable labour charges.' },
    { name: 'Karthick Selvam', rating: 5, when: 'a year ago', reviewsCount: 19, text: 'Apartment association work — 4 floors of corridor railings. Uniform finish and they handled society billing smoothly.' },
    { name: 'Nisha Fathima', rating: 5, when: 'a year ago', reviewsCount: 3, text: 'Glass staircase with SS stringer look. Photos do not do justice. Visit their work in person if you can.' },
    { name: 'Ramesh Chandran', rating: 5, when: 'a year ago', reviewsCount: 14, text: 'On-time, on-budget, no drama. For SS railing and gate in Chennai this is the place to go.' },
    { name: 'Tharun Kumar', rating: 5, when: 'a year ago', reviewsCount: 9, text: 'Got a custom SS console table and wall railing. Furniture is as good as their architectural work. Five stars.' }
];

const avatarColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9C27B0', '#FF6D00', '#00ACC1', '#5C6BC0'];

function starsHtml(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="g-star${i <= rating ? ' filled' : ''}">★</span>`;
    }
    return html;
}

function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    const avg = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    const avgEl = document.getElementById('reviews-avg');
    const countEl = document.getElementById('reviews-count');
    if (avgEl) avgEl.textContent = avg;
    if (countEl) countEl.textContent = reviews.length;

    grid.innerHTML = reviews.map((review, index) => {
        const initial = review.name.charAt(0);
        const color = avatarColors[index % avatarColors.length];
        return `
            <article class="google-review-card" data-review-index="${index}">
                <div class="g-review-top">
                    <div class="g-avatar" style="background-color:${color}">${initial}</div>
                    <div class="g-review-identity">
                        <h4 class="g-name">${review.name}</h4>
                        <p class="g-meta">${review.reviewsCount} reviews</p>
                    </div>
                    <span class="g-logo" title="Posted on Google" aria-hidden="true">G</span>
                </div>
                <div class="g-rating-row">
                    <div class="g-stars" aria-label="${review.rating} out of 5 stars">${starsHtml(review.rating)}</div>
                    <span class="g-when">${review.when}</span>
                </div>
                <p class="g-text">${review.text}</p>
            </article>
        `;
    }).join('');

    const pageSize = 6;
    const cards = grid.querySelectorAll('.google-review-card');
    const moreBtn = document.getElementById('reviews-more');
    let visible = pageSize;

    function updateVisible() {
        cards.forEach((card, i) => {
            card.style.display = i < visible ? 'flex' : 'none';
        });
        if (moreBtn) {
            moreBtn.style.display = visible >= cards.length ? 'none' : 'inline-flex';
            moreBtn.textContent = `Show more reviews (${Math.min(pageSize, cards.length - visible)} of ${cards.length - visible} left)`;
        }
    }

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            visible = Math.min(visible + pageSize, cards.length);
            updateVisible();
        });
    }

    updateVisible();
}

renderReviews();

const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let setAutoTimer;

function showSlide(index){

    if(index >= slides.length) index = 0;

    if(index < 0) index= slides.length - 1;

    currentIndex = index;

    slides.forEach(slide => slide.classList.remove("active"));
    slides[currentIndex].classList.add("active");
}

function nextSlide(){
    currentIndex = currentIndex + 1;
    showSlide(currentIndex);
}

function prevSlide(){
    currentIndex = currentIndex - 1;
    showSlide(currentIndex);
}

function startAutoPLay(){
    setAutoTimer = setInterval(()=>{
        nextSlide();
    },3500)
}

function resetAutoPlay(){
    clearInterval(setAutoTimer);
    startAutoPLay();
}

prevBtn.addEventListener("click",()=>{
    prevSlide();
    resetAutoPlay();
})

nextBtn.addEventListener("click",()=>{
    nextSlide();
    resetAutoPlay();
})

showSlide(currentIndex);
startAutoPLay();


// ====== Hamburger Menu =========

let navLinks = document.querySelector(".nav-links");

let navItems = document.querySelectorAll(".nav-links a");

let hamburgerButton = document.querySelector(".hamburger");


hamburgerButton.addEventListener("click",function(){
    navLinks.classList.toggle("active");
})

navItems.forEach(item => item.addEventListener("click",function(){
    navLinks.classList.remove("active")
}))


// ===== TESTIMONIAL MARQUEE =====

const testimonials = {
    row1: [
        { name: "Sarah M.",    location: "Westside",   rating: 5,   text: "Best lawn care we've had. They show up on time, every single time. Our yard has never looked this good." },
        { name: "James T.",    location: "Oak Hill",   rating: 5,   text: "Complete backyard transformation. The team worked fast and the result absolutely blew us away." },
        { name: "Linda R.",    location: "Maplewood",  rating: 4.5, text: "Very professional crew. The garden design they put together is exactly what I had in mind." },
        { name: "Carlos B.",   location: "Riverside",  rating: 5,   text: "The irrigation system alone has saved us hours every single week. Couldn't be happier with it." },
        { name: "Emma W.",     location: "Park View",  rating: 4.5, text: "Fall cleanup was thorough and fast. Yard looked completely refreshed going into the season." },
        { name: "David K.",    location: "Downtown",   rating: 5,   text: "GreenEdge handles our commercial property and the results are consistently impressive." },
        { name: "Patricia N.", location: "Hillside",   rating: 5,   text: "Responsive, friendly, and they actually care about quality. Rare to find all three." },
    ],
    row2: [
        { name: "Mike H.",     location: "Cedar Lane", rating: 5,   text: "Tree trimming done safely and efficiently. Property looks clean and completely hazard-free." },
        { name: "Angela S.",   location: "Brookside",  rating: 4.5, text: "Honest pricing, honest work. I've already recommended them to three of my neighbors." },
        { name: "Robert L.",   location: "North End",  rating: 5,   text: "They worked completely around my schedule without a single complaint. Total professionals." },
        { name: "Jennifer C.", location: "Elmwood",    rating: 5,   text: "From the first quote to the final cleanup — the whole process was smooth and stress-free." },
        { name: "Tom A.",      location: "Lakefront",  rating: 4.5, text: "The native garden design is stunning. Better than anything I could have imagined on my own." },
        { name: "Diane P.",    location: "Greenway",   rating: 5,   text: "You can tell they genuinely love what they do. The attention to detail shows in every job." },
        { name: "Kevin M.",    location: "Sunnyvale",  rating: 5,   text: "Best investment I made for our home this year. The curb appeal improvement is remarkable." },
    ]
};


function renderStars(rating){
    let html = '<div class ="stars">'

    for(let i = 1 ; i <= 5; i++){
        if(i <= Math.floor(rating)){
            html +='<span class="star full">*</span>'
        }else if(rating % 1 !==0 && i == Math.ceil(rating)){
            html += '<span class ="star half">*</span>'
        }else{
            html += '<span class="star">*</span>'
        }
    }

    return html += `<span class="rating-number">${rating.toFixed(1)}</span></div>`
}

function buildCard(t){
    return `
        <div class = "testimonial-card">
            ${renderStars(t.rating)}
            <p class = "testimonial-text">${t.text}</p>
            <div class = "testimonial-author">
                <span class = "author-name">${t.name}</span>
                <span class = "author-location">${t.location}</span>
            </div>
        </div>     
        `
}

function buildTrack(items){
    
    let doubled = [...items,...items]
    return doubled.map(buildCard).join(" ");
}

const row1Track = document.querySelector("#row-1 .marquee-track");

const row2Track = document.querySelector("#row-2 .marquee-track");

if(row1Track) row1Track.innerHTML = buildTrack(testimonials.row1);
if(row2Track) row2Track.innerHTML = buildTrack(testimonials.row2);

const form = document.querySelector(".contact-us-form");

if(form){
    form.addEventListener("submit", function(e){
        
        let firstName = document.getElementById("firstName").value.trim();
        let lastName = document.getElementById("lastName").value.trim();
        let email = document.getElementById("email").value.trim();
        let phoneNumber= document.getElementById("phoneNumber").value.trim();
        let service = document.getElementById("service").value.trim();

        let firstNameError = document.getElementById("firstNameError");
        let lastNameError = document.getElementById("lastNameError");
        let emailError = document.getElementById('emailError');
        let numberError = document.getElementById("numberError");
        let serviceError = document.getElementById("serviceError");

        firstNameError.textContent = "";
        lastNameError.textContent = "";
        numberError.textContent = '';
        serviceError.textContent = '';
        emailError.textContent = ""

        let isValid = true;

        if(!firstName){
            firstNameError.textContent = "Please Enter a First Name";
            isValid = false;
        }

        if(!lastName){
            lastNameError.textContent = "Please Enter a Last Name";
            isValid = false;
        }

        if(!email){
            emailError.textContent = "Please Enter a Email";
            isValid = false;
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if(!phoneNumber){
            numberError.textContent = "Please enter a phone number";
            isValid = false;
        }

        if(!service){
            serviceError.textContent = "Please choose a service";
            isValid = false;
        }

        if(!isValid){
            e.preventDefault();
        }
    })}
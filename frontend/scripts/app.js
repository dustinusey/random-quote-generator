const quotes = [
    {
        quote: "Java is to JavaScript what car is to Carpet",
        source: "Chris Heilmann",
        tags: ["javascript", "java", "developer"],
        color: '#817fc8'
    },
    {
        quote: "JavaScript can seem scary at first",
        source: "Ole Guily Guily",
        year: "2019",
        color: '#7FAEC8'
    },
    {
        quote: "Don't just be a man, be a mega-man.",
        source: "Dustin Usey",
        citation: "Slack",
        year: "2022",
        tags: ["developer", "treehouse"],
        color: '#7FC8AE'
    },
    {
        quote: "Code is like humor. When you have to explain it, it’s bad",
        source: "Cory House",
        color: '#C87FA2'
    },
    {
        quote: "Before software can be reusable it first has to be usable",
        source: "Ralph Johnson",
        year: "220 B.C.",
        color: '#678cd6'
    },
];

// progress bar initially set to false
let showProgress = false;
let autoPlay;

// playBtn initiates a new printQuote call ever 5 seconds
playBtn.addEventListener('click', () => {
    playBtn.classList.toggle('playing');
    let icon = playBtn.querySelector('i');
    if (playBtn.classList.contains('playing')) {
        progressBarContainer.style.animation = 'fadeInLeft 0.2s forwards';
        icon.classList = 'fa-solid fa-pause';
        showProgress = true;
        printQuote();
        autoPlay = setInterval(printQuote, 5000);
    } else {
        progressBarContainer.style.animation = 'none';
        icon.classList = 'fa-solid fa-play';
        showProgress = false;
        clearInterval(autoPlay);
    }
});

// removes animation on progressBar
progressBar.addEventListener('animationend', () => {
    progressBar.style.animation = 'none';
});


// returns random array of objects
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// function to print random quote to page
function printQuote() {
    // if showProgress is true, add animation to progress bar
    (showProgress) ? setTimeout(() => { progressBar.style.animation = 'progressGo 4.5s forwards' }, 500) : '';

    // get quote data from getRandomQuote and store it in randomQuote
    let randomQuote = getRandomQuote();

    // change quote text in UI with data from getRandomQuote
    quote.textContent = randomQuote.quote;

    // change source text in UI with data from getRandomQuote
    source.textContent = `-${randomQuote.source}`;
    // checks for more data for quote and adds punctuation if needed
    (randomQuote.citation || randomQuote.year) ? source.textContent += ', ' : '';

    // check if random quote has a citation and if it does update citation text in UI
    (!randomQuote.citation) ? citation.textContent = '' : citation.textContent = randomQuote.citation;
    // checks for more data for quote and adds punctuation if needed
    (randomQuote.year && randomQuote.citation) ? citation.textContent += ', ' : '';

    // check if random quote has a year and if it does update year text in UI
    (!randomQuote.year) ? year.textContent = '' : year.textContent = randomQuote.year;
    
    // check if random quote has tags and if it does add tags to UI
    if (!randomQuote.tags) {
        tagList.innerHTML = '';
        tagContainer.style.display = 'none';
    } else {
        tagList.innerHTML = '';
        tagContainer.style.display = 'block';
        randomQuote.tags.forEach(tag => {
            let li = document.createElement('li');
            li.textContent = `#${tag}`;
            tagList.appendChild(li);
        })
    }
    
    // update UI with color associated with random quote
    document.documentElement.style.setProperty('--primary', randomQuote.color);
}

printQuote();
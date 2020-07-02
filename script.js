const quoteContainer = document.querySelector('.quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.querySelector('.loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function generateQuote() {
  showLoadingSpinner();
  const url = 'https://type.fit/api/quotes';
  try {
    const res = await fetch(url);
    const data = await res.json();
    const random = Math.floor(Math.random() * data.length);
    const newQuote = data[random];

    if (newQuote.author === '' || newQuote.author === null) {
      author.innerText = 'Unknown';
    } else {
      author.innerText = newQuote.author;
    }

    if (newQuote.text > 120) {
      quote.classList.add('long-quote');
    } else {
      quote.classList.remove('long-quote');
    }

    quote.innerText = newQuote.text;
  } catch (err) {
    console.log('Something went wrong...', err);
  }
  removeLoadingSpinner();
}

function tweetQuote() {
  const quoteText = quote.innerText;
  const authorText = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
  window.open(twitterUrl, '_blank');
}

generateQuote();

newQuoteBtn.addEventListener('click', generateQuote);
twitterBtn.addEventListener('click', tweetQuote);

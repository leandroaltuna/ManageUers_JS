/**
 * returns { Promise<Object> } quote information
 */
const fetchQuote = async () => {
    
    const res = await fetch( 'https://api.breakingbadquotes.xyz/v1/quotes/5' );
    const data = await res.json();
    
    console.log( data[0] );

    return data[0];

}

/**
 * 
 * @param { HTMLDivElement } element 
 */
export const BreakingbadApp = async ( element ) => {
    
    document.querySelector( '#app-title' ).innerHTML = 'Breakingbad App';
    element.innerText = 'Loading...';
    
    // const quote = await fetchQuote();

    const quoteLabel = document.createElement( 'blockquote' );
    const authorLabel = document.createElement( 'h3' );
    const nextQuoteButton = document.createElement( 'button' );

    nextQuoteButton.innerText = 'Next Quote';
    nextQuoteButton.addEventListener( 'click', async () => {

        element.innerText = 'Loading...';
        const quote = await fetchQuote();
        renderQuote( quote );

    });

    const renderQuote = ( data ) => {
        
        quoteLabel.innerText = data.quote;
        authorLabel.innerText = data.author;

        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton );

    }

    fetchQuote().then( renderQuote );

}
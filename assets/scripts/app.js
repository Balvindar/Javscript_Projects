const addMovieModal = document.getElementById('add-modal');
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
// console.log(addMovieModal);

const startAddMovieButton = document.querySelector('header button');
// const startAddMovieButton = document.querySelector('header').lastElementChild;

const backDrop = document.getElementById('backdrop');
// const backDrop = document.body.firstElementChild
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
// console.log(startAddMovieButton);
const userInputs = addMovieModal.querySelectorAll('input')
// const userInputs = addMovieModal.getElementsByTagName('inputs')
const entryTextSelection = document.getElementById('entry-text');


const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSelection.style.display = 'block';
    } else  {
        entryTextSelection.style.display = 'none';
    }
}

const deleteMovieHandler =  (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    // listRoot.removeChild(listRoot.children[movieIndex]);  another way to delete


}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = "movie-element__image">
       <img src = "${imageUrl}" alt = "${title}"/>
    </div>
    <div class = "movie-element__info">
       <h2>${title}</h2>
       <p>${rating}/5 stars</p>
    </div>
    `
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}

const toggleBackdrop  = () => {
    backDrop.classList.toggle('visible');
}



const clearMovieInput = () => {
    // userInputs[0].value = '';
    console.log(userInputs);
    for(const userInput of userInputs) {
        userInput.value = '';
    }
    // } another approch to clear fields
}

const cancelAddMovie = () => {
    toggleMovieModal();
    clearMovieInput()
}

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggleBackdrop();
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
        alert('Please enter valid values (rating between 1 to 5)');
        console.log('i am called');
        return ;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    }

    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
}

const backDropClickHandler = () => {
    toggleMovieModal();
}

startAddMovieButton.addEventListener('click', toggleMovieModal);
backDrop.addEventListener('click', backDropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovie)
confirmAddMovieButton.addEventListener('click', addMovieHandler)


var film_list = [];

function film_generator(film_title,hints){
    return {
        name: film_title,
        hints: hints
    };
}

film_list.push(film_generator("Titanic",["Barco","Iceberg","Tabla flotando"]));
film_list.push(film_generator("Los Vengadores",["La piedra del poder", "Groot", "No me quiero ir señor Stark..."]));
film_list.push(film_generator("Buscando a Nemo",["Pez perdido","Tiburones abusones", "Buscando a Dory"]));
film_list.push(film_generator("El rey león",["Simba", "Timon y Pumba","Rafiki"]));
film_list.push(film_generator("El caballero oscuro",["O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.",
    "Joker","Altera el orden establecido y el mundo se volverá un caos"]));

var random_film = film_list[Math.floor(Math.random() * film_list.length)];

function generate_letters(film_name){
    var letters = [];
    for(i = 0; i < film_name.length; i++){
        if(film_name[i]===" "){
            letters.push(true);
        }else{
            letters.push(false);
        }
    }
    return letters;
}

var film = random_film;
var letters_found = generate_letters(film.name);
var letters_used = {
    success:[],
    fail:[]
}

localStorage.setItem("letters_found", JSON.stringify(letters_found));
localStorage.setItem("film", JSON.stringify(film));
localStorage.setItem("letters_used", JSON.stringify(letters_used));


// ------------------------------------------------------------------


var letters_found = JSON.parse(localStorage.getItem("letters_found"));
var film = JSON.parse(localStorage.getItem("film"));


//generates a string of the name of the film with
// underscores when hidden letter
function get_hidden_word(film_name,letters_found){
    var right_letters = [];
    for (i = 0; i < letters_found.length; i++){
        if(letters_found[i] === false){
            right_letters[i] = '_';
        }else{
            right_letters[i] = film_name[i];
        }
    }
    return right_letters;
}

var resultado = get_hidden_word(film.name, letters_found);
update_word_on_html(resultado);

/**
 * Set true into array where the letter selected is found
 */
function get_letters_contained(film_name,selected_letter){
    var array = [];
    for (i = 0; i < film_name.length; i++){
        if(film_name[i].toLowerCase() == selected_letter.toLowerCase()){
            array[i] = true;
        }else{
            array[i] = false;
        }
    }
    return array;
}

/**
 * Return array with letters founded
 * @after: Call to check_letters to set the word in display
 */
function update_letters_found(letters_found,letter_selected){
    var array = [];
    for (i = 0; i < letters_found.length; i++){
        if((letter_selected[i] == true)||(letters_found[i] == true)){
            array[i] = true;
        }else{
            array[i] = false;
        }
    }
    return array;
}

function update_abcdary_on_html(button, success){
    if(success){
        button.className+=" success";
    }else{
        button.className+=" fail";
    }
}

function get_from_local_storage(){
    return {
        film: JSON.parse(localStorage.getItem("film")),
        letters_found: JSON.parse(localStorage.getItem("letters_found")),
        letters_used: JSON.parse(localStorage.getItem("letters_used"))
        };
}

function update_local_storage(letters_used,letters_found){
    localStorage.setItem("letters_used", JSON.stringify(letters_used));
    localStorage.setItem("letters_found", JSON.stringify(letters_found)); 
}

function update_local_storage_film(film){
    localStorage.setItem("film", JSON.stringify(film));
}


function update_word_on_html(word_to_update){
    var hidden_bar = document.getElementsByClassName("hidden-word-bar")[0];
    hidden_bar.innerHTML = word_to_update.join('');
}

function update_hint_on_html(hint_to_update){
    var hint_area = document.getElementsByClassName("hints-area")[0];
    console.log(hint_to_update);
    hint_area.innerHTML = hint_to_update;
}

function remaining_parts(failed_letters){
    return (5 - failed_letters.length);
}

function identify_button(event){
    var button = event.target;
    var {film, letters_found, letters_used} = get_from_local_storage();
    var match = film.name.toLowerCase().includes(button.innerHTML.toLowerCase());
    if(remaining_parts(letters_used.fail) > 0){
        if(match){ 
            letters_used.success.push(button.innerHTML);
            letters_found=update_letters_found(letters_found,
            get_letters_contained(film.name, button.innerHTML));
            var word_to_update = get_hidden_word(film.name, letters_found);   
            update_word_on_html(word_to_update);
            update_abcdary_on_html(button,true);
        }else{
            letters_used.fail.push(button.innerHTML);
            update_abcdary_on_html(button,false);
        }
        
        update_local_storage(letters_used,letters_found);
        button.removeEventListener("click",identify_button);
    }
}

function give_hint(event){
    var button = event.target;
    var {film} = get_from_local_storage();
    var hint = film.hints[Math.floor(Math.random() * film.hints.length)];
    var film_hints = film.hints;
    if(film_hints.length > 0){
        update_hint_on_html(hint);
        
        var index = film_hints.indexOf(hint);
        if (index > -1) {
            film_hints.splice(index, 1);
        }
        
        film.hints = film_hints;
        update_local_storage_film(film);
    }else{
        button.removeEventListener("click",give_hint);
    }
}


var buttons = document.getElementsByClassName("button");
for (let button = 0; button < buttons.length; button++) {
    buttons[button].addEventListener("click", identify_button);
}

var hint_button = document.getElementsByClassName("hint-button");
hint_button[0].addEventListener("click", give_hint);
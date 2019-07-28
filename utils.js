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

function match(film_name, button_text){
    return film_name.toLowerCase().includes(button_text.toLowerCase());
}

function get_from_local_storage(){
    return {
        film: JSON.parse(localStorage.getItem("film")),
        letters_found: JSON.parse(localStorage.getItem("letters_found")),
        letters_used: JSON.parse(localStorage.getItem("letters_used")),
        timer: localStorage.getItem("timer")
        };
}

function update_local_storage(letters_used,letters_found){
    localStorage.setItem("letters_used", JSON.stringify(letters_used));
    localStorage.setItem("letters_found", JSON.stringify(letters_found)); 
}

function update_local_storage_film(film){
    localStorage.setItem("film", JSON.stringify(film));
}

function update_local_storage_timer(seconds){
    localStorage.setItem("timer", seconds);
}

function remaining_parts(failed_letters){
    return (5 - failed_letters.length);
}

function did_game_start(letters_used){
    return (letters_used.success.length>0 || letters_used.fail.length>0);
}

function play_condition(letters_used, timer, letters_found){
    return (remaining_parts(letters_used.fail) > 0) 
        && (timer > 0)
        && !check_all_letters_found(letters_found);
}

function check_all_letters_found(letters_found){
    var num_of_true = 0;
    for (i = 0; i < letters_found.length; i++){
        if(letters_found[i] == true){
            num_of_true++;
        }
    }
    return num_of_true == letters_found.length;
}

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

function any_hints(hints){
    return hints.length > 0;
}

function give_hint(event){
    var button = event.target;
    var {film,timer} = get_from_local_storage();
    var hint = film.hints[Math.floor(Math.random() * film.hints.length)];
    var film_hints = film.hints;
    if(film_hints.length > 0){
        update_hint_on_html(hint);
        
        var index = film_hints.indexOf(hint);
        if (index > -1) {
            film_hints.splice(index, 1);
        }
        update_local_storage_timer(parseInt(timer)-5);
        film.hints = film_hints;
        update_local_storage_film(film);
    }else{
        button.removeEventListener("click",give_hint);
    }
}
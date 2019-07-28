var film_list = [];

function film_generator(film_title,hints){
    return {
        name: film_title,
        hints: hints
    };
}

var buttons = document.getElementsByClassName("button");
for (let button = 0; button < buttons.length; button++) {
    buttons[button].addEventListener("click", identify_button);
}

var {film,letters_found,letters_used,timer} = get_from_local_storage();

if (localStorage.getItem("letters_used") === null 
|| JSON.parse(localStorage.getItem("letters_used")).fail.length 
+ JSON.parse(localStorage.getItem("letters_used")).success.length == 0
|| !play_condition(letters_used, timer, letters_found)){


    film_list.push(film_generator("Titanic",["Barco","Iceberg","Tabla flotando"]));
    film_list.push(film_generator("Los Vengadores",["La piedra del poder", "Groot", "No me quiero ir señor Stark..."]));
    film_list.push(film_generator("Buscando a Nemo",["Pez perdido","Tiburones abusones", "Buscando a Dory"]));
    film_list.push(film_generator("El rey leon",["Simba", "Timon y Pumba","Rafiki"]));
    film_list.push(film_generator("El caballero oscuro",["O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.",
    "Joker","Altera el orden establecido y el mundo se volverá un caos"]));

    var random_film = film_list[Math.floor(Math.random() * film_list.length)];

    film = random_film;
    letters_found = generate_letters(film.name);
    letters_used = {
        success:[],
        fail:[]
    }
    localStorage.setItem("letters_found", JSON.stringify(letters_found));
    localStorage.setItem("film", JSON.stringify(film));
    localStorage.setItem("letters_used", JSON.stringify(letters_used));
    localStorage.setItem("timer", JSON.stringify(60));
} else {
    console.log("Hay cosas en el local storage");

    let btns = document.getElementsByClassName("button");
    

    for (let button = 0; button < btns.length; button++) {
        for (letter = 0; letter < letters_used.success.length; letter++){
            if (btns[button].innerHTML == letters_used.success[letter]){
                update_abcdary_on_html(btns[button], true);
                btns[button].removeEventListener("click",identify_button);
            }
        }
        for (letter = 0; letter < letters_used.fail.length; letter++){
            if (btns[button].innerHTML == letters_used.fail[letter]){
                update_abcdary_on_html(btns[button], false);
                btns[button].removeEventListener("click",identify_button);
            }
        }
    }
    
    start_timer();
    if(any_hints(film.hints))show_hints_on_html();
    update_parts_left_on_html(remaining_parts(letters_used.fail));
    
}



// ------------------------------------------------------------------

var resultado = get_hidden_word(film.name, letters_found);
update_word_on_html(resultado);

function identify_button(event){
    var button = event.target;
    var {film, letters_found, letters_used, timer} = get_from_local_storage();
    if(!did_game_start(letters_used))start_timer();
    
    if(play_condition(letters_used, timer, letters_found)){

        if(any_hints(film.hints))show_hints_on_html();

        if(match(film.name, button.innerHTML)){ 
            letters_used.success.push(button.innerHTML);
            letters_found=update_letters_found(letters_found,
            get_letters_contained(film.name, button.innerHTML));
            var word_to_update = get_hidden_word(film.name, letters_found);   
            update_word_on_html(word_to_update);
            update_abcdary_on_html(button,true);
        }else{
            letters_used.fail.push(button.innerHTML);
            update_abcdary_on_html(button,false);
            update_parts_left_on_html(remaining_parts(letters_used.fail));
        }
        update_local_storage(letters_used,letters_found);
        button.removeEventListener("click",identify_button);
    }
}



var hint_button = document.getElementsByClassName("hint-button");
hint_button[0].addEventListener("click", give_hint);

function start_timer(interval){
    var interval = setInterval(function(){
        var {letters_used, letters_found, timer}= get_from_local_storage();
        timer--;
        update_local_storage_timer(timer);
        document.getElementById('timer-display').innerHTML=timer;
        if (!play_condition(letters_used, timer, letters_found)) {
            clearInterval(interval);
        }
    }, 1000);
}


function refresh(){
    localStorage.clear();
}

var refresh_buttons = document.getElementsByClassName("refresh");

for (let button = 0; button < refresh_buttons.length; button++) {
    refresh_buttons[button].addEventListener("click", refresh);
}
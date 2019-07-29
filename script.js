function film_generator(film_title,hints){
    return {
        name: film_title,
        hints: hints
    };
}

function load_game_data(){
    var film_list = [];
    
    film_list.push(film_generator("Titanic",["Barco","Iceberg","Tabla flotando"]));
    film_list.push(film_generator("Los Vengadores",["La piedra del poder", "Groot", "No me quiero ir señor Stark..."]));
    film_list.push(film_generator("Buscando a Nemo",["Pez perdido","Tiburones abusones", "Buscando a Dory"]));
    film_list.push(film_generator("El rey leon",["Simba", "Timon y Pumba","Rafiki"]));
    film_list.push(film_generator("El caballero oscuro",["O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.",
    "Joker","Altera el orden establecido y el mundo se volverá un caos"]));

    film = film_list[Math.floor(Math.random() * film_list.length)];

    letters_found = generate_letters(film.name);

    letters_used = {
        success:[],
        fail:[]
    }
    
    localStorage.setItem("letters_found", JSON.stringify(letters_found));
    localStorage.setItem("film", JSON.stringify(film));
    localStorage.setItem("letters_used", JSON.stringify(letters_used));
    localStorage.setItem("timer", JSON.stringify(60));

}

// Añadimos evento a los botones
add_buttons_listener();

var {film,letters_found,letters_used,timer} = get_from_local_storage();


if (game_started()){
    load_game_data();
} else {
    remove_buttons_listener(letters_used);
    start_timer();
    if(any_hints(film.hints))show_hints_on_html();
    update_parts_left_on_html(remaining_parts(letters_used.fail));
}

// Actualiza la palabra del ahorcado
update_word_on_html(get_hidden_word(film.name, letters_found));

film, letters_found, letters_used, timer = null,null,null,null;//IMPORTANT

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
        }
        update_parts_left_on_html(remaining_parts(letters_used.fail));
        update_local_storage(letters_used,letters_found);
        button.removeEventListener("click",identify_button);
    }
}

add_hint_button_listener();

function start_timer(interval){
    var interval = setInterval(function(){
        var {film, letters_used, letters_found, timer}= get_from_local_storage();
        timer--;
        update_local_storage_timer(timer);
        if(timer<0)timer=0;
        if (!play_condition(letters_used, timer, letters_found)) {
            if(word_found(letters_found, timer)){
                game_over(true);
            }else{
                game_over(false, letters_found, film.name);
            }
            clearInterval(interval);
        }
        document.getElementById('timer-display').innerHTML=timer;
        
        
    }, 1000);
}

function word_found(letters_found, timer){
    return check_all_letters_found(letters_found)
            && timer>0;
}



refresh_buttons();

var film_list = [];

function film_generator(film_title,hints){
    return {
        name: film_title,
        hints: hints
    };
}

film_list.push(film_generator("Titanic",["Barco","Iceberg","Tabla flotando","+"]));
film_list.push(film_generator("Los Vengadores",["La piedra del poder", "Groot", "No me quiero ir señor Stark...","+"]));
film_list.push(film_generator("Buscando a Nemo",["Pez perdido","Tiburones abusones", "Buscando a Dory","+"]));
film_list.push(film_generator("El rey león",["Simba", "Timon y Pumba","Rafiki","+"]));
film_list.push(film_generator("El caballero oscuro",["O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.",
    "Joker","Altera el orden establecido y el mundo se volverá un caos","+"]));

// console.log(film_list);

var random_film = film_list[Math.floor(Math.random() * film_list.length)];

// console.log(random_film);

function generate_letters(film_name){
    var letters = [];
    for(i = 0; i < film_name.length; i++){
        // revisar espacios
        letters.push(false);
    }
    return letters;
}

var film_properties = random_film;
var letters_found = generate_letters(film_properties.name);

localStorage.setItem("letters_found", JSON.stringify(letters_found));
localStorage.setItem("film_properties", JSON.stringify(film_properties));


// ----------------------


var stored_letters_found = JSON.parse(localStorage.getItem("letters_found"));
var stored_film_properties = JSON.parse(localStorage.getItem("film_properties"));



function check_letters(stored_letters_found, film_name){
    //console.log(stored_letters_found);
    //console.log(film_name);
    var right_letters = [];
    for (i = 0; i < stored_letters_found.length; i++){
        if(stored_letters_found[i] === false){
            right_letters[i] = '_';
        }else{
            right_letters[i] = film_name[i];
        }
    }
    return right_letters;
}

var resultado = check_letters(stored_letters_found,stored_film_properties.name);

var x = document.getElementsByClassName("hint");

for(i = 0; i < resultado.length; i++){
    x[0].innerHTML += resultado[i];
}



// 

function identify_button(button){
    button.className+= " success";
}


var buttons = document.getElementsByClassName("button");
for (let button = 0; button < buttons.length; button++) {
    buttons[button].addEventListener("click", _ =>{
                                        return identify_button(event.target)
                                    })
    
}
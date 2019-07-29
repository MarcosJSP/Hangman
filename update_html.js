function update_abcdary_on_html(button, success){
    if(success){
        button.className+=" success";
    }else{
        button.className+=" fail";
    }
}

function update_word_on_html(word_to_update){
    var hidden_bar = document.getElementsByClassName("hidden-word-bar")[0];
    hidden_bar.innerHTML = "";

    for (let index = 0; index < word_to_update.length; index++) {
        if(word_to_update[index]==' ')hidden_bar.innerHTML+="\xa0";
        hidden_bar.innerHTML+=word_to_update[index];
    }
}

function show_word_completed_on_html(word_to_update, film_name){
    var hidden_bar = document.getElementsByClassName("hidden-word-bar")[0];
    hidden_bar.innerHTML = "";

    for (let index = 0; index < word_to_update.length; index++) {
        const letter=word_to_update[index];
        if(letter){
            if(film_name[index] == ' ')hidden_bar.innerHTML+="\xa0";
                hidden_bar.innerHTML+=film_name[index];
        }else{
            hidden_bar.innerHTML+="<span style='color:var(--red)'>"+ film_name[index]+"</span>";
        }
    }
}

function update_hint_on_html(hint_to_update){
    var hint_area = document.getElementsByClassName("hints-area")[0];
    hint_area.innerHTML = hint_to_update;
}

function update_parts_left_on_html(remaining_parts){
    var html = document.getElementsByClassName("parts-left")[0];
    html.innerHTML=remaining_parts;
}

function show_hints_on_html(show=true){
    if(show){
        document.getElementsByClassName("hints")[0].style.visibility="initial";
    }else{
        document.getElementsByClassName("hints")[0].style.visibility="collapse";
    }
}

function show_game_over_on_html(win){
    var game_over=document.getElementsByClassName("game_over")[0];
    if(win){
        game_over.innerHTML="Victory";
        game_over.style.color="var(--green)";
    }else{
        game_over.innerHTML="Defeat";
        game_over.style.color="var(--red)";
    }
}
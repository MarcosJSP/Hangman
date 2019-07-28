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

function update_hint_on_html(hint_to_update){
    var hint_area = document.getElementsByClassName("hints-area")[0];
    hint_area.innerHTML = hint_to_update;
}

function update_parts_left_on_html(remaining_parts){
    var html = document.getElementsByClassName("parts-left")[0];
    html.innerHTML=remaining_parts;
}

function show_hints_on_html(){
    document.getElementsByClassName("hints")[0].style.visibility="initial";
}
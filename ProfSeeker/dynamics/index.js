const tabla = document.getElementsByClassName("table-horarios-custom");
const texta_forMd = document.getElementById("forMarkdown");

let tab_size = tabla[0].children.length;
let profesores = [], rows_profesores = [];
let filas = tabla[0].children;

let i_g = 1; //indice del grupo
let i_n_p = 2; //indice del nombre del profesor
let i_h = 4; //indice para el horario del profesor
let i_d = 5; // indice para los días
let i_c = 6; //indice para le cupo

for(let i = 1; i<tab_size; i++){
    rows_profesores.push(filas[i]);
}
//console.log(profesores);


function getGrupo(celda){
    return celda.innerHTML;
}
function getNombre(celda){
    return celda.firstChild.data;
}
function openWindow(url){
    window.open(url, "_blank")
}
function normalizeStringForSeach(str){
    splits_str = str.split(" ");
    splits_str.shift(); // Para quitar el prefijo MI. ING. FIS. MAT. etc
    new_str = "";
    splits_str.forEach((s, i) =>{
        if(i == 0) 
            new_str = s
        else
            new_str = new_str + "+" + s;
    });
    console.log(new_str);

    let str_pref_google_firefox_search = "https://www.google.com/search?client=firefox-b-d&q=";
    return str_pref_google_firefox_search + new_str;
}

function prof_name_to_obs_task(name, group){
    return "- [ ] **" + name + "** ***" + group + "***";
}
function fill_w_markdown(arr_map_profesores){
    
    let str = ""
    arr_map_profesores.forEach( each => {
        str = str + prof_name_to_obs_task(each["nombre"], each["grupo"]) + "\n";
    });
    console.log(str);
    texta_forMd.value = str;
}

rows_profesores.forEach(row => {
    let each_row_profesor = row.children[0].children;
    //console.log(each_row_profesor[i_n_p].firstChild.data);

    let set_profesor = {};
    set_profesor["grupo"] = getGrupo(each_row_profesor[i_g]);
    set_profesor["nombre"] = getNombre(each_row_profesor[i_n_p]);
    profesores.push(set_profesor);
    
    //console.log(set_profesor);
    openWindow(normalizeStringForSeach(set_profesor["nombre"]));
});

fill_w_markdown(profesores);

console.log(profesores);
// PRUEBA



//console.log(text_ipt);
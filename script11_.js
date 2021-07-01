/* Crea una clase Libro
La clase libro tendra titulo, autor, año y genero.
Crea un metodo que devuelva toda la informacion del libro
Pide 3 libros y guardalos en un array
Los libros se introduciran al arrancar el programa pidiendo los datos con prompt.
Validar que los campos no se introduzcan vacios
Validar que el año sea un numero y que tenga 4 digitos
Validar que el genero sea: aventuras, terror o fantasia
Crea una funcion que muestre todos los libros
Crea una funcion que muestre los autores ordenados alfabeticamente
Crea una funcion que pida un genero y muestre la informacion de los libros que pertenezcan a ese genero usando un metodo que devuelve la informacion */
const expresiones = { //www.regextester.com
    year: /^\d{4}$/, // validar numeros de 4 digitos
    author:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    title: /^[a-zA-ZÀ-ÿ\s\d]{1,40}$/, // Letras y espacios, pueden llevar acentos y numeros
    genre: /^(aventuras|terror|fantasía|fantasia)$/i, // Validar que el genero sea: aventuras, terror o fantasia
}

class Libro {
    constructor (title,author,year,genre){
        this.title=title;
        this.author=author;
        this.year=year;
        this.genre=genre;
    }
    data_libro(){
    return `titulo: ${this.title} \nautor: ${this.author}\naño: ${this.year} \ngenero: ${this.genre}`
    }
}

const lista_libros = () => { //funcion que ingresa todos los libros
    var libros=[], title, author, genre, year;
    const pide_verifica = (cadena,obj_item) => {
        fail='', verifica=false;
        do {
            item=prompt(`${fail}Ingrese el ${cadena} del libro ${i}:`); 
            verifica=expresiones[obj_item].test(item);
            if (item===undefined || item===null) verifica=false;
            fail="Error. ";          
        }while (!verifica)
        return item;
    }
    console.log('Se pediran los datos de los libros');
    for (var i = 1; i < 4; i++) {
        title=pide_verifica ('título','title');
        author=pide_verifica ('autor','author');
        year=pide_verifica ('año','year');
        genre=pide_verifica ('género (aventuras, terror o fantasia)','genre');
        const libro = new Libro(title, author, year, genre);
        libros.push(libro);
    }
    return libros;
}
const ordenamiento = (unaLista,indice) => {
    var intercambios = true;
    var numPasada = unaLista.length-1;
    while ((numPasada > 0) && intercambios){
      intercambios = false
      for (i=0;i<numPasada;i++){
        if (unaLista[i][indice] > unaLista[i+1][indice]){
          intercambios = true;
          var aux = unaLista[i];
          unaLista[i] = unaLista[i+1];
          unaLista[i+1] = aux;
        }
      }
      numPasada -= 1;
    }
    return unaLista;
}

listalibros=lista_libros();

(function (libros){
    console.log('lista de libros ingresados');
    for (const key in libros) { 
        console.log(libros[key].data_libro()); 
    };
})(listalibros); //imprimir todos los libros 

(function(libros){ //imprimir autores ordenados alfabeticamente
    var libros_= ordenamiento(libros,'author');
    console.log('autores ordenados alfabeticamente');
    for (const key in libros_) { 
        console.log(libros_[key]['author']); 
    };
})(listalibros);

(function(listalibros){//pide genero y muestre la informacion de los libros que pertenezcan a ese genero
    var genre_p=prompt('Ingrese un genero (aventuras, terror o fantasia) \npara filtrar libros correspondientes:')+'';
    if (genre_p===undefined) genre_p='';
    var ver=expresiones.genre.test(genre_p);
    while (!ver){
        genre_p=prompt(`¡Género invalido!, ingrese de nuevo:`);
        ver=expresiones.genre.test(genre_p);
    };
    console.log(`libros filtrados por el genero ${genre_p}`);
    for (const key in listalibros) { 
        if (listalibros[key]['genre']==genre_p){
            console.log(listalibros[key].data_libro());
        };
    };
})(listalibros);
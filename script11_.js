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
    year_: /^\d{4}$/, // validar numeros de 4 digitos
    author_:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos
    title_: /^[a-zA-ZÀ-ÿ\s\d]{1,40}$/, // Letras y espacios, pueden llevar acentos y numeros
    genre_: /^(aventuras|terror|fantasía|fantasia)$/i, // Validar que el genero sea: aventuras, terror o fantasia
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
    let libros=[];
    let title;
    let author;
    let genre;
    let year;
    console.log('Se pediran los datos de los libros');
    for (var i = 1; i < 4; i++) {
        title=prompt(`ingrese el título del libro${i}:`);
        ver=expresiones.title_.test(title);
        while (ver==false){
            title=prompt(`¡Titulo invalido!, ingrese de nuevo el título del libro${i}:`);
            ver=expresiones.title_.test(title);
        }
        author = prompt(`ingrese el autor del libro${i}:`);
        ver=expresiones.author_.test(author);
        while (ver==false){
            author=prompt(`¡Autor invalido!, ingrese de nuevo el autor del libro${i}:`);
            ver=expresiones.author_.test(author);
        }
        year = prompt(`ingrese el año del libro${i}:`);
        ver=expresiones.year_.test(year);
        while (ver==false){
            year=prompt(`¡Año invalido!, ingrese de nuevo el año del libro${i}:`);
            ver=expresiones.year_.test(year);
        }        
        genre = prompt(`ingrese el género del libro (aventuras, terror o fantasia)${i}:`);
        ver=expresiones.genre_.test(genre);
        while (ver==false){
            genre=prompt(`¡Género invalido!, ingrese de nuevo el género del libro${i}:`);
            ver=expresiones.genre_.test(genre);
        }
        const libro = new Libro(title, author, year, genre);
        libros.push(libro);

    }
    return libros;
}
const ordenamiento = (unaLista,indice) => {
    intercambios = true;
    numPasada = unaLista.length-1;
    while ((numPasada > 0) && intercambios){
      intercambios = false
      for (i=0;i<numPasada;i++){
        if (unaLista[i][indice] > unaLista[i+1][indice]){
          intercambios = true;
          aux = unaLista[i];
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
    libros_= ordenamiento(libros,'author');
    console.log('autores ordenados alfabeticamente');
    for (const key in libros_) { 
        console.log(libros_[key]['author']); 
    };
})(listalibros);

(function(listalibros){//pide genero y muestre la informacion de los libros que pertenezcan a ese genero
    genre_p=prompt('Ingrese un genero (aventuras, terror o fantasia) \npara filtrar libros correspondientes:');
    ver=expresiones.genre_.test(genre_p);
    while (ver==false){
        genre_p=prompt(`¡Género invalido!, ingrese de nuevo:`);
        ver=expresiones.genre_.test(genre_p);
    };
    console.log(`libros filtrados por el genero ${genre_p}`);
    for (const key in listalibros) { 
        if (listalibros[key]['genre']==genre_p){
            console.log(listalibros[key].data_libro());
        };
    };
})(listalibros);
import $ from "jquery";

const textHolder = document.getElementById('text-holder');


const quotes = [
    {
        quote: 'Hold fast to dreams for when dreams go life is a barren field frozen with snow.',
        autor: 'Langston Hughes'
    },
    {
        quote: 'All Heaven and Earth Flowered white obliterate... Snow... unceasing snow',
        autor: 'Hashin, Japanese Haiku'
    },
    {
        quote: 'Despite all I have seen and experienced, I still get the same simple thrill out of glimpsing a tiny patch of snow in a high mountain gully and feel the same urge to climb toward it.',
        autor: 'Edmund Hillary'
    },
    {
        quote: "There's just something beautiful about walking in snow that nobody else has walked on. It makes you believe you're special.",
        autor: 'Carol Rifka Brunt'
    },
    {
        quote: "When snow falls, nature listens.",
        autor: 'Antoinette van Kleef'
    },
    {
        quote: "A snowball in the face is surely the perfect beginning to a lasting friendship.",
        autor: 'Markus Zusak'
    },
    {
        quote: "The snow itself is lonely or, if you prefer, self-sufficient. There is no other time when the whole world seems composed of one thing and one thing only.",
        autor: 'Joseph Wood Krutch'
    },
    {
        quote: "Snow makes cities innocent again, reveals the frailty of the human gesture against the void.",
        autor: 'Glen Duncan'
    },

];


    let i = Math.floor(Math.random() * Math.floor(quotes.length));

    const words = quotes[i].quote.split(' ');

    for (let k = 0; k <= words.length; k++){

        let word = words[k];

        let cl = '';

        if(k === words.length){
            cl = 'autor';
            word = quotes[i].autor;
        }
        else if(words[k].slice(0,4).toLowerCase() === 'snow'){
            cl = 'snow';
        }


        textHolder.innerHTML += '<span class="'+cl+'">' + word + '</span> ';
    }


    var $th = $('.text-holder');
    $th.css('height', $th.height());

    $th.children().hide().each(function(i){
      $(this).delay(i*300).fadeIn(1000);
    });


    $('body').click(function(){
        $('canvas').toggleClass('black');
    });




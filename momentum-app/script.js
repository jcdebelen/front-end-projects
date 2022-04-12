const dom = document;
let userinput;
const storage = window.localStorage;


let greet;

// time //
let x;
let ampm;
let hour;
let time;

x = new Date();
function displayTimeG() {
    if (x.getHours()>=12) {
        ampm = 'PM';
        hour=x.getHours()%12;
    } else {
        ampm = 'AM';
        hour=x.getHours();
    }
    if (hour===0) {
        hour=12;
    }
    var minute=x.getMinutes();
    // var second=x.getSeconds(); //seconds
    if(minute <10 ) {minute='0' + minute;}
    // if(second<10){second='0' + second;} //seconds
    // time = hour+':'+minute+':'+second+' '+ampm; //seconds
    time = hour+':'+minute;
    dom.getElementById("time").innerHTML = time;
    dom.getElementById("ampm").innerHTML = ampm;
    //greetings
    if (x.getHours()>=3 && x.getHours()<12) { //4am -11am
        greet = 'Good morning, '
    } else if (x.getHours()>=12 && x.getHours()<18) { //12pm -5pn
        greet = 'Good afternoon, '
    } else if (x.getHours()>=18 && x.getHours()<24) { //6pm -11pm
        greet = 'Good evening, '
    } else {
        greet = 'Time to sleep, ' //12am - 3am
    }
}
// Wallpaper select
if (x.getHours()>=4 && x.getHours()<9)  //4am-9am
    dom.getElementById("body").style.background = "url(assets/bg1.jpg)";
else if (x.getHours()>=9 && x.getHours()<12)  //9am-12nn
    dom.getElementById("body").style.background = "url(assets/bg2.jpg)";
else if (x.getHours()>=12 && x.getHours()<15)  //12pm-3pm
    dom.getElementById("body").style.background = "url(assets/bg3.jpg)";
else if (x.getHours()>=15 && x.getHours()<17)  //3pm-5pm
    dom.getElementById("body").style.background = "url(assets/bg4.jpg)";
else if (x.getHours()>=17 && x.getHours()<19)  //5pm-7pm
    dom.getElementById("body").style.background = "url(assets/bg5.jpg)";
else  //7pm-4am
    dom.getElementById("body").style.background = "url(assets/bg6.jpg)";

// Random Wallpaper
// let bg;
// function chooseBG() {
//     bg = Math.floor(Math.random()*6)+1;
//     dom.getElementById("body").style.background = "url(assets/bg" +bg + ".jpg)"
// }
// chooseBG();
bgProp();

function bgProp() {
    dom.getElementById("body").style.backgroundSize = "cover";
    dom.getElementById("body").style.backgroundRepeat = "no-repeat";
    dom.getElementById("body").style.backgroundAttachment = "fixed";
    dom.getElementById("body").style.backgroundPosition = "center";
}

dom.getElementById('name').focus();
if(storage.length>0) {
    userinput = storage.getItem('username');
    displayInitial();
} else {
    dom.getElementById("submit").addEventListener('click', e => {
        e.preventDefault()
        userinput = dom.getElementById('name').value
        if (userinput !== "") {
            localStorage.setItem('username',userinput)
            displayInitial();
        }
        dom.getElementById('name').value = ''
    });
}

function displayInitial() {
    dom.getElementById('user').innerHTML = userinput + '<p id="change">Change User</p>';
    dom.getElementById('welcome').style.display = 'none';
    dom.getElementById('moment').style.display = 'flex';
    displayTimeG();
    dom.getElementById('greetings').innerHTML = greet + userinput + "!";
    animate();
}

setInterval(displayTimeG, 1000)

function animate () {
    setTimeout(myGreetings, 500)
    setTimeout(myGreetingsOut, 5000)
    setTimeout(myGreetingsOut2, 6500)
    setTimeout(myFocus, 2000);
    setTimeout(myFocus2, 4500);
    setTimeout(myFocus3, 3500);
    setTimeout(displayUser, 6500);
    setTimeout(changeQuote, 6000)
}

function myGreet() {
    dom.getElementById('focusgreet').style.visibility = "visible";
    dom.getElementById('focusgreet').style.animation = "fadeIn 1.5s";
}

function myGreetings() {
    dom.getElementById('greetings').style.visibility = "visible";
    dom.getElementById('greetings').style.animation = "fadeIn 1.5s";
}

function myGreetingsOut() {
    dom.getElementById('greetings').style.animation = "fadeOut 1.5s";
}

function myGreetingsOut2() {
    dom.getElementById('greetings').style.visibility = "hidden";
}

function myFocus() {
    dom.getElementById('focusgreet').style.visibility = "visible";
    dom.getElementById('focusgreet').style.animation = "fadeIn 1.5s";
}

function myFocus2() {
    dom.getElementById('focus').style.animation = "moveUp 1.5s";
    dom.getElementById('focus').style.bottom = "8vh";
}

function myFocus3() {
    dom.getElementById('focusinput').style.visibility = "visible";
    dom.getElementById('focusinput').style.animation = "fadeIn 1.5s";
    dom.getElementById('focusinput').focus();
}

function displayUser() {
    dom.getElementById('user').style.visibility = "visible";
    dom.getElementById('user').style.animation = "fadeIn 1.5s";
}


function changeQuote() {
    floor = Math.floor(Math.random() * quotes.length);
    dom.getElementById('quotes').innerHTML = quotes[floor];
    displayQuote();
}

function displayQuote() {
    dom.getElementById('quotes').style.visibility = "visible";
    dom.getElementById('quotes').style.animation = "fadeIn 1.5s";
    dom.getElementById("ref").setAttribute('src', 'assets/refresh.png')
}

setInterval(randomQuote, 60000);

function randomQuote() {
    dom.getElementById('quotes').style.animation = "fadeOut 1.5s";
    setTimeout(quoteOut, 1400);
    setTimeout(changeQuote,1500);
}

function quoteOut () {
    dom.getElementById('quotes').style.visibility = "hidden";
}

let quotes = ['“Don\'t let the noise of other\'s opinions drown out your own inner voice. Have the courage to follow your heart and intuition.”<br> - Steve Jobs',
            '“It\'s fine to celebrate success but it is more important to heed the lessons of failure.”<br> - Bill Gates',
            '"You can\'t have everything you want, but you can have the things that really matter to you." - Marissa Mayer, Yahoo',
            '“The biggest risk is not taking any risk… In a world that\'s changing really quickly, the only strategy that is guaranteed to fail, is not taking risks.” - Mark Zuckerberg',
            '“If you don\'t innovate fast, disrupt your industry, disrupt yourself, you\'ll be left behind.”<br> - John Chambers, Cisco',
            'We want to create beautiful, intuitive services and technologies that are so incredibly useful that people use them twice a day. There aren\'t that many things people use twice a day." - Larry Page, Google',
            '“If you\'re competitor-focused, you have to wait until there is a competitor doing something. Being customer-focused allows you to be more pioneering.” - Jeff Bezos',
            '“The best way to predict the future is to invent it.”<br>  - Alan Kay, computer scientist',
            '"Stay hungry, stay foolish"<br> - Steve Jobs',
            '“Engineering is the closest thing to magic that exists in the world.”<br> - Elon Musk',
            '“Our industry does not respect tradition — it only respects innovation.”<br> - Satya Nadella, Microsoft', 
            '“Growth and comfort do not coexist.”<br> - Ginni Rometty, IBM',
        ];


let floor;
function myQuoteOut() {
    dom.getElementById('quotes').style.animation = "fadeOut 1.5s";
    setTimeout(myQuoteOut2, 1400);
}

function myQuoteOut2() {
    dom.getElementById('quotes').style.visibility = "hidden";
}

dom.getElementById("ref").addEventListener('click', function() {
    dom.getElementById("ref").setAttribute('src', 'assets/spinner.png');
    myQuoteOut();
    setTimeout(changeQuote,1400);
});

let userfocus;
dom.getElementById("focussubmit").addEventListener('click', e => {
    e.preventDefault()
    userfocus = dom.getElementById('focusinput').value
    if (userfocus !== "") {
        dom.getElementById('focusinput').style.animation = 'fadeOut 0.5s';
        myFocusDown();
    }
    dom.getElementById('focusinput').value = ''
    })


let checkBox = dom.getElementById("focuscheck");

const pyro = document.getElementsByClassName("pyro");
function strike() {
    if (checkBox.checked == true){
        dom.getElementById('mainfocus').style.textDecoration = "line-through";
        dom.getElementById('black').style.visibility = "visible";
        dom.getElementById('black').style.animation = "fadeIn 0.5s";
        setTimeout(pyroIn, 1000);
        setTimeout(wellDoneIn, 2000);
        setTimeout(wellDoneOut, 7000);
        setTimeout(wellDoneOut2, 8500)
        dom.getElementById('quotes').style.visibility = "hidden";
        dom.getElementById('listinput').style.visibility = "hidden";
        dom.getElementById('listtitle').style.visibility = "hidden";
        dom.getElementById('todo').style.visibility = "hidden";
        dom.getElementById('maintime').style.visibility = "hidden";
        dom.getElementById('quoteform').style.visibility = "hidden";
        dom.getElementById('user').style.visibility = "hidden";
    } 
    else {
        dom.getElementById('mainfocus').style.textDecoration = "none";
        dom.getElementById('welldone').style.visibility = "hidden";
        dom.getElementById('black').style.animation = "none";
        pyro[0].style.display = "none";
        pyro[0].style.animation = "none";
        dom.getElementById('black').style.visibility = "hidden";
        dom.getElementById('quotes').style.visibility = "visible";
        dom.getElementById('listinput').style.visibility = "visible";
        dom.getElementById('listtitle').style.visibility = "visible";
        dom.getElementById('todo').style.visibility = "visible";
        dom.getElementById('maintime').style.visibility = "visible";
        dom.getElementById('quoteform').style.visibility = "visible";
        dom.getElementById('user').style.visibility = "visible";
    }
}

function wellDoneIn() {
    dom.getElementById('welldone').style.visibility = "visible";
    // dom.getElementById('welldone').style.animation = "fadeIn 0.5s";
    dom.getElementById('welldone').style.animation = "typing 3s steps(40, end)";
}

function pyroIn() {
    pyro[0].style.display = "inline-block";
    pyro[0].style.animation = "fadeIn 1.5s";
}

function wellDoneOut() {
    dom.getElementById('welldone').style.animation = "fadeOut 1.5s";
}

function wellDoneOut2() {
    dom.getElementById('welldone').style.visibility = "hidden";
}

function myFocusDown() {
    dom.getElementById('focusform').style.animation = "fadeOut 0.5s";
    setTimeout(displayList, 400)
}

function displayList() {
    dom.getElementById('todo').style.display = "block";
    dom.getElementById('todo').style.visibility = "hidden";
    dom.getElementById('focusinput').style.display = 'none';
    dom.getElementById('mainfocus').innerHTML = userfocus;
    dom.getElementById('focus').style.visibility = "visible";
    dom.getElementById('focus').style.animation = "fadeIn 1.5s";
    dom.getElementById('focusform').style.fontSize = "calc(20px + 0.5vw)";
    dom.getElementById('greetings').style.display = "none";
    dom.getElementById('focusgreet').innerHTML = "Today's focus";
    dom.getElementById('focus').style.bottom = "0px";
    dom.getElementById('focusform').style.bottom = "0px";
    dom.getElementById('todo').style.visibility = "visible";
    dom.getElementById('todo').style.animation = "fadeIn 1.5s";
    dom.getElementById('listinput').style.borderBottom = "none";
    dom.getElementById('listinput').focus();
}



let list;
dom.getElementById("listsubmit").addEventListener('click', e => {
    e.preventDefault()
    list = dom.getElementById('listinput').value
    if (list !== "") {
        dom.getElementById("listinput").setAttribute('placeholder','');
        dom.getElementById("listtitle").style.display = "block";
        dom.getElementById("listtitle").style.animation = "fadeIn 1.5s";
        const listelem = dom.createElement('li')
        const listcheck = dom.createElement('input')
        dom.getElementById('list').append(listelem);
        listelem.append(listcheck);
        listelem.style.animation = "fadeIn 1s";
        listcheck.setAttribute('type','checkbox');
        listcheck.className = "cb";
        listelem.innerHTML += " " + list;    
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        listelem.appendChild(span);
        span.onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
            }
    }
    dom.getElementById('listinput').value = '';
})


let newquote;
dom.getElementById("quotesubmit").addEventListener('click', e => {
    e.preventDefault()
    newquote = dom.getElementById('quoteinput').value
    if (newquote !== "") {
        quotes.push(newquote);
        myQuoteOut();
        setTimeout(setCustomQuote, 1500);
    }
    dom.getElementById('quoteinput').value = ''
    });

function setCustomQuote() {
    dom.getElementById('quotes').innerHTML = newquote,1400;
    displayQuote();
}

dom.getElementById("quotes").addEventListener('click',  function() {
    if (dom.getElementById("quoteform").style.display == "none") {       
        dom.getElementById("quoteform").style.display = "flex"
        dom.getElementById("quoteform").style.animation = "fadeIn 0.5s";
        dom.getElementById("end").style.zIndex = "2";
        dom.getElementById("quoteinput").focus();
    }    else {
    dom.getElementById("quoteform").style.display = "none";
    dom.getElementById("quoteform").style.animation = "none";
    dom.getElementById("end").style.zIndex = "0";
    }
});
    
dom.getElementById("user").addEventListener('click',  function() {
    if (dom.getElementById("change").style.display == "none") { 
        dom.getElementById("change").style.animation = "fadeIn 1s";
        dom.getElementById("change").style.display = "block";
    } else {
        dom.getElementById("change").style.display = "none";
        dom.getElementById("change").style.animation = "none";
    }

});

dom.getElementById("change").addEventListener('click',  function() {
    localStorage.removeItem("username");
    location.reload();
});
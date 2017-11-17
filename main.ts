import { Observable, Observer } from 'rxjs';
import { observeOn } from 'rxjs/operators/observeOn';
import { Subject } from 'rxjs/Subject';

// let source = Observable.fromEvent(document, 'mousemove')
//     .map((event: MouseEvent) => {
//         return {
//             x: event.clientX,
//             y: event.clientY
//         }
//     }).filter(value => {
//         return value.x > 500;
//     });


// source.subscribe(
//     value => console.log(`value: ${value.x}`),
//     error => console.log(`error: ${error}`),
//     () => console.log('Complete')
// );
let input =<HTMLInputElement>document.getElementById('input');
let unsuscribe = document.getElementById('unsuscribe');
let button = document.getElementById('button');
let output = document.getElementById('output');

let click = Observable.fromEvent(button, 'click');
let clickUnsuscribe = Observable.fromEvent(unsuscribe,'click');
let subject = new Subject();

let clickButtonSubscription = click.subscribe(
    event => {
        console.log(`click: ${input.value}`);
        subject.next(input.value);
    },
    error => console.log(`Error : ${error}`),
    () => console.log('Complete')
);

clickUnsuscribe.subscribe( x => {
  clickButtonSubscription.unsubscribe();
});

subject.subscribe (
    value => {
        console.log(`Subject: ${value}`);
        let div = document.createElement('div');
        div.innerText = value.toString();
        output.appendChild(div);
    },
    error => console.log(`value :${error}`),
    () => console.log('Complete')
);

/*
function load(url: string){
Observable.create(observer => {
    let xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', () => {
        if(xhr.status === 200)
        {
            let starwars = JSON.parse(xhr.responseText);
            observer.next(starwars);
        }
        else
        {
            observer.error(xhr.statusText);
        }

      xhr.open('GET', url);
      xhr.send();
});


});
}

function renderStarwars(starwars)
{
    starwars.array.forEach(element => {
        let div = document.createElement('div');
        div.innerText = element.name;
        output.appendChild(div);
    });
}

source.flatMap( x => load('starwars.json'))
     .subscribe(
        value => renderStarwars(value),
        error => console.log(`value: ${error}`),
        () => console.log('complete')
     );
*/
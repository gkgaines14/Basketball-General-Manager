import {chicagoBulls,newYorkKnicks,sanAntonioSpurs,milwaukeeBucks,somersetSpartans,freeAgents} from "./game_data.js"

console.log('landing func')
console.log(freeAgents.roster)

// const homeTeamTiles = document.querySelectorAll('.home-s-tile');
// const homeBenchTiles = document.querySelectorAll('.home-b-tile');
// const startGame = document.getElementById('save-button');

const freeAgentList= document.getElementById('free-agent-list');

// let homeInGame = [];
// let homeOnBench =[];

// saveButtom.addEventListener('click',saveRoster);


// copies the roster import
// const gameRoster = [
//     {starters:[...homeTeam[0]['starters']]},
//     {bench:[...homeTeam[1]['bench']]}
// ]

// setStarters();
// setBench();

setFreeAgents();

const draggables = document.querySelectorAll('.name-box');
const containers = document.querySelectorAll('.position-tile');


function setFreeAgents(){

    freeAgents.roster.forEach(item=>{
        console.log(item.name)
        // console.log('h',homeTeam)
        const tile = document.createElement('div')
        tile.classList.add('position-tile')
        // tile.setAttribute('draggable',"true")
        tile.innerHTML =`
        <div class="name-box" draggable=true>
        <i class="fas fa-grip-lines"></i>
        <p class="name" data-loc=court data-pid="${11111}">${item.name} (${3})</p>
        </div>
        `
        freeAgentList.appendChild(tile)
        
        
        // homeInGame.push(gameRoster[0]['starters'][0])
        // gameRoster[0]['starters'].shift()

    })


}

// function setStarters(){

//     homeTeamTiles.forEach(item=>{
//         // console.log('r', roster)
//         // console.log('h',homeTeam)
//         const tile = document.createElement('div')
//         tile.classList.add('name-box')
//         tile.setAttribute('draggable',"true")
//         tile.innerHTML =`
//         <i class="fas fa-grip-lines"></i>
//         <p class="name" data-loc=court data-pid="${gameRoster[0]['starters'][0]['pid']}">${gameRoster[0]['starters'][0]['name']} (${gameRoster[0]['starters'][0]['rating']})</p>  
//         `
//         item.appendChild(tile)
        
        
//         homeInGame.push(gameRoster[0]['starters'][0])
//         gameRoster[0]['starters'].shift()

//     })


// }


// function setBench(){

//     homeBenchTiles.forEach(item=>{
//         if(gameRoster[1]['bench'].length==0){

//         }else{
//         const tile = document.createElement('div')
//         tile.classList.add('name-box')
//         tile.setAttribute('draggable',"true")
//         tile.innerHTML =`
//         <i class="fas fa-grip-lines"></i>
//         <p class="name" data-loc="bench" data-pid="${gameRoster[1]['bench'][0]['pid']}">${gameRoster[1]['bench'][0]['name']} (${gameRoster[1]['bench'][0]['rating']})</p>  
//         `
//         item.appendChild(tile)
        
//         homeOnBench.push(gameRoster[1]['bench'][0])
//         gameRoster[1]['bench'].shift()

//         }
//     })


// }


// function totalRating(){

// }

draggables.forEach(item=>{
    item.addEventListener('dragstart',()=>{
        item.classList.add('dragging');
        console.log(item)
    })

    item.addEventListener('dragend',()=>{
        item.classList.remove('dragging');
    })

});



containers.forEach(item =>{
    item.addEventListener('dragover',(e)=>{
        e.preventDefault();
    });
    
    item.addEventListener('drop',()=>{
        const selected = document.querySelector('.dragging');
        item.appendChild(selected);
        const test = selected.lastElementChild.dataset.pid
        

        // switch(item.dataset.loc){
        //     case 'homeOnBench': 
        //     console.log(`You moved ${selected.lastElementChild.innerHTML} to the home bench.`);

        //     console.log(test);
        //     break;
        //     case 'homeOnCourt': console.log(`You moved ${selected.lastElementChild.innerHTML} to the home team on-court`);
        //     break;
        //     case 'awayOnBench':  console.log(`You moved ${selected.lastElementChild.innerHTML} to the away bench.`);
        //     break;
        //     default: console.log(`You moved ${selected.lastElementChild.innerHTML} to the away team on-court`);
        // }
        
        // const test = selected.lastChild
        // console.log('drop zone',item)
        // console.log(`You moved ${selected.lastElementChild.innerHTML} to the ${}`)
        // console.log(document.getElementById('h-b-one').dataset.pid);
    });
});


// function saveRoster(){
//     console.log('home team roster',homeTeam)
//     console.log('home in-game',homeInGame)
//     console.log('home bench',homeOnBench)





// }





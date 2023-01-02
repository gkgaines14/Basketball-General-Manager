export {loadLandingPage}
import {leagueTeamList} from "./app_game_data.js";



// loadLandingPage()


function loadLandingPage(){
    const freeAgentList= document.getElementById('free-agent-list');
    let homeTeamRoster = [{
        hpg:{},
        hsg:{},
        hsf:{},
        hpf:{},
        hc:{},
        hb6:{},
        hb7:{},
        hb8:{},
        hb9:{},
        hb10:{},
        hb11:{},
        hb12:{},
        hb13:{}
    }];

    setFreeAgents();

    const draggables = document.querySelectorAll('.name-box');
    const containers = document.querySelectorAll('.position-tile');


    function setFreeAgents(){

        leagueTeamList[0].roster.forEach(item=>{
            // console.log(item.name)
            // console.log('h',homeTeam)
            const tile = document.createElement('div')
            tile.classList.add('position-tile')
            tile.dataset.arr="freeAgent"
            // tile.setAttribute('draggable',"true")
            tile.innerHTML =`
            <div class="name-box" data-pid="${item.id}" draggable=true>
        
            <div class="name-box-player">
            <i class="fas fa-grip-lines"></i>
            <p class="name" data-loc="court">${item.name} (${item.position})</p>
            </div>

            <div class="name-box-ratings">
            <p> Ovr: <span style="color:blue">${item.pRat_overall}</span></p>
            <p> Off: <span style="color:blue">${item.pRat_offOverall}</span></p>
            <p> Def IQ: <span style="color:blue">${item.pRat_defIQ}</span></p>
            </div>

            </div>
            `
            freeAgentList.appendChild(tile)
            
            
            // homeInGame.push(gameRoster[0]['starters'][0])
            // gameRoster[0]['starters'].shift()

        })


    }


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

            console.log(selected.dataset.pid)
            // console.log(item.dataset.arr, item.dataset.pos)

            homeTeamRoster[0][item.dataset.pos] = "greg"
            console.log(homeTeamRoster)
            
        });
    });

}






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
    const dropdowns = document.querySelectorAll('.dropdown');
    const confirmButton = document.querySelector('#confirm-btn');
    
    // let hTeamSelected ="22"


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

    
    dropdowns.forEach(dropdown =>{
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.dropdown-menu');
        const options = dropdown.querySelectorAll('.dropdown-menu li');
        const selected = dropdown.querySelector('.selected');

        select.addEventListener('click', ()=>{
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('dropdown-menu-open');
        });

        options.forEach(option =>{
            option.addEventListener('click',()=>{
                selected.innerText = option.innerText
                // console.log(selected)
                // option.innerText
                select.classList.remove('selected-clicked');

                caret.classList.remove('caret-rotate');

                menu.classList.remove('dropdown-menu-open');

                options.forEach(option=>{
                    option.classList.remove('active');
                });
                option.classList.add('active');
            });
        });
    });

    confirmButton.addEventListener('click',()=>{
        var gameTeams = document.querySelectorAll('.active');
        sessionStorage.setItem("hTeam",JSON.stringify(leagueTeamList.find(item=>item.tID===gameTeams[0].dataset.tid)));
        sessionStorage.setItem("aTeam",JSON.stringify(leagueTeamList.find(item=>item.tID===gameTeams[1].dataset.tid)));
        
        // sessionStorage.setItem("hTeam",hTeam);
        // sessionStorage.setItem("aTeam",aTeam);

        window.location.href = "sim_game_page.html";

    });
    
}





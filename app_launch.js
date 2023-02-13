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
        hBenchOne:{},
        hBenchTwo:{},
        hBenchThree:{},
        hBenchFour:{},
        hBenchFive:{},
        hBenchSix:{},
        hBenchSeven:{},
        hBenchEight:{},
    }];

    let awayTeamRoster = [{
        apg:{},
        asg:{},
        asf:{},
        apf:{},
        ac:{},
        aBenchOne:{},
        aBenchTwo:{},
        aBenchThree:{},
        aBenchFour:{},
        aBenchFive:{},
        aBenchSix:{},
        aBenchSeven:{},
        aBenchEight:{},
    }];
    
    setFreeAgents();
    
    const draggables = document.querySelectorAll('.name-box');
    const containers = document.querySelectorAll('.position-tile');
    const dropdowns = document.querySelectorAll('.dropdown');
    const confirmButton = document.querySelector('#confirm-btn');
    const gmRoster = document.querySelector('#gm-roster')
    const cpuRoster = document.querySelector('#cpu-roster')
    

    function setFreeAgents(){

        leagueTeamList[0].roster.forEach(item=>{
            const tile = document.createElement('div')
            tile.classList.add('position-tile','filled')
            tile.dataset.arr="freeAgent"
            tile.innerHTML =`
            <div class="name-box" data-pid="${item.id}" draggable=true>
        
            <div class="name-box-player">
            <i class="fas fa-grip-lines"></i>
            <p class="name" data-loc="court">${item.firstName} ${item.lastName} (${item.position})</p>
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
            // console.log('drag start',item.dataset.pid)
            item.parentElement.classList.remove('filled')
            item.parentElement.classList.add('empty')
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
            
            console.log(item)
            
            if(item.classList.contains('filled')){
                console.log('filled')
            }else{
                item.appendChild(selected);
                item.classList.remove('empty')
                item.classList.add('filled')
            }


            // if(item.lastChild.className='name-box'){
            //     console.log('no')
            // }else{
            // }
            // console.log(item.lastChild.className=)
            // // console.log(item.dataset.arr, item.dataset.pos)

            // homeTeamRoster[0][item.dataset.pos] = "greg"
            // console.log(homeTeamRoster)
            
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
        // Set Teams Selections
        var gameTeams = document.querySelectorAll('.active');
        sessionStorage.setItem("hTeam",JSON.stringify(leagueTeamList.find(item=>item.tID===gameTeams[0].dataset.tid)));
        sessionStorage.setItem("aTeam",JSON.stringify(leagueTeamList.find(item=>item.tID===gameTeams[1].dataset.tid)));

        //Set Home Team Roster
        
        const gmArray = gmRoster.querySelectorAll('.home-s-tile')
        gmArray.forEach(item=>{
            if(item.lastElementChild.dataset.pid){
                leagueTeamList[0].roster.find(slot=>slot.id===Number(item.lastElementChild.dataset.pid)).benchStatus = item.dataset.benchStatus;
                homeTeamRoster[0][item.dataset.pos]=leagueTeamList[0].roster.find(slot=>slot.id===Number(item.lastElementChild.dataset.pid));
            }else{
                homeTeamRoster[0][item.dataset.pos]={id:1001,firstName:'',lastName:'',position:'',positionName:'Power Forward',boxscore:{points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0,fatigue:99},benchStatus:'',inactive:'n',pRat_overall:95,pRat_offOverall:86,pRat_closeShot:95, pRat_midShot:83, pRat_longShot:75, pRat_freeThrow:68, pRat_offIQ:91, pRat_speed:90, pRat_strength:94, pRat_jumping:85, pRat_stamina:98, pRat_durability:91, pRat_dunking:95, pRat_andOne:97, pRat_passing:84, pRat_ballHandle:87, pRat_defIQ:90, pRat_intDef:92, pRat_perDef:92, pRat_steal:80, pRat_block:82, pRat_helpDef:96, pRat_offRebound:75, pRat_defRebound:92}
            }
        })

        sessionStorage.setItem("hTeamRoster",JSON.stringify(homeTeamRoster));


        //Set Away Team Roster

        const cpuArray = cpuRoster.querySelectorAll('.away-s-tile')
        console.log(cpuArray)
        console.log(gmArray)

        cpuArray.forEach(item=>{
            if(item.lastElementChild.dataset.pid){
                leagueTeamList[0].roster.find(slot=>slot.id===Number(item.lastElementChild.dataset.pid)).benchStatus = item.dataset.benchStatus;
                awayTeamRoster[0][item.dataset.pos]=leagueTeamList[0].roster.find(slot=>slot.id===Number(item.lastElementChild.dataset.pid));
            }else{
                awayTeamRoster[0][item.dataset.pos]={id:1002,firstName:'',lastName:'',position:'',positionName:'Power Forward',boxscore:{points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0,fatigue:99},benchStatus:'',inactive:'n',pRat_overall:95,pRat_offOverall:86,pRat_closeShot:95, pRat_midShot:83, pRat_longShot:75, pRat_freeThrow:68, pRat_offIQ:91, pRat_speed:90, pRat_strength:94, pRat_jumping:85, pRat_stamina:98, pRat_durability:91, pRat_dunking:95, pRat_andOne:97, pRat_passing:84, pRat_ballHandle:87, pRat_defIQ:90, pRat_intDef:92, pRat_perDef:92, pRat_steal:80, pRat_block:82, pRat_helpDef:96, pRat_offRebound:75, pRat_defRebound:92}
            }
        })

        sessionStorage.setItem("aTeamRoster",JSON.stringify(awayTeamRoster));


        // Validity Check
        
        window.location.href = "sim_game_page.html";

    });
    
}




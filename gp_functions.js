export {loadLandingPage,launchSim}
import {leagueTeamList} from "./app_game_data.js";
import {testSim} from "./gameplay_functions.js"

// Launch Landing Page
function loadLandingPage(){
    const freeAgentList= document.getElementById('free-agent-list');
    let homeTeamRoster = [{
        pg:{},
        sg:{},
        sf:{},
        pf:{},
        c:{},
        BenchOne:{},
        BenchTwo:{},
        BenchThree:{},
        BenchFour:{},
        BenchFive:{},
        BenchSix:{},
        BenchSeven:{},
        BenchEight:{},
    }];

    let awayTeamRoster = [{
        pg:{},
        sg:{},
        sf:{},
        pf:{},
        c:{},
        BenchOne:{},
        BenchTwo:{},
        BenchThree:{},
        BenchFour:{},
        BenchFive:{},
        BenchSix:{},
        BenchSeven:{},
        BenchEight:{},
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
            <p class="name">${item.firstName} ${item.lastName} (${item.position})</p>
            </div>

            <div class="name-box-ratings">
            <p> Ovr: <span style="color:blue">${item.pRat_overall}</span></p>
            <p> Off: <span style="color:blue">${item.pRat_offOverall}</span></p>
            <p> Def IQ: <span style="color:blue">${item.pRat_defIQ}</span></p>
            </div>

            </div>
            `
            freeAgentList.appendChild(tile)

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
            
            if(item.classList.contains('filled')){
                console.log('filled')
            }else{
                item.appendChild(selected);
                item.classList.remove('empty')
                item.classList.add('filled')
            }
            
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
        let hTeam = leagueTeamList.find(item=>item.tID===gameTeams[0].dataset.tid)
        let aTeam = leagueTeamList.find(item=>item.tID===gameTeams[1].dataset.tid)
        // sessionStorage.setItem("aTeam",JSON.stringify(leagueTeamList.find(item=>item.tID===gameTeams[1].dataset.tid)));

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

        hTeam.roster = homeTeamRoster
        console.log(hTeam)

        sessionStorage.setItem("hTeam",JSON.stringify(hTeam));


        //Set Away Team Roster

        const cpuArray = cpuRoster.querySelectorAll('.away-s-tile')

        cpuArray.forEach(item=>{
            if(item.lastElementChild.dataset.pid){
                leagueTeamList[0].roster.find(slot=>slot.id===Number(item.lastElementChild.dataset.pid)).benchStatus = item.dataset.benchStatus;
                awayTeamRoster[0][item.dataset.pos]=leagueTeamList[0].roster.find(slot=>slot.id===Number(item.lastElementChild.dataset.pid));
            }else{
                awayTeamRoster[0][item.dataset.pos]={id:1002,firstName:'',lastName:'',position:'',positionName:'Power Forward',boxscore:{points:0,assists:0,rebounds:0,steals:0,blocks:0,FG:0,FGA:0,fouls:0,FT:0,FTA:0,TP:0,TPA:0,TO:0,minutes:0,fatigue:99},benchStatus:'',inactive:'n',pRat_overall:95,pRat_offOverall:86,pRat_closeShot:95, pRat_midShot:83, pRat_longShot:75, pRat_freeThrow:68, pRat_offIQ:91, pRat_speed:90, pRat_strength:94, pRat_jumping:85, pRat_stamina:98, pRat_durability:91, pRat_dunking:95, pRat_andOne:97, pRat_passing:84, pRat_ballHandle:87, pRat_defIQ:90, pRat_intDef:92, pRat_perDef:92, pRat_steal:80, pRat_block:82, pRat_helpDef:96, pRat_offRebound:75, pRat_defRebound:92}
            }
        })

        aTeam.roster = awayTeamRoster
        sessionStorage.setItem("aTeam",JSON.stringify(aTeam));


        // Validity Check
        
        window.location.href = "sim_game_page.html";

    });
    
}

// Run Simulation
function launchSim(){

    let homeTeam = JSON.parse(sessionStorage.getItem("hTeam"));
    let awayTeam = JSON.parse(sessionStorage.getItem("aTeam"));
    // let homeRoster = JSON.parse(sessionStorage.getItem("hTeamRoster"));
    // let awayRoster = JSON.parse(sessionStorage.getItem("aTeamRoster"));

    const hpg = document.querySelector('#h-pg-name');
    const hsg = document.querySelector('#h-sg-name');
    const hsf = document.querySelector('#h-sf-name');
    const hpf = document.querySelector('#h-pf-name');
    const hc = document.querySelector('#h-c-name');
    const hBenchOne = document.querySelector('#h-b-one-name');
    const hBenchTwo = document.querySelector('#h-b-two-name');
    const hBenchThree = document.querySelector('#h-b-three-name');
    const hBenchFour = document.querySelector('#h-b-four-name');
    const hBenchFive = document.querySelector('#h-b-five-name');
    const hBenchSix = document.querySelector('#h-b-six-name');
    const hBenchSeven = document.querySelector('#h-b-seven-name');
    const hBenchEight = document.querySelector('#h-b-eight-name');

    const homePosList = [
        [hpg,'pg'],
        [hsg,'sg'],
        [hsf,'sf'],
        [hpf,'pf'],
        [hc,'c'],
        [hBenchOne,'BenchOne'],
        [hBenchTwo,'BenchTwo'],
        [hBenchThree,'BenchThree'],
        [hBenchFour,'BenchFour'],
        [hBenchFive,'BenchFive'],
        [hBenchSix,'BenchSix'],
        [hBenchSeven,'BenchSeven'],
        [hBenchEight,'BenchEight'],
    ];

    const apg = document.querySelector('#a-pg-name');
    const asg = document.querySelector('#a-sg-name');
    const asf = document.querySelector('#a-sf-name');
    const apf = document.querySelector('#a-pf-name');
    const ac = document.querySelector('#a-c-name');
    const aBenchOne = document.querySelector('#a-b-one-name');
    const aBenchTwo = document.querySelector('#a-b-two-name');
    const aBenchThree = document.querySelector('#a-b-three-name');
    const aBenchFour = document.querySelector('#a-b-four-name');
    const aBenchFive = document.querySelector('#a-b-five-name');
    const aBenchSix = document.querySelector('#a-b-six-name');
    const aBenchSeven = document.querySelector('#a-b-seven-name');
    const aBenchEight = document.querySelector('#a-b-eight-name');
    
    const awayPosList = [
        [apg,'pg'],
        [asg,'sg'],
        [asf,'sf'],
        [apf,'pf'],
        [ac,'c'],
        [aBenchOne,'BenchOne'],
        [aBenchTwo,'BenchTwo'],
        [aBenchThree,'BenchThree'],
        [aBenchFour,'BenchFour'],
        [aBenchFive,'BenchFive'],
        [aBenchSix,'BenchSix'],
        [aBenchSeven,'BenchSeven'],
        [aBenchEight,'BenchEight'],
    ];


    // Sets team data and styles
    let root = document.documentElement.style;

    // Load home team
    root.setProperty('--home-p-color',homeTeam.primaryColor);
    root.setProperty('--home-s-color',homeTeam.secondaryColor);
    root.setProperty('--home-color-high',homeTeam.highColor);
    root.setProperty('--home-logo',homeTeam.logo);
    document.getElementById('h-city').innerHTML = homeTeam.city;
    document.getElementById('h-team-name').innerHTML = homeTeam.teamName;

    // Load away team
    root.setProperty('--away-p-color',awayTeam.primaryColor);
    root.setProperty('--away-s-color',awayTeam.secondaryColor);
    root.setProperty('--away-color-high',awayTeam.highColor);
    root.setProperty('--away-logo',awayTeam.logo);
    document.getElementById('a-city').innerHTML = awayTeam.city;
    document.getElementById('a-team-name').innerHTML = awayTeam.teamName;

    // Mouseover for position icon
    const boxscoreTiles = document.querySelectorAll('.boxscore-tile');
    boxscoreTiles.forEach(tile => {
        tile.addEventListener('mouseover',()=>{
            if(tile.classList.contains('home')){
                tile.firstChild.nextElementSibling.className = 'h-pos-icon';
            }else if(tile.classList.contains('away')){
                tile.firstChild.nextElementSibling.className = 'a-pos-icon';
            }
            // Fatigue Bar
            tile.lastElementChild.style.display = 'block';
            tile.lastElementChild.firstElementChild.style.height=`${(tile.childNodes[5].lastElementChild.innerText)*.20}px`;
            if(tile.childNodes[5].lastElementChild.innerText<75 && tile.childNodes[5].lastElementChild.innerText>49){
                tile.lastElementChild.firstElementChild.style.backgroundColor='orange';
            }else if(tile.childNodes[5].lastElementChild.innerText<50){
                tile.lastElementChild.firstElementChild.style.backgroundColor='red';

            }
        })

        tile.addEventListener('mouseout',()=>{
            if(tile.classList.contains('away')||tile.classList.contains('home')){
                tile.firstChild.nextElementSibling.className = 'b-pos-icon';
            }
            tile.lastElementChild.style.display = 'none';

        });
    });

    // Post Player Data
    postPlayerData();

    function postPlayerData(){
        // Post Home Team Data
        homePosList.forEach(item=>{
            //Post Player Name
            console.log(item[1])
            console.log(homeTeam.roster[0][item[1]])
            item[0].innerText = `${homeTeam.roster[0][item[1]].firstName.charAt(0)}. ${homeTeam.roster[0][item[1]].lastName}`;
            // Post Player Stats
            item[0].nextElementSibling.querySelectorAll('.stat-box').forEach(stat => {
                stat.innerText = homeTeam.roster[0][item[1]].boxscore[stat.dataset.statCat];
            });

            if(homeTeam.roster[0][item[1]].lastName, homeTeam.roster[0][item[1]].benchStatus==='bench'){
                item[0].parentElement.firstChild.nextElementSibling.innerText = homeTeam.roster[0][item[1]].position
            };
        });
        
        // Post Away Team Data
        awayPosList.forEach(item=>{
            //Post Player Name
            item[0].innerText = `${awayTeam.roster[0][item[1]].firstName.charAt(0)}. ${awayTeam.roster[0][item[1]].lastName}`;
            // Post Player Stats
            item[0].nextElementSibling.querySelectorAll('.stat-box').forEach(stat => {
                stat.innerText = awayTeam.roster[0][item[1]].boxscore[stat.dataset.statCat];
            });

            if(awayTeam.roster[0][item[1]].lastName, awayTeam.roster[0][item[1]].benchStatus==='bench'){
                item[0].parentElement.firstChild.nextElementSibling.innerText = awayTeam.roster[0][item[1]].position;
            };
        });

    };



testSim(homeTeam,awayTeam)
// console.log(homeTeam)
// console.log(awayTeam)
}





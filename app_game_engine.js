// import * as gamePlay from "./gameplay_functions.js" 
// import {homeTeamRoster} from "./app_launch.js"
import { leagueTeams } from "./player_generator.js"
import {leagueTeamList} from "./app_game_data.js"
import {loadLandingPage} from "./app_launch.js"


const app = {
    
    init: ()=>{
        let page = document.body.id

        switch(page){
            case 'launch-page': 
            loadLandingPage();
            console.log(page)
            break;
            default: 
            app.loadSimWindow()
            console.log(page)
        };
        
    },
    
    loadGame: ()=>{
        loadLandingPage();
    },

    loadSimWindow: ()=>{

        let homeTeam = JSON.parse(sessionStorage.getItem("hTeam"));
        let awayTeam = JSON.parse(sessionStorage.getItem("aTeam"));
        let homeRoster = JSON.parse(sessionStorage.getItem("hTeamRoster"));
        let awayRoster = JSON.parse(sessionStorage.getItem("aTeamRoster"));

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
            [hpg,'hpg'],
            [hsg,'hsg'],
            [hsf,'hsf'],
            [hpf,'hpf'],
            [hc,'hc'],
            [hBenchOne,'hBenchOne'],
            [hBenchTwo,'hBenchTwo'],
            [hBenchThree,'hBenchThree'],
            [hBenchFour,'hBenchFour'],
            [hBenchFive,'hBenchFive'],
            [hBenchSix,'hBenchSix'],
            [hBenchSeven,'hBenchSeven'],
            [hBenchEight,'hBenchEight'],
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
            [apg,'apg'],
            [asg,'asg'],
            [asf,'asf'],
            [apf,'apf'],
            [ac,'ac'],
            [aBenchOne,'aBenchOne'],
            [aBenchTwo,'aBenchTwo'],
            [aBenchThree,'aBenchThree'],
            [aBenchFour,'aBenchFour'],
            [aBenchFive,'aBenchFive'],
            [aBenchSix,'aBenchSix'],
            [aBenchSeven,'aBenchSeven'],
            [aBenchEight,'aBenchEight'],
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
                tile.lastElementChild.firstElementChild.style.height=`${(tile.childNodes[5].lastElementChild.innerText)*.38}px`;
                if(tile.childNodes[5].lastElementChild.innerText<59){
                    tile.lastElementChild.firstElementChild.style.backgroundColor='red';
                }
                // shift stats left
                // tile.childNodes[1].style.marginLeft= '20px'
                tile.childNodes[5].style.marginRight= '20px'
                // tile.childNodes[3].style.marginLeft= '10px'
            })

            tile.addEventListener('mouseout',()=>{
                if(tile.classList.contains('away')||tile.classList.contains('home')){
                    tile.firstChild.nextElementSibling.className = 'b-pos-icon';
                }
                tile.lastElementChild.style.display = 'none';

                // Reset Position and Name
                tile.childNodes[5].style.marginRight= '0px'
                // tile.childNodes[3].style.marginBottom= '0px'
            });
        });

        // Post Player Data
        postPlayerData();

        function postPlayerData(){
            // Post Home Team Data
            homePosList.forEach(item=>{
                //Post Player Name
                item[0].innerText = `${homeRoster[0][item[1]].firstName.charAt(0)}. ${homeRoster[0][item[1]].lastName}`;
                // Post Player Stats
                item[0].nextElementSibling.querySelectorAll('.stat-box').forEach(stat => {
                    stat.innerText = homeRoster[0][item[1]].boxscore[stat.dataset.statCat];
                });

                if(homeRoster[0][item[1]].lastName, homeRoster[0][item[1]].benchStatus==='bench'){
                    item[0].parentElement.firstChild.nextElementSibling.innerText = homeRoster[0][item[1]].position
                };
            });

            // Post Away Team Data
            awayPosList.forEach(item=>{
                //Post Player Name
                item[0].innerText = `${awayRoster[0][item[1]].firstName.charAt(0)}. ${awayRoster[0][item[1]].lastName}`;
                // Post Player Stats
                item[0].nextElementSibling.querySelectorAll('.stat-box').forEach(stat => {
                    stat.innerText = awayRoster[0][item[1]].boxscore[stat.dataset.statCat];
                });

                if(awayRoster[0][item[1]].lastName, awayRoster[0][item[1]].benchStatus==='bench'){
                    item[0].parentElement.firstChild.nextElementSibling.innerText = awayRoster[0][item[1]].position;
                };
            });

        };

    }
}



app.init();
// app.loadGame()
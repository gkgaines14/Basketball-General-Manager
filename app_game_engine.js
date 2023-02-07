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
        let homeTeam = JSON.parse(sessionStorage.getItem("hTeam"))
        let awayTeam = JSON.parse(sessionStorage.getItem("aTeam"))
        let homeRoster = JSON.parse(sessionStorage.getItem("hTeamRoster"))

        const hpg = document.querySelector('#h-pg-name')
        const hsg = document.querySelector('#h-sg-name')
        const hsf = document.querySelector('#h-sf-name')
        const hpf = document.querySelector('#h-pf-name')
        const hc = document.querySelector('#h-c-name')
        const hBenchOne = document.querySelector('#h-bench-one')
        const hBenchTwo = document.querySelector('#h-bench-two')
        const hBenchThree = document.querySelector('#h-bench-three')
        const hBenchFour = document.querySelector('#h-bench-four')
        const hBenchFive = document.querySelector('#h-bench-five')
        const hBenchSix = document.querySelector('#h-bench-six')
        const hBenchSeven = document.querySelector('#h-bench-seven')
        const hBenchEight = document.querySelector('#h-bench-eight')
        const hBenchNine = document.querySelector('#h-bench-nine')

        const apg = document.querySelector('#a-pg-name')
        const asg = document.querySelector('#a-g-name')
        const asf = document.querySelector('#a-sf-name')
        const apf = document.querySelector('#a-pf-name')
        const ac = document.querySelector('#a-c-name')
        const aBenchOne = document.querySelector('#a-bench-one')
        const aBenchTwo = document.querySelector('#a-bench-two')
        const aBenchThree = document.querySelector('#a-bench-three')
        const aBenchFour = document.querySelector('#a-bench-four')
        const aBenchFive = document.querySelector('#a-bench-five')
        const aBenchSix = document.querySelector('#a-bench-six')
        const aBenchSeven = document.querySelector('#a-bench-seven')
        const aBenchEight = document.querySelector('#a-bench-eight')
        const aBenchNine = document.querySelector('#a-bench-nine')

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
            })
            tile.addEventListener('mouseout',()=>{
                if(tile.classList.contains('away')||tile.classList.contains('home')){
                    tile.firstChild.nextElementSibling.className = 'b-pos-icon'
                }
            });
        });

        // Post Player Data
        postPlayerData();

        function postPlayerData(){

            
            let test = hpg.parentElement.lastElementChild.querySelectorAll('.stat-box');
            
            console.log(homeRoster[0].hsg.boxscore)

            test.forEach(item=>console.log(item.dataset.statCat))



            console.log(homeRoster[0].hpg.boxscore.points)

            // PG Data
            hpg.innerText = `${homeRoster[0].hpg.firstName.charAt(0)}. ${homeRoster[0].hpg.lastName}`;
            hpg.parentElement.lastElementChild.querySelectorAll('.stat-box').forEach(item => {
                item.innerText = homeRoster[0].hpg.boxscore[item.dataset.statCat]
            });

            // SG Data
            hsg.innerText = `${homeRoster[0].hsg.firstName.charAt(0)}. ${homeRoster[0].hsg.lastName}`;
            hsg.parentElement.lastElementChild.querySelectorAll('.stat-box').forEach(item => {
                item.innerText = homeRoster[0].hsg.boxscore[item.dataset.statCat]
            });

            // SF Data
            hsf.innerText = `${homeRoster[0].hsf.firstName.charAt(0)}. ${homeRoster[0].hsf.lastName}`;
            hsf.parentElement.lastElementChild.querySelectorAll('.stat-box').forEach(item => {
                item.innerText = homeRoster[0].hsf.boxscore[item.dataset.statCat]
            });

            // PF Data
            hpf.innerText = `${homeRoster[0].hpf.firstName.charAt(0)}. ${homeRoster[0].hpf.lastName}`;
            hpf.parentElement.lastElementChild.querySelectorAll('.stat-box').forEach(item => {
                item.innerText = homeRoster[0].hpf.boxscore[item.dataset.statCat]
            });

            // C Data
            hc.innerText = `${homeRoster[0].hc.firstName.charAt(0)}. ${homeRoster[0].hc.lastName}`;
            hc.parentElement.lastElementChild.querySelectorAll('.stat-box').forEach(item => {
                item.innerText = homeRoster[0].hc.boxscore[item.dataset.statCat]
            });
            




        };

    }
}



app.init()
// app.loadGame()
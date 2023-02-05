// import * as gamePlay from "./gameplay_functions.js" 
// import {homeTeamRoster} from "./app_launch.js"
import { leagueTeams } from "./player_generator.js"
import {leagueTeamList} from "./app_game_data.js"
import {loadLandingPage} from "./app_launch.js"



// const freeAgentList= document.getElementById('free-agent-list');


// loadLandingPage()


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

        // Sets team data and styles
        let root = document.documentElement.style;

        //Load home team
        root.setProperty('--home-p-color',homeTeam.primaryColor);
        root.setProperty('--home-s-color',homeTeam.secondaryColor);
        root.setProperty('--home-color-high',homeTeam.highColor);
        root.setProperty('--home-logo',homeTeam.logo);
        document.getElementById('h-city').innerHTML = homeTeam.city;
        document.getElementById('h-team-name').innerHTML = homeTeam.teamName;

        //Load away team
        root.setProperty('--away-p-color',awayTeam.primaryColor);
        root.setProperty('--away-s-color',awayTeam.secondaryColor);
        root.setProperty('--away-color-high',awayTeam.highColor);
        root.setProperty('--away-logo',awayTeam.logo);
        document.getElementById('a-city').innerHTML = awayTeam.city;
        document.getElementById('a-team-name').innerHTML = awayTeam.teamName;

    },

}




app.init()
// app.loadGame()
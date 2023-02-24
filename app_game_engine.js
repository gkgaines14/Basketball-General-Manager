// import * as gamePlay from "./gameplay_functions.js" 
// import {homeTeamRoster} from "./app_launch.js"
// import { leagueTeams } from "./player_generator.js"
import {leagueTeamList} from "./app_game_data.js"
import {loadLandingPage,launchSim,loadPlayerGenerator} from "./gp_functions.js"


const app = {
    
    init: ()=>{
        let page = document.body.id

        switch(page){
            case 'launch-page': 
            loadLandingPage();
            console.log(page)
            break;
            case 'player-generator': 
            loadPlayerGenerator();
            console.log(page)
            break;
            default: 
            launchSim()
            console.log(page)
        };
        
    },
}


app.init();

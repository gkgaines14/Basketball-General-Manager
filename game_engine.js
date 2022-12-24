// import * as gamePlay from "./gameplay_functions.js" 
import {chicagoBulls,newYorkKnicks,sanAntonioSpurs,milwaukeeBucks,somersetSpartans,freeAgents} from "./game_data.js"


let homeTeam = chicagoBulls 
let awayTeam = sanAntonioSpurs
console.log(freeAgents)



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

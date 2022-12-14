// import * as gamePlay from "./gameplay_functions.js" 
import {chicagoBulls,newYorkKnicks,sanAntonioSpurs} from "./game_data.js"

console.log('hi ')
console.log(newYorkKnicks)

let homeTeam = newYorkKnicks
let awayTeam = sanAntonioSpurs

// Sets team data and styles
let root=document.documentElement.style



root.setProperty('--home-color',homeTeam.primaryColor);
root.setProperty('--home-logo',homeTeam.logo);
root.setProperty('--home-color-high',homeTeam.highColor);
document.getElementById('h-city').innerHTML = homeTeam.city;
document.getElementById('h-team-name').innerHTML = homeTeam.teamName;



// Load Away Team
root.setProperty('--away-color',awayTeam.primaryColor);
root.setProperty('--away-logo',awayTeam.logo);
root.setProperty('--away-color-high',awayTeam.highColor);
document.getElementById('a-city').innerHTML = awayTeam.city;
document.getElementById('a-team-name').innerHTML = awayTeam.teamName;






// root.setProperty('--home-color-high',chicagoBulls.colorHigh)
// root.setProperty('--home-color',chicagoBulls.secondaryColor)
// root.setProperty('--home-color',chicagoBulls.secondaryColor)
// root.setProperty('--home-color',chicagoBulls.secondaryColor)
// root.setProperty('--home-color',chicagoBulls.secondaryColor)




// root.setProperty('--home-color',newYorkKnicks.secondaryColor)
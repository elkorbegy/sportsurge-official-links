const fetchSportsData = async (apiUrl, containerId) => {
    let matchesFound = false;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const Sports = data.games;
    const leagueName = data.competitions[0].name;
    const leagueSlug = data.competitions[0].nameForURL;
    const container = document.querySelector(`#${containerId}`);
    container.innerHTML = ''; // Clear the container before adding today's fixtures

    // Render all scheduled and live games
    for (const sport of Sports) {
        if (sport.statusText !== "Ended" && sport.statusText !== "WalkOver" && sport.statusText !== "Postponed" && sport.statusText !== "Final" && sport.statusText !== "Final (OT)" && sport.statusText !== "After Penalties" && sport.statusText !== "Postponed" && sport.statusText !== "Final (SO)" && sport.statusText !== "Final (Ex)" && sport.statusText !== "Abandoned") {
            const gameDate = new Date(sport.startTime);
            if (sport.statusText === "Scheduled") {
                if (
                    gameDate.getDate() === today.getDate() &&
                    gameDate.getMonth() === today.getMonth() &&
                    gameDate.getFullYear() === today.getFullYear()
                ) {
                    const estTimeStr = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    matchesFound = true;
                    const homeTeam = sport.homeCompetitor.name;
                    const awayTeam = sport.awayCompetitor.name;
                    const HLogo = sport.homeCompetitor.id;
                    const ALogo = sport.awayCompetitor.id;
                    const link = `https://w.sportsurge.uno/#${homeTeam} vs ${awayTeam}`;

                    const teamContainer = document.createElement('div');
                    teamContainer.innerHTML = `
                    <div class="row" onclick="window.open('${link}', '_blank')">
                        <div id='matchcard' class="col column mt-1">
                            <div class="row">
                                <div class="col-3">
                                    <span id='leaguenames'>${leagueName}</span>
                                </div>
                                <div id='afterleaguename' class="col-1"></div>
                                <div class="col-5">
                                    ${homeTeam} vs ${awayTeam}
                                </div>
                                <div id='timeofthematch' class="col-3">
                                    ${estTimeStr}
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    container.appendChild(teamContainer);
                }
            }
            // If the game is live
            if (sport.statusText !== "Scheduled" && sport.statusText !== "Ended") {
                matchesFound = true;
                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const link = `https://w.sportsurge.uno/#${homeTeam} vs ${awayTeam}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `<div class="row" onclick="window.open('${link}', '_blank')">
                    <div id='matchcard' class="col column mt-1">
                        <div class="row">
                            <div class="col-3">
                                <span id='leaguenames'>${leagueName}</span>
                            </div>
                            <div id='afterleaguename' class="col-1"></div>
                            <div class="col-5">
                                ${homeTeam} vs ${awayTeam}
                            </div>
                            <div id="timeofthematch" class="col-3">
                                <span class="live">LIVE NOW!</span>
                            </div>
                        </div>
                    </div>
                </div>`;

                container.appendChild(teamContainer);
            }

            // If the game is ended
            if (sport.statusText === "Ended" || sport.statusText === "Final" || sport.statusText === "Final (OT)" || sport.statusText === "After Penalties") {
                const homeTeam = sport.homeCompetitor.name;
                const awayTeam = sport.awayCompetitor.name;
                const HLogo = sport.homeCompetitor.id;
                const ALogo = sport.awayCompetitor.id;
                const hometeamscore = sport.homeCompetitor.score;
                const awayteamscore = sport.awayCompetitor.score;
                const minu = sport.gameTimeDisplay;
                const link = `https://w.sportsurge.uno/#${homeTeam} vs ${awayTeam}`;

                const teamContainer = document.createElement('div');
                teamContainer.innerHTML = `<div class="row" onclick="window.open('${link}', '_blank')">
                    <div id='matchcard' class="col column mt-1">
                        <div class="row">
                            <div class="col-3">
                                <span id='leaguenames'>${leagueName}</span>
                            </div>
                            <div id='afterleaguename' class="col-1"></div>
                            <div class="col-5">
                                ${homeTeam} ${hometeamscore} : ${awayTeam} ${awayteamscore}
                            </div>
                            <div id='timeofthematch' class="col-3">
                                <div id="end"><strong>Full Time</strong></div>
                            </div>
                        </div>
                    </div>
                </div>`;

                container.appendChild(teamContainer);
            }
        }
    }

    if (!matchesFound) {
        container.style.display = 'none';
    } else {
        container.style.display = ''; // Ensure the container is visible if matches are found
    }
};

// Example usage for multiple leagues
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=624', 'cafleague');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=7', 'premierleague');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=103', 'nba');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=6064', 'rio');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=366', 'nhl');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=11', 'laliga');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=35', 'ligue1');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=102', 'Libertadores');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=25', 'budesliga');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=17', 'seriaA');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=572', 'championsleague');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=573', 'europaleague');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=13', 'delray');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=104', 'mls');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=649', 'saudi');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=8', 'facup');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=141', 'ligamx');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=623', 'afc');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=438', 'mlb');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=275', 'rolandgarroswomen');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=209', 'rolandgarrosmen');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=215', 'wimbledonmen');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=230', 'usopenmen');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=183', 'australianopenmen');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=106', 'wnba');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=216', 'stuttgart');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=7842', 'valencia');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=213', 'hertogenbosch');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=240', 'madridopen');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=6316', 'euro2024');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=595', 'copa-america');
fetchSportsData('https://webws.365scores.com/web/games/current/?appTypeId=5&competitions=7244', 'nba-summer-leauge');

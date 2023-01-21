//linking HTML to JS through ID tags
let homeBtn = document.getElementById("homeBtn");
let rulesBtn = document.getElementById("rulesBtn");
let modalCloseBtn = document.getElementById("modalCloseBtn");

let mainStage = document.getElementById("mainStage");

let modeSelect = document.getElementById("modeSelect");
let twoPlayerBtn = document.getElementById("twoPlayerBtn");
let vsCompBtn = document.getElementById("vsCompBtn");

let lengthSelect = document.getElementById("lengthSelect");
let bestOf1Btn = document.getElementById("bestOf1Btn");
let bestOf5Btn = document.getElementById("bestOf5Btn");
let bestOf7Btn = document.getElementById("bestOf7Btn");

let rpslsInputs = document.getElementById("rpslsInputs");
let rockBtn = document.getElementById("rockBtn");
let paperBtn = document.getElementById("paperBtn");
let scissorsBtn = document.getElementById("scissorsBtn");
let lizardBtn = document.getElementById("lizardBtn");
let spockBtn = document.getElementById("spockBtn");

let outputArea = document.getElementById("outputArea");
let descriptiveTxt = document.getElementById("descriptiveTxt");

let scoreBoard = document.getElementById("scoreBoard");
let play1Title = document.getElementById("play1Title");
let play1Score = document.getElementById("play1Score");
let play2Title = document.getElementById("play2Title");
let play2Score = document.getElementById("play2Score");

let winnerAnnounce = document.getElementById("winnerAnnounce");
let winnerTxt = document.getElementById("winnerTxt");

let playAgainTxt = document.getElementById("playAgainTxt");
let playAgainBtns = document.getElementById("playAgainBtns");
let playAgainYesBtn = document.getElementById("playAgainYesBtn");
let playAgainNoBtn = document.getElementById("playAgainNoBtn");



//variable that counts the number of rounds
let roundNumber = 0;

//variable that keeps track of the players scores
var p1ScoreCount = 0;
var p2ScoreCount = 0;
var aiScoreCount = 0;

//variable that keeps track of which mode is being played
let modeVar = ""; //toggles between "vsComp" and "vs2p"

//variable that keeps track of how many total rounds will be played
let roundVar = 0;

//variables that keep track of player choices
let p1Choice = "";
let p2Choice = "";
let aiChoice = "";

//variables that handle users names
let p1name = "Player 1";
let p2name = "Player 2";
let ainame = "AI";

//variable that checks if game is over
let gameOver = false;

//variables that define the game's sound library
    //computer beep sounds for generic button clicks
    let compSound1 = new Audio('../assets/sounds/tos-computer-01.mp3');
    let compSound2 = new Audio('../assets/sounds/tos-computer-02.mp3');
    let compSound3 = new Audio('../assets/sounds/tos-computer-03.mp3');
    let compSound4 = new Audio('../assets/sounds/tos-computer-04.mp3');
    let compSound5 = new Audio('../assets/sounds/tos-computer-05.mp3');
    let compSound6 = new Audio('../assets/sounds/tos-computer-06.mp3');

    //vsComp mode button click sounds
    let spockComp1 = new Audio('../assets/sounds/no_ordinary_machine.wav');
    let spockComp2 = new Audio('../assets/sounds/Computer_Error.mp3');

    //2player mode button click sounds
    let spock2pAudio1 = new Audio('../assets/sounds/fascinating6.wav');
    let spock2pAudio2 = new Audio('../assets/sounds/computer_splendid.wav');

    //rules btn click sound
    let sheldon = new Audio('../assets/sounds/Sheldon.mp3');

    //sounds for clicking the spock command in-game
    let spockBtnSfx1 = new Audio('../assets/sounds/Spock_Vulcans_Never_Bluff.mp3');

    //sounds for losing a game in single player
    let loseSfx1 = new Audio('../assets/sounds/wild_goose_pursuit.wav');
    let loseSfx2 = new Audio('../assets/sounds/most_unpleasant.wav');
    let loseSfx3 = new Audio('../assets/sounds/Spock_Illogical.mp3');
    let loseSfx4 = new Audio('../assets/sounds/TwoDimensionalThinking.mp3');
    let loseSfx5 = new Audio('../assets/sounds/Irritating.mp3');
    let loseSfx6 = new Audio('../assets/sounds/AdolescentHands.mp3');
    let loseSfx7 = new Audio('../assets/sounds/SpockUnpleasant.mp3');

    //sounds for winning a game in single player
    let win1p1 = new Audio('Spock_Logic_Impeccable.mp3');
    let win1p2 = new Audio('logic_dazzling.wav');
    let win1p3 = new Audio('Spock_Checkmate.mp3');
    let win1p4 = new Audio('HappySpock.mp3');

    //sounds for game resolution in 2player mode

    //sounds for game start
    let gameStartSfx = new Audio('../assets/sounds/greetings.wav');

    //sounds for choosing not to play again
    let noPlayAgainSfx1 = new Audio('../assets/sounds/Spock_Livelong.mp3');

    //sounds for choosing to play again
    let PlayAgainSfx1 = new Audio('../assets/sounds/SpockDelighted.mp3');

    

//event listeners that determine button behaviors
//home buttons
homeBtn.addEventListener("click", function(){
    HideStuff("reset");
    ResetVariables("hard");
    DescriptiveTxt("homeBtn");
    ComputerBoopSfx();
});

rulesBtn.addEventListener("click", function(){
    sheldon.play();
});

modalCloseBtn.addEventListener("click", function(){
    sheldon.pause();
});

vsCompBtn.addEventListener("click", function(){
    HideStuff("modeSelect");
    modeVar = "vsComp";
    play1Title.textContent = p1name + ":";
    play2Title.textContent = ainame + ":";
    DescriptiveTxt("modeSelectBtn");
    VsSelectSft();
});

twoPlayerBtn.addEventListener("click", function(){
    HideStuff("modeSelect");
    modeVar = "vs2p";
    play1Title.textContent = p1name + ":";
    play2Title.textContent = p2name + ":";
    DescriptiveTxt("modeSelectBtn");
    P2SelectSfx();
});

//rounds select buttons
bestOf1Btn.addEventListener("click", function(){
    HideStuff("lengthSelect");
    roundVar = 1;
    CallAiApi();
    DescriptiveTxt("beginGame");
    UpdateScoreBoard();
    GameStartSfx();
});

bestOf5Btn.addEventListener("click", function(){
    HideStuff("lengthSelect");
    roundVar = 5;
    CallAiApi();
    DescriptiveTxt("beginGame");
    UpdateScoreBoard();
    GameStartSfx();
});

bestOf7Btn.addEventListener("click", function(){
    HideStuff("lengthSelect");  
    roundVar = 7;
    CallAiApi();
    DescriptiveTxt("beginGame");
    UpdateScoreBoard();
    GameStartSfx();
});

//options select buttons
rockBtn.addEventListener("click", function(){
    roundNumber++;
    ResolveChoice("rock");
    ResolveRoundWinner();
    WinnerCheck();
    DescriptiveTxt("optionBtn");
    ComputerBoopSfx();
});

paperBtn.addEventListener("click", function(){
    roundNumber++;
    ResolveChoice("paper");
    ResolveRoundWinner();
    WinnerCheck();
    DescriptiveTxt("optionBtn");
    ComputerBoopSfx();
});

scissorsBtn.addEventListener("click", function(){
    roundNumber++;
    ResolveChoice("scissors");
    ResolveRoundWinner();
    WinnerCheck();
    DescriptiveTxt("optionBtn");
    ComputerBoopSfx();
});

lizardBtn.addEventListener("click", function(){
    roundNumber++;
    ResolveChoice("lizard");
    ResolveRoundWinner();
    WinnerCheck();
    DescriptiveTxt("optionBtn");
    ComputerBoopSfx();
});

spockBtn.addEventListener("click", function(){
    roundNumber++;
    ResolveChoice("spock");
    ResolveRoundWinner();
    WinnerCheck();
    DescriptiveTxt("optionBtn");
    SpockBtnSfx();
});

//play again buttons
playAgainYesBtn.addEventListener("click", function(){
    HideStuff("playAgain");
    ResetVariables("soft");
    CallAiApi();
    PlayAgainSfx();
});

playAgainNoBtn.addEventListener("click", function(){
    HideStuff("reset");
    ResetVariables("hard");
    noPlayAgainSfx();
});


//Custom function that hides elements on the page depending on circumstance
function HideStuff(btn){
    if (btn == "modeSelect"){
        modeSelect.classList.add("hide-element");
        lengthSelect.classList.remove("hide-element");
    } else if (btn == "lengthSelect"){
        lengthSelect.classList.add("hide-element");
        rpslsInputs.classList.remove("hide-element");
        scoreBoard.classList.remove("hide-element");
    } else if (btn == "reset"){
        modeSelect.classList.remove("hide-element");
        lengthSelect.classList.add("hide-element");
        rpslsInputs.classList.add("hide-element");
        scoreBoard.classList.add("hide-element");
        winnerAnnounce.classList.add("hide-element");
        playAgainTxt.classList.add("hide-element");
        playAgainBtns.classList.add("hide-element");
    } else if (btn == "gameEnd"){
        rpslsInputs.classList.add("hide-element");
        winnerAnnounce.classList.remove("hide-element");
        playAgainTxt.classList.remove("hide-element");
        playAgainBtns.classList.remove("hide-element");
    } else if (btn == "playAgain"){
        rpslsInputs.classList.remove("hide-element");
        winnerAnnounce.classList.add("hide-element");
        playAgainTxt.classList.add("hide-element");
        playAgainBtns.classList.add("hide-element");
    }
}

//Function that resolves the AI's choices by calling an external API written for that purpose
function CallAiApi(){
    fetch("https://scottsrpsls.azurewebsites.net/api/RockPaperScissors/GetRandomOption").then(
        response => response.text()
    ).then(
        data => {
            aiChoice = data.toLowerCase();
        }
    );
}

//Custom function that resolves the user input and counts that input for the correct player
function ResolveChoice(choice){
    if (modeVar == "vsComp"){
        p1Choice = choice;
        CallAiApi();
        console.log("player choice: " + p1Choice + "; ai choice: " + aiChoice);
    } else if (modeVar == "vs2p"){
        if ((roundNumber % 2) == 1){
            p1Choice = choice;
        } else {
            p2Choice = choice;
        }
        console.log("player 1 choice: " + p1Choice + "; player 2 choice: " + p2Choice);
    }
}

//Custom function that resolves the round winner
function ResolveRoundWinner(){
    if (modeVar == "vsComp"){
        if (p1Choice == "rock"){
            if (aiChoice == "scissors" || aiChoice == "lizard"){
                p1ScoreCount++;
                
            } else if (aiChoice == "paper" || aiChoice == "spock"){
                aiScoreCount++;
            } else {
    
            }
        } else if (p1Choice == "paper"){
            if (aiChoice == "rock" || aiChoice == "spock"){
                p1ScoreCount++;
            } else if (aiChoice == "scissors" || aiChoice == "lizard"){
                aiScoreCount++;
            } else {
                
            }
        } else if (p1Choice == "scissors"){
            if (aiChoice == "paper" || aiChoice == "lizard"){
                p1ScoreCount++;
            } else if (aiChoice == "rock" || aiChoice == "spock"){
                aiScoreCount++;
            } else {
                
            }
        } else if (p1Choice == "lizard"){
            if (aiChoice == "paper" || aiChoice == "spock"){
                p1ScoreCount++;
            } else if (aiChoice == "rock" || aiChoice == "scissors"){
                aiScoreCount++;
            } else {
                
            }
        } else if (p1Choice == "spock"){
            if (aiChoice == "scissors" || aiChoice == "rock"){
                p1ScoreCount++;
            } else if (aiChoice == "paper" || aiChoice == "lizard"){
                aiScoreCount++;
            } else {
                
            }
        }
        console.log("player score: " + p1ScoreCount + "; ai score: " + aiScoreCount);

    } else if (modeVar == "vs2p"){
        if (roundNumber % 2 == 0) {
            if (p1Choice == "rock"){
                if (p2Choice == "scissors" || p2Choice == "lizard"){
                    p1ScoreCount++;
                } else if (p2Choice == "paper" || p2Choice == "spock"){
                    p2ScoreCount++;
                } else {
        
                }
            } else if (p1Choice == "paper"){
                if (p2Choice == "rock" || p2Choice == "spock"){
                    p1ScoreCount++;
                } else if (p2Choice == "scissors" || p2Choice == "lizard"){
                    p2ScoreCount++;
                } else {
                    
                }
            } else if (p1Choice == "scissors"){
                if (p2Choice == "paper" || p2Choice == "lizard"){
                    p1ScoreCount++;
                } else if (p2Choice == "rock" || p2Choice == "spock"){
                    p2ScoreCount++;
                } else {
                    
                }
            } else if (p1Choice == "lizard"){
                if (p2Choice == "paper" || p2Choice == "spock"){
                    p1ScoreCount++;
                } else if (p2Choice == "rock" || p2Choice == "scissors"){
                    p2ScoreCount++;
                } else {
                    
                }
            } else if (p1Choice == "spock"){
                if (p2Choice == "scissors" || p2Choice == "rock"){
                    p1ScoreCount++;
                } else if (p2Choice == "paper" || p2Choice == "lizard"){
                    p2ScoreCount++;
                } else {
                    
                }
            }
            console.log("player 1 score: " + p1ScoreCount + "; player 2 score: " + p2ScoreCount);
        }
    }
    UpdateScoreBoard();
}

function UpdateScoreBoard(){
    play1Score.textContent = p1ScoreCount + "/" + (Math.ceil(roundVar/2)) + " pts";
    if (modeVar == "vsComp"){
        play2Score.textContent = aiScoreCount + "/" + (Math.ceil(roundVar/2)) + " pts";
    } else if (modeVar == "vs2p"){
        play2Score.textContent = p2ScoreCount + "/" + (Math.ceil(roundVar/2)) + " pts";
    }
}

function WinnerCheck(){
    if (roundVar == 1){
        if (p1ScoreCount == 1){
            HideStuff("gameEnd");
            winnerTxt.textContent = p1name + " Wins!";
            gameOver = true;
            WinSfx();
        } else if (p2ScoreCount == 1){
            HideStuff("gameEnd");
            winnerTxt.textContent = p2name + " Wins!";
            gameOver = true;
            ComputerBoopSfx();
        } else if (aiScoreCount == 1){
            HideStuff("gameEnd");
            winnerTxt.textContent = ainame + " Wins!";
            gameOver = true;
            LoseSfx();
        }
    } else if (roundVar == 5){
        if (p1ScoreCount == 3){
            HideStuff("gameEnd");
            winnerTxt.textContent = p1name + " Wins!";
            gameOver = true;
            WinSfx();
        } else if (p2ScoreCount == 3){
            HideStuff("gameEnd");
            winnerTxt.textContent = p2name + " Wins!";
            gameOver = true;
            ComputerBoopSfx();
        } else if (aiScoreCount == 3){
            HideStuff("gameEnd");
            winnerTxt.textContent = ainame + " Wins!";
            gameOver = true;
            LoseSfx();
        }
    } else if (roundVar == 7){
        if (p1ScoreCount == 4){
            HideStuff("gameEnd");
            winnerTxt.textContent = p1name + " Wins!";
            gameOver = true;
            WinSfx();
        } else if (p2ScoreCount == 4){
            HideStuff("gameEnd");
            winnerTxt.textContent = p2name + " Wins!";
            gameOver = true;
            ComputerBoopSfx();
        } else if (aiScoreCount == 4){
            HideStuff("gameEnd");
            winnerTxt.textContent = ainame + " Wins!";
            gameOver = true;
            LoseSfx();
        }
    }
}

function ResetVariables(type){
    if (type == "hard"){
        modeVar = "";
        roundVar = 0;
        p1name = "Player 1";
        p2name = "Player 2";
        ainame = "AI";
        descriptiveTxt.textContent = "Select a game mode";
    }
    roundNumber = 0;
    p1ScoreCount = 0;
    p2ScoreCount = 0;
    aiScoreCount = 0;
    p1Choice = "";
    p2Choice = "";
    aiChoice = "";
    gameOver = false;
    if (type == "soft"){
        descriptiveTxt.textContent = "Highly logical. \"" + p1name + "\" select one of the five options above";
        UpdateScoreBoard();
    }
}

function DescriptiveTxt(situaiton){
    if (situaiton == "homeBtn"){
        descriptiveTxt.textContent = "Select a game mode";
    } else if (situaiton == "modeSelectBtn"){
        descriptiveTxt.textContent = "Select how many rounds to play";
    } else if (situaiton == "beginGame"){
        descriptiveTxt.textContent = "You've selected \"Best of " + roundVar + "\" - it will take you beating your opponent " + (Math.ceil(roundVar/2)) + " times to win the game. Fascinating. \"" + p1name + "\" select one of the five options above";
    } else if (situaiton == "optionBtn"){
        if (modeVar == "vsComp") {
            if (gameOver){
                descriptiveTxt.textContent = `${p1name} chooses "${p1Choice}" and ${ainame} chooses "${aiChoice}".`;
            } else {
                descriptiveTxt.textContent = `${p1name} chooses "${p1Choice}" and ${ainame} chooses "${aiChoice}". Make another selection.`;
            }
        } else if (modeVar == "vs2p"){
            if ((roundNumber % 2) == 1){
                descriptiveTxt.textContent = `${p2name} select an option`
            } else {
                if (gameOver){
                    descriptiveTxt.textContent = `${p1name} chooses "${p1Choice}", ${p2name} chooses "${p2Choice}".`;
                } else {
                    descriptiveTxt.textContent = `${p1name} chooses "${p1Choice}", ${p2name} chooses "${p2Choice}". Go another round.`;
                }
            }
        }
    }
}
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ComputerBoopSfx(){
    let selector = randomNumber(1, 6);
    console.log(selector);
    switch (selector){
        case 1:
            compSound1.play();
            break;
        case 2:
            compSound2.play();
            break;
        case 3:
            compSound3.play();
            break;
        case 4:
            compSound4.play();
            break;
        case 5:
            compSound5.play();
            break;
        case 6:
            compSound6.play();
            break;
        default:
            break;
    }
}

function VsSelectSft(){
    let selector = randomNumber(1 , 2);
    console.log(selector);
    switch (selector){
        case 1:
            spockComp1.play();
            break;
        case 2:
            spockComp2.play();
            break;
        default:
            break;
    }
}

function P2SelectSfx(){
    let selector = randomNumber(1, 2);
    console.log(selector);
    switch (selector){
        case 1:
            spock2pAudio1.play();
            break;
        case 2:
            spock2pAudio2.play();
            break;
        default:
            break;
    }
}

function SpockBtnSfx(){
    let selector = randomNumber(1, 5);
    console.log(selector);
    if (selector == 5){
        spockBtnSfx1.play();
    } else {
        ComputerBoopSfx();
    }    
}

function LoseSfx(){
    let selector = randomNumber(1, 4);
    console.log(selector);
    switch (selector){
        case 1:
            loseSfx1.play();
            break;
        case 2:
            loseSfx2.play();
            break;
        case 3:
            loseSfx3.play();
            break;
        case 4:
            loseSfx4.play();
            break;
        case 5:
            loseSfx5.play();
            break;
        case 6:
            loseSfx6.play();
            break;
        case 7:
            loseSfx7.play();
            break;
        default:
            break;
    }
}

function WinSfx(){
    if (modeVar == "vsComp"){
        let selector = randomNumber(1, 4);
        console.log(selector);
        switch (selector){
            case 1:
                win1p1.play();
                break;
            case 2:
                win1p2.play();
                break;
            case 3:
                win1p3.play();
                break;
            case 4:
                win1p4.play();
                break;
            default:
                break;
        }
        console.log(modeVar)
    } else if (modeVar == "vs2p"){
        ComputerBoopSfx();
    }
}

function GameStartSfx(){
    let selector = randomNumber(1, 10);
    console.log(selector);
    if (selector == 10) {
        gameStartSfx.play();
    } else {
        ComputerBoopSfx();
    }
}

function noPlayAgainSfx(){
    let selector = randomNumber(1, 2);
    console.log(selector);
    switch (selector){
        case 1:
            noPlayAgainSfx1.play();
            break;
        case 2:
            
            break;
        default:
            break;
    }   
}

function PlayAgainSfx(){
    let selector = randomNumber(1, 2);
    console.log(selector);
    if (selector == 10) {
        PlayAgainSfx.play();
    } else {
        ComputerBoopSfx();
    }
}

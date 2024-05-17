let userScore=0;
let compScore=0;

const userScorePara=document.querySelector('#user-score');
const compScorePara=document.querySelector('#comp-score');
const choices=document.querySelectorAll('.choice');
choices.forEach((choice)=>{
    console.log(choice);
    choice.addEventListener('click',()=>{
        let userChoice=choice.getAttribute('id');
        playGame(userChoice);
    })
})


const genCompChoice=()=>{
//rock paper scissors
let options=['rock','paper','scissors'];
const randomIdx=Math.floor(Math.random()*3);
return options[randomIdx];
}


const playGame=(userChoice)=>{
    console.log('User Choice= ',userChoice)
//generating the computers choice;
const compChoice=genCompChoice();
console.log('Computer Choice= ',compChoice);

if (userChoice===compChoice){
    //Game Draw
    drawGame();
}else{
    let userWin=true;
    if(userChoice==='rock'){
        //scissors ,paper
        userWin= compChoice==='paper'?false:true
    }else if(userChoice==='paper'){
        //rock ,scissors
        userWin= compChoice==='scissors'?false:true;
    }else{
        //rock ,paper
        userWin=compChoice==='rock'?false:true;
    }
    showWinner(userWin,userChoice,compChoice)
}

};

const msg=document.querySelector('#msg');


const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        console.log('you win');
        userScore++;
        userScorePara.innerText=userScore;
        msg.innerText=`You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green"
    }else{
        console.log('Computer win')
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText=`You Lose!!  ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor="red"

    }
}

const drawGame=()=>{
    msg.innerText='Game Draw Play Again!'
    msg.style.backgroundColor="steelblue"

    console.log('Game is draw');
}
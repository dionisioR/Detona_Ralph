const state = {
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values:{
        timerId: null,
        countDownTimerId: setInterval(countDown,1000),
        gameVelocity: 600,
        hitPosition: 0, 
        result: 0,
        currentTime:60,
    },
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime
    if(state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId)
        clearInterval(state.values.timerId)
        alert("Gamer Over! O seu resultado foi: " + state.values.result)
    }
}

function playSound(){
    const audio = new Audio('./src/audios/hit.m4a')
    audio.volume = 0.2
    audio.play()
}

function randomSquare(){
    // retirando a classe enemy
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy')
    })

    // gerando um número aleatório de 1 à 9
    const randomPosition = Math.floor(Math.random() * 9)

    // adicionando a classe enemy em uma div aleatória
    let randomSquare = state.view.squares[randomPosition]
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener(
            'mousedown', () => {
                if(square.id === state.values.hitPosition){
                    state.values.result++
                    state.view.score.textContent = state.values.result
                    state.values.hitPosition = null
                    playSound()
                }
            }
        )
    })
   
}

function initialize(){
    moveEnemy()
    addListenerHitBox()
}


initialize()
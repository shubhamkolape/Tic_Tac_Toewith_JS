const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'


const CellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winngmessageTextElement = document.querySelector('[data-winngmessage-text]')
const winningMessage = document.getElementById('winning-message')
const Restart = document.getElementById('restart')
let circleTurn


StartGame()

Restart.addEventListener('click', StartGame)


function StartGame(){
    circleTurn = false
    CellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleclick)
        cell.addEventListener('click', handleclick, {once : true})
    })
    setHover()
    winningMessage.classList.remove('show')

}

function handleclick (e) {
    const cell  = e.target  
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS 
    placeMark(cell, currentClass)
     if(checkForWin(currentClass)){
        endGame(false)
    }else if(isdraw()){
        endGame(true)
    }
    else{
        switchTurn()
        setHover()
    }

}


function endGame(draw){
    if(draw){
        winngmessageTextElement.innerText = `Draw`
    }else{
        winngmessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`
    }
    winningMessage.classList.add('show')
}


function isdraw(){
    return  [...CellElements].every(cell =>{
      return   cell.classList.contains(X_CLASS) ||  cell.classList.contains(CIRCLE_CLASS)
      })
  }


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}





function switchTurn (){
    circleTurn = !circleTurn
}


function setHover(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
    board.classList.add(CIRCLE_CLASS)
    }else{
    board.classList.add(X_CLASS)
    }
}
 

function checkForWin(currentClass){
    return WINNING_COMBINATION.some(combination =>{
        return combination.every(index =>{
            return  CellElements[index].classList.contains(currentClass)
        })
    })
}   
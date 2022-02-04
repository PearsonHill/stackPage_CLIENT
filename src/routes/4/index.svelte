<script>
  import dayjs from 'dayjs'

  let gridValues = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 
                    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
  let winningArrays = [
          [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],
          [20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],
          [1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
          [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],
          [7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],
          [13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
          [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29],
          [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16],
          [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
          [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
          ];

  let bottomRow = [42, 43, 44, 45, 46, 47, 48]
  let pageMessage = null;

  let gameMoves = {
      'playerOne':[],
      'playerTwo':[]
  }

  let gameBoard = gridValues.reduce( (rObj, value, index, array ) =>{

        rObj[value] = 'notSelected'


        return rObj
  }, {})




  // isValidMove
        // has it already been played?

        // make sure that it is on top of another piece or on bottom


  // 'playerOne'
  // 'playerTwo'

  $: toggle = true
  $: currentTurn = toggle ? 'playerOne' : 'playerTwo'
  $: pageMessage = toggle ? "Green's Turn" : "Blue's Turn"
  $: pageAlert = null;
  $: gameOver = false

  $: winning = {}


function notVictory(currentTurn){

   return winningArrays.every( vComboArr =>{


        if(
            gameBoard[vComboArr[0]] == currentTurn &&
            gameBoard[vComboArr[1]] == currentTurn &&
            gameBoard[vComboArr[2]] == currentTurn &&
            gameBoard[vComboArr[3]] == currentTurn

        ){

            winning[vComboArr[0]] = true,
            winning[vComboArr[1]] = true,
            winning[vComboArr[2]] = true,
            winning[vComboArr[3]] = true

            return false
        }


           
        return true

   })
    

}



function evalSelection(value){
    let played = [...gameMoves['playerOne'], ...gameMoves['playerTwo']]

    let isValid = [...played, ...bottomRow].reduce( (rArr, played, index, array) => { 
          rArr = [...rArr, played]
          return rArr
      },[]).includes(value + 7)

    isValid ? 
        ( 
            gameMoves[currentTurn] = [  ...gameMoves[currentTurn], value],
            gameBoard[value] = currentTurn,
            toggle = !toggle,
            gameOver = !notVictory(currentTurn),
            pageAlert = gameOver ? `${dayjs().format('ddd hh:mm:ss a')} ${currentTurn == 'playerOne' ? 'Green' : 'Blue'} wins!!!` : null
        )
      : 
      pageAlert = `${dayjs().format('ddd hh:mm:ss a')} play not valid please select again`



  }

  

</script>


<div class="container">
    <button on:click={()=>(location.reload())} style="margin:10px">
        clear
    </button>

    <div class=narrative>
        {pageAlert ? pageAlert : ' '}
    </div>
    <div class={toggle ? "narrative green" : "narrative blue"}>
        {gameOver ? '' : pageMessage}
    </div>
   
   
    <div class="grid">


        {#each gridValues as value}

           <div class={`${gameBoard[value]} center`} on:click={()=> {gameOver ? null : evalSelection(value) } }>

            <div class="text">
                { winning[value] ? '⭐️' : ''}
            </div>

           
           </div>


        {/each}


    </div>

    {#if gameOver}
        <button on:click={()=>(location.reload())} style="margin:50px">
            restart game
        </button>
    {/if}


</div>

<style>

.container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); */

}

.grid{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
    justify-content: center;
    align-self: center;
   

   
            
        }

.notSelected{
    font-size: 12px;
    font-weight: 900; 
    text-transform: uppercase;
    color: rgb(53, 53, 54);
    border: 1px rgb(212, 211, 211) solid;
    box-shadow: 1px 1px 2px #666464;
    padding: 3px;
    margin: 3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
}

.playerOne{
    font-size: 12px;
    font-weight: 900; 
    text-transform: uppercase;
    color: rgb(53, 53, 54);
    border: 1px rgb(212, 211, 211) solid;
    box-shadow: 1px 1px 2px #cac6c6;
    padding: 3px;
    margin: 3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    background:chartreuse
    
}

.playerTwo{
    font-size: 12px;
    font-weight: 900; 
    text-transform: uppercase;
    color: rgb(53, 53, 54);
    border: 1px rgb(212, 211, 211) solid;
    box-shadow: 1px 1px 2px #cac6c6;
    padding: 3px;
    margin: 3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    background:cornflowerblue;


    
}

.center{
    display: flex;
    justify-content: center;
}

.text{
    align-self: center;
    text-align: center;
    font-size: 30px;
}

.narrative{
    font-size: 20px;
    margin: 20px;
}

.green{
    color :rgb(132, 187, 77)
}
.blue{
    color :cornflowerblue;
}

</style>
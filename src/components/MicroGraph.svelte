<script>


    export let linkArray 

    import dayjs from 'dayjs'
    
    console.log('line 6', linkArray)


    
    let dots = linkArray.reduce( (rArr, entry, index, array) =>{


    
        console.log('line 10', entry)
    
        if(entry.dots){

            let entryDots = entry.dots.map(dot => dayjs(parseInt(dot.epoch)).unix())
    
            rArr = [...rArr, ...entryDots].sort((a,b) => b - a)

        }
     
    
    
        return rArr
    },[])
    
    
 
    
    console.log('line 21', dots)

    let counter = 0;
    // midnight - start of today
    let midnight = dayjs().startOf('day').unix()
    let now = dayjs().unix()

 


    let calUnits = 126;
    let binSize = 10;

    let i = 0; // index counter for calendar Squares
    let j = 0; // index counter for dotsArray


    let binObj = {}


    while( i < calUnits){

        let upper = now - (i * binSize)
        let lower = upper - binSize


        binObj[i] = []

        while(dots[j] > lower && dots[j] <= upper){     

            binObj[i] = [...binObj[i], dots[j]] 


            j++
            }

        i++

    }


    let data = [...populate(calUnits)]

function fireTest(){

    data = [...Object.values(binObj)]
    return console.log('line 69', binObj)
}




   
   


   
    

    

    
    
    let total = 90;
    
    function populate(num){
        let arr = []
        let i = 0;
        while( i < num){
    
            arr = [...arr, num]
            i++
        }
    
        return arr
    }

    </script>
    
    <div class="container">
       
        <button on:click={fireTest}>populate graph</button>
    
        <div class="week scroll">
            <div class="dayC">S</div>
            <div class="dayC">M</div>
            <div class="dayC">T</div>
            <div class="dayC">W</div>
            <div class="dayC">T</div>
            <div class="dayC">F</div>
            <div class="dayC">S</div>
            {#each data as num}
            <!-- <div class={`day fill${num.length}`}  ></div> -->

            <div class="day" style={ num.length > 0 ? `background:hsl(90, 100%, ${ 20 + (10 * num.length)}%)` : null}></div>
        
            {/each}
        
        </div>
    
    
    
    
    </div>
    
    
    
    <style>
    

    

    .day{
        /* background: green; */
        border: 0.5px solid rgb(203 202 202);
        align-self: center;
        width: 10px;
        height: 10px;
        /* background: hsl(90, 100%, 50%) */
    }
    

    
    .dayC{
    font-size: 8px;
}
    
    
    
        .week{
        padding: 5px;
            height: 90px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
         
        }
    
        .scroll{
           
           max-width: 100%;
           overflow-x: scroll;
    
       }
    

    
    /* 
    https://htmlcolorcodes.com/color-picker/
    rgb(51, 255, 172)
    rgb(45, 223, 151)
    rgb(38, 191, 129)
    rgb(32, 159, 107)
    rgb(26, 128, 86)
    rgb(19, 96, 64)
    rgb(13, 64, 43)
    rgb(6, 32, 21) */
    
    </style>
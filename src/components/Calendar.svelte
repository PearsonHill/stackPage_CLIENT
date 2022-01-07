<script>


export let linkArray 

console.log('line 6', linkArray)

let dotsArray = linkArray.reduce( (rArr, entry, index, array) =>{

    console.log('line 10', entry)

    let entryDots = entry.dots.map(dot => dot.epoch)

    rArr = [...rArr, ...entryDots]


    return rArr
},[])


let hoursTimeFrame = 12

console.log('line 21', dotsArray)

// let obj = {}
// let calData = dotsArray.reduce( (rArr, epoch, index, array) =>{

// },[])

let data = [...populate(126)]


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
let cal = [
    [0,2,0,4,1,2,3],
    [1,2,0,4,1,0,3],
    [3,2,0,4,1,5,3],
    [0,2,0,4,1,0,3],
    [1,0,5,4,1,1,3],
    [0,2,0,4,1,4,3],
]
</script>

<div class="container">
    <div class="calSection scroll">
            <div class="week">
                <div class="dayC"></div>
                <div class="dayC">S</div>
                <div class="dayC">M</div>
                <div class="dayC">T</div>
                <div class="dayC">W</div>
                <div class="dayC">T</div>
                <div class="dayC">F</div>
                <div class="dayC">S</div>
            </div>
        
            <div class="week">
                <div class="dayR">Jan 2</div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
                <div class="day"></div>
            </div>
           
            {#each cal as week}

            <div class="week">
                <div class="dayR">Jan 2</div>
                    {#each week as day}
                        <div class={`day fill${day}`} ></div>
                    {/each}
            </div>
            {/each}
    </div>


    <div class="weekA scrollA">
  
        {#each data as num}
        <div class="day"></div>
    
        {/each}
    
    </div>




</div>



<style>

.calSection{

    padding: 10px;

}


.week{
    display: grid;
    grid-template-columns: 40px repeat(7, 1fr);
    justify-items: center;
    margin-bottom: 5px;
}
.day{
    /* background: green; */
    border: 0.5px solid rgb(203 202 202);
    align-self: center;
    width: 10px;
    height: 10px;
}

.dayC{
    font-size: 11px;
}
.dayR{
    font-size: 11px;
    margin-right: -5px;

}


.scroll{
       
        max-width: 100%;
        max-height: 80px;
        overflow-y: scroll;

    }



    .weekA{
    padding: 5px;
        height: 90px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        border: blue 1px solid
    }

    .scrollA{
       
       max-width: 100%;
       overflow-x: scroll;

   }

.fill1{
  background: rgb(51, 255, 172)
 

}
.fill2{
    background: rgb(45, 223, 151)
}
.fill3{
    background: rgb(38, 191, 129)
}
.fill4{
    background: rgb(32, 159, 107)
}
.fill5{
    background: rgb(235, 205, 30)


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
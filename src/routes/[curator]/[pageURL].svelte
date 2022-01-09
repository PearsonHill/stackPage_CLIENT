<script context="module">





export async function preload({ params }) {
    const { curator, pageURL } = params;

   return {pageURL, curator}


}



  


</script>
<script>

import { onMount } from "svelte";
import * as api from "../../../utilities/api";

// import components
import AddModal from '../../components/AddModal.svelte'
import MicroGraph from '../../components/MicroGraph.svelte'



// bring in URL parameters
export let pageURL, curator

let showCal = false;
let viewCode = 'abc'
let editCode = 'abc'


let linkArray = []
let sectionFormatted = []

async function addLinkData(data){
  
    linkArray = [...linkArray, data.detail]
    let case_action = 'dot_addLink'
    let payload = {...data.detail, curator};
    let token = 'null'
    let epoch = pageURL
    let kernelID, outcomeID, threadID, eventID  = 'abc'
   

    let URL =`v3/${case_action}/public/v1/${kernelID}/a/${eventID}/b/${outcomeID}/c/${epoch}/d/${threadID}`;
    return await api.post(URL, payload, token ).then((response) => {
    
       
               
       
    }); 
}


async function updateDots(){
    
    let case_action = 'dot_updateDots'
    let payload = {linkArray};
    let token = 'null'
    let epoch = pageURL
    let kernelID, outcomeID, threadID, eventID  = 'abc'
   

    let URL =`v3/${case_action}/public/v1/${kernelID}/a/${eventID}/b/${outcomeID}/c/${epoch}/d/${threadID}`;
    return await api.post(URL, payload, token ).then((response) => {
       
       
               
       
    }); 
}


function sortBySection(arr){




let sectionsObj = arr.reduce( (rObj, entry, index ,array ) =>{

  let section = entry.sectionTitle

if(rObj[section]){

rObj[section] = [...rObj[section], entry]

}else{

rObj[section] = [entry]
}

return rObj

}, {})


console.log('line 108', sectionsObj)


return Object.keys(sectionsObj).reduce( (rArr, key, index, array) =>{

let sectionObj = {

    sectionTitle: key,
    entries: [...sectionsObj[key]]
}


rArr = [...rArr, sectionObj]


return rArr

}, [])

} 


let noData = false
const getData = async () =>{

let case_action = 'dot_getPageContent'
let kernelID, outcomeID,token, threadID,eventID, kernelURL = 'abc'
let epoch = pageURL

let URL =`v3/${case_action}/public/v1/${kernelID}/a/${eventID}/b/${outcomeID}/c/${epoch}/d/${threadID}`;
       return await api
           .get(URL, token)
           .then( (response) => {

            console.log('line 137', response)
          
               if( response[0] == null){

                    noData = true

               }else{

                linkArray = [...response]
                sectionFormatted = [...sortBySection(linkArray)]
               }

               

})}

const tagFindAll = async (tag) =>{
    let case_action = 'dot_tagFindAll'
    let kernelID, outcomeID,token, threadID,eventID, kernelURL = 'abc'
    let epoch = tag

    let URL =`v3/${case_action}/public/v1/${kernelID}/a/${eventID}/b/${outcomeID}/c/${epoch}/d/${threadID}`;
        return await api
            .get(URL, token)
            .then( (response) => {
                // work in progress
})}


let showDots = false;

function formatSection(array){
    return sectionFormatted = [...sortBySection(array)]
}

function toggleDotAdd(){
    return showDots = !showDots
    }

function addDot({link_id, array_loc}){
    // update the collection of dots on the main linkArray
    linkArray[array_loc].dots = [...linkArray[array_loc].dots, {user: 'abc', epoch:Date.now() }]

    // reformat linkArray into sections layout
    return formatSection(linkArray)

}

function removeDot({link_id, array_loc}){
    let updateArray = [...linkArray[array_loc].dots]
    updateArray.pop()
    linkArray[array_loc].dots = [...updateArray]

    return formatSection(linkArray)
}


onMount(() => {
    getData();
});



</script>

<div class="container">




    <div class="domino" on:click={()=>(showCal = !showCal)}>
        🀲
    </div>
    
    {#if showCal && linkArray[0]}

        <MicroGraph linkArray={[...linkArray]} />

        <input
        class="linkURLInput"
        type="text"
        bind:value={viewCode}
        placeholder="add code to view"/>
        <input
        class="linkURLInput"
        type="text"
        bind:value={editCode}
        placeholder="add code to edit"/>


    {/if}


    <div class="addButton" >

        <AddModal on:dispatchEntry={addLinkData}/>
     </div>



     {#if noData}

     URL free to use. Please add an entry or link above! 

 {/if}
     {#if showDots}
     <div class="saveButton" on:click={updateDots}>
        SAVE DOT CHANGES
     </div>
     {/if}
    

     {#each sectionFormatted as section}

   
        <div class="sectionTitle">
            {section.sectionTitle !== 'notSet' ? section.sectionTitle : ''}
        </div>

   
        <div class={section.sectionTitle !== 'notSet' ? "sectionBorder scroll" : 'null'}>
        {#each section.entries as link}

            <div class="mainLink">

                {#if link.linkLabel !== 'notSet'}
                <div class="linkSection">
                    <div class="linkData alignLeft">
                        <a href={`${link.linkURL}`} target="_blank">{link.linkLabel}</a>
                    </div>

                    <div class="smallDotsRow" on:click={toggleDotAdd}>
                        <div class="dots">
                            ● ● ● 
                        </div>
                        <div class="numDots">
                        
                            ( {link.dots ? link.dots.length : 0})

                    


                        </div>
                    
                    </div>
                </div>
                {/if}

                {#if link.linkURL !== 'notSet'}
                <div class="linkURL alignLeft">{link.linkURL}</div>
                {/if}



                <div class="tagSection">
                    <div class="tagsArray">
                        {#if link.tags}
                            {#each link.tags as tag}
            
                            <div class="tag">
                            {tag}
                            {#if link.tags.indexOf(tag) != (link.tags.length - 1)}
                            ,
                            {/if}
                            </div>

                            {/each}
                        {/if}
                        
                    </div>
                </div>
                {#if showDots}
                <div class="dotsActionRow">
                    <div class="editDot" on:click={()=>(removeDot({link_id: link._id, array_loc: linkArray.indexOf(link)}))}>
                    ➖
                    </div>
                    <div class="dotDisplay">
                        <div class="dotRow">

                            {#each link.dots as dot}
                            <div class="displayDot">
        
                                    ●  
                            </div>
                            {/each}

                        </div>

                        <div class="dotLength">

                        
                            ({link.dots ? link.dots.length : 0})
                    

                        </div>
                
                        
                

                
                    </div>
                    <div class="editDot alignLeft" on:click={()=>(addDot({link_id: link._id, array_loc: linkArray.indexOf(link)}))}>
                    ➕
                    </div>
                </div>
                {/if}
            </div>

        {/each}


        </div>






     {/each}



     



</div>

<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


    .domino{
        align-self: center;
        font-size: 100px;
        margin-bottom: 10px;
    }



    .sectionBorder{
        /* border: 1px black solid; */
        background: rgba(255, 255, 255, 0.50);
        box-shadow: 1px 1px 2px rgb(196, 194, 194);
        margin-left: 15px;
    }

    .scroll{
        padding-top: 8px;
        flex-wrap:wrap;
        max-width: 100%;
        max-height: 318px;
        overflow-y: scroll;

    }
    .mainLink{
        display: flex;
        flex-direction: column;
        /* border: 1px green solid; */
        /* background: rgba(255, 255, 255, 0.25); */
        /* box-shadow: 1px 1px 2px black; */
        padding: 15px;
        /* border-radius: 15px;  */
        margin-bottom: 15px;
    
    }
    .addButton{
        display: flex;
        flex-direction: column;
        /* border: 1px green solid; */
        /* background: rgba(255, 255, 255, 0.25); */
        box-shadow: 1px 1px 2px black;
        padding: 3px;
        border-radius: 24px; 
        width: 34px;
        align-self: center;
        text-align: center;
        background: rgba(255, 255, 255, 0.25);
        margin-bottom: 25px;
        color: grey;
        font-size: 10px;
    }

    .linkSection{
        display: grid;
        grid-template-columns: 4fr 70px;
      
    }


    .alignLeft{
        align-self: start;
    }

    .linkData{
    overflow-wrap: break-word;
    font-size: 12px;
    text-decoration: underline;
    color:rgb(83, 154, 142)
    }

    .linkURL{
        overflow-wrap: break-word;
        font-size: 10px;
        font-family: "Lucida Console", "Courier New", monospace;
        margin: 0px 0px -8px 10px


    }

    .tag{
     
        /* border: .2px solid grey;
        border-radius: 15px 50px; */
        width: fit-content;
        padding: 1px 1px; 
        font-size: 12px;
        color: grey
    }
    .smallDotsRow{
        display: flex;
        box-shadow: 1px 1px 2px black;
        border-radius: 15px; 
        padding: 3px 3px 3px 6px;
        
    }

    .dots{

        font-size: 8px;
        align-self: center;
        color: rgb(172, 177, 183);

    }

    .numDots{
        font-size: 10px;
        margin-left: 3px;
        align-self:center
    }

    .editDot{
        box-shadow: 1px 1px 2px black;
        border-radius: 50px;
        padding: 3px 6px;
        text-align: center;
        width: fit-content;
    }


    .tagSection{
      position: relative;
      left: 0px;
      top: 0px
    }

    .tagsArray{
        display: flex;
        padding: 0px 0px 0px 25px;
        justify-content: end
      
    }

    .dotsActionRow{
        display: grid;
        grid-template-columns: 20px 1fr 26px;
     
    }

    .dotDisplay{
        display: flex;
        align-content: start;
        padding-left: 10px;
        padding-top: 2px;
    }


    .displayDot{
        font-size: 10px;
        color: rgb(172, 177, 183);
        /* color: rgb(71, 103, 134); */
        /* color: rgb(16, 91, 167); */
        align-self: center;
        margin: 0px 4px;

    }

    .dotLength{
        margin-left: 5px
    }

    .dotRow{
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        width: fit-content;
        max-width: 200px;
    }

    .addButton{
        display: flex;
        flex-direction: column;
        /* border: 1px green solid; */
        /* background: rgba(255, 255, 255, 0.25); */
        box-shadow: 1px 1px 2px black;
        padding: 3px;
        border-radius: 24px; 
        width: 34px;
        align-self: center;
        text-align: center;
        background: rgba(255, 255, 255, 0.25);
        margin-bottom: 25px;
        color: grey;
        font-size: 10px;
    }

    .saveButton{
        display: flex;
        flex-direction: column;
        /* border: 1px green solid; */
        /* background: rgba(255, 255, 255, 0.25); */
        box-shadow: 1px 1px 2px black;
        padding: 5px;
        border-radius: 24px; 
        width: fit-content;
        align-self: center;
        text-align: center;
        background: rgb(16, 91, 167);
        margin-bottom: 25px;
        color: white;
        font-size: 10px;

    }

</style>


<script>

 
    export let data;
    export let location;
     
    
          import { createEventDispatcher } from "svelte";    
        const dispatch = createEventDispatcher();
    
    let go = false;
    
    
    let entryData = data

    let sectionTitle = null;
    let linkLabel = null;
    let linkURL = null; 
    let tags = []
    let tag = null;


    function addTag(){
      console.log('line 25', tag)
      tags = [...tags, tag]
      tag = null;
    
      return tags 
    }

    function removeTag(tagToRemove){
      console.log('line 33', tagToRemove)
      let x =  tags.reduce( (rArray, tag, index, array) =>{

          if(tagToRemove === tag){
            rArray = [...rArray]
          }else{
            rArray = [...rArray, tag]
          }
          
          return rArray

      }, [])


      tags = [...x]

      return tags


    }


    function dispatchEntry(){
      console.log('line 19', location)
      dispatch('dispatchEntry', {linkLabel, linkURL, tags, sectionTitle})
      return go = !go
    }
    
    function dispatchDelete(){
      dispatch('dispatchDelete')
      return go = !go
    }
    
    
    function handleGo(){
      dispatch('toggleBorder')
      return go = !go
     
    }
    </script>
    

    {#if go }
    <div class="modal-backdrop" on:click={()=>(go = !go, dispatch('toggleBorder'))} />
    <div class="modal">
      <!-- <h1>{title}</h1> -->
      <div class="content" >
        <div id="mdiv" 
        on:click={()=>(go = !go)}
         >
          <div class="mdiv">
            <div class="md"></div>
          </div>
        </div>
        <slot />
    
        <div class="mainLink">
          <div class="sectionTitle">
              <div class="linkData alignLeft">
                <input
                class="linkSectionInput"
                type="text"
                bind:value={sectionTitle}
                placeholder="Add Section title..."/>
              </div>
       
          </div>

          <div class="linkSection">
              <div class="linkData alignLeft">
                <input
                class="linkDataInput"
                type="text"
                style="padding-left: 15px"
                bind:value={linkLabel}
                placeholder="Enter title..."/>
              </div>
              <div class="dots">
                  ● ● ● (490)
              </div>
          </div>


          <div class="linkURL alignLeft">       
            <input
            class="linkURLInput"
            type="text"
            bind:value={linkURL}
            placeholder="Touch here to enter URL..."/>
          </div>



          <div class="tagSection">
              <div class="tagsArray">
                Tags (touch to remove):
              </div>
                <div class="tagsArray">
                  {#each tags as tag}
                    <div class="tag" on:click={()=>(removeTag(tag))}>
                      {tag}
                      {#if tags.indexOf(tag) != (tags.length - 1)}
                      ,
                      {/if}
                    </div>
                  {/each}
                </div>
           
          </div>
          <div class="tagSection">
            <div class="row">

              <textarea bind:value={tag} placeholder="What tags or thoughts do you want to add? " />
    
    
            </div>
    
            <div class="addTag" on:click={addTag}> Add Tag </div>
              
          </div>
      </div>
    
    <div class="eventContainer">
      <div class="actionRow">
    
    
        <button class="btn" on:click={dispatchEntry}>Submit</button> 
        <button class="btn" on:click={dispatchDelete}>Clear</button> 
        
        </div>
  
        
 
     

  

     
      
     
    
    </div>

    
    

    
    </div>
    
    </div>
    
       
    
    
    {:else}
     <div 
     on:click={handleGo}
     >
    


     Add
    
     </div>
    
    
    {/if}
    
    
    
    
    
    
    <style>
    
    
    .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          background: transparent;
          width: 100%;
          height: 100vh;
          z-index: 10;
        }
      
    
        .modal {
          position: fixed;
          top: 17vh;
          left: 2%;
          width: 96%;
          height: 68vh;
      
          background:rgb(255, 255, 255);
          border-radius: 5px;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
          overflow: scroll;
        }
    
        .content {
          padding: .5rem;
        }
    
    
        @media (min-width: 768px) {
          .modal {
            width: 40rem;
            left: calc(50% - 20rem);
          }
        }
    

    

    

    
  
        .actionRow{
          display: flex;
          justify-content: space-around;
          margin: 15px;
        }
    
        .btn{
          align-self: center;
        }


    
        input{
          width: 305px;
        }

        textarea{
          height: 100px;
          width: 305px;
        }

        .row{
       
          margin: 10px;
        }

        .addTag{
          border: 1px solid rgb(16, 91, 167);
          background:rgb(16, 91, 167);
          border-radius: 20px;
          margin: 10px;
          padding: 5px;
          color: white;
          width: 40px;
        
          
        }



      .mainLink{
        display: flex;
        flex-direction: column;
        /* border: 1px green solid; */
        /* background: rgba(255, 255, 255, 0.25); */
        /* box-shadow: 1px 1px 2px black; */
        padding: 10px;
        /* border-radius: 15px;  */
        margin-bottom: 15px;
        text-align: start
    }


    .linkSection{
        display: grid;
        grid-template-columns: 4fr 1fr;
    }


    .alignLeft{
        align-self: start;
    }

    .linkData{
    overflow-wrap: break-word;
    font-size: 12px;
    text-decoration: underline;
    color:rgb(16, 91, 167)
    }


    .linkDataInput{
    overflow-wrap: break-word;
    font-size: 14px;
    text-decoration: underline;
    color:rgb(16, 91, 167);
    width: 90%;
    border: none
    }

    .linkDataInput::placeholder {
      font-size: 14px;
      text-decoration: underline;
      color:rgb(16, 91, 167)
}

    .linkURL{
        overflow-wrap: break-word;
        font-size: 10px;
        font-family: "Lucida Console", "Courier New", monospace;
        margin: 0px 0px -8px 10px


    }

    .linkURLInput{
        width: 300px;
        height: 30px;
        overflow-wrap: break-word;
        font-size: 12px;
        font-family: "Lucida Console", "Courier New", monospace;
        margin: 8px 0px 8px 10px;
        border: none


    }

    .tag{
     
        /* border: .2px solid grey;
        border-radius: 15px 50px; */
        width: fit-content;
        padding: 1px 1px; 
        font-size: 12px;
        color: grey
    }

    .dots{
           box-shadow: 1px 1px 2px black;
               border-radius: 15px; 
        font-size: 8px;
        padding: 3px 3px 3px 6px;

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

    </style> 
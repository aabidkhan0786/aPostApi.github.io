

// converting string into dom Element

function getElementFromString(string){
    const div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}



// initailzing parameter count
let paramCount=0;

// initially we hide parameter box
const parametersBox = document.getElementById("parametersBox");
    parametersBox.style.display="none";

    document.getElementById("responseJsonBox").style.display="none";


// showing and hiding parameter and json option 
const paramsRadio = document.getElementById("paramsRadio");
    paramsRadio.addEventListener("click",()=>{
        document.getElementById("parametersBox").style.display="block";
        document.getElementById("requestJsonBox").style.display="none";
    })    


    const jsonRadio = document.getElementById("jsonRadio");
    jsonRadio.addEventListener("click",()=>{
        document.getElementById("parametersBox").style.display="none";
        document.getElementById("requestJsonBox").style.display="block";
    })    


    // adding new parametersBox on clicking plus

    const addParams = document.getElementById("addParams");
    addParams.addEventListener("click",(e)=>{
        e.preventDefault();
        const params = document.getElementById("params");
        const string =`   
        <div class="form-group row">
        <label for="urlBox" class="col-sm-3 col-form-label"
          >Parameters ${paramCount + 2}:</label
        >
        <div class="col-sm-8">

            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id="parameterKey${paramCount + 2}"
                  placeholder="Parameter ${paramCount + 2} Key"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  id="parameterValue${paramCount + 2}"
                  placeholder="Parameter ${paramCount + 2} Value"
                />
              </div>
              
            </div>
       
        </div>
     
        <button   type="submit" class="btn btn-danger col-sm-1  deleteParams">X</button>

       
      </div>
                                    `;

        // converting string element to dom
        const paramElement = getElementFromString(string);
        params.appendChild(paramElement);

        // deleting the params
        const del= document.getElementsByClassName("deleteParams");
        for(item of del){
            item.addEventListener("click",(e)=>{
                // e.preventDefault();
                e.target.parentElement.remove();
            })
        }

        paramCount++;

    })



    // fetching api


    const submit = document.getElementById("submit");
        submit.addEventListener("click",()=>{
           
          document.getElementById("responseJsonBox").style.display="block";
          document.getElementById("responseArea").value="Fetching Data...";


            // fetching input data

            const url = document.getElementById("url").value;
            const requestType = document.querySelector("input[name='requestType']:checked").value;
            const contentType = document.querySelector("input[name='contentType']:checked").value;



            if(contentType == "paramsRadio"){
              data={};
              for(i=0;i<paramCount+1;i++){
              if(document.getElementById("parameterKey"+(i+1)) != undefined){
                let key = document.getElementById("parameterKey"+(i+1)).value;
                let value = document.getElementById("parameterValue"+(i+1)).value;
                data[key] = value;
              }
              
            }
            data = JSON.stringify(data);
            }
            else{
              data = document.getElementById("requestJsonText").value;
            }

            console.log(url);
            console.log(contentType);
            console.log(requestType);
            console.log(data);


            if(requestType == "GET"){
              fetch(url,{
                method:"GET"
              })
              .then(res=>res.text())
              .then(text=>{
                document.getElementById("responseArea").value = text;
              })
            }

            else{
              fetch(url,{
                method:"POST",
                body:data,
                headers:{
                  "Content-type":"application/json; charset=UTF-8"
                }
              })
              .then(res=>res.text())
              .then(text=>{
                document.getElementById("responseArea").value = text;
              })
            }

        })
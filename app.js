//grab all the element
let json_content=document.querySelector('.json_content')
let param_content=document.querySelector('.param_content')
let json_box=document.querySelector('.json_box')
let param_container=document.querySelector('.param_container')
let addBtn=document.querySelector('.addBtn')
let addParamBox=document.querySelector('.addParamBox')
let submit=document.querySelector('.submit');
let getRequest=document.querySelector('.getRequest');
let postRequest=document.querySelector('.postRequest');
let jsonTextarea=document.querySelector('.jsonTextarea');
let confirmBox=document.querySelector('.confirmBox');
let confirmBtn1=document.querySelector('.confirmBtn1');
let confirmBtn2=document.querySelector('.confirmBtn2');
//initialize itemCount
let itemCount=0;
//initialize idNum
let idNum=0;

//hide param_container initially
param_container.style.display="none";

//add event listener on json_content to show the json_box
json_content.addEventListener('click',()=>{
    json_box.style.display="flex";
    param_container.style.display="none";
})
//add event listener on param_content to show the param_container
param_content.addEventListener('click',()=>{
    param_container.style.display="flex";
    json_box.style.display="none";
})
//add more paramters by doing add eventlistener on addBtn
addBtn.addEventListener('click',()=>{
    let html=`<div class="param_box1">
    <input type="text" name="" class="param_input param_input1 parameter_key${itemCount+2}" placeholder="Enter Parameter ${itemCount+2} key">
    <input type="text" name="" class="param_input parameter_value${itemCount+2}" placeholder="Enter Parameter ${itemCount+2} value">
    <button class="delBtn" id="btn${idNum}" onclick="deleteParam(this.id)">-</button>
    </div>
    `
    addParamBox.insertAdjacentHTML('beforeend',html)
    itemCount+=1
    idNum+=1
})

//delete parameters function 
function deleteParam(num){
    confirmBox.style.display="block"
    confirmBox.style.top="0px"
    confirmBtn1.addEventListener('click',()=>{
        if(document.getElementById(num)!=undefined){
            document.getElementById(num).parentElement.remove()
            confirmBox.style.display="none"
        }
    })
    confirmBtn2.addEventListener('click',()=>{
        confirmBox.style.display="none"
    })
}


//addevent listener to submit button
submit.addEventListener('click',()=>{
    let url=document.querySelector('.url').value
    let requestVal;
    if(getRequest.checked){
      requestVal=getRequest.value
    }
    if(postRequest.checked){
      requestVal=postRequest.value
    }
    let contentVal=document.querySelector('input[name="contentRadio"]:checked').value
    //fetch get Request
    if(url){
        document.querySelector('#responsePrism').innerHTML=`please wait... Fetching response... `
        if(requestVal=="GET"){
                fetch(url,{
                    method:"GET"
                }).then(response=>response.text()).then(responseData=>{
                        document.querySelector('#responsePrism').innerHTML=responseData
                        Prism.highlightAll();
                })   
        }
    }
    //fetch post request
    if(url){
        document.querySelector('#responsePrism').innerHTML=`please wait... Fetching response...`
        if(requestVal=="POST"){
            let data; 
            if(contentVal=="JSON"){
                 data=jsonTextarea.value
            }
            else{
                data={}
                for (let i = 0; i <itemCount; i++) {
                    if(document.querySelector('.parameter_key'+(i+1))!=undefined){
                        let key=document.querySelector('.parameter_key'+(i+1)).value
                        let key_value=document.querySelector('.parameter_value'+(i+1)).value
                        data[key]=key_value
                    }
                    
                }
                data=JSON.stringify(data)
            }
                fetch(url,{
                    method:"POST",
                    body: data,
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    } 
                }).then(response=>response.text()).then(responseData=>{
                        document.querySelector('#responsePrism').innerHTML=responseData
                        Prism.highlightAll();
                })   
            } 

    }
    
})
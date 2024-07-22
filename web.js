// const { default: axios } = require("axios");

// const { default: axios } = require("axios");

//====================//Infinite Scroll//====================================//
 let currentPage=1;
 let lastPage=1;
// const infiniteScroll=()=>{
//   // const endOfPage=window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  
//   if(endOfPage){
//     console.log(endOfPage)
//     getPosts()
//   }
// }

window.addEventListener("scroll",function(){
    const endOfPage=window.innerHeight + window.scrollY >= document.body.scrollHeight;
    console.log(this.window.innerHeight,window.scrollY,document.body.scrollHeight)
  
  if(endOfPage && currentPage < lastPage){
    console.log(endOfPage)
    // console.log(lastPage)
    currentPage=currentPage+1;
    getPosts(false,currentPage)
  }
})
//====================//Infinite Scroll//====================================//

// get posts dynamically
 baseUrl='https://tarmeezacademy.com/api/v1'
function getPosts(reload=true,currentPage=1){
  toggleShow(true)
  axios.get(`${baseUrl}/posts?limit=8&page=${currentPage}`)
.then((response)=>{
toggleShow(false)
if(reload){
  document.getElementById("posts").innerHTML=""
}
lastPage=response.data.meta.last_page
// console.log(lastPage)
const posts=response.data.data;
    
for(post of posts){
    // console.log(post)
// console.log(post.id)
    let postTitle=""
    if(post.title  !== null){
        postTitle=post.title;
    }

      let user=geCurrenttUser()
    function showEditBtn(){
  let editBtnShow=user!=null && user.id == post.author.id 
    if(editBtnShow){

    editBtnShow=`<span style="float:right">
      <span style="float:right; margin-left:3px">
       <svg id="delete-Btn-post" onmouseenter="styleDeleteBtn(this)" onmouseleave="styleDeleteBtnLeave(this)" onclick="Alert(${post.id})"  style="transition:0.3s;"  data-bs-toggle="modal" data-bs-target="#deleteModalPost"   xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#aeb1b2" class="bi bi-trash-fill" viewBox="0 0 16 16">
    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
    </svg>
      </span>


    <svg id="edit" onclick="editPostContent('${encodeURIComponent(JSON.stringify(post))}')"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
    </svg>
    </span>` 
        
    return editBtnShow

    }else{
      return ""
    }
}



    let cardContent=`
       <div class="card shadow">
  <div class="card-header">
      <span onclick="clickedUser(${post.author.id})">
      <img src="${post.author.profile_image}" alt="" class="rounded-circle border border-2" style="width: 40px; height: 40px;">
    <b>${post.author.username}</b>
      </span>
        ${showEditBtn()}
  </div>
   <div class="card-body" onclick="clickedPost(${post.id})">
    <img src="${post.image}" class="w-100" alt="">
    <h6 style="color: rgb(168, 168, 168);" class="mt-1">${post.created_at}</h6>
    <h5>${postTitle}</h5>
    <p>${post.body}</p>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
    </svg>
      <span>(${post.comments_count}) Comments</span>
      <span id="tags"></span>
    </div>
    </div>
     </div>
    `

        document.getElementById("posts").innerHTML+=cardContent
  
              
    // :tosos
    // for(tag of post.tags){
    //   console.log('tag')
    // }
}
})
}
let posts=document.getElementById("posts")
if(posts!=null){
getPosts()
}
// get posts dynamically
//====================clicked Post==================================//

function clickedPost(PostId){
// alert(PostId)
window.location=`postDetails.html?postId=${PostId}`
}
//===================clicked Post==================================//


//button Login//
document.getElementById('logbtn').addEventListener('click',function(){
 let input1=document.getElementById("input1").value;
 let input2=document.getElementById("input2").value;
 let bodyParams={
  "username":input1,
  "password":input2
 }
 let url =`${baseUrl}/login`
   toggleShow(true)
 axios.post(url,bodyParams)
 .then((response)=>{
  //save data token , and data user  after login success 
  localStorage.setItem("token",response.data.token)
 localStorage.setItem("user",JSON.stringify(response.data.user))
   //save data token , and data user  after login success 

 //to close modal after after login success 
 const modal=document.getElementById('loginModal')
 const modalInstance=bootstrap.Modal.getInstance(modal)
 modalInstance.hide()
  //to close modal after after login success 



//trigger function to login After press button login
setUpButtonNav()
//trigger function to login After press button login
// trigger function to add input create Comment From postDetails Page
   setUpCreateComment()
  //  trigger function to add input createComment From postDetails Page

 //function to show Alert login success after login
showAlert("You're now logged in successfully",'success')
 //function to show Alert success after login
 })
 .catch((error)=>{
   //to close modal after after login failed 
 const modal=document.getElementById('loginModal')
 const modalInstance=bootstrap.Modal.getInstance(modal)
 modalInstance.hide()
  //to close modal after after login failed 
  showAlert(error.response.data.message,'danger')
}).finally(()=>{
       toggleShow(false)
})
})
//button Login//
//===============Alert Bootstrap==================//
function showAlert(Message,Type){
  const alertPlaceholder = document.getElementById('myAlert')//button login in Modal
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
    alertPlaceholder.innerHTML=""
    alertPlaceholder.append(wrapper)
}
appendAlert(Message, Type) //trigger the function
//hide Alert after two Second
//:todos
document.getElementById('myAlert').classList.add('show')
 setTimeout(()=>{
// const alert = bootstrap.Alert.getOrCreateInstance('#myAlert')
document.getElementById('myAlert').classList.toggle('show')
 },2000)
 //hide Alert after two Second
}
//===============Alert Bootstrap==================//


// function to show login or logout through token//
function setUpButtonNav(){
  let LogoutDiv=document.getElementById("btnlogout")
  let loginDiv=document.getElementById("btnsloginRegister")
      let pluss=document.getElementById('pluss');
     
  if(localStorage.getItem("token")){
    loginDiv.style.setProperty("display","none","important")
    LogoutDiv.style.setProperty("display","flex","important")
    //function to return data of user such as image and username
    let user=geCurrenttUser()
    document.getElementById("userName").innerHTML=user.username;
    document.getElementById("profile-Image").setAttribute("src",user.profile_image)
    //function to return data of user such as image and username
    //button plus
    if(pluss!=null){
      pluss.style.display="block"
    }
    
    //button plus
     }else{
    LogoutDiv.style.setProperty("display","none","important")
     loginDiv.style.setProperty("display","flex","important")

  if(pluss!=null){
      pluss.style.display="none"
    }
  }
}

function geCurrenttUser(){
  //كان بقول هعتبر ان اليوزر الجاي ب
  //null
  //  لو غير كده  حولهولي الي جيسون ورجعهولي
  let user =null
  const storageUser=localStorage.getItem("user")
  if(storageUser !== null){
   user=JSON.parse(storageUser)
  }
  return user;
}

setUpButtonNav()
// function to show login or logout through token//

// function to logout 
function logOut(){
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  setUpButtonNav()
  //delete input create comment beacuse the use is no login
  setUpCreateComment()
  //delete input create comment beacuse the use is no login
  showAlert('Logged out Successfully!','success')
}
// function to logout 



//====================================Register Request===============================================//
document.getElementById("registerBtn").addEventListener("click",function(){
const imageValue=document.getElementById("image-input").files[0];
const nameValue=document.getElementById("name-input").value
const usernameValue=document.getElementById("username-input").value
const passwordValue=document.getElementById("password-input").value
const closeBtn=document.getElementById("close")

// let formData={
//   "name":nameValue,
//   "username":uernameValue,
//   "password":passwordValue,
//   "image":imageValue
// }
const formData=new FormData()
formData.append('image',imageValue)
formData.append('name',nameValue)
formData.append('username',usernameValue)
formData.append('password',passwordValue)

let url=`${baseUrl}/register`
  toggleShow(true)
axios.post(url,formData,{
    headers:{
      'Content-Type':'multipart/form-data'
    }
})
.then((response)=>{
let user=response.data.user
let token=response.token
localStorage.setItem('token',token)
localStorage.setItem('user',JSON.stringify(user))

//Close the Modal After response
closeBtn.click()
//Close the Modal After response
//show alert after Register
showAlert('New User Registered Successfully','success')
//show alert after Register

 //trigger function to login After press button login
setUpButtonNav()
//trigger function to login After press button login
})
.catch((error)=>{
  closeBtn.click()
  showAlert(error.response.data.message,'danger')
}).finally(()=>{
    toggleShow(false)
})
})
/*====================================Register Request===============================================*/


/*====================================Post Request===================================================*/
function creatPost(){
let postId=document.getElementById("ishidden-input-post-id").value
// alert(postId)
let isCreated=postId =="" || postId==null;
  // alert(isCreated)
let titlePost=document.getElementById('title-post').value
let bodyePost=document.getElementById('body-post').value
let imagePost=document.getElementById('image-post').files[0]
let closeBtnn=document.getElementById('closeBtn')
const token =localStorage.getItem('token')

let formdata=new FormData()
formdata.append('image',imagePost)
formdata.append('title',titlePost)
formdata.append('body',bodyePost)
let url=``

if(isCreated){
  toggleShow(true)
  url=`${baseUrl}/posts`;
  axios.post(url,formdata,{
  headers:{
    'Content-Type':'multipart/form-data',
    'Authorization':`Bearer ${token}`
  }
}).then((response)=>{
  // console.log(response)
  closeBtnn.click()
  showAlert('Your Post has been shared','success')
  getPosts()
}).catch((error)=>{
      closeBtnn.click()
    showAlert(error.response.data.message,'danger')
}).finally(()=>{
   toggleShow(false)
})
}else{
  url=`${baseUrl}/posts/${postId}`;
    formdata.append("_method","put")
       toggleShow(true)
    axios.post(url,formdata,{
  headers:{
    'Content-Type':'multipart/form-data',
    'Authorization':`Bearer ${token}`
  }
}).then(response=>{
  // console.log(response)
  closeBtnn.click()
  showAlert('Your Post has been updated','success')
  getPosts()
})
.catch((error)=>{
      closeBtnn.click()
    showAlert(error.response.data.message,'danger')
    console.log(error)
}).finally(()=>{
  setTimeout(()=>{
  toggleShow(false)
  },5000)
})
}
}
/*====================================Post Request===================================================*/

/*****************************Event Input on the post button****************************** */
function StyleBtnCreatePost(){
  let field=document.getElementById('title-post');
let field2=document.getElementById('body-post');
if(field.value!=='' || field2.value!==''){
    document.getElementById('btnPuplish').classList.remove('bg-secondary')
document.getElementById('btnPuplish').classList.add('bg-primary')
document.getElementById('btnPuplish').style.color="#fff"
}
field.oninput=function(){
if(field.value!=='' || field2.value!==''){
document.getElementById('btnPuplish').classList.remove('bg-secondary')
document.getElementById('btnPuplish').classList.add('bg-primary')
document.getElementById('btnPuplish').style.color="#fff"
}else{
  document.getElementById('btnPuplish').classList.add('bg-secondary')
document.getElementById('btnPuplish').classList.remove('bg-primary')
document.getElementById('btnPuplish').style.color="#aeb1b2"
}
}
field2.oninput=function(){
if(field2.value!=='' || field.value!==''){
document.getElementById('btnPuplish').classList.remove('bg-secondary')
document.getElementById('btnPuplish').classList.add('bg-primary')
document.getElementById('btnPuplish').style.color="#fff"
}else{
  document.getElementById('btnPuplish').classList.add('bg-secondary')
document.getElementById('btnPuplish').classList.remove('bg-primary')
document.getElementById('btnPuplish').style.color="#aeb1b2"
}
}
}
  
/*****************************Event Input on the post button****************************** */

function setUpCreateComment(){
     let divCreateComm=document.getElementById("div-CreateComment")
     console.log(divCreateComm)
if(localStorage.getItem("token")!=null && divCreateComm !==null){
  // console.log('Ahzzzz')
     divCreateComm.style.display="flex";
}else if(divCreateComm !==null){
    // console.log('Ahvvvv') todo:
  divCreateComm.style.display="none";
}
}

/*=================================Edit Post Contnent===================================*/
function editPostContent(postObj){
    StyleBtnCreatePost() 
  let post=JSON.parse(decodeURIComponent(postObj))
  console.log(post)
  let postModal=new bootstrap.Modal(document.getElementById("postModal"),{})
  postModal.toggle();
  document.getElementById("ishidden-input-post-id").value=post.id
  document.getElementById("title-post").value=post.title;
  document.getElementById("body-post").value=post.body;
  document.getElementById("btnPuplish").innerHTML="Edit"
  let header=document.querySelector("#postModal #exampleModalLabel")
  header.innerHTML="Edit Post"
}
/*=================================Edit Post Contnent===================================*/
/*=================================function to show the model by create Post===================================*/
function creatPostStyleContentModel(){
  let postModal=new bootstrap.Modal(document.getElementById("postModal"),{})
  postModal.toggle();
  StyleBtnCreatePost() 
  document.getElementById("ishidden-input-post-id").value=""
  document.getElementById("title-post").value="";
  document.getElementById("body-post").value="";
  document.getElementById("btnPuplish").innerHTML="Post"
  let header=document.querySelector("#postModal #exampleModalLabel")
  header.innerHTML="Create A New Post"
}
/*=================================unction to show the model by create Post===================================*/
function styleDeleteBtn(btn){
btn.setAttribute("fill","#E72929")
}
function styleDeleteBtnLeave(btn){
btn.setAttribute("fill","#aeb1b2")
}
// function addBtn(){
//   confirm("Are you Sure")
// }

// ================================== function to delete Post =============================== //
function Alert(PostId){
 document.getElementById("hiddendeletePost").value=PostId
}
function deletePost(){
  let token=localStorage.getItem("token")
   let postIdd= document.getElementById("hiddendeletePost").value
  let url = `${baseUrl}/posts/${postIdd}`;
    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      document.getElementById("keepPostBtn").click()
      getPosts();
      showAlert("Your Post have been deleted",'sucess')
      console.log(response.data);
    }).catch((error)=>{
      showAlert(error.response.data.error_message,'danger')
      document.getElementById("keepPostBtn").click()
    })
}

if(document.getElementById("deleteBtnPost")!==null){
  document.getElementById("deleteBtnPost").addEventListener("click",function(){
  deletePost()
})
}
// ================================== function to delete Post =============================== //



function profileClicked(){
  const user=geCurrenttUser();
  console.log(user)
  const userId=user.id;
  window.location=`profile.htm?userId=${userId}`
}


function clickedUser(userId){
  // alert(userId)
    window.location=`profile.htm?userId=${userId}`
}

/*****************function show loader and hidden once reponse it reached*************************** */
function toggleShow(show=true){
if(show){
  document.getElementById("loader").style.visibility="visible"
}else{
document.getElementById("loader").style.visibility="hidden"
}
}
/*****************function show loader and hidden once reponse it reached*************************** */
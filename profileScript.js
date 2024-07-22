
setUpButtonNav()
upadateInFoPersonal()


function getCurrenttUserId(){
    const urlParams=new URLSearchParams(window.location.search)
    const id=urlParams.get("userId")
    return id;
}

function upadateInFoPersonal(){
    let id=getCurrenttUserId()
let url=`${baseUrl}/users/${id}`
axios.get(url)
.then((response)=>{
         const user = response.data.data;
    
document.querySelector(".img img").src=user.profile_image
document.querySelector(".img img").style.border="3px solid #8D493A"
document.getElementById("dataDetails").firstElementChild.innerHTML=user.email
document.getElementById("dataDetails").children[1].innerHTML=user.name
document.getElementById("dataDetails").children[2].innerHTML=user.username
document.querySelector(".numberData p").firstElementChild.textContent=user.posts_count
document.querySelector(".numberData").children[1].firstElementChild.textContent=user.comments_count;
document.getElementById("name-posts").innerHTML=`${user.name}'s`
})
}



 baseUrl='https://tarmeezacademy.com/api/v1'
function getPosts(){
    let id=getCurrenttUserId()
    console.log(id)
  axios.get(`${baseUrl}/users/${id}/posts`)
.then((response)=>{
const posts=response.data.data;
console.log(posts)
document.getElementById("user-posts").innerHTML=""
for(post of posts){
    // console.log(post)
// console.log(post.id)
    let postTitle=""
    if(post.title  !== null){
        postTitle=post.title;
    }
      let user=geCurrenttUser()
    function showEditBtn(){
  let ismyPosts=user!=null && user.id == post.author.id 
  editBtnShow=``
    if(ismyPosts){

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

    document.getElementById("user-posts").innerHTML+=cardContent
  
              
    // :tosos
    // for(tag of post.tags){
    //   console.log('tag')
    // }
}
})
}

getPosts()
/******************************check if id to user login equal to userid in query params in link****************************************** */
let idOwn=geCurrenttUser().id

console.log(idOwn)
console.log("#")
// console.log(geCurrenttUser())
if(getCurrenttUserId() != idOwn){
  document.getElementById("pluss").style.display="none"
}

/******************************check if id to user login equal to userid in query params in link****************************************** */

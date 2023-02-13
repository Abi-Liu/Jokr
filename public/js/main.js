const likesArr = document.querySelectorAll(".like");
const dislikesArr = document.querySelectorAll(".dislike");
const deleteArr = document.querySelectorAll(".delete");
const liked = document.querySelectorAll('.liked')
const disliked = document.querySelectorAll(".disliked");

likesArr.forEach((el) => el.addEventListener("click", addLike));
dislikesArr.forEach((el) => el.addEventListener("click", addDislike));
deleteArr.forEach((el) => el.addEventListener("click", del));
liked.forEach((el) => el.addEventListener("click", removeLike));
disliked.forEach((el) => el.addEventListener("click", removeDislike));

async function addLike(){
    const jokeID = this.parentNode.dataset.id;
    try{
        const response = await fetch('jokes/like', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': jokeID
            })  
        })
        const data = await response.json()
        console.log('data')
        location.reload()
    } catch (err){
        console.log(err)
    }
}

async function removeLike(){
    const jokeID = this.parentNode.dataset.id;
    try{
        const response = await fetch('jokes/removeLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': jokeID
            })  
        })
        const data = await response.json()
        console.log('data')
        location.reload()
    } catch (err){
        console.log(err)
    }
}

async function addDislike(){
    const jokeID = this.parentNode.dataset.id;
    try{
        const response = await fetch('/jokes/dislike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': jokeID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err){
        console.log(err)
    }
}

async function removeDislike(){
    const jokeID = this.parentNode.dataset.id;
    try{
        const response = await fetch('jokes/removeDislike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': jokeID
            })  
        })
        const data = await response.json()
        console.log('data')
        location.reload()
    } catch (err){
        console.log(err)
    }
}

async function del(){
    const jokeID = this.parentNode.dataset.id;
    console.log(this.parentNode)
    try{
        const response = await fetch('/jokes/deleteJoke', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': jokeID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err){
        console.log(err)
    }
}
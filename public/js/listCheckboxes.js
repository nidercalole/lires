document.addEventListener("change", async function(event) {

    if(event.target.classList.contains("checkboxLists") && event.target.type === "checkbox"){
        let arrIndexId = event.target.id.at(-1);
        let listId = event.target.id.slice(0, -1);
        if(event.target.checked){
            await fetch('/addToList/listItemCheckUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listid: listId,
                    ingIndex: arrIndexId,
                    checked: true
                })
            }).then(response => response.json())
        }else{
            await fetch('/addToList/listItemCheckUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listid: listId,
                    ingIndex: arrIndexId,
                    checked: false
                })
            }).then(response => response.json())
        }
    }
});
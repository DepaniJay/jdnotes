// Default function calling when page is load/refrece
showNotes();

// If user adds a note, add it to localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(element){

    // Get data when user click add note button
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    // Retraive data from the localStorage 
    let notes = localStorage.getItem('JDNotesTakingApp');
    // if data is null then create new array
    if(notes == null){
        notesObj = [];
    }else{
        // else convert string into array by using json
        notesObj = JSON.parse(notes);
    }

    // create new object for storing data  
    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }
    // add object into array using push method
    notesObj.push(myObj);


    // add Array of Object into localStorage by converting ArrayOfObject into string using json
    localStorage.setItem('JDNotesTakingApp',JSON.stringify(notesObj));
    // after add new note to localStorage clear form value 
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);

    // after add new note to localStorage call function to see all notes with new updated note
    showNotes();
})

// Function to show element from localStorage
function showNotes(){

    // get data from the localStorage
    let notes = localStorage.getItem('JDNotesTakingApp');
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    // Retraive all notes from the localStorage using forEach loop and put one by one in the card
    let html = "";
    notesObj.forEach(function(element,index){
        
        html += `
        <div class="noteCard card my-3 mx-3" style="width: 18rem;height: 13rem; overflow-y: auto;">
            <div class="card-body ">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button onclick="editNote(${index})" class="btn btn-primary"><i class="fa fa-pencil-square-o"></i> Edit</button>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger"><i class="fa fa-trash-o"></i> Delete</button>
            </div>
        </div>
        `;

    });


    // get result div data 
    let notesElm = document.getElementById('notes');

    // check the Array Of Object is empty or not if is not empty then add card into this div
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }else{
        // if Array of Object is empty then show this message
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function to edit a note 
function editNote(index){
    // console.log("hi",index);
    
    // get data from the localStorage for edit data
    let notes = localStorage.getItem('JDNotesTakingApp');
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    // get referance of the element 
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    

    // set all input field to empty for copy text from localstorage to this input field
    addTxt.value = "";
    addTitle.value = "";

    // copy value from localStorage by using index of array and set value to input field
    addTxt.value = notesObj[index].text;
    addTitle.value = notesObj[index].title;

    // get btn referance
    let editBtn = document.getElementById('editBtn');
    // store note index value to edit button by using data-target attribute because when i edited text save to localStorage at that time i need the index number 
    editBtn.setAttribute('data-target',index);
    let addBtn = document.getElementById('addBtn');

    // set condition when i click on edit note button then main form add note button is hide and edit button is show
    editBtn.style.display = "block";
    addBtn.style.display = "none";
    // console.log(notesObj[index]);

}

// get referance of edit button of main form
let editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click',function(){

    // get referance all input field and index number 
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let editIndex = editBtn.getAttribute('data-target');
    // console.log(editIndex);

    // get data from localStorage for edited data storing
    let notes = localStorage.getItem('JDNotesTakingApp');
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    // delete old note because at this index number store new edited note
    deleteNote(editIndex);

    // create new object for storing data 

    let myObj = {
        title : addTitle.value,
        text : addTxt.value
    }
    // store object into array using push method
    notesObj.push(myObj);

    // edit localStorage when new data is stored in array
    localStorage.setItem('JDNotesTakingApp',JSON.stringify(notesObj));
    // call showNotes function for see all notes after edit note is save into localStorage
    showNotes();
    // again set display none to main form edit buttton 
    editBtn.style.display = "none";
    let addBtn = document.getElementById('addBtn');
    // again show add note button 
    addBtn.style.display = "block";

    // set all input field to empty
    document.getElementById('addTxt').value="";
    document.getElementById('addTitle').value="";

})

// Function to delete a note from localStorage
function deleteNote(index){
    // console.log("hi",index);

    let notes = localStorage.getItem('JDNotesTakingApp');
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    // delete note when user click delete button using note index number
    notesObj.splice(index,1);
    // again update localStorage
    localStorage.setItem('JDNotesTakingApp',JSON.stringify(notesObj));
    // call showNotes function for whatever update is accur in localStorage is show
    showNotes();
}


// get referance search text for search/filter
let search = document.getElementById('searchTxt');
let searchType = document.getElementById('searchType');
// add input event when user write text into search box
search.addEventListener('input',function(){

    // convert all search value to lowercase for batter searching
    let inputVal = search.value.toLowerCase();
    // console.log("Input event fired!",inputVal);

    // get referance of card element
    let noteCards = document.getElementsByClassName('noteCard');
    // store all card element to one array usign forEach loop  
    Array.from(noteCards).forEach(function(element){

        let cardTxt = "";
        // check condition for search title or text
        if(searchType.value=='txt'){
            // get note data from card element for txt
            cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        }else{
            // get note data from card element for title
            cardTxt = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        }
        // check search box text is available into card data if data is availabel then set that element display property to block
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})


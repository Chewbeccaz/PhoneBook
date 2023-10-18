//Create my array and variables needed. 
let myContacts = [],
nameInput = document.getElementById('name-input'),
phoneInput = document.getElementById('phone-input'),
createBtn = document.getElementById('createBtn'),
validationMsg = document.getElementById('error-msg'),
deleteAllBtn = document.getElementById('deleteAllBtn');

document.getElementById('createBtn').addEventListener('click', function(e){
    //Add values from input into new variables
    let saveName = nameInput.value;
    let savePhone =phoneInput.value;

    //if valid returns true, add the new contact-object into the array. 
    if (isValid(saveName, savePhone)){
        let newContact = {
            name: saveName, //Property
            phone: savePhone //Property
        };
        myContacts.push(newContact);

        /*Sorting the array in alphabetical order by using 
        Sort and localeCompare-method to compare strings. */
        myContacts.sort((a, b) => {
            return a.name.localeCompare(b.name);
        })

        //calling the function updateList() & clear input.
        updateList();
        nameInput.value ="";
        phoneInput.value ="";
        // make shure that the errormsg is hidden.  
         validationMsg.style.display = 'none';
    }
    else {
        validationMsg.style.display = 'block';
        validationMsg.innerText = 'Fyll i båda fälten och använd endast siffror för telefonnummer.';
        return; //prevent showing the deleteAllBtn before creating an object.
    }
    deleteAllBtn.style.display='inline';
});
//calling deleteAll if button is triggered()
document.getElementById('deleteAllBtn').addEventListener('click', (e) => {
    deleteAll();
});


/**************************** ALLA FUNKTIONER ******************************/

function updateList() {
    //Choosing where to put my new content. Inside the Ul list. 
    let contactUl = document.getElementById('contact-list');
    contactUl.innerHTML = ""; //Clears the contactUl-element to prevent it from dublicating. 

    /* Loops through the array and creating a div with inputs for every index.
    Setting the value by using the users input. This will be added to the li-element */

    myContacts.forEach(function(contact) {
        let contactLi = document.createElement('li');
        let contactDiv = document.createElement('div');
        
        let nameInput = document.createElement('input');
        nameInput.type = "text";
        nameInput.value = contact.name;
        nameInput.disabled = true; 
        
        let phoneInput = document.createElement('input');
        phoneInput.type = "text";
        phoneInput.value = contact.phone;
        phoneInput.disabled = true;

        /****************** Adding change/delete buttons **************/
        let changeBtn = document.createElement('button');
        changeBtn.innerText='Ändra';
        changeBtn.addEventListener('click', (e) => {
            change(changeBtn, nameInput, phoneInput);
        })
        let deleteBtn = document.createElement('button');
        deleteBtn.innerText='Radera';
        deleteBtn.addEventListener('click', (e) => {
            deleteContact(contactLi);
        });
        
        // Append the input elements into div and then append the div into UL.
        contactDiv.append(nameInput, phoneInput, changeBtn, deleteBtn);
        contactLi.appendChild(contactDiv);
        contactUl.appendChild(contactLi);
    });
}

function change(changeButton, nameInput, phoneInput){
    const isEdit = changeButton.innerText === 'Ändra';

    if (!isEdit){
    if (isValid(nameInput.value, phoneInput.value)){
        validationMsg.innerText = '';
    }
       else{
        validationMsg.style.display = 'block';
        validationMsg.innerText = 'OBS! Fyll i båda fälten och använd endast siffror för telefonnummer.';
        return; //Makes sure that we can't keep editing. 
    }
}
    //Toggle the bool-statement. 
    nameInput.disabled=!isEdit;
    phoneInput.disabled=!isEdit; 
    //Ternary Operator to clean up the code. 
    changeButton.innerText = isEdit ? 'Spara' : 'Ändra';   

    /*
     if (isEdit){
        changeButton.innerText = 'Spara';
     }
     else{
        changeButton.innerText = 'Ändra';
     }*/
}

function deleteContact(contactLi){
    contactLi.parentElement.removeChild(contactLi);
}

function isValid(saveName, savePhone){
return saveName && savePhone && !isNaN(savePhone) ? true : false;
}

function deleteAll(){
    //Empty the array and hide the deleteAllBtn. 
    myContacts = []; 
    updateList(); 
    deleteAllBtn.style.display = 'none';
}





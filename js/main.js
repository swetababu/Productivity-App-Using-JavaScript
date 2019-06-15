var Contacts = {
    index: window.localStorage.getItem("Contacts:index"),
    $form: document.getElementById("contacts-form"),
    $button_save: document.getElementById("submit"),
    init: function(){
         if (!Contacts.index) {
            window.localStorage.setItem("Contacts:index", Contacts.index = 1);
         }
    },
    storeAdd: function(entry){
        entry.id = Contacts.index;
        window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
        window.localStorage.setItem("Contacts:index", ++Contacts.index);
        },
//    storeEdit:function(entry){
//        window.localStorage.setItem("Contacts:"+ entry.id, JSON.stringify(entry));
//    },
    storeRemove: function(entry) {
        window.localStorage.removeItem("Contacts:"+ entry.id);
    },
    tableRemove: function(entry) {
        Contacts.$table.removeChild(document.getElementById("entry-"+ entry.id));
    },
    changeContact: function(){
              var op = event.target.getAttribute("data-op");
              if (/edit|remove/.test(op)) {
                var entry = JSON.parse(window.localStorage.getItem("Contacts:"+ event.target.getAttribute("data-id")));
                if (op == "remove") {
                    if (confirm('Are you sure you want to remove "'+ entry.first_name +' '+ entry.last_name +'" from your contacts?')) {
                        Contacts.storeRemove(entry);
                        Contacts.tableRemove(entry);
                    }
                }
                event.preventDefault()
            }
    }
}
Contacts.init();
//when the form is submitted
$( "#contacts-form" ).submit(function( event ) {
    var entry = {
                id: parseInt(this.id_entry.value),
                first_name: this.contact_fname.value,
                last_name: this.contact_lname.value,
                email: this.contact_email.value,
                phone:this.contact_phone.value,
                bday:this.contact_bday.value
            };
            if (entry.id == 0) { // add
                Contacts.storeAdd(entry);
            }
            else { // edit
                Contacts.storeEdit(entry);
            }
            alert("New Contact Added");
            this.reset();
            this.id_entry.value = 0;
          
            event.preventDefault();
});
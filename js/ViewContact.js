//use "strict";
window.onload= function () {
 var index = parseInt(Contacts.index);
 viewContacts.init(index);
};
var viewContacts = {
   $table: document.getElementById("contacts-table"),
   init: function(index){
         if (!index) { //no contacts to display
         }
       
       // initialize the table
       if (window.localStorage.length - 1) {
            var contacts_list = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/Contacts:\d+/.test(key)) {
                    contacts_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if (contacts_list.length) {
                contacts_list
                    .sort(function(a, b) {
                        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                    })
                    .forEach(viewContacts.tableAdd);
            }
        }
       
    },
   tableAdd: function(entry) {
        var $tr = document.createElement("tr"), $td, key;
        for (key in entry) {
            if (entry.hasOwnProperty(key)) {
                $td = document.createElement("td");
                $td.appendChild(document.createTextNode(entry[key]));
                $tr.appendChild($td);
            }
        }
        $td = document.createElement("td");
        $td.innerHTML = '<a onclick="Contacts.changeContact()" href="" data-op="remove" data-id="'+ entry.id +'">Delete</a>';
        $tr.appendChild($td);
        $tr.setAttribute("id", "entry-"+ entry.id);
        viewContacts.$table.appendChild($tr);
    }
};

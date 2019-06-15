var ah = ah || {};
ah.koUtils = ah.koUtils || {};

ah.koUtils.sortByProperty = function(arr, propertyName, isDescending) {
    return arr.sort(function (a, b) {
        if (a[propertyName] === b[propertyName]) {
            return 0;
        }

        if (a[propertyName] < b[propertyName]) {
            return isDescending ? 1 : -1;
        }

        return isDescending ? -1 : 1;
    });
}

function Contact(id, firstname, surname, address1, address2, address3, town, county, postcode, telephone, mobile, email) {
    this.id = id;
    this.firstname = firstname;
    this.surname = surname;
    this.address1 = address1;
    this.address2 = address2;
    this.address3 = address3;
    this.town = town;
    this.county = county;
    this.postcode = postcode;
    this.telephone = telephone;
    this.mobile = mobile;
    this.email = email;
}

var dataObj = (function() {

    function Col(headerText, rowText) {
        this.headerText = headerText;
        this.rowText = rowText;
    }

    var contacts = {
        cols: [
            new Col("ID", "id"),
            new Col("First name", "firstname"),
            new Col("Surname", "surname"),
            new Col("Address 1", "address1"),
            new Col("Address 2", "address 2"),
            new Col("Address 3", "address3"),
            new Col("Town", "town"),
            new Col("County", "county"),
            new Col("Post Code", "postcode"),
            new Col("Telephone", "telephone"),
            new Col("Mobile", "mobile"),
            new Col("Email Address", "email")
        ],
        data: [
            new Contact(101, "Jim", "Bowen", "123 Wibble Street", "Coppull", null, "Chorley", "Lancashire", "PR7 1AB", "01257 111111", "07123 111111", "jim.bowen@example.com"),
            new Contact(102, "Terry", "Wogan", "87 Spendmore Avenue", "Coppull", "Near. Chorley", "Chorley", "Lancashire", "PR7 2AC", "01257 222222", "07123 222222", "terry.wogan@example.com"),
            new Contact(103, "Jimmy", "Anderson", "62 Cricketers Way", "Coppull", null, "Chorley", "Lancashire", "PR7 2KE", "01257 333333", "07123 333333", "jimmy.anderson@example.com"),
            new Contact(104, "Will", "Grigg", "28 Greenfield Court", null, null, "Sunderland", "Tyne and Wear", "SR5 1RU", "0191 123 4444", "07123 444444", "wg@example.com")
        ]
    };

    return {
        contactsData: contacts
    };

})(ah);

var vm = function(data) {
    var contacts = ko.observableArray(data.contactsData.data);
    var surnameSortIsDescending = ko.observable();
    var modalIsOpen = ko.observable(false);
    var newContact = ko.observable(new Contact());

    var sortBySurname = function() {
        if (surnameSortIsDescending() === undefined) {
            surnameSortIsDescending(false);
        } else {
            surnameSortIsDescending(!surnameSortIsDescending());
        }

        ah.koUtils.sortByProperty(contacts, "surname", surnameSortIsDescending());
    }

    var numberOfContacts = ko.computed(function() {
        return contacts().length;
    });

    var showModal = function() {
        modalIsOpen(true);
    };

    var closeModal = function() {
        modalIsOpen(false);
    }

    var saveNewContact = function() {
        var newId = getNewContactId();
        var nc = newContact();
        nc.id = newId;

        contacts.push(nc);
        newContact(new Contact());
        closeModal();
    };

    var getNewContactId = function() {
        var c = contacts();
        var last = c[c.length - 1];
        var lastId = parseInt(last.id);
        var newId = lastId + 1;
        
        return newId;
    }

    return {
        contacts: contacts,
        numberOfContacts: numberOfContacts,
        showModal: showModal,
        closeModal: closeModal,
        modalIsOpen: modalIsOpen,
        saveNewContact: saveNewContact,
        newContact: newContact,
        sortBySurname: sortBySurname,
        surnameSortIsDescending: surnameSortIsDescending
    };
};

ko.applyBindings(vm(dataObj));
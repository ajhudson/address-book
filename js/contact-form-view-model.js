
    // View Model for validation of a new contact
    var NewContactFormViewModel = function () {
        
        /*
        var newContactFirstname = ko.observable().extend({fieldIsRequired: "First name is required"});
        var newContactSurname = ko.observable().extend({fieldIsRequired: "Surname is required"});
        */

        var formFields = {
            newContactFirstname: ko.observable().extend({fieldIsRequired: "First name is required"}),
            newContactSurname: ko.observable().extend({fieldIsRequired: "Surname is required"})
        };

        var getFieldCount = function() {
            return Object.keys(formFields).length;
        }

        var isValid = ko.computed(function() {

            var failedValidationCount = 0;

            for (var p in formFields) {
                formFields[p]    
            }


            return  !formFields.newContactFirstname.hasFailedValidation() &&
                    !formFields.newContactSurname.hasFailedValidation();
        });

        var touchEverything = function() {
            formFields.newContactFirstname.beenTouched(true);
            formFields.newContactSurname.beenTouched(true);
        };

        var reset = function() {
            formFields.newContactFirstname("");
            formFields.newContactFirstname.beenTouched(false);
            formFields.newContactSurname("");
            formFields.newContactSurname.beenTouched(false);
        };

        return {    
            formFields: formFields,
            touchEverything: touchEverything,
            isValid: isValid,
            reset: reset
        }
    };
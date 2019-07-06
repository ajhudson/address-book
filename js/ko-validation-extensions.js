ko.extenders.fieldIsRequired = function(target, overrideMessage) {
    target.beenTouched = ko.observable(false);
    target.hasFailedValidation = ko.observable(false);
    target.validationMessage = ko.observable();
    target.hasError = ko.computed(function() {
        return target.beenTouched() && target.hasFailedValidation();
    });
 
    function validate(newValue, isUntouched) {
        target.beenTouched(!isUntouched);
        target.hasFailedValidation(newValue ? false : true);
        target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
    }
 
    validate(target(), true);
 
    target.subscribe(validate);

    return target;
}


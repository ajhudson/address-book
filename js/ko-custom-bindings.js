ko.bindingHandlers.bootstrapModal = {
    init: function(el, valueAccessor, allBindings, viewModel, bindingContext) {
        var args = valueAccessor();
        var modalTarget = args.modaltarget;
        var okCallback = args.okcallback;
        var modalEl = $("#" + modalTarget);

        
        $(el).on("click", function() {
            modalEl.modal("show");
        });

        modalEl.find("button.close[data-dismiss='modal']").on("click", function() {
            modalEl.modal("hide");
        });
        
        modalEl.find("button.btn.btn-primary[data-dismiss='modal']").on("click", function() {
            if (typeof okCallback === "function") {
                okCallback();
            }
            modalEl.modal("hide");
        });
        
        
    }
};

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
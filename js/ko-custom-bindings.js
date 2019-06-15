ko.bindingHandlers.showModal = {
    init: function (el, valueAccessor) {
        $(el).modal({ backdrop: 'static', keyboard: true, show: false});
    },
    update: function (el, valueAccessor) {
        var val = valueAccessor();

        if (ko.utils.unwrapObservable(val)) {
            $(el).modal('show');
        } else {
            $(el).modal('hide');
        }
    }
};
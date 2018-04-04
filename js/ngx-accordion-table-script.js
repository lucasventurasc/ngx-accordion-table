function toggleSibling(sibling){
    sibling = sibling.nextSibling;
    while(!/tr/i.test(sibling.nodeName)){
        sibling = sibling.nextSibling;
    }
    sibling.style.display = sibling.style.display === 'table-row' ? 'none' : 'table-row';
}

$(function() {
    bindClick('.chevron-up', function (event) {
        let element = event.currentTarget;
        if (element.className.indexOf("chevron-up-undo") === -1) {
            addClass(element, "chevron-up-undo");
        } else {
            removeClass(element, "chevron-up-undo")
        }
    });
});

function bindClick(selectors, callback) {
    query(selectors).forEach(function(element) {
        element.addEventListener('click', callback);
    })
}

function query(selectors) {
    return document.querySelectorAll(selectors);
}

function addClass(element, className){
    element.className += ' ' + className;
}
function removeClass(element, className) {
    element.className = element.className.replace(
        new RegExp('( |^)' + className + '( |$)', 'g'), ' ').trim();
}

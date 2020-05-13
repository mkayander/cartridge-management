// const data_cartridges = django_data_cartridges;

window.onload = function () {
    const cartCount = document.getElementById('count');
    const cartData = document.getElementById('data');
    const select1 = document.getElementById('cartridges_select');

    // console.log(data_supply);

    // console.log(Object.keys(data_cartridges).length);

    // console.log(cartCount, cartData, select1);

    // function setupView() {
    //     const cartridge = data_cartridges[select1.value***REMOVED***;
    //     cartCount.innerText = data_cartridges[select1.value***REMOVED***["count"***REMOVED***;
    //     cartData.innerText = data_cartridges[select1.value***REMOVED***["manufacturer"***REMOVED***;
    // ***REMOVED***

    // setupView();
    //
    // select1.onchange = function () {
    //     setupView()
    // ***REMOVED***;
***REMOVED***;

function btnChange(id) {
    $.getJSON('http://ps-bykrc.dellin.local/api/supplies/'+id, (data) => {
        console.log(data);
    ***REMOVED***);
    console.log(id);
    // document.getElementById("label" + data_supply[name***REMOVED***["count"***REMOVED***).style.display = "none";
    // document.getElementById("input" + data_supply[name***REMOVED***["count"***REMOVED***).style.display = "block";
    // document.getElementById("label" + data_supply[name***REMOVED***["cartridge"***REMOVED***).style.display = "none";
    // document.getElementById("input" + data_supply[name***REMOVED***["cartridge"***REMOVED***).style.display = "block";
***REMOVED***

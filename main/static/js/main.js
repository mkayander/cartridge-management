window.onload = function () {
    const cartCount = document.getElementById('count');
    const cartData = document.getElementById('data');
    const select1 = document.getElementById('cartridges_select');

    const data = django_data;
    console.log(data);
    // console.log(cartCount, cartData, select1);

    function setupView() {
        const cartridge = data[select1.value***REMOVED***;
        cartCount.innerText = data[select1.value***REMOVED***["count"***REMOVED***;
        cartData.innerText = data[select1.value***REMOVED***["manufacturer"***REMOVED***;
    ***REMOVED***

    setupView();

    select1.onchange = function () {
        setupView()
    ***REMOVED***;
***REMOVED***;

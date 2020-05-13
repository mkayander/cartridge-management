window.onload = function () {
    const cartCount = document.getElementById('count');
    const cartData = document.getElementById('data');
    const select1 = document.getElementById('cartridges_select');

    const data = django_data;
    // console.log(data);
    // console.log(cartCount, cartData, select1);


    for (let de in data) {
        console.log(de);
        var btnCardCount = document.getElementById("btnCardCount" + de["count"]);
        console.log(btnCardCount);
    }

    btnCardCount.onclick = function () {
        let spanChange = document.getElementById("span" + data["count"]);
        console.log(data["count"]);
        console.log(spanChange);
        spanChange.style.display = "none";
    };

    function setupView() {
        const cartridge = data[select1.value];
        cartCount.innerText = data[select1.value]["count"];
        cartData.innerText = data[select1.value]["manufacturer"];
    }

    setupView();

    select1.onchange = function () {
        setupView()
    };
};

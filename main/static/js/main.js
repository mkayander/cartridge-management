// const data_cartridges = django_data_cartridges;

window.onload = function () {
    const cartCount = document.getElementById('count');
    const cartData = document.getElementById('data');
    const select1 = document.getElementById('cartridges_select');

    // console.log(data_supply);

    // console.log(Object.keys(data_cartridges).length);

    // console.log(cartCount, cartData, select1);

    // function setupView() {
    //     const cartridge = data_cartridges[select1.value];
    //     cartCount.innerText = data_cartridges[select1.value]["count"];
    //     cartData.innerText = data_cartridges[select1.value]["manufacturer"];
    // }

    // setupView();
    //
    // select1.onchange = function () {
    //     setupView()
    // };
};

function btnChange(id) {
    $.getJSON('http://ps-bykrc.dellin.local/api/supplies/'+id, (data) => {
        console.log(data);
    });
    console.log(id);
    // document.getElementById("label" + data_supply[name]["count"]).style.display = "none";
    // document.getElementById("input" + data_supply[name]["count"]).style.display = "block";
    // document.getElementById("label" + data_supply[name]["cartridge"]).style.display = "none";
    // document.getElementById("input" + data_supply[name]["cartridge"]).style.display = "block";
}

window.onload = function () {
    $(function () {
        let options = {
            "backdrop": "static",
            "show": true
        ***REMOVED***;
        $("#popup").on("click", function () {
            $('#modalPopup').modal(options);
        ***REMOVED***);
    ***REMOVED***);
***REMOVED***;

function btnSupplySubmit(id, value) {
    const input = parseInt(document.getElementById("supplyInputCount" + id).value);
    console.log(value);
    $.ajax({
        type: 'PATCH',
        url: 'http://ps-bykrc.dellin.local/api/supplies/' + id + "/",
        data: {"count": input, "cartridge": value***REMOVED***,
        success: location.reload()
    ***REMOVED***);
***REMOVED***

function btnSupplyChangeOrSubmit(id) {
    let btnSupplyChange = document.getElementById("btnSupplyChange" + id);
    let btnSupplyDelete = document.getElementById("btnSupplyDelete" + id);
    let supplyLabelCount = document.getElementById("supplyLabelCount" + id);
    let supplyInputCount = document.getElementById("supplyInputCount" + id);
    let supplyLabelCart = document.getElementById('supplyLabelCart' + id);
    let supplySelectCart = document.getElementById("supplySelectCart" + id);

    if (btnSupplyChange.value === 'true') {
        supplySelectCart.style.display = "block";

        supplyLabelCart.style.display = "none";

        supplyLabelCount.style.display = "none";

        supplyInputCount.style.display = "block";

        btnSupplyDelete.innerText = "Отмена";
        btnSupplyDelete.value = "false";

        btnSupplyChange.innerText = "Отправить";
        btnSupplyChange.classList.add("btn-outline-success");
        btnSupplyChange.classList.remove("btn-outline-info");
        btnSupplyChange.value = "false";

        if (supplySelectCart.childElementCount === 0) {
            $.get('http://ps-bykrc.dellin.local/api/cartridges/', function (data) {
                    for (let dat in data) {
                        let opt = document.createElement('option');
                        opt.innerText = data[dat***REMOVED***.name;
                        opt.value = data[dat***REMOVED***.name;
                        supplySelectCart.append(opt);
                    ***REMOVED***
                ***REMOVED***
            );
        ***REMOVED***


    ***REMOVED*** else {
        btnSupplySubmit(id, supplySelectCart.value);
        console.log(supplySelectCart.value);
        btnSupplyChange.innerText = "Изменить";
        btnSupplyChange.classList.remove("btn-outline-success");
        btnSupplyChange.classList.add("btn-outline-info");

        supplyLabelCount.style.display = "block";

        supplyInputCount.style.display = "none";

        supplyLabelCart.style.display = "block";
    ***REMOVED***
***REMOVED***

function btnSupplyDeleteOrCancel(id) {
    let btnSupplyChange = document.getElementById("btnSupplyChange" + id);
    let btnSupplyDelete = document.getElementById("btnSupplyDelete" + id);
    let supplyLabelCount = document.getElementById("supplyLabelCount" + id);
    let supplyInputCount = document.getElementById("supplyInputCount" + id);
    let supplyLabelCart = document.getElementById('supplyLabelCart' + id);
    let supplySelectCart = document.getElementById("supplySelectCart" + id);

    if (btnSupplyDelete.value === 'true') {
        let options = {
            "backdrop": "static",
            "show": true
        ***REMOVED***;
        $("#modalOnDelete").modal(options);
        $("#btnConfirmDelete").on('click', () => {
            $.ajax({
                type: 'Delete',
                url: 'http://ps-bykrc.dellin.local/api/supplies/' + id + "/",
                success: location.reload()
            ***REMOVED***);
        ***REMOVED***);
    ***REMOVED*** else {
        supplySelectCart.style.display = "none";

        btnSupplyDelete.innerText = "Удалить";
        btnSupplyDelete.value = "true";

        supplyLabelCount.style.display = "block";

        supplyInputCount.style.display = "none";

        btnSupplyChange.innerText = "Изменить";
        btnSupplyChange.value = "true";
        btnSupplyChange.classList.remove("btn-outline-success");
        btnSupplyChange.classList.add("btn-outline-info");

        supplyLabelCart.style.display = "block";
    ***REMOVED***
***REMOVED***




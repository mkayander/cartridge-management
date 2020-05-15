window.onload = function () {
    $(function () {
        let options = {
            "backdrop": "static",
            "show": true
        ***REMOVED***;
        $("#popup").on("click", function () {
            $('#modalPopup').modal(options);
        ***REMOVED***);
        $("#btnAddOrder").on("click", function () {
            $('#modalOrder').modal(options);
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

function confirmDelete(modal, url, id) {
    const {btnConfirmDelete***REMOVED*** = getDomElements(id);
    let options = {
        "backdrop": "static",
        "show": true
    ***REMOVED***;
    modal.modal(options);
    btnConfirmDelete.onclick = () => {
        console.log("btnConfirmDelete clicked");
        $.ajax({
            type: 'Delete',
            url: url + id + "/",
            success: location.reload()
        ***REMOVED***);
    ***REMOVED***;
***REMOVED***

function getCartridgeName(select) {
    $.get('http://ps-bykrc.dellin.local/api/cartridges/', function (data) {
                    for (let dat in data) {
                        let opt = document.createElement('option');
                        opt.innerText = data[dat***REMOVED***.name;
                        opt.value = data[dat***REMOVED***.name;
                        select.append(opt);
                    ***REMOVED***
                ***REMOVED***
            );
***REMOVED***

function getDomElements(id) {
    return {
        btnSupplyChange: document.getElementById("btnSupplyChange" + id),
        btnSupplyDelete: document.getElementById("btnSupplyDelete" + id),
        supplyLabelCount: document.getElementById("supplyLabelCount" + id),
        supplyInputCount: document.getElementById("supplyInputCount" + id),
        supplyLabelCart: document.getElementById('supplyLabelCart' + id),
        supplySelectCart: document.getElementById("supplySelectCart" + id),
        btnConfirmDelete: document.getElementById("btnConfirmDelete"),
        btnOrderChange: document.getElementById("btnOrderChange" + id),
        btnOrderDelete: document.getElementById("btnOrderDelete" + id),
        orderInputNumber: document.getElementById("orderInputNumber" + id),
        orderInputCount: document.getElementById("orderInputCount" + id),
        orderLabelNumber: document.getElementById("orderLabelNumber" + id),
        orderLabelCount: document.getElementById("orderLabelCount" + id),
        orderSelectCart: document.getElementById("orderSelectCart" + id),
        orderLabelCart: document.getElementById("orderLabelCart" + id),
    ***REMOVED***
***REMOVED***


function btnSupplyChangeOrSubmit(id) {
    // const els = getDomElements();
    // console.log(els.btnSupplyChange);
    const {btnSupplyChange, btnSupplyDelete, supplyLabelCount, supplyInputCount, supplyLabelCart, supplySelectCart***REMOVED*** = getDomElements(id);

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
            getCartridgeName(supplySelectCart);
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
    const {btnSupplyChange, btnSupplyDelete, supplyLabelCount, supplyInputCount, supplyLabelCart, supplySelectCart***REMOVED*** = getDomElements(id);

    if (btnSupplyDelete.value === 'true') {
        confirmDelete($("#modalOnDelete"), 'http://ps-bykrc.dellin.local/api/supplies/', id);
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

function btnOrderChangeOrSubmit(id) {
    const els = getDomElements(id);
    if (els.btnOrderChange.value === 'true') {
        els.btnOrderDelete.innerText = "Отмена";
        els.btnOrderDelete.value = "false";

        els.btnOrderChange.innerText = "Отправить";
        els.btnOrderChange.classList.add("btn-outline-success");
        els.btnOrderChange.classList.remove("btn-outline-info");
        els.btnOrderChange.value = "false";

        els.orderInputNumber.style.display = "block";
        els.orderInputCount.style.display = "block";
        els.orderSelectCart.style.display = "block";

        els.orderLabelNumber.style.display = "none";
        els.orderLabelCount.style.display = "none";
        els.orderLabelCart.style.display = "none";

        if (els.orderSelectCart.childElementCount === 0) {
            getCartridgeName(els.orderSelectCart);
        ***REMOVED***
    ***REMOVED*** else {
        els.btnOrderChange.innerText = "Изменить";
        els.btnOrderChange.classList.remove("btn-outline-success");
        els.btnOrderChange.classList.add("btn-outline-info");
    ***REMOVED***
***REMOVED***

function btnOrderDeleteOrCancel(id) {
    const els = getDomElements(id);

    if (els.btnOrderDelete.value === 'true') {
        confirmDelete($("#modalOnDelete"), 'http://ps-bykrc.dellin.local/api/orders/', id);
    ***REMOVED*** else {
        els.btnOrderDelete.innerText = "Удалить";
        els.btnOrderDelete.value = "true";

        els.btnOrderChange.innerText = "Изменить";
        els.btnOrderChange.value = "true";
        els.btnOrderChange.classList.remove("btn-outline-success");
        els.btnOrderChange.classList.add("btn-outline-info");

        els.orderInputNumber.style.display = "none";
        els.orderInputCount.style.display = "none";
        els.orderSelectCart.style.display = "none";

        els.orderLabelNumber.style.display = "block";
        els.orderLabelCount.style.display = "block";
        els.orderLabelCart.style.display = "block";

    ***REMOVED***
***REMOVED***



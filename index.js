
// number of lines possible values from 1 to infinity
let numberOfRows = 3;

// cell in row possible values only 2,3,4
let cellsInRow = 3;

// default highlighted, possible value is not larger number of rows
let checkedRows = 2;

calcForm(numberOfRows, cellsInRow, checkedRows);

function calcForm(numberOfRows, cellsInRow, checkedRows) {

    let groupRows = document.querySelector('.group-rows');
    let groupCheckbox = document.querySelector('.group-checkbox');

    (function renderRows() {
        let calcRow = "";
        for (let i = 0; i < numberOfRows; i++) {
            calcRow += `
        <div class="calc__rows-row row">
            <input class="input-checkbox" type="checkbox" name="checkbox-row-${i}" value="checkbox-row-${i}"
                id="checkbox-row-${i}">
            <div class="calc__row-number  col-9">
                <div class="row data-row" data-row-id="${i}">
               ${renderCellInRow()}
               </div>
            </div>
            <div class="col-3 col-calc__result">
                <input type="text" class="calc__result" placeholder="Number" data-result-id="${i}">
            </div>
        </div>
        `
        }
        groupRows.innerHTML = calcRow;
        renderCheckbox();
    })();

    function renderCellInRow() {
        let bootstrapCol = 12;
        let cellInRow = "";

        for (let i = 0; i < cellsInRow; i++) {
            cellInRow += `
        <div class="col-${bootstrapCol/cellsInRow}">
            <input type="text" class="calc__number">
        </div>
        `
        };
        return cellInRow
    };

    function renderCheckbox() {
        let checkbox = "";
        for (let i = 0; i < numberOfRows; i++) {
            checkbox += `
            <label for="checkbox-row-${i}"></label>
        `
        };
        groupCheckbox.innerHTML = checkbox;

        let allCheckbox = document.querySelectorAll('.input-checkbox');
        let groupCheckboxLabel = document.querySelectorAll('.group-checkbox label');
        allCheckbox[checkedRows - 1].setAttribute('checked', 'checked');
        groupCheckboxLabel[checkedRows - 1].classList.toggle("checkbox-checked");

        chahgeCheckbox();
    };

    function chahgeCheckbox() {
        let groupCheckboxLabel = document.querySelectorAll('.group-checkbox label');
        groupCheckboxLabel.forEach(function (data, i, object) {
            data.addEventListener('click', function (event) {
                event.target.classList.toggle("checkbox-checked");
            })
        })
        calculator();
    };

    function calculator() {

        let calcResult = document.querySelectorAll('.calc__result');
        let calcNumber = document.querySelectorAll('.calc__number');
        let calcRowNumber = document.querySelectorAll('.calc__row-number');

        calcNumber.forEach(function (data) {
            data.addEventListener('input', function (event) {
                let activeRow = event.path[2].attributes[1].value;
                let allNumbersOfActiveRow = calcRowNumber[activeRow].querySelectorAll('input');
                let radioPosition = document.querySelectorAll('input[type="radio"]');
                let result = ""
                let resultArray =[]
                allNumbersOfActiveRow.forEach(function (data, i, object) {
                    if (radioPosition[1].checked == false ) {
                        result = Number(result) + Number(data.value);
                    }else{
                        if(data.value != 0){
                            result = Number(data.value);
                            resultArray.push(result);
                            result = eval(resultArray.join('*'));
                        }
                    }
                });
                calcResult[activeRow].value = result;
            })
        })
    }
};
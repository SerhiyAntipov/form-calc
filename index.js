
// number of rows possible values infinity
let numberOfRows = 3;

// cell in row possible values ounly 2,3,4
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
               ${renderNumbersOfRow()}
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

    function renderNumbersOfRow() {
        let bootstrapCol = 12;
        let calcNumbersOfRow = "";

        for (let i = 0; i < cellsInRow; i++) {
            calcNumbersOfRow += `
        <div class="col-${bootstrapCol/cellsInRow}">
            <input type="text" class="calc__number">
        </div>
        `
        };
        return calcNumbersOfRow
    };

    function renderCheckbox() {
        let checkboxed = "";
        for (let i = 0; i < numberOfRows; i++) {
            checkboxed += `
            <label for="checkbox-row-${i}"></label>
        `
        };
        groupCheckbox.innerHTML = checkboxed;

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
                let dataCalcRowNumber = calcRowNumber[activeRow].querySelectorAll('input');
                let radioposition = document.querySelectorAll('input[type="radio"]');
                let result = ""
                let multiplyArray =[]
                dataCalcRowNumber.forEach(function (data, i, object) {
                    if (radioposition[1].checked == false ) {
                        result = Number(result) + Number(data.value);
                    }else{
                        if(data.value != 0){
                            result = Number(data.value)
                            multiplyArray.push(result);
                            result = eval(multiplyArray.join('*'));
                        }
                    }
                });
                calcResult[activeRow].value = result;
            })
        })
    }
};
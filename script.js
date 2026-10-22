'use strict';

const labelBalanceValue = document.querySelector(".balance_value")
const labelAccountName = document.querySelector(".accountInfo_name")
const containerExtract = document.querySelector(".extract")


// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
};

const accounts = [account1, account2, account3, account4];


function calculateBalance(movements) {
    const sum = movements.reduce((curr, mov) => curr + mov, 0)
    return sum;
}

function displayValues(account) {
    labelBalanceValue.textContent = calculateBalance(account.movements);
    labelAccountName.textContent = account.owner;

    account.movements.forEach(mov => {
        const html = `<div class="movement"> movements
          <div class="movement_value"> ${mov}</div>
        </div>`;
        containerExtract.insertAdjacentHTML("afterbegin", html)
    });

}

displayValues(account1);
'use strict';

// Data

const account1 = {
    owner: 'Jonas Schmedtmann',
    accountNumber: 1,
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
};

const account2 = {
    owner: 'Jessica Davis',
    accountNumber: 2,
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
};

const account3 = {
    owner: 'Steven Thomas Williams',
    accountNumber: 3,
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
};

const account4 = {
    owner: 'Sarah Smith',
    accountNumber: 4,
    movements: [430, 1000, 700, 50, 90],
};

const accounts = [account1, account2, account3, account4];

// APP

const labelBalanceValue = document.querySelector(".balance__value");
const labelAccountName = document.querySelector(".accountInfo__name");
const labelAccountNumber = document.querySelector(".accountInfo__number")
const containerMovements = document.querySelector(".movements");
const labelIncomeValue = document.querySelector(".income__value");
const labelExpenditureValue = document.querySelector(".expenditure__value");
const inputTransferValue = document.querySelector(".transfer__value");
const inputTransferAccount = document.querySelector(".transfer__account");
const btnTransfer = document.querySelector(".transfer__btn")


function calculateBalance(movements) {
    const sum = movements.reduce((acc, mov) => acc + mov, 0);
    return sum;
}

function calculateExpenditure(movements) {
    const expenditure = movements.filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0)
    return Math.abs(expenditure);
}

function calculateIncome(movements) {
    const income = movements.filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    return income;
}

function updateUI(account) {
    containerMovements.innerHTML = '';

    labelAccountName.textContent = account.owner;
    labelAccountNumber.textContent = account.accountNumber;
    labelBalanceValue.textContent = calculateBalance(account.movements);
    labelIncomeValue.textContent = calculateIncome(account.movements);
    labelExpenditureValue.textContent = calculateExpenditure(account.movements);

    account.movements.forEach(mov => {
        const html = `<div class="movement"> movements
          <div class="movement_value"> ${mov}</div>
        </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html)
    });
}

function transferMoney() {
    // must change account is transfered from to current accout, now its fixed to account 1
    const targetAccountNumber = Number(inputTransferAccount.value);
    console.log(typeof (targetAccountNumber));

    if (targetAccountNumber == account1.accountNumber) {
        console.log("error1");
    }
    else {
        const matchingAccount = accounts.find(acc => acc.accountNumber === targetAccountNumber);
        console.log(matchingAccount);

        if (matchingAccount) {
            const value = Number(inputTransferValue.value);
            account1.movements.push(-value);
            matchingAccount.movements.push(value);
            console.log(matchingAccount.movements);
        }
        else console.log("error2");
    }

    updateUI(account1);
}


btnTransfer.addEventListener('click', transferMoney);
updateUI(account1);
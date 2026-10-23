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

const labelBalanceValue = document.querySelector(".balance_value");
const labelAccountName = document.querySelector(".accountInfo_name");
const labelAccountNumber = document.querySelector(".accountInfo_number")
const containerExtract = document.querySelector(".extract");
const labelIncomeValue = document.querySelector(".income_value");
const labelExpenditureValue = document.querySelector(".expenditure_value");
const labelTransferValue = document.querySelector(".transfer_value");
const labelTransferAccount = document.querySelector(".transfer_account");
const btnTransfer = document.querySelector(".transfer_btn")


function calculateBalance(movements) {
    const sum = movements.reduce((acc, mov) => acc + mov, 0);
    return sum;
}

function calculateExpenditure(movements) {
    const expenditure = movements.filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0)
    return expenditure;
}

function calculateIncome(movements) {
    const income = movements.filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    return income;
}

function displayValues(account) {
    containerExtract.innerHTML = '';

    labelAccountName.textContent = account.owner;
    labelAccountNumber.textContent = account.accountNumber;
    labelBalanceValue.textContent = calculateBalance(account.movements);
    labelIncomeValue.textContent = calculateIncome(account.movements);
    labelExpenditureValue.textContent = calculateExpenditure(account.movements);

    account.movements.forEach(mov => {
        const html = `<div class="movement"> movements
          <div class="movement_value"> ${mov}</div>
        </div>`;
        containerExtract.insertAdjacentHTML("afterbegin", html)
    });
}

function transferMoney() {
    // must change account is transfered from to current accout, now its fixed to account 1
    const targetAccountNumber = Number(labelTransferAccount.value);
    console.log(typeof (targetAccountNumber));

    if (targetAccountNumber == account1.accountNumber) {
        console.log("error1");
    }
    else {
        const matchingAccount = accounts.find(acc => acc.accountNumber === targetAccountNumber);
        console.log(matchingAccount);

        if (matchingAccount) {
            const value = labelTransferValue.value;
            account1.movements.push(-value);
            matchingAccount.movements.push(value);
            console.log(matchingAccount.movements);
        }
        else console.log("error2");
    }

    displayValues(account1);
}


btnTransfer.addEventListener('click', transferMoney);
displayValues(account1);
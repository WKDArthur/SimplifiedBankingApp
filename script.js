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
const labelAccountName = document.querySelector(".account-info__name");
const labelAccountNumber = document.querySelector(".account-info__number")
const labelIncomeValue = document.querySelector(".income__value");
const labelExpenditureValue = document.querySelector(".expenditure__value");

const containerMovements = document.querySelector(".movements");
const containerApp = document.querySelector(".app");
const containerLogin = document.querySelector(".login");
const containerCreateAccount = document.querySelector(".create-account");

const inputTransferValue = document.querySelector(".transfer__value");
const inputTransferAccount = document.querySelector(".transfer__account");
const inputLoginAccount = document.querySelector(".login__account");
const inputCreateAccountName = document.querySelector(".create-account__name");

const btnTransfer = document.querySelector(".transfer__btn");
const btnLogin = document.querySelector(".login__btn");
const btnLogout = document.querySelector(".logout__btn");
const btnConfirmCreateAccount = document.querySelector(".create-account__confirm-btn");
const btnCreateAccountUI = document.querySelector(".login__create-btn");
const btnBackFromCreateAccount = document.querySelector(".create-account__back-btn");


let loggedAccount;

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
        const html = `<div class="movement"> 
          <div class="movement__value"> ${mov}</div>
        </div>`;
        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
}

function transferMoney() {
    if (!loggedAccount) return;

    const value = Number(inputTransferValue.value);
    const targetAccountNumber = Number(inputTransferAccount.value);
    const receiver = accounts.find(acc => acc.accountNumber === targetAccountNumber);


    if (receiver && receiver != loggedAccount &&
        value > 0 && calculateBalance(loggedAccount.movements) >= value) {
        loggedAccount.movements.push(-value);
        receiver.movements.push(value);
    }

    inputTransferAccount.value = '';
    inputTransferValue.value = '';
    updateUI(loggedAccount);
}

function login() {
    const targetAccountNumber = Number(inputLoginAccount.value);
    console.log(typeof (targetAccountNumber));

    const matchingAccount = accounts.find(acc => acc.accountNumber === targetAccountNumber);
    console.log(matchingAccount);
    if (matchingAccount) {
        loggedAccount = matchingAccount;
        console.log(loggedAccount);
        containerLogin.classList.add('overlay--hidden');
        containerApp.classList.add('overlay--visible');
        inputLoginAccount.value = '';
        updateUI(loggedAccount);
    }
    else console.log("error");
}

function logout() {
    containerLogin.classList.remove('overlay--hidden');
    containerApp.classList.remove('overlay--visible');
    loggedAccount = undefined;
}

function goToCreateAccountUI() {
    containerLogin.classList.add('overlay--hidden');
    containerCreateAccount.classList.add('overlay--visible');
}

function returnFromCreateAccountUI() {
    containerLogin.classList.remove('overlay--hidden');
    containerCreateAccount.classList.remove('overlay--visible');
}

function createAccount() {
    const newAccount = {
        owner: inputCreateAccountName.value,
        accountNumber: accounts.length + 1,
        movements: [],
    }
    accounts.push(newAccount);
}

btnLogin.addEventListener('click', login);
btnLogout.addEventListener('click', logout);
btnCreateAccountUI.addEventListener('click', goToCreateAccountUI);
btnTransfer.addEventListener('click', transferMoney);
btnBackFromCreateAccount.addEventListener('click', returnFromCreateAccountUI);
btnConfirmCreateAccount.addEventListener('click', createAccount);


// to do
// accounts , add password in the account, add fields for it on create account and on login.
// show account number when account is created
// show error using UI instead of terminal
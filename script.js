const expenseForm = document.getElementById('expenseForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expenseList');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.description}: $${expense.amount}</span>
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

function addExpense(description, amount) {
    const newExpense = {
        description,
        amount: parseFloat(amount)
    };
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    expenseForm.reset();
}

function editExpense(index) {
    const newDescription = prompt('Enter new description:');
    const newAmount = prompt('Enter new amount:');
    expenses[index].description = newDescription;
    expenses[index].amount = parseFloat(newAmount);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addExpense(descriptionInput.value, amountInput.value);
});

renderExpenses();

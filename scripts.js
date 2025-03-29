// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const total = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

// Capturando o evento de input para formatar o valor
amount.oninput = () => {
  // Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "")

  // Transformar o valor em centavos (exemplo: 150/100 é equivalente a R$1,50)
  value = Number(value) / 100

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  // Retorna o valor formatado
  return value
}

// Captura o evento de submit para obter os valores
form.onsubmit = (event) => {
  // Previne o comportamento de recarregar a page
  event.preventDefault()

  // Cria um objeto com os detalhes na nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // Chama a função que irá adicionar o item na lista
  expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento de li para adicionar na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona name e category na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o item na lista
    expenseList.append(expenseItem)

    // Atualiza os totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}

// Atualiza o total de itens na lista
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children
    
    // Atualiza a quantidade de itens na lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Variável para incrementar o total
    let total = 0

    // Percorre cada item (li) da lista (ul)
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      // remove caracteres não numéricos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      // Converte o valor para float
      value = parseFloat(value)

      // Verifica se é um número válido
      if (isNan(value)) {
        return alert("O valor não parece ser um número. Não foi possível calcular o total")
      }

      // Incrementar o valor total
      total += Number(value) // value + total
    }

    // Cria span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com estilo
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo do elemento
    expensesTotal.innerHTML = ""

    // Adiciona o símbolo da moeda e o valor total formatado
    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    alert("Não foi possível atualizar os totais")
    console.log(error)
  }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event) {
  // Verifica se o elemento clicado é o ícone
  if(event.target.classList.contains("remove-icon")) {
    console.log(event)
  }
})
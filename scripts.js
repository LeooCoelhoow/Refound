// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const total = document.getElementById("expense")
const category = document.getElementById("category")

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
}
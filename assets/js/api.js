/* eslint-disable no-unused-vars */
// public/js/api.js
async function fetchProducts() {
  const response = await fetch('/products');
  return response.json();
}

async function addProduct(formData) {
  const response = await fetch('/product/create', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erro ao adicionar produto');
  }

  return response.json();
}

async function fetchProductById(productId) {
  const response = await fetch(`/product/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Produto não encontrado');
  }

  return response.json();
}

async function updateProduct(productId, corpo) {
  let name = corpo.name;
  let description = corpo.description;
  let price = corpo.price;
  console.log(name, description, price);
  const response = await fetch(`/product/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      price,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar produto');
  }

  return response.json();

}

async function deleteProduct(productId) {
  const response = await fetch(`/product/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir produto');
  }
  return response.json();
}

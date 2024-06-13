/* eslint-disable no-undef */
// public/js/main.js
document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');
  const addProductForm = document.getElementById('add-product-form');
  const searchProductForm = document.getElementById('search-product-form');
  const updateProductForm = document.getElementById('update-product-form');
  const deleteProductForm = document.getElementById('delete-product-form');
  const productDetailsDiv = document.getElementById('product-details');

  // Carregar produtos
  try {
    const products = await fetchProducts();
    products.forEach((product) => {
      const li = document.createElement('li');
      li.textContent = `${product.name} - ${product.price}`;
      productList.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
  }

  // Adicionar produto
  addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(addProductForm);

    try {
      // eslint-disable-next-line no-unused-vars
      const newProduct = await addProduct(formData);
      alert(
        'Produto adicionado com sucesso! Recarregue a página para ver o resultado!'
      );
      addProductForm.reset();
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert(
        'Ocorreu um erro ao adicionar o produto. Por favor, tente novamente.'
      );
    }
  });

  // Pesquisar produto
  searchProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const productId = searchProductForm.productId.value;

    try {
      const product = await fetchProductById(productId);
      productDetailsDiv.innerHTML = `
          <h3>Detalhes do Produto:</h3>
          <p><strong>Nome:</strong> ${product.name}</p>
          <p><strong>Descrição:</strong> ${product.description}</p>
          <p><strong>Preço:</strong> ${product.price}</p>
        `;
    } catch (error) {
      console.error('Erro ao pesquisar produto:', error);
      alert(
        'Produto não encontrado. Certifique-se de que o ID do produto está correto.'
      );
      productDetailsDiv.innerHTML = '';
    }
  });

  // Atualizar produto
  updateProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const productId = updateProductForm.productIdToUpdate.value;
    let name = updateProductForm.nameToUpdate.value;
    let description = updateProductForm.descriptionToUpdate.value;
    let price = updateProductForm.priceToUpdate.value;

    let body = {
      name,
      description,
      price,
    };

    try {
      console.log('productId', productId);
      console.log('body', body);
      await updateProduct(productId, body);
      alert('Produto atualizado com sucesso!');
      updateProductForm.reset();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert(
        'Ocorreu um erro ao atualizar o produto. Certifique-se de que o ID do produto está correto.'
      );
    }
  });

  // Excluir produto
  deleteProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const productId = deleteProductForm.productIdToDelete.value;

    try {
      await deleteProduct(productId);
      alert('Produto excluído com sucesso!');
      deleteProductForm.reset();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert(
        'Ocorreu um erro ao excluir o produto. Certifique-se de que o ID do produto está correto.'
      );
    }
  });
});

const sinon = require('sinon');
const assert = require('assert');
const ProductController = require('../../../api/controllers/ProductController');
const { mockAsync, res } = require('../../util/index');

describe('ProductController', () => {
  let req;

  beforeEach(() => {
    req = {
      allParams: sinon
        .stub()
        .returns({ name: 'Produto 1', price: 10, description: 'novo produto' }),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Deve criar um novo produto', async () => {
    const newProduct = {
      name: 'Produto do teste',
      price: 10,
      description: 'novo produto',
    };
    const product = { ...newProduct, id: 1 };

    const createStub = mockAsync(Product, 'create', product);

    const result = await ProductController.create(req, res);

    assert(result, product);
    assert.strictEqual(createStub.calledOnce, true);
  });

  it('Deve retornar um erro de servidor quando uma exceção é lançada', async () => {
    const error = new Error('Error creating product');
    mockAsync(Product, 'create', Promise.reject(error));

    const result = await ProductController.create(req, res);

    assert(res.status, 500);
    assert(result.error, error);
  });

  it('Deve atualizar um produto', async () => {
    const updatedProduct = {
      name: 'Produto atualizado',
      price: 20,
      description: 'produto atualizado',
    };

    const updateStub = mockAsync(Product, 'updateOne', updatedProduct);

    const result = await ProductController.update(
      { param: sinon.stub().returns(1), body: updatedProduct },
      res
    );

    assert(result, updatedProduct);
    assert.strictEqual(updateStub.calledOnce, true);
  });

  it('Deve deletar um produto', async () => {
    const deletedProduct = {
      name: 'Produto deletado',
      price: 20,
      description: 'produto deletado',
    };

    const deleteStub = mockAsync(Product, 'destroyOne', deletedProduct);

    const result = await ProductController.delete(
      { param: sinon.stub().returns(1) },
      res
    );

    assert(result, deletedProduct);
    assert.strictEqual(deleteStub.calledOnce, true);
  });

  it('Deve retornar todos os produtos', async () => {
    const products = [
      { name: 'Produto 1', price: 10, description: 'novo produto' },
    ];

    const findStub = mockAsync(Product, 'find', products);

    const result = await ProductController.find({}, res);

    assert(result, products);
    assert.strictEqual(findStub.calledOnce, true);
  });

  it('Deve retornar um produto específico', async () => {
    const product = {
      name: 'Produto 1',
      price: 10,
      description: 'novo produto',
    };

    const findOneStub = mockAsync(Product, 'findOne', product);

    const result = await ProductController.findOne(
      { param: sinon.stub().returns(1) },
      res
    );

    assert(result, product);
    assert.strictEqual(findOneStub.calledOnce, true);
  });

  it('Deve retornar erro ao deletar um produto que não existe', async () => {
    const error = 'Produto não encontrado';

    mockAsync(Product, 'destroyOne', null);

    const result = await ProductController.delete(
      { param: sinon.stub().returns(1) },
      res
    );

    assert(res.status, 404);
    assert(result.error, error);
  });

  it('Deve retornar erro ao buscar um produto que não existe', async () => {
    const product = {
      name: 'Produto 1',
      price: 10,
      description: 'novo produto',
    };
    const findOneStub = mockAsync(Product, 'findOne', product);

    const result = await ProductController.findOne(
      { param: sinon.stub().returns(undefined) },
      res
    );

    assert(res.status, 404);
    assert.strictEqual(findOneStub.calledOnce, true);
  });
});

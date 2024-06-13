/* eslint-disable no-unused-vars */
const sinon = require('sinon');

// Mocka funções assíncronas de um model para retornar um valor específico
function mockAsync(obj, method, returnValue) {
  // Verifica se o método já foi substituído por um stub
  if (obj[method].restore) {
    return obj[method];
  }

  // Cria um stub para o método
  const stub = sinon.stub(obj, method).resolves(returnValue);

  // Retorna o stub
  return stub;
}

// Captura a resposta do controller
const res = {
  status: (status) => ({
    json: (result) => result,
  }),
};

module.exports = {
  mockAsync,
  res,
};

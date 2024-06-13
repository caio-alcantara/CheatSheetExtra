/* eslint-disable prefer-arrow-callback */
const Sails = require('sails');
const supertest = require('supertest');
const assert = require('assert');

let sailsApp;

before(function (done) {
  this.timeout(20000); // Aumentar o timeout para 20 segundos

  Sails.lift(
    {
      hooks: { grunt: false, csrf: false },
      log: { level: 'warn' },
      models: { migrate: 'drop' },
    },
    function (err, server) {
      if (err) {return done(err);}
      sailsApp = server;
      done();
    }
  );
});

after(function (done) {
  Sails.lower(done);
});

describe('ProductController', function () {
  let productId;

  it('Deve criar um novo produto', function (done) {
    supertest(sailsApp.hooks.http.app)
      .post('/product/create')
      .send({ name: 'Produto 1', description: 'Descrição do Produto 1', price: 10 })
      .expect(200)
      .end(function (err, res) {
        if (err) {return done(err);}
        assert.strictEqual(typeof res.body, 'object');
        assert.ok(res.body.id);
        assert.strictEqual(res.body.name, 'Produto 1');
        assert.strictEqual(res.body.description, 'Descrição do Produto 1');
        assert.strictEqual(res.body.price, 10);
        productId = res.body.id;
        done();
      });
  });

  it('Deve retornar o produto criado', function (done) {
    supertest(sailsApp.hooks.http.app)
      .get(`/product/${productId}`)
      .expect(200)
      .end(function (err, res) {
        if (err) {return done(err);}
        assert.strictEqual(typeof res.body, 'object');
        assert.strictEqual(res.body.id, productId);
        assert.strictEqual(res.body.name, 'Produto 1');
        done();
      });
  });

  it('Deve retornar todos os produtos', function (done) {
    supertest(sailsApp.hooks.http.app)
      .get('/products')
      .expect(200)
      .end(function (err, res) {
        if (err) {return done(err);}
        assert.ok(Array.isArray(res.body));
        assert.strictEqual(res.body.length, 1); // Esperamos apenas um produto
        done();
      });
  });

  it('Deve atualizar o produto', function (done) {
    supertest(sailsApp.hooks.http.app)
      .put(`/product/${productId}`)
      .send({ name: 'Produto Atualizado', price: 20 })
      .expect(200)
      .end(function (err, res) {
        if (err) {return done(err);}
        assert.strictEqual(typeof res.body, 'object');
        assert.strictEqual(res.body.id, productId);
        assert.strictEqual(res.body.name, 'Produto Atualizado');
        assert.strictEqual(res.body.price, 20);
        done();
      });
  });

  it('Deve deletar o produto', function (done) {
    supertest(sailsApp.hooks.http.app)
      .delete(`/product/${productId}`)
      .expect(200)
      .end(function (err, res) {
        if (err) {return done(err);}
        assert.strictEqual(typeof res.body, 'object');
        assert.strictEqual(res.body.id, productId);
        done();
      });
  });

  it('Deve retornar 404 para produto não encontrado', function (done) {
    supertest(sailsApp.hooks.http.app)
      .get(`/product/${productId}`)
      .expect(404)
      .end(function (err, res) {
        if (err) {return done(err);}
        assert.strictEqual(typeof res.text, 'string');
        assert.strictEqual(res.text, '{\n  "error": "não encontrado"\n}'
);
        done();
      });
  });
});

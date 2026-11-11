import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index.js";

describe("CRUD de Produtos", () => {
  it("deve listar produtos inicialmente vazio (GET /products)", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("deve cadastrar um novo produto (POST /products)", async () => {
    const res = await request(app)
      .post("/products")
      .send({ name: "Teclado Mecânico", price: 250 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: 1,
      name: "Teclado Mecânico",
      price: 250,
    });
  });

  it("deve atualizar um produto existente (PUT /products/:id)", async () => {
    const res = await request(app)
      .put("/products/1")
      .send({ name: "Teclado Gamer RGB", price: 320 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      name: "Teclado Gamer RGB",
      price: 320,
    });
  });

  it("deve retornar 404 ao tentar atualizar produto inexistente", async () => {
    const res = await request(app)
      .put("/products/999")
      .send({ name: "Mouse", price: 100 });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Produto não encontrado" });
  });

  it("deve remover um produto existente (DELETE /products/:id)", async () => {
    const res = await request(app).delete("/products/1");
    expect(res.status).toBe(204);
  });

  it("deve retornar 404 ao tentar remover produto inexistente", async () => {
    const res = await request(app).delete("/products/999");
    expect(res.status).toBe(404);
  });
});

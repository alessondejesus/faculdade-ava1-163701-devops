import express from "express";

type Product = {
  id: number;
  name: string;
  price: number;
};

const app = express();
app.use(express.json());

const products: Product[] = [];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const {name, price} = req.body;

  const lastId = products.length > 0 ? products[products.length - 1].id : 0;

  const product: Product = {
    id: lastId + 1,
    name,
    price,
  };

  products.push(product);
  res.status(201).json(product);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({message: "Produto não encontrado"});
  }

  product.name = req.body.name;
  product.price = req.body.price;

  res.json(product);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({message: "Produto não encontrado"});
  }

  products.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

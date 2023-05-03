const { Configuration, OpenAIApi } = require('openai');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: "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" ,});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/", async (req, res) => {
  const { message,curmodel } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 3000,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  res.json({
    models: response.data.data
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});






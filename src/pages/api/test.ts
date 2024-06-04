// pages/api/hello.ts

import { NextApiRequest, NextApiResponse } from "next";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.GOOGLE_API_KEY;

async function runChat() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Por favor, monte o cardápio para uma viagem para uma chacara considerando o almoço de sexta até o almoço de domingo com receitas fáceis. Para cada receita dê duas outras opções alternativas para aquela refeição.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Cardápio de Fim de Semana na Chácara:\n\n**Considerações:**\n\n* Receitas fáceis de preparar.\n* Ingredientes acessíveis em São Paulo.\n* Opções alternativas para cada refeição. \n\n**Sexta-Feira:**\n\n* **Almoço:** \n    * **Opção 1 (Prato Principal):** Macarrão ao molho pesto com tomates cereja e mussarela de búfala. (Alternativas: Salada de macarrão com frango desfiado e maionese;  Wrap de frango com salada) \n    * **Opção 2 (Acompanhamento):** Salada verde com palmito e manga. (Alternativas: Salada de folhas com tomate e cebola; Pão italiano)\n    * **Opção 3 (Sobremesa):** Salada de frutas. (Alternativas: Iogurte com granola e mel; Picolé)\n\n**Sábado:**\n\n* **Café da manhã:**\n    * **Opção 1:** Pão francês, queijo minas, presunto, frutas, café e leite. (Alternativas: Tapioca com queijo e manteiga; Ovos mexidos) \n* **Almoço:**\n    * **Opção 1 (Prato Principal):** Churrasco (linguiça, frango, carne). (Alternativas: Feijoada; Moqueca de peixe)\n    * **Opção 2 (Acompanhamentos):** Arroz, farofa, vinagrete e pão de alho. (Alternativas: Salada de maionese; Salada verde)\n    * **Opção 3 (Sobremesa):** Bolo de chocolate. (Alternativas: Pudim de leite; Mousse de maracujá)\n* **Jantar:**\n    * **Opção 1:** Pizza caseira (vários sabores). (Alternativas: Cachorro-quente; Sanduíches naturais)\n\n**Domingo:**\n\n* **Café da manhã:**\n    * **Opção 1:** Panquecas com mel e frutas. (Alternativas: Pão de queijo com café; Bolo simples com café)\n* **Almoço:**\n    * **Opção 1 (Prato Principal):** Espaguete à bolonhesa. (Alternativas: Strogonoff de frango;  Frango assado)\n    * **Opção 2 (Acompanhamento):** Salada Caesar. (Alternativas: Arroz branco; Purê de batatas)\n    * **Opção 3 (Sobremesa):** Sorvete. (Alternativas: Torta de limão; Açaí na tigela)\n\n**Observações:**\n\n* As quantidades dos ingredientes devem ser ajustadas de acordo com o número de pessoas.\n* As opções alternativas permitem flexibilidade e adaptação aos gostos do grupo.\n* Aproveite a viagem e divirta-se!",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Monte uma lista com todos os ingredientes para comprar em mercado considerando um grupo de 10 pessoas. Adicione também itens de higiene pessoal e o valor aproximado de gasto para cada coisa e o total considerando o valor de um mercado na zona sul de são paulo.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Lista de Compras para a Chácara (10 Pessoas):\n\n**Alimentos:**\n\n* **Carnes:**\n    * Linguiça (2kg) - R$40\n    * Frango (4kg) - R$60\n    * Carne para churrasco (3kg) - R$120\n    * Presunto (500g) - R$20\n    * Carne moída (1kg) - R$30\n* **Frutas e Verduras:**\n    * Tomate (2kg) - R$20\n    * Cebola (2kg) - R$10\n    * Alho (2 cabeças) - R$5\n    * Limão (1kg) - R$10\n    * Batata (3kg) - R$30\n    * Cenoura (1kg) - R$5\n    * Alface (2 unidades) - R$8\n    * Rúcula (1 maço) - R$5\n    * Palmito (2 vidros) - R$20\n    * Manga (2kg) - R$20\n    * Banana (2kg) - R$15\n    * Maçã (1kg) - R$15\n    * Laranja (2kg) - R$10\n    * Morango (500g) - R$15\n* **Laticínios e Frios:**\n    * Queijo minas (1kg) - R$40\n    * Mussarela de búfala (500g) - R$30\n    * Iogurte (1kg) - R$15\n    * Leite (2L) - R$12\n    * Manteiga (250g) - R$10\n    * Ovos (2 dúzias) - R$20\n* **Mercearia:**\n    * Arroz (5kg) - R$40\n    * Feijão (2kg) - R$20\n    * Macarrão (1kg) - R$10\n    * Farinha de trigo (1kg) - R$5\n    * Açúcar (2kg) - R$10\n    * Café (500g) - R$20\n    * Óleo (1L) - R$10\n    * Vinagre (500ml) - R$5\n    * Molho de tomate (2 unidades) - R$10\n    * Maionese (500g) - R$15\n    * Pão francês (para os 3 dias) - R$30\n    * Pão de forma (1 pacote) - R$10\n    * Granola (500g) - R$20\n    * Mel (500g) - R$20\n    * Achocolatado (400g) - R$15\n    * Sal (1kg) - R$3\n    * Temperos diversos - R$20\n    * Fermento em pó (1 unidade) - R$5\n    * Chocolate em pó (400g) - R$15\n* **Bebidas:**\n    * Refrigerante (2L) - R$10\n    * Suco (1L) - R$8\n    * Cerveja (1 fardo) - R$80\n    * Água (5L) - R$10\n\n**Higiene Pessoal:**\n\n* Papel higiênico (4 rolos) - R$15\n* Sabonete (2 unidades) - R$10\n* Shampoo (2 unidades) - R$20\n* Condicionador (2 unidades) - R$20\n* Pasta de dente (2 unidades) - R$15\n* Repelente - R$25\n* Protetor solar - R$40\n\n**Total aproximado:** R$1.200\n\n**Observações:**\n\n* Os preços são apenas estimativas e podem variar de acordo com a marca e o local de compra. \n* É importante verificar se a chácara possui itens básicos como utensílios de cozinha, \n*  geladeira, fogão, etc. \n* Adapte a lista de acordo com as necessidades e preferências do grupo.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Cite todos os utensilios de cozinha necessário para o preparo das refeições.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Utensílios de Cozinha Necessários:\n\n**Essenciais:**\n\n* Panelas (tamanhos variados)\n* Frigideira\n* Talheres (facas, colheres, garfos)\n* Pratos (rasos, fundos e de sobremesa)\n* Copos\n* Xícaras\n* Tigelas\n* Escumadeira\n* Concha\n* Espátula\n* Ralador\n* Tábua de corte\n* Abridor de latas\n* Saca-rolhas\n* Peneira\n* Assadeiras (para bolos e pizza)\n* Formas (para pudim e bolo)\n* Panela de pressão (opcional)\n* Grill ou churrasqueira (para o churrasco)\n* Espetinhos (para o churrasco)\n\n**Utensílios Adicionais (que facilitam o preparo):**\n\n* Liquidificador\n* Batedeira\n* Processador de alimentos\n* Mixer\n* Espremedor de frutas\n* Fouet (batedor de claras)\n* Medidores (xícaras e colheres medidoras)\n* Tesoura de cozinha\n* Pincel de silicone\n* Papel alumínio\n* Papel manteiga\n* Pano de prato\n* Luvas térmicas\n\n**Observações:**\n\n* Verifique se a chácara já possui alguns desses utensílios antes de levá-los.\n* A quantidade de utensílios deve ser ajustada de acordo com o número de pessoas.\n* Se a chácara tiver fogão a lenha, leve panelas adequadas para esse tipo de fogão.\n\n**Dica:** \n\n* Divida a tarefa de levar os utensílios entre os amigos para facilitar o transporte.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage("YOUR_USER_INPUT");
  const response = result.response;
  console.log(response.text());
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 64,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Por favor, monte o cardápio para uma viagem para uma chacara considerando o almoço de sexta até o almoço de domingo com receitas fáceis. Para cada receita dê duas outras opções alternativas para aquela refeição.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Cardápio de Fim de Semana na Chácara:\n\n**Considerações:**\n\n* Receitas fáceis de preparar.\n* Ingredientes acessíveis em São Paulo.\n* Opções alternativas para cada refeição. \n\n**Sexta-Feira:**\n\n* **Almoço:** \n    * **Opção 1 (Prato Principal):** Macarrão ao molho pesto com tomates cereja e mussarela de búfala. (Alternativas: Salada de macarrão com frango desfiado e maionese;  Wrap de frango com salada) \n    * **Opção 2 (Acompanhamento):** Salada verde com palmito e manga. (Alternativas: Salada de folhas com tomate e cebola; Pão italiano)\n    * **Opção 3 (Sobremesa):** Salada de frutas. (Alternativas: Iogurte com granola e mel; Picolé)\n\n**Sábado:**\n\n* **Café da manhã:**\n    * **Opção 1:** Pão francês, queijo minas, presunto, frutas, café e leite. (Alternativas: Tapioca com queijo e manteiga; Ovos mexidos) \n* **Almoço:**\n    * **Opção 1 (Prato Principal):** Churrasco (linguiça, frango, carne). (Alternativas: Feijoada; Moqueca de peixe)\n    * **Opção 2 (Acompanhamentos):** Arroz, farofa, vinagrete e pão de alho. (Alternativas: Salada de maionese; Salada verde)\n    * **Opção 3 (Sobremesa):** Bolo de chocolate. (Alternativas: Pudim de leite; Mousse de maracujá)\n* **Jantar:**\n    * **Opção 1:** Pizza caseira (vários sabores). (Alternativas: Cachorro-quente; Sanduíches naturais)\n\n**Domingo:**\n\n* **Café da manhã:**\n    * **Opção 1:** Panquecas com mel e frutas. (Alternativas: Pão de queijo com café; Bolo simples com café)\n* **Almoço:**\n    * **Opção 1 (Prato Principal):** Espaguete à bolonhesa. (Alternativas: Strogonoff de frango;  Frango assado)\n    * **Opção 2 (Acompanhamento):** Salada Caesar. (Alternativas: Arroz branco; Purê de batatas)\n    * **Opção 3 (Sobremesa):** Sorvete. (Alternativas: Torta de limão; Açaí na tigela)\n\n**Observações:**\n\n* As quantidades dos ingredientes devem ser ajustadas de acordo com o número de pessoas.\n* As opções alternativas permitem flexibilidade e adaptação aos gostos do grupo.\n* Aproveite a viagem e divirta-se!",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Monte uma lista com todos os ingredientes para comprar em mercado considerando um grupo de 10 pessoas. Adicione também itens de higiene pessoal e o valor aproximado de gasto para cada coisa e o total considerando o valor de um mercado na zona sul de são paulo.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Lista de Compras para a Chácara (10 Pessoas):\n\n**Alimentos:**\n\n* **Carnes:**\n    * Linguiça (2kg) - R$40\n    * Frango (4kg) - R$60\n    * Carne para churrasco (3kg) - R$120\n    * Presunto (500g) - R$20\n    * Carne moída (1kg) - R$30\n* **Frutas e Verduras:**\n    * Tomate (2kg) - R$20\n    * Cebola (2kg) - R$10\n    * Alho (2 cabeças) - R$5\n    * Limão (1kg) - R$10\n    * Batata (3kg) - R$30\n    * Cenoura (1kg) - R$5\n    * Alface (2 unidades) - R$8\n    * Rúcula (1 maço) - R$5\n    * Palmito (2 vidros) - R$20\n    * Manga (2kg) - R$20\n    * Banana (2kg) - R$15\n    * Maçã (1kg) - R$15\n    * Laranja (2kg) - R$10\n    * Morango (500g) - R$15\n* **Laticínios e Frios:**\n    * Queijo minas (1kg) - R$40\n    * Mussarela de búfala (500g) - R$30\n    * Iogurte (1kg) - R$15\n    * Leite (2L) - R$12\n    * Manteiga (250g) - R$10\n    * Ovos (2 dúzias) - R$20\n* **Mercearia:**\n    * Arroz (5kg) - R$40\n    * Feijão (2kg) - R$20\n    * Macarrão (1kg) - R$10\n    * Farinha de trigo (1kg) - R$5\n    * Açúcar (2kg) - R$10\n    * Café (500g) - R$20\n    * Óleo (1L) - R$10\n    * Vinagre (500ml) - R$5\n    * Molho de tomate (2 unidades) - R$10\n    * Maionese (500g) - R$15\n    * Pão francês (para os 3 dias) - R$30\n    * Pão de forma (1 pacote) - R$10\n    * Granola (500g) - R$20\n    * Mel (500g) - R$20\n    * Achocolatado (400g) - R$15\n    * Sal (1kg) - R$3\n    * Temperos diversos - R$20\n    * Fermento em pó (1 unidade) - R$5\n    * Chocolate em pó (400g) - R$15\n* **Bebidas:**\n    * Refrigerante (2L) - R$10\n    * Suco (1L) - R$8\n    * Cerveja (1 fardo) - R$80\n    * Água (5L) - R$10\n\n**Higiene Pessoal:**\n\n* Papel higiênico (4 rolos) - R$15\n* Sabonete (2 unidades) - R$10\n* Shampoo (2 unidades) - R$20\n* Condicionador (2 unidades) - R$20\n* Pasta de dente (2 unidades) - R$15\n* Repelente - R$25\n* Protetor solar - R$40\n\n**Total aproximado:** R$1.200\n\n**Observações:**\n\n* Os preços são apenas estimativas e podem variar de acordo com a marca e o local de compra. \n* É importante verificar se a chácara possui itens básicos como utensílios de cozinha, \n*  geladeira, fogão, etc. \n* Adapte a lista de acordo com as necessidades e preferências do grupo.",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Cite todos os utensilios de cozinha necessário para o preparo das refeições.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "## Utensílios de Cozinha Necessários:\n\n**Essenciais:**\n\n* Panelas (tamanhos variados)\n* Frigideira\n* Talheres (facas, colheres, garfos)\n* Pratos (rasos, fundos e de sobremesa)\n* Copos\n* Xícaras\n* Tigelas\n* Escumadeira\n* Concha\n* Espátula\n* Ralador\n* Tábua de corte\n* Abridor de latas\n* Saca-rolhas\n* Peneira\n* Assadeiras (para bolos e pizza)\n* Formas (para pudim e bolo)\n* Panela de pressão (opcional)\n* Grill ou churrasqueira (para o churrasco)\n* Espetinhos (para o churrasco)\n\n**Utensílios Adicionais (que facilitam o preparo):**\n\n* Liquidificador\n* Batedeira\n* Processador de alimentos\n* Mixer\n* Espremedor de frutas\n* Fouet (batedor de claras)\n* Medidores (xícaras e colheres medidoras)\n* Tesoura de cozinha\n* Pincel de silicone\n* Papel alumínio\n* Papel manteiga\n* Pano de prato\n* Luvas térmicas\n\n**Observações:**\n\n* Verifique se a chácara já possui alguns desses utensílios antes de levá-los.\n* A quantidade de utensílios deve ser ajustada de acordo com o número de pessoas.\n* Se a chácara tiver fogão a lenha, leve panelas adequadas para esse tipo de fogão.\n\n**Dica:** \n\n* Divida a tarefa de levar os utensílios entre os amigos para facilitar o transporte.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(
    "Me fale sobre cuidados que eu devo tomar na viagem."
  );
  const response = result.response;
  res.status(200).json(response);
}

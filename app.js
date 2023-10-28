import OpenAI from "openai";
import * as fs from 'fs';

const OPENAI_API_KEY = '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';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});


async function askGPT(messages) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 1000,
    });

    return response.choices[0].message.content;
}

async function getTitle(article) {
    const messages = [
        {
            "role": "system",
            "content": "Se te entregara un texto que se refiere a la documentacion de Adereso. Entrega un titulo conciso donde se entienda de que trata el texto"
        },
        {
            "role": "user",
            "content": article.text
        }
    ]
    const response = await askGPT(messages);
    return response;
}

async function getSummary(article) {
    const messages = [
        {
            "role": "system",
            "content": "Me gustaria que leyeras el siguiente texto y lo resumieras de forma concisa, manteniendo las ideas principales y evitando detalles innecesarios."
        },
        {
            "role": "user",
            "content": article.text
        }
    ]
    const response = await askGPT(messages);
    return response;
}

async function getTags(article) {
    const messages = [
        {
            "role": "system",
            "content": "Sugiere los tags mas importantes que identifiquen los puntos claves del siguiente texto"
        },
        {
            "role": "user",
            "content": article.text
        }
    ]
    const response = await askGPT(messages);
    return response;
}

async function getReference(article) {
    const messages = [
        {
            "role": "system",
            "content": "Se te entregara una URL y el texto del articulo, crea una referencia hacia la URL segun norma APA. No quiero saber de que trata la norma, entregame solo la referencia"
        },
        {
            "role": "user",
            "content": `La URL es ${article.url} y el texto es ${article.text}`
        }
    ]
    const response = await askGPT(messages);
    return response;
}

async function getExternalReference(article) {
    const messages = [
        {
            "role": "system",
            "content": "Se te entregara una URL y el texto del articulo, referencia los demas articulos que hayas visto que tengan correlacion con este"
        },
        {
            "role": "user",
            "content": `La URL es ${article.url} y el texto es ${article.text}`
        }
    ]
    const response = await askGPT(messages);
    return response;
}

async function fragmentation(article){
    const title = await getTitle(article);
    const summary = await getSummary(article);
    const tags = await getTags(article);
    const reference = await getReference(article);
    const externalReference = await getExternalReference(article);

    return `{
        "title": "${title}",
        "summary": "${summary}",
        "tags": "${tags}",
        "reference": "${reference}",
        "contenido": "${article.text}",
        "externalReference": "${externalReference}",
    }\n`;
}

async function main() {
    var result = '';
    fs.readFile('./adereso_cda.jsonl', 'utf8', async (err, fileContent) => {
        if (err) throw err;

        const lines = fileContent.trim().split('\n'); // Divide el contenido del archivo por líneas
        for (const line of lines) {
            try {
                const jsonObj = JSON.parse(line);
                if(jsonObj.type === "article") {
                    var fragmentedData = await fragmentation(jsonObj);
                    result += fragmentedData; 
                }
            } catch (parseErr) {
                console.error(`Error al analizar la línea: ${line.url}. Error: ${parseErr.message}`);
            }
        }
        fs.writeFile("adereso_cda_fragmented.jsonl", result, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    });

}

//main();


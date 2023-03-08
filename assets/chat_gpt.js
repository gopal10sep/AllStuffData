$("#terminal").terminal(async function (command, terminal) {
    try {
        const prompt = `You are a helpful chatbot named, Gopu. I say: ${command}. You reply:`
        const response = await fetch(
            `https://api.openai.com/v1/completions`,
            {
                body: JSON.stringify({"model": "text-davinci-003", "prompt": prompt, "temperature": 0.86, "max_tokens": 256}),
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer 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",
                },
                    }
        ).then((response) => {
            if (response.ok) {
                response.json().then((json) => {
                    terminal.echo(json.choices[0].text.trim());
                });
            }
        });
      
        console.log("Completed!");
    } catch (err) { console.error(`Error: ${err}`) }
},
    {
        greetings: "Hey, I am your AI-assistant, Gopu!",
        name: 'gpt3_demo',
        prompt: '> '
    });
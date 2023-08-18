let promptCount = 0;

$("#terminal").terminal(async function (command, terminal) {
    try {
        promptCount++;
        if (promptCount > 3) {
            terminal.echo("You are out of questions now.");
            return;
        }
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
        );
        if (response.ok) {
            const json = await response.json();
            terminal.echo(json.choices[0].text.trim());
        } else {
            terminal.echo("I am feeling a bit under the weather; lets do this later?");
        }
    } catch (err) {
        terminal.echo("I am feeling a bit under the weather; lets do this later?");
    }
},
    {
        greetings: "Hey, I am your AI-assistant, Gopu! I grant you max 3 queries.",
        name: 'gpt3_demo',
        prompt: '> '
    });






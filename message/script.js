document.getElementById('messageForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const profilePic = document.getElementById('profilePic').value;
    const message = document.getElementById('message').value;
    const image = document.getElementById('image').value;

    const webhookURL = 'https://discord.com/api/webhooks/1270661152157728778/FaNeIyy4GMh_cBbx-LSyEU0RUZk8Yd2SeB3XfRlCh47M3Wyhvl_AVR7VdnF6jPHpJLH6';

    const payload = {
        username: username,
        avatar_url: profilePic,
        content: message,
        embeds: image ? [
            {
                image: {
                    url: image
                }
            }
        ] : []
    };

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            document.getElementById('response').innerText = 'Message sent successfully!';
            document.getElementById('response').style.color = 'green';
        } else {
            document.getElementById('response').innerText = 'Failed to send message.';
            document.getElementById('response').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('response').innerText = 'An error occurred.';
        document.getElementById('response').style.color = 'red';
    }
});

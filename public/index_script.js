document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    // const apiUrl = 'https://tndingress.staginglamma.link/api/v1/travel/doc/mark/EK';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
        })
        .catch(error => console.error('Error fetching data:', error));
});


document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://tndingress.staginglamma.link/api/v1/ingress/auth/tool/login';
    const postData = {
        userAgent: "Mozilla 5 0",
        appName: "iPhone",
        netMark: "localhost",
        appVersion: "OS 16_6_1",
        platform: "MAC OS",
        language: "en-GB",
        onLine: "true",
        cookieEnabled: "true",
        javaEnabled: "true",
        javaScrEnabled: "true",
        acceptHeader: "application/json",
        colorDepth: "24",
        screenHeight: "1080",
        screenWidth: "1920",
        timePrecinct: "-240",
        deviceId: "QOUKSDUEHAIDJE",
        deviceType: "an"
    };

    function createPost(data) {
        fetch(apiUrl, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' ,
                'perceive': '1' 
            },
            body: JSON.stringify(data) 
        })
        .then(response => response.json()) 
        .then(data => {
            console.log('POST Response:', data);

            const postResponse = document.getElementById('postResponse');
            postResponse.textContent = `${data.id}, ${data.sign}`;
        })
        .catch(error => console.error('Error creating post:', error));
    }
    createPost(postData);
});

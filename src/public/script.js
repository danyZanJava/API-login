

const form = document.getElementById('loginform');

form.addEventListener('submit', (event) => {
    event.preventDefault();
                           

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-type':  'application/json'
            },
            body: JSON.stringify({
                email,password
            })}) 
            
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error); 
            })
        });


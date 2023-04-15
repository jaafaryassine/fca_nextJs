import { useState } from "react";

function ApiTest() {
    const [formData, setFormData] = useState({
        name: 'jaafar',
        email: 'j@ls.mp',
        message: 'hello',
      });
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        fetch('http://localhost:8001/JEE_api_war/DataServlet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: 'John Doe'})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

      };

      return <button onClick={handleSubmit}>Make Api</button>
}

export default ApiTest;
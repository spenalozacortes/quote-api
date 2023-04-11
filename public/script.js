fetch("http://localhost:8080/prueba")
    .then(res => {
        if(res.ok) {
            res.text()
                .then(response => {
                    console.log(response);
                });
        }
    });
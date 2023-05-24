var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
            form.reset();
            status.classList.add('alert','alert-success','alert-dismissible','fade','show','status');
          status.innerHTML = "Your message sent successfully, I will get back to you as soon as possible.";
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
                form.reset();
                status.classList.add('alert','alert-danger','alert-dismissible','fade','show','status');
                status.innerHTML = "Oops! There was a problem submitting your form";
            }
          })
        }
      }).catch(error => {
        form.reset();
        status.classList.add('alert','alert-danger','alert-dismissible','fade','show','status');
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
    }
    form.addEventListener("submit", handleSubmit)
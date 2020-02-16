$(".delete").click(deletePost);
//  $(".edit").click(editPost);

function deletePost (event) {
    let id = event.target.parentNode.parentNode.parentNode.id;
    Swal.fire({
        title: 'Jste si jistý?',
        text: "Smazání je trvalé!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Pokračovat!',
        preConfirm: () => {
            return $.post(`tournaments/${id}`, {action:"delete"})
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              })
              .catch(error => {
                Swal.showValidationMessage(
                  `Chyba serveru: ${JSON.stringify(error)}`
                )
                return {value: false};
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Smazáno!',
                'Turnaj byl uspěšně smazán.',
                'success'
            ).then(()=>{
                location.reload();
            })
        }
    })
}

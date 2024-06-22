document.querySelector('.btn-light i.fa-image').closest('.btn-light').addEventListener('click', function() {
    document.querySelector('.image-upload').style.display = 'block'; // Mostrar la sección de selección de imagen
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('imagePreview');
            img.src = e.target.result;
            img.style.display = 'block'; // Mostrar la imagen de vista previa
        };
        reader.readAsDataURL(file);
    } else {
        const img = document.getElementById('imagePreview');
        img.src = '';
        img.style.display = 'none'; // Ocultar la imagen de vista previa si no hay archivo seleccionado
    }
});
function previewImages() {
    var previewContainer = document.getElementById('image-preview');
    var filesInput = document.getElementById('fotos');
    var files = filesInput.files;

    previewContainer.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.onload = function (e) {
            var imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';

            var imgElement = document.createElement('img');
            imgElement.src = e.target.result;

            var captionElement = document.createElement('div');
            captionElement.className = 'caption';
            captionElement.innerHTML = 'Image ' + (previewContainer.children.length + 1);

            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(captionElement);

            previewContainer.appendChild(imgContainer);
        }

        reader.readAsDataURL(file);
    }
}

function previewNewImages() {
    console.log('Chamou previewNewImages'); // Adicione esta linha
    var previewContainer = document.getElementById('preview-container');
    var filesInput = document.getElementById('novasFotos');
    var files = filesInput.files;

    console.log('Número de novas imagens:', files.length);

    previewContainer.innerHTML = '';

    for (var i = 0; i < files.length; i++) {
        console.log('Iterando sobre a imagem', i + 1);
        var file = files[i];
        var reader = new FileReader();

        reader.onload = function (e) {
            
            var imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';

            var imgElement = document.createElement('img');
            imgElement.src = e.target.result;

            var captionElement = document.createElement('div');
            captionElement.className = 'caption';
            captionElement.innerHTML = 'Image ' + (previewContainer.children.length + 1);

            imgContainer.appendChild(imgElement);
            imgContainer.appendChild(captionElement);

            previewContainer.appendChild(imgContainer);
        }

        reader.readAsDataURL(file);
    }
}
    

function removeImage(nomeArquivo) {
    // Adicione lógica para marcar a imagem como removida
    var inputRemover = document.createElement("input");
    inputRemover.type = "hidden";
    inputRemover.name = "fotosRemover";
    inputRemover.value = nomeArquivo;
    document.getElementById("image-preview").appendChild(inputRemover);

    // Remova a div que contém a imagem
    var previewContainer = document.getElementById("image-preview");

    // Encontre o elemento com a classe correspondente ao nome do arquivo
    var divImagem = previewContainer.querySelector(`[data-nomearquivo='${nomeArquivo}']`);

    if (divImagem) {
        divImagem.parentNode.removeChild(divImagem);
    }
}

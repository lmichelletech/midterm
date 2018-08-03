


window.onload = function(){
    const bottom = document.getElementById('bottom');
    const inlineBreed = document.getElementById('inline-breed');
  

    fetch('/breeds')
    .then(response => response.json())
    .then(response => {
      response.forEach(breed => {
        insertBreed(breed);
      });
    });

    function insertBreed(breed) {
        let container = document.createElement('div');
        container.id = breed.id;
        container.classList.add('row');
        container.innerHTML = `
        <div id="${'inlinebreedtype-' + container.id}" class="inline-breedtype col"></div>
        <div id="${'inlinesize-' + container.id}" class="inline-size col"></div>
        <div id="${'inlineorigin-' + container.id}" class="inline-origin col"></div>
        <div id="${'inlineimage-' + container.id}" class="inline-image col"></div>
        <div id="${'editbtn-' + container.id}" class="inline-edit col"></div>
       `;

       container.style.cssText = 'display:flex;';

       let breedtype = document.createElement('input');
       breedtype.type = 'text';
       breedtype.id = 'text-' + breed.id;
       breedtype.name = 'breedtype';
       breedtype.value = breed.breedtype;

       let size = document.createElement('input');
       size.type = 'text';
       size.id = 'text-' + breed.id;
       size.name = 'size';
       size.value = breed.size;

       let origin = document.createElement('input');
       origin.type = 'text';
       origin.id = 'text-' + breed.id;
       origin.name = 'origin';
       origin.value = breed.origin;

       let image = document.createElement('input');
       image.type = 'text';
       image.id = 'text-' + breed.id;
       image.name = 'image';
       image.value = breed.image;
       
       let editbtn = document.createElement('button');
       editbtn.classList.add('far');
       editbtn.classList.add('fa-edit');
       editbtn.id = 'edit-' + breed.id;
        
       editbtn.onclick = function (e) {
        console.log("onlick ->>>> " + breed.id);
        var temp = breed.id;
        
        fetch('/breeds/editbreed', {
            
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({
            id: breed.id,
            breedtype: breedtype.value,
            size: size.value,
            image: image.value,
            })
        })
            .then(response => response.json())
            .then(response => {
            // console.log(response);
            })
            .catch(error => console.error(error));
        }
 
       var one = "inlinebreedtype-" + container.id;
       var two = "inlinesize-" + container.id;
       var three = "inlinesize-" + container.id;
       var four = "inlinesize-" + container.id;
       var five = "editbtn-" + container.id;
       
       inlineBreed.appendChild(container);     
       document.getElementById(one).appendChild(breedtype);
       document.getElementById(two).appendChild(size);
       document.getElementById(three).appendChild(origin);
       document.getElementById(four).appendChild(image);
       document.getElementById(five).appendChild(editbtn);
       bottom.appendChild(inlineBreed);
    }
}
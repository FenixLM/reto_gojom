function creationContentMap(positionData) {

    // Types header
    const arrayType = [
        {
            data: positionData.operation_type,
            className: 'content_header_type_primer'
        },

        {
            data: positionData.property_type,
            className: 'content_header_type_second'
        }
    ]

    const content_type = document.querySelector('.content_header_type');
    content_type.innerHTML = ''

    arrayType.map(type => {
        const divType = document.createElement('div');
        divType.className = type.className;
        divType.innerHTML = type.data;
        content_type.append(divType);

    })


    //name contenido
    const content_name_img = document.querySelector('.content_name_img');
    content_name_img.innerHTML = `<img src="${positionData.image}" alt=""> `

    const content_name_text = document.querySelector('.content_name_text');
    content_name_text.innerHTML = `${positionData.title}`

    // Location
    const content_location = document.querySelector('.content_location');
    content_location.innerHTML = `${positionData.location.district}, ${positionData.location.province}, ${positionData.location.region}`


    // Price
    const arrayPrice = [
        {
            name: 'Precio',
            tagLocal: positionData.formatted_local_price,
            tagUsd: positionData.formatted_usd_price

        },
        {
            name: 'Precio m2',
            tagLocal: positionData.formatted_local_price_by_m2,
            tagUsd: positionData.formatted_usd_price_by_m2

        }
    ]
    const content_price = document.querySelector('.content_price');
    content_price.innerHTML = '';

    arrayPrice.map(price => {
        const divPrice = document.createElement('div');
        divPrice.innerHTML = `
        <p class="content_price_name">${price.name}</p>
        <h2 class="content_price_usd">${price.tagUsd}</h2>
        <p class="content_price_local">${price.tagLocal}</p>
        `
        content_price.append(divPrice);
    });


    // Characterist
    const arrayCharacterist = [
        {
            name: 'total_area',
            nombre: 'm2 Total',
            detail: `${positionData.total_area || '-'}`,
            icon: 'straighten'
        },
        {
            name: 'build_area',
            nombre: 'm2 Techado',
            detail: `${positionData.build_area || '-'}`,
            icon: 'home'
        },
        {
            name: 'bedrooms',
            nombre: 'Dormitorios',
            detail: `${positionData.bedrooms || '-'}`,
            icon: 'bed'
        },
        {
            name: 'bathrooms',
            nombre: 'Baños',
            detail: `${positionData.bathrooms || '-'}`,
            icon: 'bathtub'
        },

        {
            name: 'garages',
            nombre: 'Estac.',
            detail: `${positionData.garages || '-'}`,
            icon: 'garage'
        },
        {
            name: 'years_old_name',
            nombre: 'Tiempo',
            detail: `${positionData.years_old_name || '-'}`,
            icon: 'history'
        },

    ]

    const content_characterist_grid = document.querySelector('.content_characterist_grid');
    content_characterist_grid.innerHTML = '';

    arrayCharacterist.map(charact => {

        const divCharactGrid = document.createElement('div');
        divCharactGrid.className = 'content_characterist_grid-cont';
        divCharactGrid.innerHTML = `
            <div class="content_characterist_grid-cont-icon">
                <span class="material-icons"> ${charact.icon}</span>
            </div>

            <div class="content_characterist_grid-cont-text">
                <p> ${charact.name} </p>

                <p class="content_characterist_grid-text-detail">
                    ${charact.detail}
                </p>
            </div>
        `

        content_characterist_grid.append(divCharactGrid)
    })


    // Other characterist
    const arrayOtherCharacteristExtra = [];

    let arrayOtherCharacterist = [];
    arrayOtherCharacterist = positionData.characteristics;

    const content_otherCharacterist_grid = document.querySelector('.content_otherCharacterist_grid');
    content_otherCharacterist_grid.innerHTML = '';

    if (arrayOtherCharacterist.length > 0) {
        arrayOtherCharacterist.map((otherCharact, index) => {
            const divOtherCharactGrid = document.createElement('div');
            divOtherCharactGrid.innerHTML = otherCharact;

            if (index >= 0 && index <= 5) {
                content_otherCharacterist_grid.append(divOtherCharactGrid);

            }
            if (index > 5) {
                arrayOtherCharacteristExtra.push(otherCharact);
            }

        })
    }




    return { arrayOtherCharacteristExtra }
}

export default creationContentMap;
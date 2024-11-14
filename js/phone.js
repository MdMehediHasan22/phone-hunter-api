const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phones-container');
    //clear container before search

    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');

    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('isSHowAll', isShowAll);
    //display only first 12 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100 p-4 shadow-xl';
        phoneCard.innerHTML = `
        <figure>
               <img
                   src="${phone.image}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews ${phone.phone_name} whose ${phone.phone_name} does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
    //hide loading spinner
    toggleLoadingSpinner(false);
}

const handleShowDetail = async (id) => {
    // console.log('clicked show Details', id);
    //load single phone Data\
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails =data.data; 
    showPhoneDetails(phoneDetails);

}

const showPhoneDetails = (phone) =>{
    console.log(phone);

    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('phone-details-container');
    showDetailContainer.innerHTML = `
    
    <img class="mx-auto" src="${phone.image}" alt=""/>
    <p><span class="font-bold text-lg">Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold text-lg">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold text-lg">Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold text-lg">Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold text-lg">Slug:</span>${phone.slug}</p>
    <p><span class="font-bold text-lg">Release Data:</span>${phone.releaseDate}</p>
    <p><span class="font-bold text-lg">Brand:</span>${phone.brand}</p>
    <p><span class="font-bold text-lg">GPS:</span>${phone?.others?.GPS}</p>
  

    `;

    //show the modal
    show_details_modal.showModal();
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }

}

//handle show All

const handleShowAll = () => {
    handleSearch(true);
}
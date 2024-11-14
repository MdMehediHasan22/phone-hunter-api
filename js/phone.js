const loadPhone = async(searchText , isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones , isShowAll);
}

const displayPhones = (phones , isShowAll) =>{
     
    const phoneContainer = document.getElementById('phones-container');
    //clear container before search

    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    console.log('isSHowAll',isShowAll);
   //display only first 12 phones if not show All
    if(!isShowAll){
        phones=phones.slice(0,12);
    }

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList='card bg-gray-100 p-4 shadow-xl';
        phoneCard.innerHTML=`
        <figure>
               <img
                   src="${phone.image}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews ${phone.phone_name} whose ${phone.phone_name} does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
    //hide loading spinner
    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText ,isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }

}

//handle show All

const handleShowAll = () => {
    handleSearch(true);
}
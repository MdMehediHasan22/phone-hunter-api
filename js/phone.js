const loadPhone = async() =>{
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones =>{
     
    const phoneContainer = document.getElementById('phones-container');

    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList='card bg-gray-100 w-96 shadow-xl';
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

    })
}
loadPhone();
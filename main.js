const Item = (name, phone, favorite, onClickFav, onClickDel) => {
    const itemElement = document.createElement('div')
    itemElement.className = 'item'

    const itemIcon = document.createElement('div')
    itemIcon.className = 'item__icon'

    const itemTextSection = document.createElement('div')
    itemTextSection.className = 'item__text'
    
    const itemName = document.createElement('span')
    itemName.className = 'item__text-name'
    itemName.innerText = `${name}`
    
    const itemPhone = document.createElement('span')
    itemPhone.className = 'item__text-phone'
    itemPhone.innerText = `${phone}`
    
    const itemBtnSection = document.createElement('div')
    itemBtnSection.className = 'item__btn'

    const itemBtnDelete = document.createElement('button')
    itemBtnDelete.className = 'item__btn-delete'
    itemBtnDelete.addEventListener('click', onClickDel)
    const itemBtnDeleteIcon = document.createElement('i')
    itemBtnDeleteIcon.className = 'item__btn-delete-icon fa-solid fa-xmark'

    
    const itemBtnFavorite = document.createElement('button')
    itemBtnFavorite.className = 'item__btn-favorite'
    itemBtnFavorite.addEventListener('click', onClickFav)
    const itemBtnFavoriteIcon = document.createElement('i')
    if(favorite === 'favorite')
    {
        itemBtnFavoriteIcon.className = 'item__btn-favorite-icon fa-solid fa-heart'
    } else {
        itemBtnFavoriteIcon.className = 'item__btn-favorite-icon fa-regular fa-heart'
    }
    
    itemElement.appendChild(itemIcon)
    itemElement.appendChild(itemTextSection)
    
    itemTextSection.appendChild(itemName)
    itemTextSection.appendChild(itemPhone)
    
    itemElement.appendChild(itemBtnSection)
    itemBtnSection.appendChild(itemBtnDelete)
    itemBtnDelete.appendChild(itemBtnDeleteIcon)
    itemBtnSection.appendChild(itemBtnFavorite)
    itemBtnFavorite.appendChild(itemBtnFavoriteIcon)
    
    
    return itemElement
}

const searchOnPress = () => {
    const inputName = document.getElementById('search-bar__input').value.toLowerCase()
    generateItem(contacts, inputName)
}

const addDialog = () => {
    if(document.getElementById('basis-main').classList.contains('active'))
    {
        document.getElementById('basis-main').classList.remove('active')
        document.getElementById('basis-add').classList.add('active')
    }
    else
    {
        document.getElementById('basis-add').classList.remove('active')
        document.getElementById('basis-main').classList.add('active')
    }
       
}

const ConfirmDialog = () => {
    const endFav = () => {
        if(document.getElementById('add-main-section__favorite-check').checked == true)
        {return 'favorite'}
        else {return 'none'} 
    }
    contacts.push({
        id: contacts.length,
        name: document.getElementById('add-main-section__input').value,
        phone: document.getElementById('add-main-section__phone').value,
        favorite: endFav()
    })
    document.getElementById('add-main-section__input').value = ""
    document.getElementById('add-main-section__phone').value = ""
    document.getElementById('add-main-section__favorite-check').checked = false

    document.getElementById('basis-main').classList.add('active')
    document.getElementById('basis-add').classList.remove('active')
    generateItem(contacts)
}

const sortObjectA = (objectA) =>{
    objectA.sort((a,b) => {
        var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) 
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })
}

const generateItem = (mass, inputName) => {
    let myNode = document.getElementById('main-section')
    while(myNode.firstChild) {
        myNode.removeChild(myNode.firstChild)
    }
    sortObjectA(mass)
    mass.forEach((item)=>{
        if (item.favorite === 'favorite')
        {
            const onClickDel = () => {
                let tmpId = mass.map(e => e.id).indexOf(item.id)
                if(tmpId !== 0)
                    mass.splice(tmpId,tmpId)
                else
                    mass.shift()
                generateItem(mass)
            }
            const onClickFav = () => {
                if(item.favorite === 'none')
                    item.favorite = 'favorite'
                else{
                    item.favorite = 'none'
                }
                generateItem(mass)
            }
            if((item.name.toLowerCase().includes(inputName)) || item.phone.replace(/[^0-9\s+]/gi , '').includes(inputName) || inputName === undefined)
            {
                const itemElement = Item(item.name, item.phone, item.favorite, onClickFav,onClickDel)
                document.getElementById('main-section').appendChild(itemElement)
            }
            
        }
    })
    mass.forEach((item)=>{
        if (item.favorite === 'none')
        {
            const onClickDel = () => {
                let tmpId = mass.map(e => e.id).indexOf(item.id)
                if(tmpId !== 0)
                    mass.splice(tmpId,tmpId)
                else
                    mass.shift()
                generateItem(mass)
            }
            const onClickFav = () => {
                if(item.favorite === 'none')
                    item.favorite = 'favorite'
                else{
                    item.favorite = 'none'
                }
                generateItem(mass)
            }
            if((item.name.toLowerCase().includes(inputName)) || item.phone.replace(/[^0-9\s+]/gi , '').includes(inputName) || inputName === undefined)
            {

                const itemElement = Item(item.name, item.phone, item.favorite, onClickFav,onClickDel)
                document.getElementById('main-section').appendChild(itemElement)
            }
        }
    })
}

const contacts = []

const searchInput = document.getElementById("search-bar__input")
searchInput.addEventListener('input', searchOnPress)

const addBtn = document.getElementById('add-section__btn')
addBtn.addEventListener('click', addDialog)

const phoneInput = document.getElementById('add-main-section__phone')
const maskOption = {
    mask: '+7(000)000-00-00',
}
const newMask = IMask(phoneInput, maskOption)

const confirmBtn = document.getElementById("confirm-section__btn")
confirmBtn.addEventListener('submit', (event) => {})
    onsubmit = (event) => {
        event.preventDefault();
        ConfirmDialog()
    }

generateItem(contacts)
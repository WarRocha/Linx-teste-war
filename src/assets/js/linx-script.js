
var _request = new XMLHttpRequest(),
_productList = document.querySelector('.linx-products__list'),
_productItem = document.createElement('li');

_productItem.className = 'linx-product';

_request.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
        var _json = JSON.parse(this.responseText),
        el,
        img,
        name,
        description,
        oldPrice,
        price,
        installmentTime,
        installmentPrice;

        for (var i = 0; i < _json.length; i++) {
            el = _json[i];
            img = el.picture;
            name = el.name;
            description = el.description;
            oldPrice = el.oldPrice;
            price = el.price;
            installmentTime = el.installmentTime;
            installmentPrice = Math.floor(price / installmentTime);
            
            _productItem.innerHTML = '<div class="linx-product__image">'
                + '<img src="'+ img +'" alt="">'
                + '</div>'
                + '<div class="linx-product__information">'
                + '<h4>'+ name +'</h4>'
                + '<p>'+ description +'</p>'
                + '<span>De: R$'+ oldPrice +'</span>'
                + '<strong>Por: R$'+ price +'</strong>'
                + '<span>ou '+ installmentTime +' de R$' + installmentPrice + '</span>'
                + '<button class="action--add-product">Comprar</button>'
                + '</div>'; 
                
            _productList.appendChild(_productItem); 
                        
        }
    }

};
_request.open("GET", "http://localhost:9000/src/assets/js/linx-products-list.json", true);
_request.send();


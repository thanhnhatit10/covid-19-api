
const btnSelect = document.querySelector('#select_world').addEventListener('click', getCovidCountryById);
function getCovidCountryById(e) {
    var promise = new Promise(function(resolve, reject) {
        if(resolve) {
            resolve(
                fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/' + e.target.value )
            )
        }
        else {
            reject('Không thể tải dữ liệu');
        }
    })

    
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        // console.log(data)
        let maqg = data.location.country_code;
        let quocgia = data.location.country;
        let danso = data.location.country_population;
        let binhiem = data.location.latest.confirmed;
        let tuvong = data.location.latest.deaths;

        let lastupdate = data.location.last_updated;
        document.querySelector('.maqg').innerHTML = maqg
        document.querySelector('.quocgia').innerHTML = quocgia.toLocaleString("en");
        document.querySelector('.danso').innerHTML = danso.toLocaleString("en");
        document.querySelector('.binhiem').innerHTML = binhiem.toLocaleString("en");

        document.querySelector('.tuvong').innerHTML = tuvong.toLocaleString("en");

        document.querySelector('.lastupdate').innerHTML = lastupdate.toLocaleString("en").substring(0,10);

        document.querySelector('.pttuvong').innerHTML = ((Number(tuvong)/ Number(binhiem)* 100)).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})  + "%";


        if(data.location.province == ""){
            document.querySelector('.header-title').innerHTML = quocgia;
        }else{
            
            document.querySelector('.header-title').innerHTML = quocgia + '-'+ data.location.province;
        }
    })
    .catch(function(error) {
        document.querySelector('.error').innerHTML = error;
    })
}

function getCovidCountry() {
    var promise = new Promise(function(resolve, reject) {
        if(resolve) {
            resolve(
                fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/274' )
            )
        }
        else {
            reject('Không thể tải dữ liệu');
        }
    })

    
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        // console.log(data)
        let maqg = data.location.country_code;
        let quocgia = data.location.country;
        let danso = data.location.country_population;
        let binhiem = data.location.latest.confirmed;
        let tuvong = data.location.latest.deaths;

        let lastupdate = data.location.last_updated;
        document.querySelector('.maqg').innerHTML = maqg
        document.querySelector('.quocgia').innerHTML = quocgia.toLocaleString("en");
        document.querySelector('.danso').innerHTML = danso.toLocaleString("en");
        document.querySelector('.binhiem').innerHTML = binhiem.toLocaleString("en");

        document.querySelector('.tuvong').innerHTML = tuvong.toLocaleString("en");

        document.querySelector('.lastupdate').innerHTML = lastupdate.toLocaleString("en").substring(0,10);

        document.querySelector('.pttuvong').innerHTML = ((Number(tuvong)/ Number(binhiem)* 100)).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})  + "%";

        document.querySelector('.header-title').innerHTML = quocgia
    })
    .catch(function(error) {
        document.querySelector('.error').innerHTML = error;
    })

    
}


function getCovidWorld() {
    var promise = new Promise(function(resolve, reject) {
        if(resolve) {
            resolve(
                fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
            )
        }
        else {
            reject('Không thể tải dữ liệu');
        }
    })

    
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        // console.log(data)
        const html = data.locations.map(function(covid) {
            const id = covid.id;
            const maqg = covid.country_code;
            const quocgia = covid.country;
            const tinh = covid.province;
            const danso = covid.country_population;
            const binhiem = covid.latest.confirmed;
            const tuvong = covid.latest.deaths;
            const lastupdate = covid.last_updated;

            return  `
                <li class="list_world">
                    <p>STT: ${id}</p>
                    <p>Quốc gia:<span class="list-name">${quocgia}</span></p>
                    <p><span style='color:blue;'>${tinh}</span></p>
                    <p>Dân số: ${new Intl.NumberFormat().format(danso)}</p>
                    <p>Cập nhật: ${lastupdate.substring(0,10)}</p>
                    <p>Ca nhiễm: ${binhiem.toLocaleString("en")}</p>
                    <p>Tử vong: ${tuvong}</p>
                    <p>Phần trăm: ${((Number(tuvong)/ Number(binhiem)* 100)).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})+ "%"}</p>
                </li>
            `
        }).join('');
        document.querySelector('.wrapper').insertAdjacentHTML("afterbegin", html);
    })
    
}



function getCovidTotal() {
    var promis1 = new Promise((resolve, reject) => {
        resolve(
            fetch('https://coronavirus-tracker-api.herokuapp.com/v2/latest')
        )
    })

    .then(function(ress) {
        return ress.json();
    })
    .then(function(data) {
        var totalcanhiem = data.latest.confirmed;
        var totalchet = data.latest.deaths;
        var totalphuchoi = data.latest.recovered;


        document.querySelector('#total').innerHTML = `- Tổng số ca nhiễm: ${new Intl.NumberFormat().format(totalcanhiem)}`;
        document.querySelector('#total-die').innerHTML = `- Số ca tử vong: ${new Intl.NumberFormat().format(totalchet)}`;
        document.querySelector('#total-success').innerHTML = `- Bình phục: ${new Intl.NumberFormat().format(totalphuchoi)}`;
    })
}


function getSelector() {
    var promise = new Promise(function(resolve, reject) {
        if(resolve) {
            resolve(
                fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
            )
        }
        else {
            reject('Không thể tải dữ liệu');
        }
    })

    
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data)
        const html = data.locations.map(function(list) {
            const id = list.id;
            const quocgia = list.country;

            var option = document.createElement('option');
            option.value = id;
            option.innerHTML =quocgia;
            if(list.province !== "") {
                option.innerText = quocgia + '-' + list.province;
            }
            else {
                option.innerHTML = quocgia;
            }

            document.querySelector('#select_world').appendChild(option);

           
        });
    })
}


getCovidWorld();
getCovidCountry();

getCovidTotal();

getSelector();

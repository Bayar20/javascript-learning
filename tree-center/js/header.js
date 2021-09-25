// JavaScript source code
console.log('Hello header.js');

// Global vars
let modals = {
    trees: [],
};

let views = {
    buttons: function () {
        document.querySelector('#search').onclick = function () {
            if (document.querySelector('.login-wrapper').classList.contains('open')) {
                document.querySelector('.login-wrapper').classList.remove('open');
            };
        };
        document.querySelector('#search').onkeyup = function (event) {
            if (event.keyCode === 13) {
                if (!this.value) return;

                let temp = modals['trees'].find((item) => {
                    return item.name.toLowerCase().includes(this.value.toLowerCase());
                });

                if (!temp) return;
                window.location.href = `trees.html?search=${this.value}`;
            };
        };
        document.querySelector('#search').oninput = function () {
            let $box = document.querySelector('#search-result');
            if (!this.value) {
                $box.classList.remove('open');
            } else {
                if (!$box.classList.contains('open')) $box.classList.add('open');
                $box.innerHTML = '';

                let temp = modals['trees'].filter((item) => {
                    if (item.name.toLowerCase().includes(this.value.toLowerCase())) return true;
                    else return false;
                });

                if (temp.length) {
                    let count = 0;
                    temp.forEach((item) => {
                        if (count > 4) return;
                        $a = document.createElement('a');
                        $a.href = `onetree.html?tree=${item.id}`;
                        $a.innerHTML = `${item.name}`;
                        $box.append($a);
                        count++;
                    });
                } else {
                    $div = document.createElement('div');
                    $div.innerHTML = 'Хайлт олдсонгүй.';
                    $box.append($div);
                };
            };
        };
        document.querySelector('#login-icon').onclick = function () {
            if (document.querySelector('#search-result').classList.contains('open')) {
                document.querySelector('#search-result').classList.remove('open');
            };
            document.querySelector('.login-wrapper').classList.toggle('open');
        };
        document.querySelector('.login-wrapper div:nth-child(1)').onclick = function () {
            window.location.href = 'login.html';
        };
        document.querySelector('.login-wrapper div:nth-child(2)').onclick = function () {
            auth.signOut()
                .then(() => {
                    if (window.location.href.includes('order.html') || window.location.href.includes('cart.html') || window.location.href.includes('register.html')) {
                        window.location.replace('index.html');
                    } else {
                        document.querySelector('header .private').style.visibility = 'hidden';
                    };
                })
                .catch((error) => {
                    alert(error);
                });
        };
        document.querySelector('.login-wrapper div:nth-child(3)').onclick = function () {
            window.location.href = 'login.html';
        };
    },
};

// Main
auth.onAuthStateChanged((user) => {
    if (user) {
        document.querySelector('header .private').style.visibility = 'visible';
        document.querySelector('.login-wrapper div:nth-child(1)').style.display = 'none';
        document.querySelector('.login-wrapper div:nth-child(2)').style.display = 'block';
        document.querySelector('.login-wrapper div:nth-child(3)').style.display = 'none';
        document.querySelector('.login-wrapper a').style.display = 'block';
    } else {
        document.querySelector('header .private').style.visibility = 'hidden';
        document.querySelector('.login-wrapper div:nth-child(1)').style.display = 'block';
        document.querySelector('.login-wrapper div:nth-child(2)').style.display = 'none';
        document.querySelector('.login-wrapper div:nth-child(3)').style.display = 'block';
        document.querySelector('.login-wrapper a').style.display = 'none';
    };

    db.collection('trees').get().then((docs) => {
        docs.forEach((doc) => {
            let temp = {
                ...doc.data(),
                id: doc.id,
            };
            modals['trees'].push(temp);
        });

        views['buttons']();
    });

});
// JavaScript source code

// ONETREE.html
if (window.location.href.includes('onetree.html')) {
    console.log('Hello onetree.html');

    let modal = {
        tree: {},
        category: {},
        reviews: [],
        basket: [],
        openReview: -1,
        user: -1,
    };

    let controller = {
        updateRating: function () {
            let rate = 0;
            let stars = [0, 0, 0, 0, 0];
            modal['reviews'].forEach((item) => {
                rate += item.rate;
                stars[item.rate - 1]++;
            });
            let rating1 = document.querySelector('main .right-side .head div .star-rating');
            let rating2 = document.querySelector('main .right-side .summary-wrapper .summary .head .star-rating');
            let rating3 = document.querySelector('main .left-side .about .overall-box .overall-star .star-rating');

            if (rate / modal['reviews'].length >= 4.5) {
                rating1.className = 'star-rating five';
                rating2.className = 'star-rating five';
                rating3.className = 'star-rating five';
            } else if (rate / modal['reviews'].length >= 3.5) {
                rating1.className = 'star-rating four';
                rating2.className = 'star-rating four';
                rating3.className = 'star-rating four';
            } else if (rate / modal['reviews'].length >= 2.5) {
                rating1.className = 'star-rating three';
                rating2.className = 'star-rating three';
                rating3.className = 'star-rating three';
            } else if (rate / modal['reviews'].length >= 1.5) {
                rating1.className = 'star-rating two';
                rating2.className = 'star-rating two';
                rating3.className = 'star-rating two';
            } else if (rate / modal['reviews'].length >= 0.5) {
                rating1.className = 'star-rating one';
                rating2.className = 'star-rating one';
                rating3.className = 'star-rating one';
            } else {
                rating1.className = 'star-rating zero';
                rating2.className = 'star-rating zero';
                rating3.className = 'star-rating zero';
            }

            document.querySelector('.right-side .head a').innerHTML = `${modal['reviews'].length} үнэлгээ`;
            document.querySelector('.right-side .summary .head a').innerHTML = `${modal['reviews'].length} үнэлгээ`;

            // Overall-Box
            let $overallBox = document.querySelector('main .left-side .about .overall-box');
            $overallBox.querySelector('.overall-number div:first-child').innerHTML = (rate / modal['reviews'].length).toFixed(1);
            for (let i = 0, j = 5; i < stars.length; i++, j--) {
                $overallBox.querySelector(`.stars div:nth-child(${j}) .gray div`).style.width = `${stars[i] / modal['reviews'].length * 100}%`;
                $overallBox.querySelector(`.stars div:nth-child(${j}) span:last-child`).innerHTML = `(${stars[i]})`;
            };
            $overallBox.querySelector('.overall-percent h5').innerHTML = `${Math.round((stars[3] + stars[4]) / modal['reviews'].length * 100)}%`;

            document.querySelector('main .left-side .about .feedback-box').style.display = 'block';
            document.querySelector('main .left-side .about .feedback-pages').style.display = 'flex';
        },

        feedbackLogic: function () {
            if (modal['reviews'].length - 1 === modal['openReview']) {
                if (modal['openReview'] === 0) {
                    document.querySelector('main .left-side .about .feedback-pages #prev').style.display = 'none';
                    document.querySelector('main .left-side .about .feedback-pages').style.display = 'none';
                    document.querySelector('main .left-side .about .feedback-pages select').style.display = 'none';
                } else {
                    document.querySelector('main .left-side .about .feedback-pages #prev').style.display = 'block';
                    document.querySelector('main .left-side .about .feedback-pages #next').style.display = 'none';
                    document.querySelector('main .left-side .about .feedback-pages').style.display = 'flex';
                    document.querySelector('main .left-side .about .feedback-pages select').style.display = 'block';
                };
            } else if (modal['reviews'].length - 1 > modal['openReview']) {
                document.querySelector('main .left-side .about .feedback-pages').style.display = 'flex';
                document.querySelector('main .left-side .about .feedback-pages select').style.display = 'block';
                document.querySelector('main .left-side .about .feedback-pages #next').style.display = 'block';
                if (modal['openReview'] === 0) document.querySelector('main .left-side .about .feedback-pages #prev').style.display = 'none';
                else document.querySelector('main .left-side .about .feedback-pages #prev').style.display = 'block';
            };
        },

        feedbackSort: function (index) {
            if (index === 0) {
                modal['reviews'].sort((item1, item2) => {
                    if (item1.rate > item2.rate) return -1;
                    if (item1.rate < item2.rate) return 1;
                    if (item1.rate === item2.rate) return 0;
                });
            } else if (index === 1) {
                modal['reviews'].sort((item1, item2) => {
                    if (item1.date > item2.date) return -1;
                    if (item1.date < item2.date) return 1;
                    if (item1.date === item2.date) return 0;
                });
            } else if (index === 2) {
                modal['reviews'].sort((item1, item2) => {
                    if (item1.date > item2.date) return 1;
                    if (item1.date < item2.date) return -1;
                    if (item1.date === item2.date) return 0;
                });
            } else {
                modal['reviews'].sort((item1, item2) => {
                    if (item1.rate > item2.rate) return 1;
                    if (item1.rate < item2.rate) return -1;
                    if (item1.rate === item2.rate) return 0;
                });
            };
            modal['openReview'] = 0;
            view['drawReview'](modal['reviews'][0]);
        },

    };

    let view = {
        renewFeedback: function () {
            let $modal = document.querySelector('.modal');
            $modal.querySelector('.feedback-wrapper .star-rating').className = 'star-rating';
            $modal.querySelector('.feedback-wrapper input').value = '';
            $modal.querySelector('.feedback-wrapper textarea').value = '';
            $modal.style.display = 'none';
        },

        drawReview: function (review) {
            let $feedback = document.createElement('div');
            $feedback.className = 'feedback';
            $feedback.innerHTML =
                `<div>
                            <div class="star-rating">
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </div>
                            <span class="buy">"Сайн"</span>
                            <span class="buyer">Бүртгэлтэй хэрэглэгч</span>
                        </div>
                        <h6>${review.title}</h6>
                        <p class="info">${review['date'].slice(0, 10)} ${review['user_name']} (${review['user_location']})</p>
                        <p class="description">“${review.description}”</p>`;
            if (review.rate === 5) $feedback.querySelector('.star-rating').classList.add('five');
            if (review.rate === 4) $feedback.querySelector('.star-rating').classList.add('four');
            if (review.rate === 3) $feedback.querySelector('.star-rating').classList.add('three');
            if (review.rate === 2) $feedback.querySelector('.star-rating').classList.add('two');
            if (review.rate === 1) $feedback.querySelector('.star-rating').classList.add('one');
            if (review.rate === 0) $feedback.querySelector('.star-rating').classList.add('zero');

            let $feedbackBox = document.querySelector('main .left-side .about .feedback-box');
            $feedbackBox.style.display = 'block';
            $feedbackBox.innerHTML = '';
            $feedbackBox.append($feedback);

            //Buttons logic
            controller['feedbackLogic']();
        },

        drawTree: function () {
            // Location
            let $location = document.querySelector('main .location');
            $location.innerHTML =
                `<div class="flex align-center">
                    <a href="index.html">Нүүр</a>
                </div>
                <span>></span>
                <div class="flex align-center category">
                    <a href="trees.html?category=${modal['category'].id}">${modal['category'].name}</a>
                </div>
                <span>></span>`;

            // Right-side
            let $right_head = document.querySelector('main .right-side .head');
            $right_head.innerHTML =
                `<div class="title">
                    <h1>${modal['tree'].name}</h1>
                    <h2>'${modal['tree'].eng_name}'</h2>
                </div>
                <div>
                    <a>${modal['reviews'].length} үнэлгээ</a>
                    <div class="star-rating">
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>
                </div>`;
            if (!modal['tree'].eng_name) $right_head.querySelector('.title h2').innerHTML = '';

            let $right_img = document.querySelector('main .right-side .img-wrapper');
            $right_img.innerHTML =
                `<img src="${modal['tree'].img}" alt="tree" id="main-img" />`;


            let $right_table = document.querySelector('main .right-side table');
            let $right_summary = document.querySelector('main .right-side .summary-wrapper .summary');
            modal['tree'].options.forEach((item, index) => {
                let $tr = document.createElement('tr');
                $tr.dataset.id = index;
                $tr.innerHTML =
                    `<td class="title">${item.height}см</td>
                    <td class="price">₮${item.price}</td>
                    <td class="quantity">
                        <div>
                            <button class="minus">-</button>
                            <input type="number" placeholder="0" />
                            <button class="plus">+</button>
                        </div>
                        <button class="notify">Санал өгөх</button>
                    </td>
                    <td class="shipping">${item.age} нас</td>`;

                if (item.count === 0) $tr.className = 'out';
                $right_table.append($tr);

                let $tr_summary = document.createElement('tr');
                $tr_summary.dataset.id = index;
                $tr_summary.innerHTML = $tr.innerHTML;
                $right_summary.querySelector('table').append($tr_summary);

                item.number = 0;
            });
            $right_summary.querySelector('.head').innerHTML = $right_head.innerHTML;

            // Left-side
            let $left_img = document.querySelector('main .left-side .img-wrapper');
            $left_img.innerHTML =
                `<img src="${modal['tree'].img}" alt="tree" id="main-img" />`;

            let $left_about = document.querySelector('main .left-side .about .text');
            $left_about.innerHTML =
                `<h4>Товч мэдээлэл</h4>
                 <p>${modal['tree'].description}</p>`;

            // Reviews
            if (modal['reviews'].length) {
                controller['updateRating']();
                modal['openReview'] = 0;
                view['drawReview'](modal['reviews'][0]);
                document.querySelector('main .left-side .about .feedback-pages').style.display = 'flex';
            } else {
                document.querySelector('main .left-side .about .feedback-box').style.display = 'none';
                document.querySelector('main .left-side .about .feedback-pages').style.display = 'none';
            };

            // Buttons
            view['buttons']();

        },

        buttons: function () {
            document.querySelector('.right-side .head div:last-child a').onclick = function () {
                document.querySelector('main').scrollIntoView(false);
            };
            document.querySelector('.right-side .summary-wrapper .summary .top').onclick = function () {
                document.querySelector('main').scrollIntoView(true);
            };
            document.querySelectorAll('.right-side .general-information .general-wrapper').forEach((item) => {
                item.querySelector('div').onclick = function () {
                    item.classList.toggle('open');
                };
            });
            document.querySelector('.left-side .about .overall-box .overall-percent button').onclick = function () {
                if (modal['user'] === -1) {
                    alert('Та хэрэглэгчээр нэвтэрсний дараа сэтгэгдэл үлдээх боломжтой болно.');
                    return;
                }
                let rate = 0;
                let $modal = document.querySelector('.modal');
                $modal.style.display = 'flex';
                $modal.onclick = function (event) {
                    if (event.target.className !== 'modal') return;
                    view['renewFeedback']();
                };
            };

            // Feedback
            document.querySelector('.modal .feedback-wrapper img').onclick = function () {
                view['renewFeedback']();
            };
            document.querySelectorAll('.modal .feedback-wrapper .star-rating span').forEach((item) => {
                item.onclick = function (event) {
                    document.querySelector('.modal .feedback-wrapper .star-rating').className = `star-rating ${event.target.id}`;
                };
            });
            document.querySelector('.modal .feedback-wrapper button').onclick = function () {
                let rate = document.querySelector('.modal .feedback-wrapper .star-rating').className.split(' ');
                if (rate.length === 1) rate = 0;
                else {
                    if (rate[1] === 'five') rate = 5;
                    if (rate[1] === 'four') rate = 4;
                    if (rate[1] === 'three') rate = 3;
                    if (rate[1] === 'two') rate = 2;
                    if (rate[1] === 'one') rate = 1;
                };

                let $input = document.querySelector('.modal .feedback-wrapper input');
                let $textarea = document.querySelector('.modal .feedback-wrapper textarea');
                if (!$input.value || !$textarea.value || (rate === 0)) alert('Талбаруудаа бүрэн бөглөнө үү');
                else {
                    let temp = {
                        'rate': rate,
                        'title': $input.value,
                        'description': $textarea.value,
                        'date': (new Date()).toISOString(),
                        'user_id': auth.currentUser.uid,
                        'user_name': modal['user']['fname'],
                        'user_location': modal['user']['city'],
                    };

                    if (modal['user']['fname']) temp['user_name'] = 'Нэр';
                    if (modal['user']['city']) temp['user_location'] = 'Хот';
                    
                    modal['reviews'].push(temp);
                    let promise = db.collection('trees').doc(modal['tree'].id).update({
                        'reviews': [...modal['reviews']],
                    });

                    promise.then(() => {
                        view['renewFeedback']();
                        if (modal['openReview'] === -1) {
                            modal['openReview'] = 0;
                            view['drawReview'](modal['reviews'][0]);
                            controller['updateRating']();
                        } else {
                            controller['feedbackLogic']();
                            controller['updateRating']();
                        };
                    });
                };
            };
            document.querySelector('.left-side .about .feedback-pages #prev').onclick = function () {
                modal['openReview']--;
                view['drawReview'](modal['reviews'][modal['openReview']]);
            };
            document.querySelector('.left-side .about .feedback-pages #next').onclick = function () {
                modal['openReview']++;
                view['drawReview'](modal['reviews'][modal['openReview']]);
            };
            document.querySelector('.left-side .about .feedback-pages select').onchange = function () {
                controller['feedbackSort'](this.selectedIndex);
            };

            // Basket
            document.querySelector('.right-side .calculator button').onclick = function () {
                if (document.querySelector('.right-side .calculator div span').innerHTML === '₮0.00') {
                    alert('Сонгосон бүтээгдэхүүний тоог оруулна уу');
                    return;
                };
                if (modal['user'] === -1) {
                    alert('Та хэрэглэгчээр нэвтэрнэ үү');
                    return;
                };

                modal['tree'].options.forEach((item, index) => {
                    if (item.number === 0) return;
                    let product = {
                        'user_id': auth.currentUser.uid,
                        'product_id': modal['tree'].id,
                        'option_id': index,
                        'number': item.number,
                    };

                    let temp = modal['basket'].findIndex((item2) => { return item2['option_id'] === index; });
                    if (temp !== -1) {
                        modal['basket'][temp] = product;
                    } else {
                        modal['basket'].push(product);
                    };
                });

                // Firebase
                modal['basket'].forEach((item) => {
                    let promise = db.collection('baskets')
                        .where("user_id", "==", item['user_id'])
                        .where("product_id", "==", item['product_id'])
                        .where("option_id", "==", item['option_id']).get();
                    promise.then((docs) => {
                        if (!docs.empty) {
                            docs.forEach((doc) => {
                                if (doc.data().number !== item.number) {
                                    db.collection('baskets').doc(doc.id).set(item).then(() => {
                                        if (confirm('Таны сагс амжилттай шинэчлэгдлээ. Та сагс руу шилжих үү?')) {
                                            window.location.href = 'cart.html';
                                        } else {
                                            modal['tree'].options.forEach((element) => {
                                                element.number = 0;
                                            });
                                            Array.from(document.querySelectorAll('.right-side table .quantity input')).forEach((element) => {
                                                element.value = 0;
                                            });
                                        }
                                    });
                                };
                            });
                        } else {
                            db.collection('baskets').add(item).then(() => {
                                if (confirm('Сагсанд амжилттай нэмэгдлээ. Та сагс руу шилжих үү?')) {
                                    window.location.href = 'cart.html';
                                } else {
                                    modal['tree'].options.forEach((element) => {
                                        element.number = 0;
                                    });
                                    Array.from(document.querySelectorAll('.right-side table .quantity input')).forEach((element) => {
                                        element.value = 0;
                                    });
                                };
                            });
                        };
                    });
                    promise.catch((error) => {
                        console.log(error.message);
                    });
                });
            };
            document.querySelectorAll('.right-side table tr .quantity input').forEach((item) => {
                item.onchange = function () {
                    let id = this.closest('tr').dataset.id;

                    if (this.value < 0) {
                        modal['tree'].options[id].number = 0;
                    } else if (this.value > modal['tree'].options[id].count) {
                        alert(`Уучлаарай, боломжит үлдэгдэл ${modal['tree'].options[id].count} байна.`);
                        modal['tree'].options[id].number = modal['tree'].options[id].count;
                    } else {
                        modal['tree'].options[id].number = parseInt(this.value);
                    };
                    this.value = modal['tree'].options[id].number;

                    let twin = Array.from(document.querySelectorAll('.right-side .summary-wrapper table tr')).find((item) => {
                        return item.dataset.id === id;
                    });
                    twin.querySelector('input').value = modal['tree'].options[id].number;

                    // Total
                    let total = modal['tree'].options.reduce((acc, item) => {
                        return acc += item.price * item.number;
                    }, 0);
                    document.querySelector('.right-side .calculator span').innerHTML = `₮${total}`;
                };
            });
            document.querySelectorAll('.right-side table tr .quantity .minus').forEach((item) => {
                item.onclick = function () {
                    let id = this.closest('tr').dataset.id;

                    modal['tree'].options[id].number--;
                    if (modal['tree'].options[id].number < 0) {
                        modal['tree'].options[id].number = 0;
                    }
                    this.closest('tr').querySelector('input').value = modal['tree'].options[id].number;

                    let twin = Array.from(document.querySelectorAll('.right-side .summary-wrapper table tr')).find((item) => {
                        return item.dataset.id === id;
                    });
                    twin.querySelector('input').value = modal['tree'].options[id].number;

                    // Total
                    let total = modal['tree'].options.reduce((acc, item) => {
                        return acc += item.price * item.number;
                    }, 0);
                    document.querySelector('.right-side .calculator span').innerHTML = `₮${total}`;
                };
            });
            document.querySelectorAll('.right-side table tr .quantity .plus').forEach((item) => {
                item.onclick = function (event) {
                    let id = this.closest('tr').dataset.id;

                    modal['tree'].options[id].number++;
                    if (modal['tree'].options[id].number > modal['tree'].options[id].count) {
                        alert(`Уучлаарай, боломжит үлдэгдэл ${modal['tree'].options[id].count} байна.`);
                        modal['tree'].options[id].number = modal['tree'].options[id].count;
                    }
                    this.closest('tr').querySelector('input').value = modal['tree'].options[id].number;

                    let twin = Array.from(document.querySelectorAll('.right-side .summary-wrapper table tr')).find((item) => {
                        return item.dataset.id === id;
                    });
                    twin.querySelector('input').value = modal['tree'].options[id].number;

                    // Total
                    let total = modal['tree'].options.reduce((acc, item) => {
                        return acc += item.price * item.number;
                    }, 0);
                    document.querySelector('.right-side .calculator span').innerHTML = `₮${total}`;
                };
            });
            // on Summary
            document.querySelectorAll('.right-side .summary-wrapper table tr .quantity input').forEach((item) => {
                item.onchange = function () {
                    let id = this.closest('tr').dataset.id;

                    if (this.value < 0) {
                        modal['tree'].options[id].number = 0;
                    } else if (this.value > modal['tree'].options[id].count) {
                        alert(`Уучлаарай, боломжит үлдэгдэл ${modal['tree'].options[id].count} байна.`);
                        modal['tree'].options[id].number = modal['tree'].options[id].count;
                    } else {
                        modal['tree'].options[id].number = parseInt(this.value);
                    };
                    this.value = modal['tree'].options[id].number;

                    let twin = Array.from(document.querySelectorAll('.right-side table tr')).find((item) => {
                        return item.dataset.id === id;
                    });
                    twin.querySelector('input').value = modal['tree'].options[id].number;

                    // Total
                    let total = modal['tree'].options.reduce((acc, item) => {
                        return acc += item.price * item.number;
                    }, 0);
                    document.querySelector('.right-side .calculator span').innerHTML = `₮${total}`;
                };
            });
            document.querySelectorAll('.right-side .summary-wrapper table tr .quantity .minus').forEach((item) => {
                item.onclick = function () {
                    let id = this.closest('tr').dataset.id;

                    modal['tree'].options[id].number--;
                    if (modal['tree'].options[id].number < 0) {
                        modal['tree'].options[id].number = 0;
                    }
                    this.closest('tr').querySelector('input').value = modal['tree'].options[id].number;

                    let twin = Array.from(document.querySelectorAll('.right-side table tr')).find((item) => {
                        return item.dataset.id === id;
                    });
                    twin.querySelector('input').value = modal['tree'].options[id].number;

                    // Total
                    let total = modal['tree'].options.reduce((acc, item) => {
                        return acc += item.price * item.number;
                    }, 0);
                    document.querySelector('.right-side .calculator span').innerHTML = `₮${total}`;
                };
            });
            document.querySelectorAll('.right-side .summary-wrapper table tr .quantity .plus').forEach((item) => {
                item.onclick = function (event) {
                    let id = this.closest('tr').dataset.id;

                    modal['tree'].options[id].number++;
                    if (modal['tree'].options[id].number > modal['tree'].options[id].count) {
                        alert(`Уучлаарай, боломжит үлдэгдэл ${modal['tree'].options[id].count} байна.`);
                        modal['tree'].options[id].number = modal['tree'].options[id].count;
                    }
                    this.closest('tr').querySelector('input').value = modal['tree'].options[id].number;

                    let twin = Array.from(document.querySelectorAll('.right-side table tr')).find((item) => {
                        return item.dataset.id === id;
                    });
                    twin.querySelector('input').value = modal['tree'].options[id].number;

                    // Total
                    let total = modal['tree'].options.reduce((acc, item) => {
                        return acc += item.price * item.number;
                    }, 0);
                    document.querySelector('.right-side .calculator span').innerHTML = `₮${total}`;
                };
            });
        },
    };

    // Main
    if (window.location.search) {
        let id = window.location.search.split('=')[1];
        db.collection('trees').doc(id).get().then((doc) => {
            modal['tree'] = doc.data();
            modal['tree'].id = doc.id;
            if (doc.data().reviews) {
                modal['reviews'] = [...doc.data().reviews];
            };
            db.collection('categories').doc(modal['tree'].category).get().then((docCategory) => {
                modal['category'] = docCategory.data();
                modal['category'].id = docCategory.id;

                view['drawTree']();

                // User login check
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
                            modal['user'] = {
                                ...doc.data(),
                                id: doc.id,
                            };
                        });
                    };
                });
            })
        })
    } else {
        window.location.replace('index.html');
    };
};

// CART.html
if (window.location.href.endsWith('cart.html')) {
    console.log('Hello cart.html');

    let modal = {
        basket: [],
        trees: [],
        user: -1,
    };

    let controller = {
        update: function () {
            let total = Array.from(document.querySelectorAll('.basket .carts .cart .subtotal')).reduce((acc, item) => {
                return acc + parseInt(item.innerHTML.substring(1));
            }, 0);
            document.querySelector('.basket .checkout-wrapper div span:last-child').innerHTML = `₮${total}`;

            // Firebase
            if (total) {
                modal['basket'].forEach((item) => {
                    let promise = db.collection('baskets')
                        .where("user_id", "==", item['user_id'])
                        .where("product_id", "==", item['product_id'])
                        .where("option_id", "==", item['option_id']).get();
                    promise.then((docs) => {
                        if (!docs.empty) {
                            docs.forEach((doc) => {
                                if (doc.data().number !== item.number) {
                                    db.collection('baskets').doc(doc.id).set(item).then(() => {
                                        alert('Таны сагс амжилттай шинэчлэгдлээ.');
                                    });
                                };
                            });
                        } else {
                            db.collection('baskets').add(item).then(() => {
                                alert('Сагсанд амжилттай нэмэгдлээ.');
                            });
                        };
                    });
                    promise.catch((error) => {
                        console.log(error.message);
                    });
                });

            };
        },

        checkout: function () {
            let cond1 = document.querySelector('.checkout-wrapper div span:last-child').innerHTML === '₮0.00';
            let cond2 = document.querySelector('.checkout-wrapper textarea').value === '';
            if (cond1) {
                alert('Нийт дүнгээ шалгаад сагсаа шинэчилнэ үү');
                return;
            };
            if (cond2) {
                alert('Хаягаа оруулна уу');
                return;
            };

            if (!cond1 && !cond2) {
                db.collection('trees').get().then((docs) => {
                    modal['trees'] = [];
                    docs.forEach((doc) => {
                        let temp = {
                            ...doc.data(),
                            id: doc.id,
                        };
                        modal['trees'].push(temp);
                    });

                    modal['basket'].forEach((item) => {
                        let temp = modal['trees'].find((element) => {
                            return element.id === item['product_id'];
                        });

                        if (temp.count < item.number) {
                            alert('Үлдэгдэл хүрэлцэхгүй байна.');
                            return;
                        };
                    });

                    let promise = [];
                    modal['basket'] = modal['basket'].filter((item) => {
                        return item.number > 0;
                    });
                    if (!modal['basket'].length) {
                        alert('Таны сагсан дахь бүтээгдэхүүний тоо 0 байна.');
                        return;
                    };

                    modal['basket'].forEach((item) => {
                        let temp = modal['trees'].find((element) => {
                            return element.id === item['product_id'];
                        });
                        temp.options[item['option_id']].count -= item.number;
                        promise.push(db.collection('trees').doc(item['product_id']).set(temp));
                    });

                    Promise.all(promise).then(() => {
                        db.collection('baskets').where('user_id', '==', auth.currentUser.uid).get().then((snapshots) => {
                            snapshots.forEach((snapshot) => {
                                snapshot.ref.delete();
                            });

                            let temp = {
                                'user_id': auth.currentUser.uid,
                                'date': (new Date()).toISOString(),
                                'location': document.querySelector('.checkout-wrapper textarea').value,
                                'products': modal['basket'],
                            };

                            db.collection('orders').add(temp).then(() => {
                                if (confirm('Таны худалдан авалт амжилттай хийгдлээ. Та худалдан авалтын түүх рүү шилжих үү?')) {
                                    window.location.href = 'order.html';
                                } else {
                                    modal['basket'] = [];
                                    document.querySelector('.checkout-wrapper div span:last-child').innerHTML = '₮0.00';
                                    let $box = document.querySelector('.basket .cart-wrapper .carts');
                                    $box.innerHTML = '<h1>Таны сагс хоосон байна.</h1>';
                                };
                            });
                        });
                    });
                    Promise.all(promise).catch((error) => {
                        console.log(error.message);
                    });
                });
            };
        },
    };

    let view = {
        draw: function (option, tree) {
            let $div = document.createElement('div');
            $div.className = 'cart';
            $div.innerHTML =
                `<div class="img-wrapper"></div>
                    <div class="general">
                        <div class="product">
                            <a href="onetree.html?tree=${tree.id}">${tree.name}</a>
                            <p class="container">${tree.options[option['option_id']].height} см</p>
                            <p class="shipping">${tree.options[option['option_id']].age} нас</p>
                            <p class="price">₮${tree.options[option['option_id']].price} / нэгж</p>
                        </div>
                        <div class="quantity">
                            <button class="minus">-</button>
                            <input type="number" placeholder="0" value="${option.number}" />
                            <button class="plus">+</button>
                            <button class="delete"></button>
                        </div>
                        <div class="subtotal">₮${option.number * tree.options[option['option_id']].price}</div>
                    </div>`;

            $div.querySelector('.img-wrapper').style.backgroundImage = `url(${tree.img})`;
            $div.querySelector('.img-wrapper').style.backgroundSize = `cover`;

            document.querySelector('.basket .cart-wrapper .carts').append($div);

            // Buttons
            $div.querySelector('input').onchange = function () {
                if (this.value < 0) {
                    option.number = 0;
                } else if (this.value > tree.options[option['option_id']].count) {
                    alert(`Уучлаарай, боломжит үлдэгдэл ${tree.options[option['option_id']].count} байна.`);
                    option.number = tree.options[option['option_id']].count;
                } else {
                    option.number = parseInt(this.value);
                };
                this.value = option.number;

                // Subtotal
                let subtotal = option.number * tree.options[option['option_id']].price;
                $div.querySelector('.subtotal').innerHTML = `₮${subtotal}`;
            };
            $div.querySelector('.minus').onclick = function () {
                option.number--;
                if (option.number < 0) {
                    option.number = 0;
                }
                $div.querySelector('input').value = option.number;

                // Subtotal
                let subtotal = option.number * tree.options[option['option_id']].price;
                $div.querySelector('.subtotal').innerHTML = `₮${subtotal}`;
            };
            $div.querySelector('.plus').onclick = function () {
                option.number++;
                if (option.number > tree.options[option['option_id']].count) {
                    alert(`Уучлаарай, боломжит үлдэгдэл ${tree.options[option['option_id']].count} байна.`);
                    option.number = tree.options[option['option_id']].count;
                }
                $div.querySelector('input').value = option.number;

                // Subtotal
                let subtotal = option.number * tree.options[option['option_id']].price;
                $div.querySelector('.subtotal').innerHTML = `₮${subtotal}`;
            };
            $div.querySelector('.delete').onclick = function () {
                db.collection('baskets').doc(option.id).delete().then(() => {
                    $div.remove();
                    let i = modal['basket'].findIndex((item) => {
                        return item['option_id'] === option['option_id'] && item['product_id'] === option['product_id'];
                    });
                    modal['basket'].splice(i, 1);
                });
            };

        },

        buttons: () => {
            document.querySelector('.basket .update').onclick = () => {
                controller['update']();
            };
            document.querySelector('.basket .checkout-wrapper button').onclick = () => {
                controller['checkout']();
            };
        },

    };

    // Main
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('baskets').where('user_id', '==', user.uid).get().then((docs) => {
                if (!docs.empty) {
                    docs.forEach((doc) => {
                        let temp = {
                            ...doc.data(),
                            id: doc.id,
                        };
                        modal['basket'].push(temp);
                    });
                    db.collection('trees').get().then((snapshots) => {
                        snapshots.forEach((snapshot) => {
                            let temp = {
                                ...snapshot.data(),
                                id: snapshot.id,
                            };
                            modal['trees'].push(temp);
                        });
                        modal['basket'].forEach((item) => {
                            let tree = modal['trees'].find((mod) => {
                                return mod.id === item['product_id'];
                            });
                            view['draw'](item, tree);
                        });
                        view['buttons']();
                        db.collection('users').doc(user.uid).get().then((customer) => {
                            let temp = {
                                ...customer.data(),
                                id: customer.id,
                            };
                            modal['user'] = temp;

                            if (temp['address']) document.querySelector('.basket .checkout-wrapper textarea').value = temp['address'];
                            else document.querySelector('.basket .checkout-wrapper textarea').value = '';
                        });
                    });
                } else {
                    let $box = document.querySelector('.basket .cart-wrapper .carts');
                    $box.innerHTML = '<h1>Таны сагс хоосон байна.</h1>';
                };
            });
        } else {
            window.location.replace('index.html');
        };
    });
};

// ORDER.html
if (window.location.href.endsWith('order.html')) {
    console.log('Hello order.html');

    let modal = {
        orders: [],
        trees: [],
        user: -1,
    };

    let view = {
        drawProduct: function (product, tree) {
            $div = document.createElement('div');
            $div.className = 'product';
            $div.innerHTML =
                `<div class="img-wrapper"></div>
                    <table>
                        <tr>
                            <th class="first">Нэр:</th>
                            <td class="first"><a href="onetree.html?tree=${tree.id}">${tree.name}</a></td>
                        </tr>
                        <tr>
                            <th>Өндөр:</th>
                            <td>${tree.options[product['option_id']].height} см</td>
                        </tr>
                        <tr>
                            <th>Нас:</th>
                            <td>${tree.options[product['option_id']].age} нас</td>
                        </tr>
                        <tr>
                            <th>Нэгж үнэ:</th>
                            <td>₮${tree.options[product['option_id']].price}</td>
                        </tr>
                        <tr>
                            <th>Тоо:</th>
                            <td>${product.number}</td>
                        </tr>
                        <tr>
                            <th>Дүн:</th>
                            <td>₮${product.number * tree.options[product['option_id']].price}</td>
                        </tr>
                    </table>`;

            $div.querySelector('.img-wrapper').style.backgroundImage = `url(${tree.img})`;
            $div.querySelector('.img-wrapper').style.backgroundSize = `cover`;

            return $div;
        },

        drawOrder: function (order) {
            $order = document.createElement('div');
            $order.className = 'order';
            $order.innerHTML =
                `<div class="header">
                    <span>Огноо: ${order['date'].slice(0, 10)}</span>
                </div>`;

            document.querySelector('.order-wrapper').append($order);

            order['products'].forEach((item) => {
                let tree = modal['trees'].find((mod) => {
                    return mod.id === item['product_id'];
                });
                $order.append(view['drawProduct'](item, tree));
            });
        },
    };

    // Main
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('orders').where('user_id', '==', user.uid).get().then((docs) => {
                if (!docs.empty) {
                    docs.forEach((doc) => {
                        modal['orders'].push(doc.data());
                    });

                    db.collection('trees').get().then((snapshots) => {
                        snapshots.forEach((snapshot) => {
                            let temp = {
                                ...snapshot.data(),
                                id: snapshot.id,
                            };
                            modal['trees'].push(temp);
                        });
                        modal['orders'].forEach((item) => {
                            view['drawOrder'](item);
                        });
                    });
                } else {
                    let $box = document.querySelector('.order .order-wrapper');
                    $box.innerHTML = '<h1>Таны худалдан авалтын түүх хоосон байна!</h1>';
                };
            });
        } else {
            window.location.replace('index.html');
        };
    });
};

// TREES.html
if (window.location.href.includes('trees.html')) {
    console.log('Hello trees.html');

    let modal = {
        category: -1,
        alltrees: [],
        trees: [],
    };

    let controller = {
        sort: function (index) {
            if (index === 1) {
                modal['trees'].sort((item1, item2) => {
                    item1.price = item1['options'].reduce((acc, item) => {
                        return acc + item.price;
                    }, 0);
                    item2.price = item2['options'].reduce((acc, item) => {
                        return acc + item.price;
                    }, 0);
                    if (item1.price > item2.price) return 1;
                    if (item1.price < item2.price) return -1;
                    if (item1.price === item2.price) return 0;
                });
            } else if (index === 2) {
                modal['trees'].sort((item1, item2) => {
                    item1.price = item1['options'].reduce((acc, item) => {
                        return acc + item.price;
                    }, 0);
                    item2.price = item2['options'].reduce((acc, item) => {
                        return acc + item.price;
                    }, 0);
                    if (item1.price > item2.price) return -1;
                    if (item1.price < item2.price) return 1;
                    if (item1.price === item2.price) return 0;
                });
            } else if (index === 3) {
                modal['trees'].sort((item1, item2) => {
                    if (item1.name > item2.name) return 1;
                    if (item1.name < item2.name) return -1;
                    if (item1.name === item2.name) return 0;
                });
            } else if (index === 4) {
                modal['trees'].sort((item1, item2) => {
                    item1.rate = item1['options'].reduce((acc, item) => {
                        return acc + item.rate;
                    }, 0);
                    item2.rate = item2['options'].reduce((acc, item) => {
                        return acc + item.rate;
                    }, 0);
                    if (!item1.rate) item1.rate = 5;
                    if (!item2.rate) item1.rate = 5;
                    if (item1.rate > item2.rate) return -1;
                    if (item1.rate < item2.rate) return 1;
                    if (item1.rate === item2.rate) return 0;
                });
            } else {
                return;
            };

            document.querySelector('.ts-products').innerHTML = '';
            modal['trees'].forEach((item) => {
                view['drawTree'](item);
            });
        },
    };

    let view = {
        drawCategory: function () {
            let $div = document.createElement('div');
            $div.className = 'info-content';
            $div.innerHTML =
                `<h1 class="ts-info-title">${modal.category.name}</h1>
                <p class="info-txt">${modal.category.description}</p>`;

            document.querySelector('.ts-info').append($div);
            document.querySelector('#category').innerHTML = `${modal.category.name}`;
            document.querySelector('.section1 h1').innerHTML = `${modal.category.name}`;
        },

        drawTree: function (tree) {
            // Average price
            let sumPrice = tree['options'].reduce((acc, item) => {
                return acc + item.price;
            }, 0);

            let $div = document.createElement('div');
            $div.className = 'ts-product';
            $div.innerHTML =
                `<div class="product-button">${tree.name}</div>
                 <label>₮${parseInt(sumPrice / tree['options'].length)}</label>`;

            $div.style.backgroundImage = `url(${tree.img})`;
            $div.style.backgroundSize = `cover`;

            document.querySelector('.ts-products').append($div);

            // Button
            $div.querySelector('.product-button').onclick = () => {
                window.location.href = `onetree.html?tree=${tree.id}`;
            };
        },

        buttons: function () {
            document.querySelector('.default-sorting').onchange = function () {
                controller['sort'](this.selectedIndex);
            };
        },
    };

    // Main
    if (!window.location.search) {
        window.location.replace('index.html');
    } else {
        if (window.location.search.split('=')[0] === '?category') {
            db.collection('categories').doc(window.location.search.split('=')[1]).get().then((doc) => {
                let temp = {
                    ...doc.data(),
                    id: doc.id,
                };
                modal['category'] = temp;

                db.collection('trees').where('category', '==', temp.id).get().then((elements) => {
                    elements.forEach((element) => {
                        let tree = {
                            ...element.data(),
                            id: element.id,
                        };
                        modal['trees'].push(tree);
                    });

                    view['drawCategory']();
                    view['buttons']();
                    modal['trees'].forEach((item) => {
                        view['drawTree'](item);
                    });
                });
            });
        } else {
            db.collection('trees').get().then((elements) => {
                elements.forEach((element) => {
                    let tree = {
                        ...element.data(),
                        id: element.id,
                    };
                    modal['alltrees'].push(tree);
                });

                modal['trees'] = modal['alltrees'].filter((item) => {
                    return item['name'].toLowerCase().includes(decodeURI(window.location.search).split('=')[1].toLowerCase());
                });

                document.querySelector('#category').innerHTML = 'Search';
                document.querySelector('.section1 h1').innerHTML = 'Search';

                view['buttons']();
                modal['trees'].forEach((item) => {
                    view['drawTree'](item);
                });
            });
        };
    };
};

// INDEX.html
if (window.location.href.endsWith('index.html')) {
    console.log('Hello home.html')

    let modal = {
        categories: [],
        trees: [],
        user: -1,


    };
    let controller = {

    };
    let view = {
        drawCategory: function (category) {
            console.log('zuraw');

            let $div = document.createElement('div');
            $div.className = 'card';
            $div.innerHTML =
                `<p class="product-button">${category.name}</p>`;

            $div.style.backgroundImage = `url(${category.img})`;
            $div.style.backgroundSize = `cover`;

            document.querySelector('.flex-container .flex-wrap').append($div);

            // Button
            $div.onclick = function () {
                window.location.href = `trees.html?category=${category.id}`;
            };
            $div.onmouseover = function () {
                $div.querySelector('p').innerHTML = `${category.trees} ширхэг бүтээгдэхүүн`;
            };

            $div.onmouseleave = function () {
                $div.querySelector('p').innerHTML = `${category.name}`;
            };
        },
    };

    // Main
    db.collection('trees').get().then((elements) => {
        elements.forEach((element) => {
            modal['trees'].push(element.data());
        });
        db.collection('categories').get().then((docs) => {
            docs.forEach((doc) => {
                let number = modal['trees'].reduce((acc, item) => {
                    if (item.category === doc.id) return acc + 1;
                    else return acc;
                }, 0);
                let temp = {
                    ...doc.data(),
                    id: doc.id,
                    trees: number,
                };
                modal['categories'].push(temp);
            });

            modal['categories'].forEach((item) => {
                view['drawCategory'](item);
            });



        });
    });
};

// FAQ.html
if (window.location.href.endsWith('FAQ.html')) {
    let click = document.querySelectorAll('.container-faq h3');
    let x = document.querySelectorAll('.container-faq p');

    click[0].onclick = show;

    function show() {
        if (x[0].style.display === "none") {
            x[0].style.display = "block";
        } else {
            x[0].style.display = "none";
        }
    }
    click[1].onclick = show1;

    function show1() {
        if (x[1].style.display === "none") {
            x[1].style.display = "block";
        } else {
            x[1].style.display = "none";
        }
    }

    click[2].onclick = show2;

    function show2() {
        if (x[2].style.display === "none") {
            x[2].style.display = "block";
        } else {
            x[2].style.display = "none";
        }
    }
};

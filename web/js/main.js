$("document").ready(function() {

    let url = ["https://swapi.co/api/people"];
    for (let i = 2; i < 10; i++) {
        url.push(`https://swapi.co/api/people/?page=${i}`)
    }
    let pageNumbeer = $("#pages");
    for (let i = 1; i < 10; i++) {
        pageNumbeer.append(`<span class="numbersHover" id=${i-1}>${i}</span> `);
    };
    pageNumbeer.prepend(`<button id="prev">Prev</button>`);
    pageNumbeer.append(`<button id="next">Next</button>`);

    let spanValue = 0;
    let clearText = $("#swapi");
    $(`#${spanValue}`).css("color", "red");
    fetch(`https://swapi.co/api/people/?page`)
        .then(response => response.json())
        .then(data => {

            let nameArr = data.results;

            let table = document.createElement("table");
            for (let i = -1; i < nameArr.length; i++) {
                let tr = document.createElement("tr");
                for (let j = 0; j < 1; j++) {
                    if (i === -1) {
                        let th = document.createElement("th");
                        th.innerHTML = `<span id="title">Name of the hero</span>`;
                        tr.appendChild(th);
                    } else {
                        let td = document.createElement("td");
                        td.style.width = '500px';
                        td.innerHTML = `${nameArr[i].name} <span>(click for details)</span>`;
                        tr.appendChild(td);
                    }
                }
                table.appendChild(tr);
            }
            let div = document.querySelector('#swapi');
            div.appendChild(table);

            $("tr").on("click", function() {
                let list = $("#swapi");
                let detalistText = $("#details");
                let pages = $("#pages");
                detalistText.removeClass("unactive").addClass("active");
                list.removeClass("active").addClass("unactive");
                pages.addClass("unactive");
                let innerText = $("#innerText");
                let trIndex = this.rowIndex;

                let needObj = (nameArr[trIndex - 1]);
                let counter = 0;
                for (let key in needObj) {
                    counter++;
                    if (counter < 9) { innerText.append(`<p>${key}: ${needObj[key]}</p>`); }
                }
            });

            $("#closeButton").on("click", function() {
                let list = $("#swapi");
                let detalistText = $("#details");
                let innerText = $("#innerText");
                let pages = $("#pages");
                detalistText.removeClass("active").addClass("unactive");
                list.removeClass("unactive").addClass("active");
                pages.removeClass("unactive");
                innerText.text("");
            })


        })

    function listHero() {
        fetch(url[spanValue])
            .then(response => response.json())
            .then(data => {

                let nameArr = data.results;

                let table = document.createElement("table");
                for (let i = -1; i < nameArr.length; i++) {
                    let tr = document.createElement("tr");
                    for (let j = 0; j < 1; j++) {
                        if (i === -1) {
                            let th = document.createElement("th");
                            th.innerHTML = `<span id="title">Name of the hero</span>`;
                            tr.appendChild(th);
                        } else {
                            let td = document.createElement("td");
                            td.style.width = '500px';
                            td.innerHTML = `${nameArr[i].name} <span>(click for details)</span>`;
                            tr.appendChild(td);
                        }
                    }
                    table.appendChild(tr);
                }
                let div = document.querySelector('#swapi');
                div.appendChild(table);

                $("tr").on("click", function() {
                    let list = $("#swapi");
                    let detalistText = $("#details");
                    let pages = $("#pages");
                    detalistText.removeClass("unactive").addClass("active");
                    list.removeClass("active").addClass("unactive");
                    pages.addClass("unactive");
                    let innerText = $("#innerText");
                    let trIndex = this.rowIndex;

                    let needObj = (nameArr[trIndex - 1]);
                    let counter = 0;
                    for (let key in needObj) {
                        counter++;
                        if (counter < 9) { innerText.append(`<p>${key}: ${needObj[key]}</p>`); }
                    }
                });

                $("#closeButton").on("click", function() {
                    let list = $("#swapi");
                    let detalistText = $("#details");
                    let innerText = $("#innerText");
                    let pages = $("#pages");
                    detalistText.removeClass("active").addClass("unactive");
                    list.removeClass("unactive").addClass("active");
                    pages.removeClass("unactive");
                    innerText.text("");
                })


            }).catch(err =>
                console.error(err)
            );
    }
    $("span").on("click", function(event) {
        spanValue = event.target.id;
        $(`#${spanValue}`).css("color", "red");

        clearText.text("");
        console.log(spanValue, "spanValue");
        listHero();
    });
    //buttons
    $("#prev").on("click", function() {
        $(`#${spanValue}`).css("color", "red");
        if (spanValue >= 0 && spanValue < 8) {
            spanValue = spanValue - 1;
        }
        if (spanValue < 0) {
            spanValue = 0;
        }
        clearText.text("");
        listHero();


    });
    $("#next").on("click", function() {
        if (spanValue >= 0 && spanValue < 8) {
            spanValue = +spanValue + 1;
        }
        if (spanValue > 8) {
            spanValue = 8;
        }

        $(`#${spanValue}`).css("color", "red");

        clearText.text("");
        listHero();
    })
});
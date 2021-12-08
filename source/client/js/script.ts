const _ = html;
let deleting = false;
let doScroll = true;

let Input = {
    _Name: <HTMLInputElement>document.getElementById("Name"),
    get Name()
    {
        return this._Name.value;
    },
    set Name(v)
    {
        this._Name.value = v;
    },
    _Text: <HTMLInputElement>document.getElementById("Text"),
    get Text()
    {
        return this._Text.value;
    },
    set Text(v)
    {
        this._Text.value = v;
    }
};
let ChirpsHtml = <HTMLDivElement>document.getElementById("messages");

document.getElementById("Send")?.addEventListener('click', e => {
    e.preventDefault();
    if (Input.Text === "") return;

    let name = Input.Name;
    if (name === "") name = "[Anonymous]"

    fetch('/api/chirps/', {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify({chirp: {name, text: Input.Text}})});

    Input.Name = "";
    Input.Text = "";

    doScroll = true;
    Refresh();
});

const Refresh = async function () {
    let chirpsArray: {id: number, text: string, name: string}[] = await (await fetch('/api/chirps/')).json();

    ChirpsHtml.innerHTML = "";

    chirpsArray.forEach(chirp => {
        ChirpsHtml.appendChild(
            _.div({ attributes: { class: "Message" } , eventListeners: {'click': () => {
                if (deleting) {
                    deleting = false;
                    return;
                }
                window.location.href = "/chirp/" + chirp.id;
            }}}, 
                _.h2(chirp.name),
                _.p(chirp.text),
                _.button({ textContent: "X", attributes: { class: "DeleteMessage" }, eventListeners: {'click': () => {
                    deleting = true;
                    fetch('/api/chirps/', {method: "DELETE", headers: {"content-type": "application/json"}, body: JSON.stringify({id: chirp.id})}).then(() => {
                        Refresh();
                    });
                }} })
            )
        );
    });

    if (doScroll) AddElement('div', ChirpsHtml).scrollIntoView();
    doScroll = false;
}

Refresh();
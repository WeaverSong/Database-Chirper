declare const id: number;

let input = {
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

document.getElementById('Send')?.addEventListener('click', async e => {
    e.preventDefault();
    if (input.Text === "") return;

    let name = input.Name;
    if (name === "") name = "[Anonymous]"

    await fetch('/api/chirps/', {method: "PUT", headers: {"content-type": "application/json"}, body: JSON.stringify({chirp: {name, text: input.Text}, id})});

    input.Name = "";
    input.Text = "";

    window.location.href = "/";

});
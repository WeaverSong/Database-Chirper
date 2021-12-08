import Router from './routes';
import ErrorPage from './routes/404';
import express from 'express';
import cors from 'cors';
import path from 'path';
const rel = (r: string) => path.join(__dirname, r);
import notQuiteJsx from './NotQuiteJSX';
import { Query } from './chirpstore';

let app = express();

app.use(express.static(rel('../client')));
app.use(cors());
app.use(express.json());
app.use('/api/', Router);

app.get('/chirp/:ID', (request, response) => {
    let id = request.params.ID;

    Query(`select * from chirps where chirps.id = ${id};`, []).then((values: any) => {
        
        if (values.length === 0) {
            response.sendStatus(400);
            return;
        }

        let chirp: {name: string, text: string, id: number} = values[0];

        response.send(
            notQuiteJsx.html(
                notQuiteJsx.head(
                    notQuiteJsx.title("Chirp " + id),
                    notQuiteJsx.link({rel:"stylesheet",href:"../style.css"})
                ),
                notQuiteJsx.body(
                    notQuiteJsx.div({class: "flex max",style:"justify-content:center;align-items:center;"}, 
                        notQuiteJsx.form({class: "input-form center"}, 
                            notQuiteJsx.h1("Edit:"),
                            notQuiteJsx.div({class:"pad"}, 
                                notQuiteJsx.label({for:"Name", class:"font-bigger"}, "Name:"),
                                notQuiteJsx.input({type:"text", id:"Name", class:"font-bigger", value: chirp.name})
                            ),
                            notQuiteJsx.div({class:"pad"}, 
                                notQuiteJsx.label({for:"Text", class:"font-bigger"}, "Text:"),
                                notQuiteJsx.input({type:"text", id:"Text", class:"font-bigger", value: chirp.text})
                            ),
                            notQuiteJsx.button({id:"Send", class:"margin"}, "Submit")
                        )
                    ),
                    notQuiteJsx.script(`
                        const id = ${id};
                    `),
                    notQuiteJsx.script({src:"../js/editScript.js"})
                )
            )
        );
    });

})


app.use((request, response) => {
    response.status(404).send(ErrorPage(request));
});


app.listen(3000, () => console.log("Server listening on port 3000!"));
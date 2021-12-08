import express from 'express';
import { Query } from '../chirpstore';

let router = express.Router();

router.get('/:ID?', (request, response) => {
    if (request.params.ID === undefined)
    {
        Query('select * from chirps limit 50;', []).then((value) => {
            response.json(value);
        })
        return;
    }
    
    const id = parseInt(request.params.ID);
    Query(`select * from chirps where chirps.id = ${id};`, []).then((values: any) => {
            if (values.length === 0) return response.sendStatus(400);
            response.json(values[0]);
        });
});

router.post('/', (request, response) => {

    let chirp = request.body.chirp;

    if (typeof chirp !== "object" || typeof chirp.name !== 'string' || typeof chirp.text !== 'string') {
        response.status(400).json({"message": "Invalid chirp data"});
        return;
    };

    Query(`insert into chirps (name, text) values ("${chirp.name}", "${chirp.text}")`, []).then((i: any) => {
        if (i.affectedRows < 1) return response.sendStatus(400);

        response.sendStatus(200);
    });


});

router.put('/', (request, response) => {

    const {id, chirp} = request.body;

    if (typeof id !== 'number') {
        response.status(400).json({"message": "Invalid id"});
        return;
    };

    if (typeof(chirp) !== "object" || typeof chirp.name !== 'string' || typeof chirp.text !== 'string') {
        response.status(400).json({"message": "Invalid chirp data"});
        return;
    };

    Query(`update chirps set name = '${chirp.name}', text = '${chirp.text}' where id = ${id};`, []).then((values: any) => {
        if (values.affectedRows < 1) return response.status(400).json({"message": "No such chirp"});

        response.sendStatus(200);
    })

});

router.delete('/', (request, response) => {
    
    const {id} = request.body;

    if (typeof id !== "number") {
        response.status(400).json({"message": "Invalid id"});
        return;
    };

    Query(`delete from chirps where id = ${id};`, []).then((values: any) => {
        if (values.affectedRows < 1) return response.status(400).json({"message": "No such chirp"});

        response.sendStatus(200);
    })

});


export default router;
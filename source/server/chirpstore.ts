import * as mysql from 'mysql';

const Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'chirprapp',
    password: 'chirpr_password',
    database: 'chirpr'
});

export const Query = (query: string, values: Array<string | number>) => {
    return new Promise((fulfillWith, betrayBecause) => {
        Connection.query(query, values, (error, result) => {
            if (error) return betrayBecause (error);
            else return fulfillWith (result);
        })
    })
};

/*
create table chirps (
id int auto_increment not null primary key,
name text not null,
text text not null
);
*/
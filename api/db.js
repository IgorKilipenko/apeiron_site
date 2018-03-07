import mysql from 'mysql';

export default class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
        this.connection.query("SET NAMES utf8", err => {
            if (err){
                console.log({err});
            }
            //this.connection.end(err => {
            //    console.log({err});
            //});
        });
        
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

// DB Path
const dbPath = new URL('../db.json', import.meta.url);

export class Database {

    // # = private
    #database = {};

    constructor() {
        // Load the database from file
        this.#load();
    }

    // Save to file
    #persist(){
        fs.writeFile(dbPath, JSON.stringify(this.#database));
    }

    #load(){
        fs.readFile(dbPath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(err => {
            this.#persist();
        });
    }

    select(table){
        const data = this.#database[table] ?? [];
        return data;       
    }

    insert(table, data){
        
        // Add id property to the data object
        //data.id = this.#getNextId(table);
        data.id = randomUUID();

        // Add
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        }
        else{
            this.#database[table] = [data];
        }

        // Save 
        this.#persist();

        return data;
    }

    delete(table, id){

        // Find the index of the object with the given id
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        // If the object is not found, return null  
        if(rowIndex === -1){
            return false;
        }
        else{
            // Remove the object from the array
            this.#database[table].splice(rowIndex, 1);
            // Save 
            this.#persist();
            //
            return true;
        }
    }

    update(table, id, data){

        // Find the index of the object with the given id
        const rowIndex = this.#database[table].findIndex(row => row.id === id);

        // If the object is not found, return null  
        if(rowIndex === -1){
            return false;
        }
        else{
            // Replace row
            this.#database[table][rowIndex] = { id, ...data };
            // Save 
            this.#persist();
            //
            return true;
        }
    }


    /* #getNextId(table){
        // if the table exists length+1 esle 1
        return this.#database[table] ? this.#database[table].length + 1 : 1;
    } */
}